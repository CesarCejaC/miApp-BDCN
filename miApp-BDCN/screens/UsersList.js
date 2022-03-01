import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView, StyleSheet } from 'react-native';
import { View, Text } from 'react-native-web';

import { auth } from "../database/firebaseLogin"
import { useNavigation } from '@react-navigation/core';


import firebase from '../database/firebase';

const UsersList = (props) => {

    const [users, setUsers] = useState([]);
    const navigation = useNavigation()

    useEffect(() => {
        firebase.db.collection("users").onSnapshot((QuerySnapshot) => {
            const users = [];
            QuerySnapshot.docs.forEach((doc) => {
                const { name, lname, email, password, phone, address, age, image, gender } = doc.data();
                users.push({
                    id: doc.id,
                    name,
                    lname,
                    email,
                    password,
                    phone,
                    address,
                    age,
                    image,
                    gender,

                });
            });
            setUsers(users);
        });
    }, []);

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.replace("LoginScreen")
        })
            .catch(error => alert(error.message))
    }
    return (
        <View>
            <View style={styles.barra}>
                <View>
                    <Text style={styles.titulo}>
                        Usuarios
                    </Text>
                </View>
                <View >
                    <Button
                        color="#ff0000"
                        onPress={handleSignOut}
                        title="Sign Out"
                    />
                </View>
            </View>

            <ScrollView
                style={styles.container}
            >
                <Button
                    title='Create user'
                    onPress={() => props.navigation.navigate("CreateUserScreen")}
                />
                {users.map(user => {
                    return (
                        <ListItem
                            key={user.id}
                            bottomDivider
                            onPress={() => props.navigation.navigate("UserDetailScreen", {
                                userId: user.id,
                            })}
                        >
                            <ListItem.Chevron

                            />
                            <Avatar
                                source={{ uri: "https://cosasdemascotas.net/wp-content/uploads/2020/06/ijgk7otlk58-scaled.jpg" }}
                                rounded
                            />
                            <ListItem.Content
                            >
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    );
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5073E6',
    },
    barra: {
        color:"#5073E6",
        height: 65,
        borderColor: "#fff",
        borderWidth: 2,
    },
    titulo: {
        position: "reltive",
        width: 200,
        fontSize: 18,
        fontWeight: 700,
        alignSelf: "left",
        left: 20,
        top: 20
    },
    signOut: {
        height: 18,
        width:18,
        marginVertical:8,
        marginLeft:8
        

    },
    sectionStyle:{
        float: "right",
        top:7,
        rigth:20,

    }
}
)

export default UsersList