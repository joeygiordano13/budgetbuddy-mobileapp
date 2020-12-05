import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pass empty object to create context.
export const AuthContext = React.createContext({
    user: null,
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return <AuthContext.Provider value={{
        user, 
        login: ({id, accessToken}) => {
            const user = { userID : id, token : accessToken }
            setUser({user});
            AsyncStorage.setItem('user', JSON.stringify(user));
        },
        logout: () => {
            setUser(null);
            AsyncStorage.removeItem('user');
        }
    }}>{children}</AuthContext.Provider>;
}