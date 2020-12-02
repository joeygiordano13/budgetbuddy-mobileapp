import React, { useContext } from 'react';
import { Center } from '../components/Center';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthProvider';
import { LogoutButton } from '../components/LogoutButton';

const Home = () => {
    //const {logout} = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Center>
                <Text style={styles.large}>Dashboard</Text>
                <LogoutButton/>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 23
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

export default Home;