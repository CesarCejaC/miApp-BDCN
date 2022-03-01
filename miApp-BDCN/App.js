import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UsersList from './screens/UsersList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator()
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" options={{headerShown:false}} component={LoginScreen}/>
            <Stack.Screen name="UsersList" options={{headerShown:false}} component={UsersList}/>
            <Stack.Screen name="CreateUserScreen" component={CreateUserScreen}/>
            <Stack.Screen name="UserDetailScreen" component={UserDetailScreen}/>            
        </Stack.Navigator>
    )
}

export default function App() {
    return ( 
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container: {
  
    },
}
);
