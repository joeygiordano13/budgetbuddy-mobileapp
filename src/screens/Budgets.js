import React from 'react';
import { Center } from '../components/Center';
import { SafeAreaView,Text, Button, StyleSheet,  TouchableWithoutFeedback, View, ScrollView, TextInput } from 'react-native';
import { LogoutButton } from '../components/LogoutButton';
import { FontAwesome } from '@expo/vector-icons'; 

const Budgets = () => {
    const [manage, setManage] = React.useState(false);

    if (!manage)
        return (
        <SafeAreaView style={styles.container}>
            <Center>
                <TouchableWithoutFeedback onPress={() => setManage(true)}>
                    <View style={styles.addBudgetButton}>
                    <Text style={styles.medium}>
                        <FontAwesome name="plus" size={24} color="black" /> 
                         Add new Budget
                    </Text>
                    </View>
                </TouchableWithoutFeedback>
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

    return (
        <SafeAreaView style={styles.container}>
                <Center>
                    <SafeAreaView style={styles.newBudgetHeader}>
                        <Text style={styles.nBHeader}>Add New Budget</Text>
                    </SafeAreaView>
                    <Text style={styles.medium}>Budget Name</Text>
                    <TextInput style={styles.input}
                    onChangeText={em => setEmail(em)}>
                    </TextInput>
                    <Text style={styles.medium}>Budget Goal</Text>
                    <TextInput style={styles.input}
                    onChangeText={em => setEmail(em)}>
                    </TextInput>
                    <Text style={styles.medium}>Starting Progress</Text>
                    <TextInput style={styles.input}
                    onChangeText={em => setEmail(em)}>
                    </TextInput>
                    <TouchableWithoutFeedback onPress={() => setManage(false)}>
                    <View style={styles.addBudgetButton}>
                    <Text style={styles.medium}>
                        <FontAwesome name="plus" size={24} color="black" /> 
                         Add
                    </Text>
                    </View>
                </TouchableWithoutFeedback>
                </Center>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: '#19C0FF'
    },
    newBudgetHeader: {
        backgroundColor: '#fb2b60',
        width: 414,
        flex: .13,
        bottom: 180
    },
    nBHeader: {
        fontSize: 48,
        alignSelf: 'center',
        top: 40
    },
    input: {
        width: 315,
        flex: .1,
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    addBudgetButton: {
        flex: .1,
        backgroundColor: "#fcb401",
        width: 350,
        bottom: 0.5,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top: 25
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
        fontSize: 24,
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
        paddingTop: 10,
        top: 40,
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
        paddingTop: 10,
        top: 40,
    },
});

export default Budgets;