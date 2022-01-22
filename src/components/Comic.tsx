import React, { Component, Props, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// Firebase
import { utils } from '@react-native-firebase/app';
import storage, { firebase } from '@react-native-firebase/storage';


export class Comic extends Component {
    // Constructor
    constructor(props: string) {
        super(props)

        this.state = {
            imageUrl: null
        }
    }


    async componentDidMount() {
        // Load image URL
        let image_url = storage().refFromURL('gs://voidalpha-d42d3.appspot.com/01.jpg')
        
        // Get image URL
        await image_url.getDownloadURL()
        .then((response) => {
            console.log("RESPONSE")
            console.log(response)

            this.setState({ imageUrl: response })
        })
        .catch((error) => {
            console.log("ERROR")
            console.log(error)
        })
    }


    render() {
        const  { imageUrl }  = this.state

        return (
            <View>
                <Image style={styles.headline} source={{ uri: imageUrl }} />
            </View>
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