import React, { Component } from 'react';
import { View } from 'react-native';
import Comics from '../Comics';



export class Home extends Component {
    /*
    constructor(props) {
        super(props) {
            //
        }
    }
    */

    render() {
        return (
            <View>
                <Comics />
            </View>
        );
    }
}

export default Home;