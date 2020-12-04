import React, { useContext } from 'react';
import { Center } from '../components/Center';
import { Text, View, Button, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { AuthContext } from '../AuthProvider';
//import { TextInput } from 'react-native-gesture-handler';
import AddBudget from '../components/AddBudget';
import { LogoutButton } from '../components/LogoutButton';

const Budgets = () => {
    const [budgetName, setBudgetName] = React.useState('');
    const [budgetGoal, setBudgetGoal] = React.useState('');
    const [startingAmount, setAmount] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Center>
                <SafeAreaView style={styles.label}>
                    <Text style={styles.medium}>Add Budgets</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.middle}>
                    <TextInput style={styles.input}
                        onChangeText={name => setBudgetName(name)}
                        placeholder="budget name"
                        value={budgetName}>
                    </TextInput>
                    <TextInput style={styles.input}
                        onChangeText={goal => setBudgetGoal(goal)}
                        placeholder="budget goal"
                        value={budgetGoal}>
                    </TextInput>
                    <TextInput style={styles.input}
                        onChangeText={amount => setAmount(amount)}
                        placeholder="starting amount"
                        value={startingAmount}>
                    </TextInput>
                    <Button
                        color="#FB2B60"
                        title="Add"
                        onClick={AddBudget}>
                    </Button>
                </SafeAreaView>
                <LogoutButton/>
            </Center>
        </SafeAreaView>
    );
};

export default Budgets;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        margin: 10,
    },
    input: {
        margin: 5,
        height: 40,
        width: 150,
        backgroundColor: '#fff',
        borderColor: '#7a42f4',
        paddingLeft: 7,
        borderWidth: 1
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
    submitButton: {
        backgroundColor: '#7a42f4',
    
    },
    large: {
        fontSize: 28
    },
    medium: {
        fontSize: 20
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
        justifyContent: 'center',
        paddingTop: 10
    },
 });