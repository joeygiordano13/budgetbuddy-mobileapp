import React, { useState, useContext } from "react";
import { TextInput, Button, Alert, Text, SafeAreaView, ImageBackground, StyleSheet, Keyboard } from 'react-native';
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
      <ImageBackground 
      style={styles.backgroundImage} 
      source={require('../assets/bubblebackground.png')}>
        <Center>
          <SafeAreaView style={styles.loginBox}>
            <SafeAreaView style={{left: 45}}>
              <Button style={styles.submitButton}
                title="Register"
                color="#FB2B60"
                onPress={() => {
                  navigation.navigate("Register");
                }}/>
            </SafeAreaView>
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
            <Text style={styles.medium}>Forgot Password? Click here.</Text>
          </SafeAreaView>
        </Center>
      </ImageBackground>
  );
};

function Register() {
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
    <ImageBackground 
    style={styles.backgroundImage} 
    source={require('../assets/bubblebackground.png')}>
      <Center>
        <SafeAreaView style={styles.loginBox}>
            <TextInput style={styles.input}
              onChangeText={u => setUsername(u)}
              placeholder="Username"
              value={registerUsername}></TextInput>
            <TextInput style={styles.input}
              onChangeText={em => setEmail(em)}
              placeholder="Email"
              value={registerEmail}></TextInput>
            <TextInput style={styles.input}
              onChangeText={pw => setPassword(pw)}
              placeholder="Password"
              value={password}></TextInput>
            <TextInput style={styles.input}
              onChangeText={pw => setPasswordConfirm(pw)}
              placeholder="Confirm Password"
              value={passwordConfirm}></TextInput>
            <Button style={styles.submitButton}
              color="#FB2B60"
              title="Register"
              onPress={doRegistration}/>
            <Text>{message}</Text>
        </SafeAreaView>
      </Center>
    </ImageBackground>  
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
    margin: 1,
    height: 40,
    width: 150,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 25,
    height: 20,
  },
  submitButtonText: {
    color: 'white'
  },
  large: {
    fontSize: 28
  },
  medium: {
    fontSize: 15
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }, 
  loginBox: {
    flex: 0.3,
    backgroundColor: "#19c0ff",
    width: 250,
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
},
});