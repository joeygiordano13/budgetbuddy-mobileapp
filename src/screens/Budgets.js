import React, { useContext } from 'react';
import { Center } from '../components/Center';
import { Text, View, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthProvider';
import { TextInput } from 'react-native-gesture-handler';
import AddBudget from '../components/AddBudget';
import { LogoutButton } from '../components/LogoutButton';

const Budgets = () => {
    const [budgetName, setBudgetName] = React.useState('');
    const [budgetGoal, setBudgetGoal] = React.useState('');
    const [startingAmount, setAmount] = React.useState('');

    return (
        <View style={styles.container}>
            <Center>
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
                <Button style={styles.submitButton}
                    title="Add Budget"
                    onClick={AddBudget}>
                </Button>
                <LogoutButton/>
            </Center>
        </View>
    );
};

export default Budgets;

const styles = StyleSheet.create({
    container: {
       paddingTop: 23
    },
    input: {
       margin: 5,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 5,
       margin: 5,
       height: 40,
    }
 });