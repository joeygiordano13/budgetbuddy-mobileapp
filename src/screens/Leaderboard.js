import React, { useContext } from 'react';
import { Center } from '../components/Center';
import { View, Text, Button, FlatList, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { AuthContext } from '../AuthProvider';
import { LogoutButton } from '../components/LogoutButton';
import FriendsTable from '../components/FriendsTable';
import { Friends } from '../components/Friends';

export default function Leaderboard() {
    const [search, setSearch] = React.useState('');
    return (
        <SafeAreaView style={styles.container}>
            <Center>
                <SafeAreaView style={styles.label}>
                    <Text style={styles.medium}>Leaderboard</Text>
                    <FriendsTable/>
                </SafeAreaView>
                <SafeAreaView style={styles.label}>
                    <Text style={styles.medium}>Find Buddies</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.middle}>
                    <TextInput style={styles.input}
                        onChangeText={s => setSearch(s)}
                        placeholder="Search for a user..."
                        value={search}>
                    </TextInput>
                </SafeAreaView>
                <LogoutButton/>
            </Center>
        </SafeAreaView>
    );
}

// function Friends() {
//     const [global, updateGlobal] = React.useState([]);
//     const [friends, updateFriends] = React.useState([]);

//     // var objFriend = AsyncStorage.getItem('user').param('userID');
//     // console.log(objFriend);
//     // Alert.alert('ObjFriend: ' + objFriend);
//     // //var objFriend = {userID:localStorage.getItem("userID")};
//     // var jsFriends = JSON.stringify(objFriend);
//     // Promise.all([
//     //   fetch(buildPath('api/get-top-10'),
//     //   {method:'POST', headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AsyncStorage.getItem("token")}}),
//     //   fetch(buildPath('api/showFriends'),
//     //     {method:'POST',body:jsFriends,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AsyncStorage.getItem("token")}})
//     // ]).then(([res1, res2]) => {
//     //      return Promise.all([res1.json(), res2.json()])
//     //   }).then(([res1, res2]) => {
//     //       updateGlobal(res1.userArr);
//     //       updateFriends(res2.friendsArr);
//     // })

//     updateFriends([{username:"joey"}, {username:"jake"}, {username:"john"}]);
//     return (
//         <SafeAreaView style={{flex:1}}>
//             <SafeAreaView>
//                 <FlatList
//                     style={{flex: 1}}
//                     enableEmptySections={true}
//                     data={friends}
//                     keyExtractor={(item) => {
//                         return item.username;
//                     }}
//                     renderItem={({item}) => {
//                         return (
//                             <TouchableOpacity>
//                                 <Text>{item.username}</Text>
//                             </TouchableOpacity>
//                         )
//                     }}/>
//             </SafeAreaView>
//         </SafeAreaView>
//      );
// }

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
        width: 150,
        borderColor: '#7a42f4',
        borderWidth: 1, 
        backgroundColor: '#fff', 
        paddingLeft: 7
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