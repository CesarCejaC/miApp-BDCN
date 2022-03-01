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
        password:"",
        phone:"",
        address:"",
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
                        lname: state.lname,
                        email: state.email,
                        password: state.password,
                        phone: state.phone,
                        address: state.address,
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
        <ScrollView
        style={styles.container}
        >
            <View>
                <TextInput
                    placeholder="User Firstname"
                    onChangeText={(value) => handleChangeText(value, "name")}
                    value={state.name}
                    style={styles.inputs}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Lastname"
                    onChangeText={(value) => handleChangeText(value, "lname")}
                    value={state.lname}
                    style={styles.inputs}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Email"
                    onChangeText={(value) => handleChangeText(value, "email")}
                    value={state.email}
                    style={styles.inputs}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Password"
                    onChangeText={(value) => handleChangeText(value, "password")}
                    value={state.password}
                    secureTextEntry
                    style={styles.inputs}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Phone"
                    onChangeText={(value) => handleChangeText(value, "phone")}
                    value={state.phone}
                    style={styles.inputs}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Address"
                    onChangeText={(value) => handleChangeText(value, "address")}
                    value={state.address}
                    style={styles.inputs}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Age"
                    onChangeText={(value) => handleChangeText(value, "age")}
                    value={state.age}
                    style={styles.inputs}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="User Image"
                    onChangeText={(value) => handleChangeText(value, "image")}
                    value={state.image}
                    style={styles.inputs}
                />
            </View>
            {/* <View>
                <TextInput 
                    placeholder="User Gender"
                    onChangeText={(value) => handleChangeText(value, {gender})}
                    value={state.gender}
                    style={styles.inputs}
                />
            </View> */}

            <View
            style={styles.inputs}
            >
                <div>
                    <input type="radio" name="gender" id="rad1" value="Male"
                    
                    />Male

                        {/* <label for="rad1">Male</label> */}
                    <input type="radio" name="gender" id="rad2" value="Female"
                    />Female
                        {/* <label for="rad2">Female</label> */}
                </div>
            </View>
            
            <View>
                <Button
                    title="Save User"
                    onPress={() => saveNewUser()}
                    color='#25B30C'
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5073E6',
    }, 
    inputs:{
        backgroundColor:'#fff',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 40,
        marginLeft: 50,
        padding: 15,
        borderRadius: 10,
        borderColor: '#0782F9',
        borderWidth: 2,
        color: '#000000',
        fontWeight: '700',
        fontSize: 16,
    },

}
)

export default CreateUserScreen