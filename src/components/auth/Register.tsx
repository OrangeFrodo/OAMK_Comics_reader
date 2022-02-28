import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'

// Firebase
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default class Register extends Component {

    // Constructor
    constructor(props) {
        super(props)

        // Atributes
        this.state = {
            email: "",
            name: "",
            password: ""
        }

        this.registerFun = this.registerFun.bind(this)
    }

    // Register method
    registerFun() {
        const { name, email, password } = this.state

        // Auth
        auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                // Save to collection firestore
                firestore()
                    .collection("users")
                    .doc(auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                console.log(result)
            })
            .catch((answer) => {
                console.log(answer)
            })
    }

    // Render method
    render() {
        return (
            <View style={style.container}>
                <View style={style.titel}>
                    <Text style={style.textTitel}>
                        Register
                    </Text>
                </View>
                <View style={style.main}>
                    <TextInput
                        placeholder="Name"
                        onChangeText={(name) => this.setState({ name })}
                    />
                    <TextInput
                        placeholder="Email"
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </View>
                <View style={style.signIn}>
                    <Button
                        onPress={() => this.registerFun()}
                        title="Sign Up"
                        color="#9932CC"
                    />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    textTitel: {
        margin: 10,
        backgroundColor: "#0096FF",
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    titel: {
        alignItems: "center",
        borderRadius: 20,
        margin: 5,
        height: 50,
        backgroundColor: "#0096FF"
    },
    main: {
        margin: 5,
        marginTop: -450,
        borderRadius: 5,
        backgroundColor: "#0096FF",
        textAlign: "center",
        justifyContent: 'space-between',
    },
    signIn: {
        marginTop: -300,
        margin: 5
    },
    welcomeTextInside: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    welcomeText: {
        height: 50,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#0054c6",
        borderRadius: 10,
        margin: 10,
    }
})