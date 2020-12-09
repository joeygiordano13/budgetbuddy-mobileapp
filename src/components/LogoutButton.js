import { SafeAreaView, Button, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { AuthContext } from '../AuthProvider';
import React, { useContext } from 'react';

export const LogoutButton = () =>
{
    const {logout} = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.logout}>
            <TouchableWithoutFeedback onPress={logout}>
                    <Text style={styles.medium}>
                        logout
                    </Text>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logout: {
        alignSelf: 'flex-end',
        marginTop: 5,
        right: 5,
        top: 15,
        position: 'absolute',
        backgroundColor: 'red',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        flex: .3,
        width: 100
    },
    medium: {
        fontSize: 36,
        paddingStart: 10
    }
});