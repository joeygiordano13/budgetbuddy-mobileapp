import React from 'react';
import { buildPath } from '../functions/BuildPath';
import { SafeAreaView, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
//import { FlatList } from 'react-native-gesture-handler';

function Friends() {
    const [global, updateGlobal] = React.useState([]);
    const [friends, updateFriends] = React.useState([]);

    // var objFriend = AsyncStorage.getItem('user').param('userID');
    // console.log(objFriend);
    // Alert.alert('ObjFriend: ' + objFriend);
    // //var objFriend = {userID:localStorage.getItem("userID")};
    // var jsFriends = JSON.stringify(objFriend);
    // Promise.all([
    //   fetch(buildPath('api/get-top-10'),
    //   {method:'POST', headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AsyncStorage.getItem("token")}}),
    //   fetch(buildPath('api/showFriends'),
    //     {method:'POST',body:jsFriends,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AsyncStorage.getItem("token")}})
    // ]).then(([res1, res2]) => {
    //      return Promise.all([res1.json(), res2.json()])
    //   }).then(([res1, res2]) => {
    //       updateGlobal(res1.userArr);
    //       updateFriends(res2.friendsArr);
    // })

    updateFriends([{username:"joey"}, {username:"jake"}, {username:"john"}]);
    return (
        <SafeAreaView style={{flex:1}}>
            <SafeAreaView>
                <FlatList
                    style={{flex: 1}}
                    enableEmptySections={true}
                    data={friends}
                    keyExtractor={(item) => {
                        return item.username;
                    }}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity>
                                <Text>{item.username}</Text>
                            </TouchableOpacity>
                        )
                    }}/>
            </SafeAreaView>
        </SafeAreaView>
     );
}