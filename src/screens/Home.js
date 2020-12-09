import React from 'react';
import { Center } from '../components/Center';
import { SafeAreaView,Text, TextInput, StyleSheet, TouchableWithoutFeedback, View,ScrollView, ProgressViewIOS } from 'react-native';
import { LogoutButton } from '../components/LogoutButton';
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildPath } from '../functions/BuildPath'

export default class Home extends React.PureComponent {
    state = {
        manage: false,
        userName: '',
        password: '',
        confirmPassword: '',
        emptyFields: false,
        matchingPW: true,
        accountUpdated: false,
        allowance: 0,
        budgets: [],
        showSave: false
    }
   async componentDidMount() {
       this.setState({
           username: await AsyncStorage.getItem('userName')
       })
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
  render() {
    const {manage, username, password, confirmPassword, allowance, budgets, emptyFields, matchingPW, showSave} = this.state;


    const editAccount = async () =>
    {
        if (username != undefined && username.length === 0)    {
            this.setState({emptyFields: true});
            return;
        }
        
        if (password.value !== confirmPassword.value) {
            this.setState({matchingPW: false});
            return;
        }

        var obj = {newEmail:await AsyncStorage.getItem("email"), password:password, userName: username,
                    userID: await AsyncStorage.getItem("userID")};
        var js = JSON.stringify(obj);
        try
        {
            // API call
            const response = await fetch(buildPath('api/editAccount'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await AsyncStorage.getItem("token")}});

            // Parse JSON response
            var res = JSON.parse(await response.text());

            AsyncStorage.setItem('username', username);
            this.setState({accountUpdated: true, manage: false});
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    const addAllowance = async() => {
              var userEmail = await AsyncStorage.getItem("email");
              var obj = {email:userEmail, funds: allowance};
              var js = JSON.stringify(obj);
    
              try
              {
                  // Call to API
    
                  const response = await fetch(buildPath('api/addAllowance'),
                      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    
                  // Parsing response
                  var txt = await response.text();
                  var res = JSON.parse(txt);
    
                  if( res.error.length > 0 )
                  {
                      alert( "API Error:" + res.error );
                  }
                  else
                  {
                    this.setState({showSave: false});
                      this.componentDidMount()
                  }
              }
              catch(e)
              {
                  
              }
      };

    if (!manage)
        return (
        <SafeAreaView style={styles.container}>
            <Center>
                <Text style={styles.medium}>Welcome, {username}</Text>
                <SafeAreaView style={styles.allowance}>
                    <Text style={styles.allowanceHeader}>Allowance</Text>
                    <TextInput style={styles.inputAllowance} value={allowance.toString()} onChangeText={a => this.setState({allowance: a, showSave: true})}></TextInput>
                    <TouchableWithoutFeedback onPress={() => this.setState({allowance:allowance + 1, showSave: true})}>
                    <View style={styles.increaseButton}>
                    <Text style={styles.small2}>
                        +
                    </Text>
                    </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.setState({allowance: allowance - 1, showSave: true})}>
                    <View style={styles.decreaseButton}>
                    <Text style={styles.small2}>
                        -
                    </Text>
                    </View>
                    </TouchableWithoutFeedback>
                    { showSave ? 
                    <TouchableWithoutFeedback onPress={addAllowance}>
                    <View style={styles.updateButton}>
                    <Text style={styles.small2}>
                        Save
                    </Text>
                    </View>
                    </TouchableWithoutFeedback>
                    :
                    <Text></Text>
                    }
                </SafeAreaView>
                <SafeAreaView style={styles.middle}>
                 
                    <ScrollView style={styles.scrollView}>
                            {budgets.map((budget,i) => 
                                <SafeAreaView key={i} style={i % 2 == 0 ? styles.top : styles.light}>
                                    <Text style={styles.mediumBudgetHeader}>{budget.BudgetName}</Text><Text style={styles.small}>You need {budget.BudgetGoal - budget.BudgetProgress}$ to reach {budget.BudgetGoal}$ goal</Text>
                                        <ProgressViewIOS
                                        style={styles.progress}
                                        progressTintColor={((budget.BudgetProgress / budget.BudgetGoal) * 100) > 50 ? "green" : "red"}
                                        progress={(budget.BudgetProgress / budget.BudgetGoal)}/>
                                    <Text style={styles.small}>{((budget.BudgetProgress / budget.BudgetGoal) * 100).toFixed(2) + "% complete"}</Text>
                                </SafeAreaView>
                            )}
                        </ScrollView>
                </SafeAreaView>
                <TouchableWithoutFeedback onPress={() => this.setState({manage:true})}>
                    <View style={styles.editButton}>
                    <Text style={styles.small2}>
                        Settings
                    </Text>
                    </View>
                </TouchableWithoutFeedback>
            </Center>
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={styles.container2}>
             <TouchableWithoutFeedback onPress={editAccount}>
                    <View style={styles.saveButton}>
                    <Text style={styles.medium}>
                        save
                    </Text>
                    </View>
            </TouchableWithoutFeedback>
            <Text style={styles.mediumStart}>
                Username
            </Text>
            <TextInput style={styles.input}
              onChangeText={u => this.setState({username: u})}
              value={username}>
            </TextInput>
            <Text style={styles.mediumStart2}>
                Change Password
            </Text>
            <TextInput style={styles.input2} secureTextEntry={true}
              onChangeText={pw => this.setState({password: pw})} placeholder={"Not Required "}/>
            <Text style={styles.mediumStart3}>
                Confirm Password
            </Text>
            <TextInput style={styles.input3} secureTextEntry={true}
              onChangeText={pw => this.setState({confirmPassword: pw})}/>
              <LogoutButton/>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        margin: 10,
    },
    allowance: {
        backgroundColor: '#19c0ff',
        flex: .25,
        width: 350,
        top: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    allowanceHeader: {
        fontSize: 36,
        left: 80
    },
    light: {
        backgroundColor: '#55D0F1'
    },
    scroll: {
        flex: .1,
        width: 350
    },
    container2: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: '#19c0ff',
    },
    mediumStart: {
        fontSize: 24,
        justifyContent: 'center',
        alignItems: 'center',
        top: 60,
        left: 160
    },
    progress: {
        fontSize: 20
    },
    mediumStart2: {
        fontSize: 24,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        left: 125
    },
    mediumStart3: {
        fontSize: 24,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 100,
        left: 125
    },
    inputAllowance: {
        backgroundColor: '#55D0F1',
        flex: .5,
        width: 230,
        top: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    input: {
        backgroundColor: '#55D0F1',
        flex: .10,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    input2: {
        backgroundColor: '#55D0F1',
        flex: .10,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        bottom: 80
    },
    input3: {
        backgroundColor: '#55D0F1',
        flex: .10,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        bottom: 160
    },
    editButton: {
        flex: .06,
        backgroundColor: "#fcb401",
        width: 150,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top: 30
      },
      increaseButton: {
        flex: .6,
        backgroundColor: "green",
        width: 60,
        bottom: 0.5,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 250,
        bottom: 20
      },
      updateButton: {
        flex: .6,
        backgroundColor: "#fcb401",
        width: 80,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 50,
        bottom: 15
      },
      decreaseButton: {
        flex: .6,
        backgroundColor: "red",
        width: 60,
        bottom: 0.5,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 250,
        bottom: 10
      },
      saveButton: {
        flex: .10,
        backgroundColor: "#fcb401",
        width: 300,
        bottom: 0.5,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top:50,
        left: 57
      },

    large: {
        fontSize: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mediumBudgetHeader: {
        fontSize: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medium: {
        fontSize: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    small2: {
        fontSize: 36,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 5
    },
    inner: {
        backgroundColor: 'white',
        flex: 0.5,
        width: 300, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        
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
        flex: 0.6,
        backgroundColor: "#19c0ff",
        width: 350,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        margin: 10,
        paddingTop: 10,
        top: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
});