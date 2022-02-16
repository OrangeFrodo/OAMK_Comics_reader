import React, { Component } from 'react';
import { View } from 'react-native';
import Comic from '../Comic';
import ComicModal from '../ComicModal';



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
                <Comic />
            </View>
        );
    }
}

export default Home;