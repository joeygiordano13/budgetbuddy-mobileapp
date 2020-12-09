import React, { useState } from 'react';
//import ReactApexChart from 'react-apexcharts'
import { Center } from '../components/Center';
import { SafeAreaView,Text, Button, StyleSheet,  TouchableWithoutFeedback, View, ScrollView, TextInput } from 'react-native';
import { LogoutButton } from '../components/LogoutButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildPath } from '../functions/BuildPath';
import { FontAwesome } from '@expo/vector-icons'; 

export default class Budgets extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            budgets: [],
            show: false,
            currentBudget: -1,
            rerender: false,
            changeAllowance: false, 
            manage: false, 
            budgetName: '', 
            budgetGoal: -1, 
            budgetProgress: -1
        }
    }

    async componentDidMount() {
        var obj = {email: await AsyncStorage.getItem("email")};
        var js = JSON.stringify(obj);
        Promise.all([
            fetch(buildPath('api/showAllBudgets'),
            {method:'POST', body: js, headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await AsyncStorage.getItem("token")}}),
            fetch(buildPath('api/getAllowance'),
                {method:'POST', body: js, headers: {'Content-Type': 'application/json'}})    
        ])
            .then(([res1, res2]) => {
                return Promise.all([res1.json(), res2.json()])
        })
        .then(([res1, res2]) => {
            var total = 0;
            for (var i = 0; i < res1.results.length; i++)
            total += (res1.results[i].BudgetGoal - res1.results[i].BudgetProgress);
            this.setState({
            budgets: res1.results,
            allowance: res2.allowance,
            diff : 0,
            index: -1, 
            total : total
            })
        })
    }

    render () {
        const { budgets, show, manage, currentBudget, budgetName, budgetGoal, budgetProgress, allowance, diff, index, total } = this.state;
        //const [manage, setManage] = React.useState(false);

        var newName = '', newGoal ='';
    
        const handleClose = () => this.setState({show: false});
        const handleShow = async event => {
          event.preventDefault();
          const index = event.currentTarget.getAttribute("data-id");
          this.setState({show: true, currentBudget: index, name:budgets[index].name});
        }


        const addBudget = async event => 
        {
          event.preventDefault();

          var prog;
          if(!budgetProgress)
            prog = 0;
          else
            prog = parseInt(budgetProgress);

          if (prog > allowance) {
            alert("You do not have enough allowance to add that much progress");
            return;
          }
          var userEmail = await AsyncStorage.getItem("email");
          var obj = {email:userEmail,BudgetName:budgetName, BudgetGoal:budgetGoal, BudgetProgress:budgetProgress};
          var js = JSON.stringify(obj);

          var js2 = JSON.stringify({email:userEmail, funds: (parseInt(allowance) - prog)});

          try
          {
              // Call to API
              Promise.all([
                fetch(buildPath('api/addbudget'),
                  {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await AsyncStorage.getItem("token")}}),
                fetch(buildPath('api/addAllowance'),
                  {method:'POST', body: js2, headers: {'Content-Type': 'application/json'}})    
              ])
                .then(([res1, res2]) => {
                  return Promise.all([res1.json(), res2.json()])
                })
                .then(([res1, res2]) => {
                  this.componentDidMount();
                  this.setState({manage:false});
                })
          }
          catch(e)
          {
            console.log(e.toString());
          }
      };

        const remove = event => {
            handleClose();
            confirmAlert({
              title: 'Confirm to delete',
              message: 'Are you sure you want to delete this budget?',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteBudget()
                },
                {
                  label: 'No',
                  onClick: () => this.setState({show: true, currentBudget: event.currentTarget.getAttribute("data-id")})
                }
              ]
            });
          };

        const updateBudget = async event => {
            event.preventDefault();
    
            var obj = {BudgetName: newName, BudgetGoal: newGoal,
                _id:event.currentTarget.getAttribute("data-id")};
            var js = JSON.stringify(obj);
        
            try
            {
                // Call to API
                const response = await fetch(buildPath('api/updatebudget'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await AsyncStorage.getItem("token")}});
        
                // Parsing response
                var txt = await response.text();
                var res = JSON.parse(txt);
        
                if( res.error.length > 0 )
                {
                    Alert.alert( "API Error:" + res.error );
                }
                else
                {
                    this.setState({index: -1});
                    this.setState({manage: false});
                //
                }
            }
            catch(e)
            {
                Alert.alert(e.toString());
            }
        }



        const addProgress = async event => {
            event.preventDefault();
      
            if (allowance + diff < 0) {
              Alert.alert("You can't save your progress as you have a negative allowance.");
              return;
            }
      
            const index = event.currentTarget.getAttribute("data-index");
            var obj = {email: await AsyncStorage.getItem("email"), funds: parseInt(allowance + diff)};
            var js = JSON.stringify(obj);
      
            const obj2 = {newAmount: budgets[index].BudgetProgress,
              _id:event.currentTarget.getAttribute("data-id")};
            const js2 = JSON.stringify(obj2);
      
                try
                {
                    // Call to API
                    Promise.all([
                    fetch(buildPath('api/addAllowance'),
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await AsyncStorage.getItem("token")}}),
                        fetch(buildPath('api/addprogress'),
                        {method:'POST',body:js2,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await AsyncStorage.getItem("token")}})
                    ]).then(([res1, res2]) => {
                        return Promise.all([res1.json(), res2.json()])
                    }).then(([res1, res2]) => {
                    this.setState({index: -1});
                    this.setState({manage: false});
                    //window.location.href = "/budget";
                    })
                }
                catch(e)
                {
                    alert(e.toString() + "yee");
                }
            }

        //const [manage, setManage] = React.useState(false);
        if (!manage)
        {
            return (
                <SafeAreaView style={styles.container}>
                    <Center>
                        <TouchableWithoutFeedback onPress={() => this.setState({manage:true})}>
                            <View style={styles.top}>
                            <Text style={styles.medium}>
                                <FontAwesome name="plus" size={24} color="black" /> 
                                    Add new Budgets
                            </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <ScrollView style={styles.scrollView}>
                            {budgets.map((budget,i) => 
                                <SafeAreaView key={i} style={styles.top}>
                                    <Text style={styles.medium}>{budget.BudgetName}</Text>
                                    <SafeAreaView style={styles.inner}>
                                        <Text style={styles.small}>Goal:</Text>
                                        <Text style={styles.small}>${budget.BudgetGoal}</Text>
                                    </SafeAreaView>
                                    <SafeAreaView style={styles.inner}>
                                        <Text style={styles.small}>Progress:</Text>
                                        <Text style={styles.small}>${budget.BudgetProgress}</Text>
                                    </SafeAreaView>
                                </SafeAreaView>
                            )}
                        </ScrollView>
                        <LogoutButton/>
                    </Center>
                </SafeAreaView>
            );
        }

        return (
            <SafeAreaView style={styles.container}>
                    <Center>
                        <SafeAreaView style={styles.newBudgetHeader}>
                            <Text style={styles.nBHeader}>Add New Budgets</Text>
                        </SafeAreaView>
                        <Text style={styles.mediumUp}>Budget Name</Text>
                        <TextInput style={styles.input}
                        onChangeText={bn => this.setState({budgetName : bn})}>
                        </TextInput>
                        <Text style={styles.mediumUp}>Budget Goal</Text>
                        <TextInput style={styles.input}
                        onChangeText={bg => this.setState({budgetGoal : bg})}>
                        </TextInput>
                        <Text style={styles.mediumUp}>Starting Progress</Text>
                        <TextInput style={styles.input}
                        onChangeText={pr => this.setState({budgetProgress: pr})}>
                        </TextInput>
                        <TouchableWithoutFeedback onPress={addBudget}>
                        <View style={styles.addBudgetButton}>
                        <Text style={styles.medium}>
                            <FontAwesome name="plus" size={24} color="black" /> 
                                Add
                        </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    </Center>
                </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 15
    },
    scrollView: {
        flex: .8
    },
    newBudgetHeader: {
        backgroundColor: '#fb2b60',
        width: 414,
        flex: .24,
        bottom: 70
    },
    nBHeader: {
        fontSize: 48,
        alignSelf: 'center',
        top: 40
    },
    input: {
        width: 315,
        flex: .15,
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        margin: 20, 
        bottom: 50
    },
    newBudgetButton: {
        flex: .1,
        backgroundColor: "#fcb401",
        width: 350,
        bottom: 0.5,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top: 25
    },
    addBudgetButton: {
        flex: .13,
        backgroundColor: "#fcb401",
        width: 350,
        bottom: 0.5,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: 'white'
    },
    large: {
        fontSize: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medium: {
        fontSize: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    small: {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mediumUp: {
        fontSize: 36,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 40
    },
    inner: {
        backgroundColor: '#55D0F1',
        flex: 0.80,
        marginTop: 5,
        width: 350, borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    top: {
        flex: 0.4,
        backgroundColor: "#19c0ff",
        width: 350,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        margin: 10,
        alignItems: 'center', 
        paddingTop: 10,
        top: 40,
    },
    label: {
        flex: 0.15,
        backgroundColor: "#fcb401",
        width: 350,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    middle: {
        flex: 0.4,
        backgroundColor: "#19c0ff",
        width: 350,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        margin: 10,
        alignItems: 'center',
        paddingTop: 10,
        top: 40,
    },
});

//export default Budgets;