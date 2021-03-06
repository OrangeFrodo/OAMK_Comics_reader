import React from 'react'
import { View, Text, Button, StyleSheet, Image } from 'react-native'

export default function Landing({ navigation }) {
    return (
        <View style={style.container}>
            <View style={style.welcomeText}>
                <Text style={style.welcomeTextInside}>
                    Welcome
                </Text>
            </View>
            <Image style={style.image} source={require('../../assets/1.png')} />  
            <View>
                <View style={style.login}>
                    <Button
                        title="Login"
                        color={"#FF4500"}
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
                <View style={style.register}>
                    <Button
                        title="Register"
                        color={"#e9d116"}
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    image: {
        alignSelf: "center",
        width: 250,
        height: 250,
    },
    login: {
        margin: 5,
        backgroundColor: "#FF4500",
    },
    register: {
        margin: 5,
        backgroundColor: "#e9d116",
        borderRadius: 5,
    },
    main: {
        textAlign: "center",
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