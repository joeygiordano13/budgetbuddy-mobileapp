import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Center } from "./components/Center";
import { Button, Text, SafeAreaView, ImageBackground, StyleSheet, TextInput } from "react-native";


const Stack = createStackNavigator();

function Login({ navigation }) {
  //const { user, pass } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  //const [loading, setLoading] = useState(false);
  //const [errortext, setErrortext] = useState('');

  <ImageBackground
          style={styles.backgroundImage} 
          source={require('../assets/bubblebackground.png')}
        />
  return (
    <ImageBackground 
    style={styles.backgroundImage} 
    source={require('../assets/bubblebackground.png')}>
      <SafeAreaView style={styles.loginBox}>
        <SafeAreaView style={{left: 45}}>
          <Button style={styles.submitButton}
            title="Register"
            color="#FB2B60"
            onPress={() => {
              navigation.navigate("Register");
            }}/>
        </SafeAreaView>
        <Center>
          <TextInput style={styles.input}
            onChangeText={em => setEmail(em)}
            placeholder="Email"
            value={email}>
          </TextInput>
          <TextInput style={styles.input}
            onChangeText={pw => setPass(pw)}
            placeholder="Password"
            value={pass}>
          </TextInput>
        </Center>
      </SafeAreaView>
      <SafeAreaView>
        <Button style={styles.submitButton}
          color="#FB2B60"
          title="Login"
          onPress={() => {
            login();
          }}/>
        <Text style={styles.medium}>Forgot Password? Click here.</Text>
      </SafeAreaView>
    </ImageBackground>
  );
}

function Register({ navigation }) {
  // Register usestates
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <ImageBackground 
    style={styles.backgroundImage} 
    source={require('../assets/bubblebackground.png')}>
      <SafeAreaView style={styles.container}>
        <Center>
          <Text style={styles.large}>Register Form</Text>
          <TextInput style={styles.input}
            onChangeText={u => setUsername(u)}
            placeholder="Username"
            value={username}></TextInput>
          <TextInput style={styles.input}
            onChangeText={em => setEmail(em)}
            placeholder="Email"
            value={email}></TextInput>
          <TextInput style={styles.input}
            onChangeText={pw => setPassword(pw)}
            placeholder="Password"
            value={password}></TextInput>
          <TextInput style={styles.input}
            onChangeText={pw => setPassword(pw)}
            placeholder="Confirm Password"
            value={password}></TextInput>
          <Button style={styles.submitButton}
            title="go to login"
            onPress={() => {
              navigation.navigate("Login");
            // navigation.goBack()
          }}/>
        </Center>
      </SafeAreaView>
    </ImageBackground>
  );
}

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
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  },
  large: {
    fontSize: 28
  },
  medium: {
    fontSize: 20
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
    alignItems: 'center',
    paddingTop: 10
},
})