import React from 'react'
import { View, Text, Button } from 'react-native'

export default function Landing({ navigation }) {
    return (
        <View>
            <Text>
                Hey this is Landing
            </Text>
            <Button
                title="Go to login"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="Go to register"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    )
}