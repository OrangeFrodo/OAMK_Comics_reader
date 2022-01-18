import React from 'react'
import { View, Text, Button} from 'react-native'

export default function Home({ navigation }) {
    return (
        <View>
            <Text>
                Hey this is home
            </Text>
            <Button 
                title="Go to profile"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    )
}
