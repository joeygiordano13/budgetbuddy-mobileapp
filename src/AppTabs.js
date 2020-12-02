import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Center } from './components/Center';
import { Text, Button } from 'react-native';
import { AuthContext } from './AuthProvider';
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "./screens/Home";
import Budgets from "./screens/Budgets";
import Leaderboard from "./screens/Leaderboard";
import Settings from "./screens/Settings";

const Tabs = createBottomTabNavigator();

export const AppTabs = ({}) => {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, tintColor, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = "home";
                        return <Icon name="home" size={25} color={tintColor} />
                    }
                    else if (route.name === "Budgets") {
                        iconName = "budgets";
                        return <Icon name="line-chart" size={25} color={tintColor} />
                    }
                    else if (route.name === "Leaderboard") {
                        iconName = "leaderboard";
                        return <Icon name="users" size={25} color={tintColor} />
                    }
                    else if (route.name === "Settings") {
                        iconName = "settings";
                        return <Icon name="cogs" size={25} color={tintColor} />
                    }
                }
            })}
            tabBarOptions={{
                activeTintColor: "blue",
                inactiveTintColor: "gray"
            }}
        >
            <Tabs.Screen name='Home' component={Home} />
            <Tabs.Screen name='Budgets' component={Budgets} />
            <Tabs.Screen name='Leaderboard' component={Leaderboard} />
            <Tabs.Screen name='Settings' component={Settings} />
        </Tabs.Navigator>
    );
};