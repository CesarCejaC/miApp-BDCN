import React, {useState,useEffect, useRef} from 'react';
import {
    ScrollView,
    Button,
    View,
    Alert,
    ActivityIndicator,
    StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from '../database/firebase';

const UserDetailScreen = (props) => {
    const initialState = {
        id:"",
        name:"",
        email:"",
        phone:"",
    };
    const [user,setUser] = useState(initialState);
    const [loading, setLoading] = useState(true);
    
    const handleChangeText = (value,props)=> {
        setUser({...user, [props]:value});
    };

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("users").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({...user, id: doc.id});
        setLoading(false);
    };

    const deleteUser = async () => {
        setLoading(true);
        const dbRef = firebase.db.collection("users")
        .doc(props.route.params.userId);
        await dbRef.delete();
        setLoading(false);
        props.navigation.navigate("UsersList");
    };

    const openConfirmationAlert = () => {
        Alert.alert(
            "Removing the user",
            "Are you sure?",
            [
                {text: "YES", onPress: () => deleteUser()},
                {text: "NO", onPress: () => console.log("canceled")},
            ],
            {
                cancelable: true
            }
        );
    };

    const updateUser = async () => {
        const userRef = firebase.db.collection("users").doc(user.id);
        await userRef.set({
            name:user.name,
            email:user.email,
            phone:user.phone,
        });
        setUser(initialState);
        props.navigation.navigate("UsersList");
    };

    useEffect(() => {
        getUserById(props.route.params.userId);
    }, []);

    if(loading){
        return(
            <View>
                <ActivityIndicator/>
            </View>
        );
    };

    return (
        <ScrollView>
            <View>
                <TextInput
                placeholder='Name'
                autoCompleteType='username'
                value={user.name}
                onChangeText={(value) => handleChangeText(value, "name")}
                />
            </View>
            <View>
                <TextInput
                placeholder='Email'
                autoCompleteType='email'
                value={user.email}
                onChangeText={(value) => handleChangeText(value, "email")}/>
            </View>
            <View>
                <TextInput
                placeholder='Phone'
                autoCompleteType='phone'
                value={user.phone}
                onChangeText={(value) => handleChangeText(value, "phone")}/>
            </View>
            <View>
                <Button
                title='Delete'
                onPress={() => deleteUser()}
                color="#ff0000"
                />
            </View>
            <View>
                <Button
                title='Update'
                onPress={() => updateUser()}
                color="#00ffff"
                />
            </View>
        </ScrollView>
    )
}

export default UserDetailScreen