import React, { Component, Props, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';

// Firebase
import { utils } from '@react-native-firebase/app';
import storage, { firebase } from '@react-native-firebase/storage';
import ComicModal from './ComicModal';


export class Comic extends Component {
    // Constructor
    constructor(props: string) {
        super(props)

        this.state = {
            imageUrl: null,                 // Image url in menu
            imageDetailUrls: [],            // Array of pictures
            currentImagelUrl: null,         // Url in modal
            modalVisible: false,
            wasLoaded: false,               // Set 1. load
            numberOfPage: 0,    // Which page comics is on
        }

        // Binding methotds
        this.setModalVisible = this.setModalVisible.bind(this)
        this.setActualUrl = this.setActualUrl.bind(this)
    }

    // ActualUrl for 1. loaded pic
    setActualUrl = (argumentUrl: string) => {
        this.setState({
            currentImagelUrl: argumentUrl
        })
    }

    // Set page number
    setPageNum = (state: boolean) => {

        // console.log("In setPageNum() " + this.state.numberOfPage)
        if (!state) {
            this.setState({
                numberOfPage: this.state.numberOfPage - 1
            }, () => {
                // Call back to get current state of numberOfPage
                // console.log("In setPageNum() callback" + this.state.numberOfPage)

                this.setCurrentUrlPage(this.state.numberOfPage)
            })

            // console.log("After decrement //setPageNum()" + this.state.numberOfPage)
        }
        if (state) {
            this.setState({
                numberOfPage: this.state.numberOfPage + 1
            }, () => {
                this.setCurrentUrlPage(this.state.numberOfPage)
            })

            // console.log("After increment //setPageNum()" + this.state.numberOfPage)    
        }
    }

    // Set another page
    setCurrentUrlPage = (myNumber: number) => {
        const { imageDetailUrls } = this.state

        // Got here
        console.log("GOOT HERE")

        imageDetailUrls.forEach((item, index) => {

            // console.log("In for each loop for item")

            if (index === myNumber) {
                // console.log("This one I took")
                // console.log(item)
                this.setState({
                    currentImagelUrl: item,
                })
            }
        })

        // Got here
        // console.log("Left here setCurrentUrlPage()")
    }


    setModalVisible = async (visible: boolean) => {
        // Load states
        const { imageDetailUrls, currentImagelUrl, wasLoaded } = this.state

        // Set state for modal
        this.setState({
            modalVisible: visible
        })

        if (!wasLoaded) {
            // This is hand made function, I was to lazy to rewrite names of JPG files in firebase storage.
            for (let index = 1; index < 26; index++) {
                let image_url

                if (index < 10) {
                    image_url = storage().refFromURL("gs://voidalpha-d42d3.appspot.com/The Walking Dead/Episode 1/0" + index + ".jpg")

                    // Set 1. picture of comics
                    if (index == 1) {
                        this.setActualUrl(currentImagelUrl)
                    }
                } else {
                    image_url = storage().refFromURL("gs://voidalpha-d42d3.appspot.com/The Walking Dead/Episode 1/" + index + ".jpg")
                }


                await image_url.getDownloadURL()
                    .then((response) => {
                        imageDetailUrls.push(response)
                    })
                    .catch((error) => {
                        console.log("ERROR")
                        console.log(error)
                    })

            }

            this.setState({
                wasLoaded: true
            })

            // Got here
            // console.log(imageDetailUrls)
        }
    }


    async componentDidMount() {
        // Load image URL
        let image_url = storage().refFromURL('gs://voidalpha-d42d3.appspot.com/The Walking Dead/Episode 1/01.jpg')


        // Get image URL
        await image_url.getDownloadURL()
            .then((response) => {
                this.setState({ imageUrl: response, currentImagelUrl: response })
            })
            .catch((error) => {
                console.log("ERROR")
                console.log(error)
            })
    }


    render() {
        const { imageUrl, modalVisible, currentImagelUrl } = this.state

        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                    }}
                >
                    {/* Views for modal */}
                    <View style={styles.centeredView}>
                        <View /*style={styles.modalView} */>
                            <Image style={styles.headline} source={{ uri: currentImagelUrl }} />

                            {/*Close modal */}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible)
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>

                            {/*Next modal */}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    this.setPageNum(true)
                                }}
                            >
                                <Text style={styles.textStyle}>Next Modal</Text>
                            </Pressable>

                            {/*Previous modal */}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    this.setPageNum(false)
                                }}
                            >
                                <Text style={styles.textStyle}>Previous Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={styles.headline}
                    // onPress={this.pressed}
                    onPress={() => this.setModalVisible(true)}
                >
                    <Text>The Walking Dead</Text>
                    <Image style={styles.headline} source={{ uri: imageUrl }} />
                </TouchableOpacity>
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
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    /*
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    */
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})


