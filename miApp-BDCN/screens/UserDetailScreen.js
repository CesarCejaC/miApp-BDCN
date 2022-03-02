import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
  };
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleChangeText = (value, props) => {
    setUser({ ...user, [props]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true);
    const dbRef = firebase.db
      .collection("users")
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
        { text: "YES", onPress: () => deleteUser() },
        { text: "NO", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const userRef = firebase.db.collection("users").doc(user.id);
    await userRef.set({
      name: user.name,
      lname: user.lname,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      age: user.age,
      image: user.image,
      gender: user.gender,
    });
    setUser(initialState);
    props.navigation.navigate("UsersList");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          autoCompleteType="username"
          value={user.name}
          onChangeText={(value) => handleChangeText(value, "name")}
          style={styles.inputs}
        />
      </View>
      <View>
        <TextInput
          placeholder="Last name"
          autoCompleteType="userlname"
          value={user.lname}
          onChangeText={(value) => handleChangeText(value, "lname")}
          style={styles.inputs}
        />
      </View>
      <View>
        <TextInput
          placeholder="Email"
          autoCompleteType="email"
          value={user.email}
          onChangeText={(value) => handleChangeText(value, "email")}
          style={styles.inputs}
        />
      </View>
      <View>
        <TextInput
          placeholder="User Password"
          onChangeText={(value) => handleChangeText(value, "password")}
          value={user.password}
          style={styles.inputs}
        />
      </View>
      <View>
        <TextInput
          keyboardType="numeric"
          placeholder="Phone"
          autoCompleteType="phone"
          value={user.phone}
          onChangeText={(value) => handleChangeText(value, "phone")}
          style={styles.inputs}
        />
      </View>
      <View>
        <TextInput
          placeholder="Address"
          autoCompleteType="address"
          value={user.address}
          onChangeText={(value) => handleChangeText(value, "address")}
          style={styles.inputs}
        />
      </View>
      <View>
        <TextInput
          keyboardTye="numeric"
          placeholder="Age"
          autoCompleteType="age"
          value={user.age}
          onChangeText={(value) => handleChangeText(value, "age")}
          style={styles.inputs}
        />
      </View>
      <View>
        <TextInput
          placeholder="Image"
          autoCompleteType="image"
          value={user.image}
          onChangeText={(value) => handleChangeText(value, "image")}
          style={styles.inputs}
        />
      </View>
      <View>
        <TextInput
          placeholder="Gender"
          autoCompleteType="gender"
          value={user.gender}
          onChangeText={(value) => handleChangeText(value, "gender")}
          style={styles.inputs}
        />
      </View>
      <View>
        <Button
          title="Delete"
          onPress={() => deleteUser()}
          color="#ff0000"
          style={styles.buttons}
        />
      </View>
      <View>
        <Button
          title="Update"
          onPress={() => updateUser()}
          color="#25B30C"
          style={styles.buttons}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5073E6",
  },
  inputs: {
    backgroundColor: "#fff",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 40,
    marginLeft: 50,
    padding: 15,
    borderRadius: 10,
    borderColor: "#0782F9",
    borderWidth: 2,
    color: "#000000",
    fontWeight: "700",
    fontSize: 16,
  },
  buttons: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 40,
    marginLeft: 50,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    fontWeight: "700",
    fontSize: 16,
  },
});

export default UserDetailScreen;
