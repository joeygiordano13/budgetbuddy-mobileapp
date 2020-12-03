import React, { useContext } from 'react';
import { Center } from '../components/Center';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { AuthContext } from '../AuthProvider';

const Settings = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Center>
                <Text style={styles.medium}>Change Account Information</Text>
                <Text style={styles.medium}>Change Avatar</Text>
            </Center>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
       flex: 1
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
    }
});

export default Settings;