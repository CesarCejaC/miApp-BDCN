import React, {useState,useEffect} from 'react';
import { Button } from 'react-native';
import {ListItem, Avatar} from "react-native-elements";
import { ScrollView } from 'react-native';

import firebase from '../database/firebase';

const UsersList = (props) => {

    const [users,setUsers] = useState([]);

    useEffect(() => {
        firebase.db.collection("users").onSnapshot((QuerySnapshot)=>{
            const users = [];
            QuerySnapshot.docs.forEach((doc) => {
                const {name,email,phone} = doc.data();
                users.push({
                    id:doc.id,
                    name,
                    email,
                    phone,
                });
            });
            setUsers(users);
        });
    }, []);

    return (
        <ScrollView>
            <Button
                title='Create user'
                onPress={() => props.navigation.navigate("CreateUserScreen")}
            />
            {users.map(user => {
                return(
                    <ListItem
                    key={user.id}
                    bottomDivider
                    onPress={() => props.navigation.navigate("UserDetailScreen",{
                        userId: user.id,
                    })}
                    >
                    <ListItem.Chevron/>
                    <Avatar
                    source={{uri:"https://cosasdemascotas.net/wp-content/uploads/2020/06/ijgk7otlk58-scaled.jpg"}}
                    rounded
                    />
                    <ListItem.Content>
                        <ListItem.Title>{user.name}</ListItem.Title>
                        <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                    </ListItem.Content>
                    </ListItem>
                );
            })}
        </ScrollView>    
    )
}

export default UsersList