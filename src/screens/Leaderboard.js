import React, { useContext } from 'react';
import { Center } from '../components/Center';
import { View, Text, Button, FlatList, StyleSheet, TextInput, TouchableWithoutFeedback, SafeAreaView, ScrollView } from 'react-native';
import { AuthContext } from '../AuthProvider';
import { LogoutButton } from '../components/LogoutButton';
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildPath } from '../functions/BuildPath';



export default class Leaderboard extends React.PureComponent {
    state = {
        message: "",
        friends: [],
        leaderBoard: [],
        manage: false
    }
    async componentDidMount() {
        try {
            var objFriend = {userID: await AsyncStorage.getItem('userID')};
            var jsFriends = JSON.stringify(objFriend);
            Promise.all([
            fetch(buildPath('api/get-top-10'),
            {method:'POST', headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')}}),
            fetch(buildPath('api/showFriends'),
                {method:'POST',body:jsFriends,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')}})
            ]).then(([res1, res2]) => {
                return Promise.all([res1.json(), res2.json()])
            }).then(([res1, res2]) => {
            this.setState({
                leaderBoard: res1.userArr,
                friends: res2.friendsArr
      })
    })
        } catch (err) {
            console.log("ERRRRROO");
        }
    }

    render () {

    const {manage, friends, leaderBoard} = this.state 
    if (! manage )
        return (
            <SafeAreaView style={styles.container}>
                <Center>
                    <TouchableWithoutFeedback onPress={() => this.setState({manage: true})}>
                        <View style={styles.manageButton}>
                        <Text style={styles.medium}>
                            Manage Friends
                        </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <LogoutButton/>
                    <SafeAreaView style={styles.friendsTable}>
                        <SafeAreaView style={styles.friendsHeader}>
                            <Text style={styles.fHeader}>Friends</Text>
                        </SafeAreaView>
                        <ScrollView style={styles.scrollView}>
                            <View>    
                                {friends.map((friend, i) => 
                                <SafeAreaView style={i % 2 == 0 ? styles.lightblueHeader : styles.blueHeader}>
                                    <Text style={styles.fHeader}>{friend.username}</Text><Text>{friend.rank} pts</Text>
                                </SafeAreaView>)
                                }    
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                    <SafeAreaView style={styles.globalTable}>
                        <SafeAreaView style={styles.globalHeader}>
                            <Text style={styles.fHeader}>Global</Text>
                        </SafeAreaView>
                        <ScrollView style={styles.scrollView}>
                            <View>    
                                {leaderBoard.map((user, i) => 
                                <SafeAreaView style={i % 2 == 0 ? styles.lightblueHeader : styles.blueHeader}>
                                    <Text style={styles.fHeader}>{user.username}</Text><Text>{user.rank} pts</Text>
                                </SafeAreaView>)
                                }    
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </Center>
            </SafeAreaView>
    );

    return (
        <SafeAreaView style={styles.container}>
                <Center>
                    <TouchableWithoutFeedback onPress={() => this.setState({manage: false})}>
                        <View style={styles.saveButton}>
                        <Text style={styles.medium}>
                            Save
                        </Text>
                        </View>
                    </TouchableWithoutFeedback> 
                    <LogoutButton/>
                    <SafeAreaView style={styles.friendsTableManage}>
                        <ScrollView style={styles.scrollView}>
                            <SafeAreaView style={styles.friendsHeader}>
                                <Text style={styles.fHeader}>Your Friends</Text>
                            </SafeAreaView>
                        </ScrollView>
                    </SafeAreaView>
                    <SafeAreaView style={styles.globalTableManage}>
                        <ScrollView style={styles.scrollView}>
                            <SafeAreaView style={styles.globalHeaderManage}>
                                <TextInput style={styles.input}
                                    onChangeText={em => setEmail(em)}
                                    value={"Search Users!"}>
                                </TextInput>
                                <TouchableWithoutFeedback onPress={() => setManage(false)}>
                                    <View style={styles.searchButton}>
                                    <FontAwesome name="search" size={40} color="black" />
                                    </View>
                                </TouchableWithoutFeedback> 
                            </SafeAreaView>
                        </ScrollView>
                    </SafeAreaView>
                </Center>
            </SafeAreaView>
    )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#19C0FF',
        marginHorizontal: 20,
        flex: .1,
        width: 414
      },
      text: {
        fontSize: 42,
      },
    container: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        margin: 10,
    },
    manageButton: {
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
      saveButton: {
        flex: .08,
        backgroundColor: "#fcb401",
        width: 250,
        bottom: 0.5,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top: 25
      },
      searchButton: {
        flex: 1,
        backgroundColor: "#19c0ff",
        width: 80,
        bottom: 15,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        paddingStart: 25,
        left: 315
      },
    friendsHeader: {
        backgroundColor: '#fb2b60',
        width: 434,
        flex: .28,
        bottom: 0,
    },
    globalHeader: {
        backgroundColor: '#fcb401',
        width: 434,
        flex: .28,
        bottom: 0,
    },
    lightblueHeader: {
        backgroundColor: '#19C0FF',
        width: 414,
        flex: .2,
        bottom: 0,
    },
    blueHeader: {
        backgroundColor: '#55D0F1',
        width: 414,
        flex: .2,
        bottom: 0,
    },
    globalHeaderManage: {
        backgroundColor: '#fcb401',
        width: 414,
        flex: .05,
        bottom: 45,
    },
    fHeader: {
        fontSize: 48,
        alignSelf: 'center'
    },
    friendsTable: {
        flex: .4,
        top: 43,
        width: 454,
        bottom: 0
    },
    globalTable: {
        top: 43,
        flex: .4,
        width: 454,
        bottom: 0
    },
    friendsTableManage: {
        flex: .45,
        top: 43,
        width: 454,
        bottom: 0
    },
    globalTableManage: {
        top: 43,
        flex: .45,
        width: 454,
        bottom: 0
    },
    input: {
        flex: .8,
        margin: 15,
        height: 40,
        width: 380,
        borderColor: '#7a42f4',
        backgroundColor: '#fff', 
        paddingLeft: 7,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        top: 40
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

//export default Leaderboard;