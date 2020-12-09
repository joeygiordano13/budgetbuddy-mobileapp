import React, { useContext } from 'react';
import { Center } from '../components/Center';
import { View, Text, TouchableWithoutFeedback, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { AuthContext } from '../AuthProvider';

const Settings = () => {
    return (
        <SafeAreaView style={styles.container}>
             <TouchableWithoutFeedback onPress={() => setManage(false)}>
                    <View style={styles.saveButton}>
                    <Text style={styles.medium}>
                        save
                    </Text>
                    </View>
            </TouchableWithoutFeedback>
            <Text style={styles.mediumStartLogin}>
                Email
            </Text>
            <TextInput style={styles.input}
              onChangeText={em => setEmail(em)}>
            </TextInput>
            <Text style={styles.mediumStartLogin}>
                Password
            </Text>
            <TextInput style={styles.input} secureTextEntry={true}
              onChangeText={pw => setPassword(pw)}/>
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