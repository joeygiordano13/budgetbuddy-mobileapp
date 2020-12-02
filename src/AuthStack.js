import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Center } from "./components/Center";
import { View, Button, Text, Image, ImageBackground, StyleSheet, TextInput } from "react-native";


const Stack = createStackNavigator();

function Login({ navigation }) {
  //const { user, pass } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  //const image = {require('../assets/bubblebackground.png')};

  return (
    <View style={styles.container}>
      <ImageBackground
          style={styles.backgroundImage} 
          source={require('../assets/bubblebackground.png')}
        />
      <Center>
        <Text style={styles.large}>Login Form</Text>
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
        <Button style={styles.submitButton}
          title="Submit"
          onPress={() => {
            login();
          }}
        />
        <Button style={styles.medium}
          title="go to register"
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
        <Text style={styles.medium}>Forgot Password? Click here.</Text>
      </Center>
    </View>
  );
}

function Register({ navigation }) {
  return (
    <Center>
      <Text style={styles.large}>Register Form</Text>
      <Button style={styles.submitButton}
        title="go to login"
        onPress={() => {
          navigation.navigate("Login");
          // navigation.goBack()
        }}
      />
    </Center>
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
     paddingTop: 150
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: '#7a42f4',
     borderWidth: 1
  },
  submitButton: {
     backgroundColor: '#7a42f4',
     padding: 10,
     margin: 15,
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
  }
})