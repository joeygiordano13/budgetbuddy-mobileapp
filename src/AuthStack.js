import React, { useState, useContext } from "react";
import { TextInput, Button, Alert, Text, SafeAreaView, ImageBackground, StyleSheet, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { buildPath } from './functions/BuildPath';
import { Center } from './components/Center';
import { AuthContext } from './AuthProvider';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export const AuthStack = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{
          headerTitle: "Sign In"
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerTitle: "Sign Up"
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

function Login({navigation}) {
  const {login} = useContext(AuthContext);

  const [loginEmail, setEmail] = React.useState('');
  const [loginPassword, setPassword] = React.useState('');

  var message = '';

  const [ showAlert, setAlert ] = useState(false);

  const doLogin = async event => {
      event.preventDefault();

      var obj = {email:loginEmail, password:loginPassword};
      var js = JSON.stringify(obj);
      try
      {
          // API call
          const response = await fetch(buildPath('api/login'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          // Parse JSON response
          var res = JSON.parse(await response.text());

          if( res.error != '')
          {
            //Alert.alert("incorrect login email: " + loginEmail + '\n');
            Alert.alert('incorrect login, userID: ' + res.id + '\n');
            console.log('incorrect login email: ' + loginEmail + '\n');
            message = 'Email/Password combination incorrect';
            setAlert(true);
          }
          else
          {
            //console.log("success login email: " + loginEmail + '\n');
            Alert.alert('success login, token: ' + res.accessToken + '\n');
            AsyncStorage.setItem('userID', res.id);
            AsyncStorage.setItem('token', res.accessToken);
            login();
          }
      }
      catch(e)
      {
          Alert.alert("failure login email: " + e + "\n");
          return;
      }
  }

  return (
      <SafeAreaView
      style={styles.backgroundImage} 
      source={require('../assets/bubblebackground.png')}>
        <Center>
          <SafeAreaView style={styles.loginBox}>
            <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate("Register");
                  }}>
              <View style={styles.submitButtonn}>
                <Text style={styles.mediumLeft}>
                  Register
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate("Login");
                  }}>
              <View style={styles.submitButton}><Text style={styles.medium}>Login</Text></View>
            </TouchableWithoutFeedback>
            <TextInput style={styles.input}
              onChangeText={em => setEmail(em)}
              placeholder="Email"
              value={loginEmail}>
            </TextInput>
            <TextInput style={styles.input}
              onChangeText={pw => setPassword(pw)}
              placeholder="Password"
              value={loginPassword}/>
            <Button style={styles.submitButton}
            color="#FB2B60"
            title="Login"
            onPress={doLogin}/>
            <Text style={""}>Forgot Password? Click here.</Text>
          </SafeAreaView>
        </Center>
      </SafeAreaView>
  );
};

function Register({navigation}) {
  // Register usestates
  const [registerUsername, setUsername] = React.useState('');
  const [registerEmail, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  var budgetAndFriends = [];
  
  const [ message, setMessage ] = useState('');
  
  const doRegistration = async event => {
    event.preventDefault();
    if (registerEmail.length === 0 || registerUsername.length === 0
        || password.length === 0 || passwordConfirm.length === 0) {
          setMessage("Please fill in all fields");
          Alert.alert(message);
          return;
        }
    if (password != passwordConfirm) {
      setMessage("Passwords do not match");
      Alert.alert(message);
      return;
    }

    var obj = {email: registerEmail, username: registerUsername, verification: false,
              friends: budgetAndFriends, password: password, rankMetric: -1};
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/register'),
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.error != '') {
        setMessage(res.error);
        console.log('error');
        Alert.alert(message);
      } else {
        setMessage("An email has been sent to " + registerEmail + ". Please verify your email");
        console.log(message);
        Alert.alert(message);
      }
    } catch (e) {
      console.log('bad api call');
      Alert.alert(e);
      return;
    }
  }

  return (
    <SafeAreaView
    style={styles.backgroundImage} >
      <Center>
      <SafeAreaView style={styles.loginBox}>
          <TouchableWithoutFeedback onPress={() => {
                  navigation.navigate("Login");
                }}>
            <View style={styles.registerButtonn}><Text style={styles.medium}>Login</Text></View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
                  navigation.navigate("Register");
                }}>
            <View style={styles.registerButton}>
              <Text style={styles.medium}>
                Register
              </Text>
            </View>
          </TouchableWithoutFeedback>
          </SafeAreaView>
        <SafeAreaView style={styles.loginBox2}>
            <Text style={styles.mediumStart}>
                Username
            </Text>
            <TextInput style={styles.input2}
              onChangeText={u => setUsername(u)}
              value={registerUsername}></TextInput>
            <Text style={styles.mediumStart}>
                Email
            </Text>
            <TextInput style={styles.input2}
              onChangeText={em => setEmail(em)}
              value={registerEmail}></TextInput>
            <Text style={styles.mediumStart}>
                Password
            </Text>
            <TextInput style={styles.input2}
              onChangeText={pw => setPassword(pw)}
              value={password}></TextInput>
            <Text style={styles.mediumStart}>
                Confirm Password
            </Text>
            <TextInput style={styles.input2}
              onChangeText={pw => setPasswordConfirm(pw)}
              value={passwordConfirm}></TextInput>
            <Button style={styles.submitButton2}
              color="#FB2B60"
              title="Register"
              onPress={doRegistration}/>
            <Text>{message}</Text>
        </SafeAreaView>
      </Center>
    </SafeAreaView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    margin: 10,
  },
  input: {
    flex: 5,
    margin: 5,
    height: 20,
    width: 300,
    right: 40,
    backgroundColor: '#55D0F1',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  input2: {
    flex: 0.5,
    margin: 15,
    height: 20,
    width: 300,
    right: 40,
    backgroundColor: '#55D0F1',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  submitButton: {
    flex: 5,
    backgroundColor: "#fb2b60",
    width: 150,
    height: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontSize: 50,
    right: 90,
    paddingStart: 50,
    bottom: 195,
    right: 30
  },
  submitButtonn: {
    flex: 5,
    backgroundColor: "#55D0F1",
    width: 325,
    right: 30,
    bottom: 131,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    flex: 2,
    backgroundColor: "#fb2b60",
    width: 150,
    bottom: 71,
    left: 134,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonn: {
    flex: 2,
    backgroundColor: "#55D0F1",
    width: 305,
    height: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    fontSize: 50,
    right: 20,
    paddingStart: 50, 
    marginTop: 30
  },
  submitButtonText: {
    color: 'white'
  },
  large: {
    fontSize: 28
  },
  medium: {
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center'
},
mediumLeft: {
  fontSize: 24,
  justifyContent: 'flex-end',
  alignItems: 'center',
  left: 60
},
mediumStart: {
  fontSize: 24,
  justifyContent: 'flex-start',
  alignItems: 'center'
},
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#19C0FF'
  }, 
  loginBox: {
    flex: .5,
    backgroundColor: "#19c0ff",
    width: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    margin: 10,
    paddingTop: 20
},
loginBox2: {
  flex: 1.4,
  backgroundColor: "#19c0ff",
  width: 250,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  bottom: 50
},
});