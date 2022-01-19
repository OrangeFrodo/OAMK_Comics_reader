import { bindActionCreators } from '@reduxjs/toolkit'
import React, { Component } from 'react'
import { View, Text, Button, TextInput } from 'react-native'

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
        const { email, name, password } = this.state
        
        // Auth login
        auth().signInWithEmailAndPassword(email, password)
    }

    // Render method
    render() {
        return (
            <View>
                <View>
                    <TextInput
                        placeholder="Email"
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    <Button
                        onPress={() => this.loginFun()}
                        title="Sign In"
                        color="#9932CC"
                    />
                </View>
            </View>
        )
    }
}