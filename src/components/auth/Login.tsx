import { bindActionCreators } from '@reduxjs/toolkit'
import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'

// Firebase
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default class Login extends Component {

    // Constructor
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            name: "",
            password: "",
        }

        this.loginFun = this.loginFun.bind(this)
    }

    // Login method 
    loginFun() {
        const { email, password } = this.state

        // Auth login
        auth().signInWithEmailAndPassword(email, password)
    }

    // Render method
    render() {
        return (
            <View style={style.container}>
                <View style={style.titel}>
                    <Text style={style.textTitel}>
                        Comics Reader
                    </Text>
                </View>
                <View style={style.main}>
                    <View>
                        <TextInput
                            placeholder="Email:"
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder="Password:"
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                </View>
                <View style={style.signIn}>
                    <Button
                        onPress={() => this.loginFun()}
                        title="Submit"
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