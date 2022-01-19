import React, { Component } from 'react'
import { View, Text, Button, TextInput } from 'react-native'

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
            <View>
                <View >
                    <View>
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

