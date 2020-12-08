import React from 'react';
import { Center } from '../components/Center';
import { SafeAreaView,Text, Button, StyleSheet } from 'react-native';
import { LogoutButton } from '../components/LogoutButton';
import { FontAwesome } from '@expo/vector-icons'; 

const Budgets = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Center>
                <SafeAreaView style={styles.label}>
                    <Text style={styles.medium}>
                        <FontAwesome name="plus" size={48} color="black" /> 
                         Add new Budget
                    </Text>
                </SafeAreaView>
                <SafeAreaView style={styles.top}>
                    <Text style={styles.medium}>Budget Name</Text>
                    <SafeAreaView style={styles.inner}>
                    </SafeAreaView>
                </SafeAreaView>
                <SafeAreaView style={styles.middle}>
                    <Text style={styles.medium}>Budget Name</Text>
                    <SafeAreaView style={styles.inner}>
                    </SafeAreaView>
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
        fontSize: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        backgroundColor: '#55D0F1',
        flex: 0.80,
        width: 350, borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    top: {
        flex: 0.4,
        backgroundColor: "#19c0ff",
        width: 350,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        margin: 10,
        alignItems: 'center', 
        paddingTop: 10
    },
    label: {
        flex: 0.15,
        backgroundColor: "#fcb401",
        width: 350,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    middle: {
        flex: 0.4,
        backgroundColor: "#19c0ff",
        width: 350,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        margin: 10,
        alignItems: 'center',
        paddingTop: 10
    },
});

export default Budgets;