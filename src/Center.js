import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Center = ({children}) => {
    return (
        <View style={styles.centerbox}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    centerbox: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        //padding: 20,
        //backgroundColor: "#eaeaea"
    }
});