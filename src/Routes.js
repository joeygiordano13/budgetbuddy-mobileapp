import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Center } from './Center';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthProvider';
import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';

export const Routes = () => {
    const { user, login } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // check if a user is currently logged in
        AsyncStorage.getItem('user')
            .then(userString => {
                if (userString) {
                    // decode
                    login();
                } 
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    //console.log('loading: ', loading);
    if(loading) {
        return (
            <Center>
                <ActivityIndicator size="large" />
            </Center>
        );
    }

    return(
        <NavigationContainer>
            {user ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    centertext:
    {
        color: "#20232a",
        textAlign: "center",
    }
});