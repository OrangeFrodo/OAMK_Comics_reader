import React, { Component, Props, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Firebase
import { utils } from '@react-native-firebase/app';
import storage, { firebase } from '@react-native-firebase/storage';


export class Comic extends Component {
    // Constructor
    constructor(props: string) {
        super(props)

        this.state = {
            imageUrl: null,
            press: 0
        }

        this.pressed = this.pressed.bind(this)
    }

    pressed = () => {
        this.setState({
            press: this.state.press + 1
        })
    }

    async componentDidMount() {
        // Load image URL
        let image_url = storage().refFromURL('gs://voidalpha-d42d3.appspot.com/The Walking Dead/Episode 1/01.jpg')

        // Get image URL
        await image_url.getDownloadURL()
            .then((response) => {
                this.setState({ imageUrl: response })
            })
            .catch((error) => {
                console.log("ERROR")
                console.log(error)
            })
    }


    render() {
        const { imageUrl } = this.state

        return (
            <TouchableOpacity
                style={styles.headline}
                onPress={this.pressed}
            >
                <Text>The Walking Dead</Text>
                <Image style={styles.headline} source={{ uri: imageUrl }} />
            </TouchableOpacity>

        );
    }
}

export default Comic;

const styles = StyleSheet.create({
    headline: {
        margin: 10,
        width: 120,
        height: 200,
    }
})