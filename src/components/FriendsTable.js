import React, { Component } from 'react';
import { buildPath } from '../functions/BuildPath';
//import { DataTable } from 'react-native-paper';
import { SafeAreaView, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
//import { FlatList } from 'react-native-gesture-handler';

export default class FriendsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      global: []
    };
  }

  friends = [{username: "joey"}, {username: "walt"}];
  //componentDidMount() {
    //var objFriend = {userID:AsyncStorage.getItem('user').param('userID')};
    // console.log(objFriend);
    // Alert.alert('ObjFriend: ' + objFriend);
    // var objFriend = {userID:localStorage.getItem("userID")};
    // var jsFriends = JSON.stringify(objFriend);
    // Promise.all([
    //   fetch(buildPath('api/get-top-10'),
    //   {method:'POST', headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AsyncStorage.getItem("token")}}),
    //   fetch(buildPath('api/showFriends'),
    //     {method:'POST',body:jsFriends,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AsyncStorage.getItem("token")}})
    // ]).then(([res1, res2]) => {
    //      return Promise.all([res1.json(), res2.json()])
    //   }).then(([res1, res2]) => {
    //   this.setState({
    //     global: res1.userArr,
    //     friends: res2.friendsArr
    //   })
    // })
  //}

  render() {
    const { global, friends } = this.state;

    return (
        
       <Text>Hello, world</Text>
    );
  }
}