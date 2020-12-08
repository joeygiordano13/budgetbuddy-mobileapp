import React from 'react';
import { Center } from '../components/Center';
import { SafeAreaView,Text, Button, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { LogoutButton } from '../components/LogoutButton';
import { FontAwesome } from '@expo/vector-icons'; 

const Home = () => {
    const [manage, setManage] = React.useState(false);
    if (!manage)
        return (
        <SafeAreaView style={styles.container}>
            <Center>
                <TouchableWithoutFeedback onPress={() => setManage(true)}>
                    <View style={styles.editButton}>
                    <Text style={styles.medium}>
                        Edit Profile
                    </Text>
                    </View>
                </TouchableWithoutFeedback>
                <SafeAreaView style={styles.top}>
                    <Text style={styles.medium}>Progress Breakdown</Text>
                    <SafeAreaView style={styles.inner}>
                    </SafeAreaView>
                </SafeAreaView>
                <SafeAreaView style={styles.middle}>
                    <Text style={styles.medium}>Progress Over Time</Text>
                    <SafeAreaView style={styles.inner}>
                    </SafeAreaView>
                </SafeAreaView>
                <LogoutButton/>
            </Center>
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={() => setManage(false)}>
                    <View style={styles.editButton}>
                    <Text style={styles.medium}>
                        Save
                    </Text>
                    </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
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
    editButton: {
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
        paddingTop: 10,
        top: 30
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
        top: 30
    },
});

export default Home;