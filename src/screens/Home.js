import React from 'react';
import { Center } from '../components/Center';
import { SafeAreaView,Text, Button, StyleSheet } from 'react-native';
import { LogoutButton } from '../components/LogoutButton';

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Center>
                <SafeAreaView style={styles.label}>
                    <Text style={styles.medium}>Dashboard</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.top}>
                    <Text style={styles.medium}>Progress Breakdown</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.middle}>
                    <Text style={styles.medium}>Progress Over Time</Text>
                </SafeAreaView>
                <LogoutButton/>
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
        margin: 25,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 10
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
        fontSize: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medium: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    top: {
        flex: 0.3,
        backgroundColor: "#19c0ff",
        width: 250,
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        margin: 10,
        alignItems: 'center', 
        paddingTop: 10
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
        justifyContent: 'center'
    },
    middle: {
        flex: 0.3,
        backgroundColor: "#19c0ff",
        width: 250,
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        margin: 10,
        alignItems: 'center',
        paddingTop: 10
    },
});

export default Home;