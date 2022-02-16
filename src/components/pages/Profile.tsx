import React, { Component } from 'react';
import { Button, View } from 'react-native';

// Firebase
import auth from '@react-native-firebase/auth';


export class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }

        this.loggout = this.loggout.bind(this)
    }


    loggout = () => {
        auth().signOut()
    }


    render() {
        return (
            <View>
                <Button
                    title="Loggout"
                    color="#9932CC"
                    onPress={(() => this.loggout())}
                />
            </View>
        );
    }
}

export default Profile;