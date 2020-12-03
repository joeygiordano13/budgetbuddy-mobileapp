import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { View } from 'react-native';

export default class UserSearchBar extends React.Component {
    state = {
        search: '',
    };
    updateSearch = (search) => { 
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
    
        return (
            <View>
                <SearchBar
                    placeholder="Search for Budget Buddies..."
                    onChangeText={this.updateSearch}
                    value={search}
                />
            </View>
        );
    }
}
