import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Center } from "./Center";
import { Button, Text } from "react-native";

const Stack = createStackNavigator();

function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  return (
    <Center>
      <Text>I am a login screen</Text>
      <Button
        title="log me in"
        onPress={() => {
          login();
        }}
      />
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </Center>
  );
}

function Register({ navigation }) {
  return (
    <Center>
      <Text>I am a register screen</Text>
      <Button
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