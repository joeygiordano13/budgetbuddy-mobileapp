import React from 'react';
import { Center } from '../components/Center';
import { SafeAreaView,Text, TextInput, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
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
        accountUpdated: false
    }
   async componentDidMount() {
       this.setState({
           username: await AsyncStorage.getItem('userName')
       })
   }
  render() {
    const {manage, username, password, confirmPassword, emptyFields, matchingPW} = this.state;


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

    if (!manage)
        return (
        <SafeAreaView style={styles.container}>
            <Center>
                <TouchableWithoutFeedback onPress={() => this.setState({manage:true})}>
                    <View style={styles.editButton}>
                    <Text style={styles.medium}>
                        Edit Profile
                    </Text>
                    </View>
                </TouchableWithoutFeedback>
                <SafeAreaView style={styles.top}>
                    <Text style={styles.medium}>Progress Breakdown</Text>
                    <SafeAreaView style={styles.inner}>
                    </SafeAreaView>
                </SafeAreaView>
                <SafeAreaView style={styles.middle}>
                    <Text style={styles.medium}>Progress Over Time</Text>
                    <SafeAreaView style={styles.inner}>
                    </SafeAreaView>
                </SafeAreaView>
                <LogoutButton/>
            </Center>
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={styles.container}>
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
            <Text style={styles.mediumStart}>
                Password
            </Text>
            <TextInput style={styles.input} secureTextEntry={true}
              onChangeText={pw => this.setState({password: pw})}/>
            <Text style={styles.mediumStart}>
                Confirm Password
            </Text>
            <TextInput style={styles.input} secureTextEntry={true}
              onChangeText={pw => this.setState({confirmPassword: pw})}/>
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
    mediumStart: {
        fontSize: 24,
        justifyContent: 'flex-start',
        alignItems: 'center',
        top: 30
    },
    input: {
        margin: 15,
        backgroundColor: '#55D0F1',
        flex: .15,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    editButton: {
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

      saveButton: {
        flex: .15,
        backgroundColor: "#fcb401",
        width: 350,
        bottom: 0.5,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top:50,
        left: 20
      },

    large: {
        fontSize: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medium: {
        fontSize: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        backgroundColor: '#55D0F1',
        flex: 0.80,
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
        top: 30
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
        top: 30
    },
});