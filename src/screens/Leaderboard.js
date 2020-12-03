import React, { useContext } from 'react';
import { Center } from '../components/Center';
import { View, Text, Button, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { AuthContext } from '../AuthProvider';
import { LogoutButton } from '../components/LogoutButton';

const Leaderboard = () => {
    const [search, setSearch] = React.useState('');
    return (
        <SafeAreaView style={styles.container}>
            <Center>
                <Text style={styles.large}>Leaderboard</Text>
                <TextInput style={styles.input}
                    onChangeText={s => setSearch(s)}
                    placeholder="Search for a user..."
                    value={search}>
                </TextInput>
                <LogoutButton/>
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
       width: 150,
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

export default Leaderboard;