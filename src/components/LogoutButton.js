import { View, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthProvider';
import React, { useContext } from 'react';

export const LogoutButton = () =>
{
    const {logout} = useContext(AuthContext);
    return (
        <View style={styles.logout}>
            <Button 
                title='logout'
                onPress={() => logout()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    logout: {
        alignSelf: 'flex-end',
        marginTop: -5,
        position: 'absolute',
    }
});