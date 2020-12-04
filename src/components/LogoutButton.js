import { SafeAreaView, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthProvider';
import React, { useContext } from 'react';

export const LogoutButton = () =>
{
    const {logout} = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.logout}>
            <Button
                title='logout'
                onPress={() => logout()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logout: {
        alignSelf: 'flex-end',
        marginTop: 5,
        right: 5,
        top: 25,
        position: 'absolute',
    }
});