import React, { useContext } from 'react';
import { Center } from '../components/Center';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { AuthContext } from '../AuthProvider';

const Settings = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Center>
                <SafeAreaView style={styles.label}>
                    <Text style={styles.medium}>Change Account Info</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.label}>
                    <Text style={styles.medium}>Change Avatar</Text>
                </SafeAreaView>
            </Center>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        margin: 10,
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
    label: {
        flex: 0.05,
        backgroundColor: "#fcb401",
        width: 250,
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30
    },
});

export default Settings;