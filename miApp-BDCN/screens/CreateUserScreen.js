import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import firebase from "../database/firebase";

const CreateUserScreen = (props) => {

    const initialState = {
        name:"",
        email:"",
        phone:"",
    };
    
    const [state,setState] = useState(initialState);

    const handleChangeText = (value,name)=> {
        setState({...state, [name]:value});
    };

    const saveNewUser = async () => {
        if(state.name ===""){
            alert("please provide a name");
        } else {
            try {
                await firebase.db.collection("users").add(
                    {
                        name: state.name,
                        email: state.email,
                        phone: state.phone,
                    });
                    props.navigation.navigate("UsersList")
            } catch (error) {
                console, log(error);
            }
        }
    };

    return (
        <ScrollView>
            <View>
                <TextInput
                    placeholder="Name User"
                    onChangeText={(value) => handleChangeText(value, "name")}
                    value={state.name}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="Email User"
                    onChangeText={(value) => handleChangeText(value, "email")}
                    value={state.email}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="Phone User"
                    onChangeText={(value) => handleChangeText(value, "phone")}
                    value={state.phone}
                />
            </View>
            <View>
                <Button
                    title="Save User"
                    onPress={() => saveNewUser()}
                />
            </View>
        </ScrollView>
    )
}

export default CreateUserScreen