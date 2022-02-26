import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView } from 'react-native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import firebase from "../database/firebase";
import { StyleSheet } from 'react-native-web';

const CreateUserScreen = (props) => {

    const initialState = {
        name:"",
        lname:"",
        email:"",
        phone:"",
        addres:"",
        age:"",
        image:"",
        gender:"",
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
                        lname: state.name,
                        email: state.email,
                        phone: state.phone,
                        address: state.addres,
                        age: state.age,
                        image: state.image,
                        gender: state.gender,
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
                    placeholder="User Firstname"
                    onChangeText={(value) => handleChangeText(value, "name")}
                    value={state.name}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Lastname"
                    onChangeText={(value) => handleChangeText(value, "lname")}
                    value={state.lname}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Email"
                    onChangeText={(value) => handleChangeText(value, "email")}
                    value={state.email}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Phone"
                    onChangeText={(value) => handleChangeText(value, "phone")}
                    value={state.phone}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Address"
                    onChangeText={(value) => handleChangeText(value, "address")}
                    value={state.address}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Age"
                    onChangeText={(value) => handleChangeText(value, "age")}
                    value={state.age}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Image"
                    onChangeText={(value) => handleChangeText(value, "image")}
                    value={state.image}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Gender"
                    onChangeText={(value) => handleChangeText(value, "gender")}
                    value={state.gender}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
}
)

export default CreateUserScreen