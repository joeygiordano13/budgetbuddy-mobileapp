import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Center } from './Center';
import { Text } from 'react-native';
import { AuthContext } from './AuthProvider';
//import Icon from 'react-native-vector-icons/FontAwesome';
//import { createNavigationContainer } from 'react-navigation';

const Tabs = createBottomTabNavigator();

function Home() {
    const {logout} = useContext(AuthContext);
    return (
        <Center>
            <Text>Home</Text>
            <Button 
                title='logout'
                onPress={() => logout()}
            />
        </Center>
    );
}

function Budgets() {
    return (
        <Center>
            <Text>Budgets</Text>
        </Center>
    );
}

function Leaderboard() {
    return (
        <Center>
            <Text>Leaderboard</Text>
        </Center>
    );
}

export const AppTabs = ({}) => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name='Home' component={Home} />
            <Tabs.Screen name='Budgets' component={Budgets} />
            <Tabs.Screen name='Leaderboard' component={Leaderboard} />
        </Tabs.Navigator>
    );
};