import React, { Component, Props, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';

// Firebase
import storage, { firebase } from '@react-native-firebase/storage';


export class ComicDetail extends Component {
    // Constructor
    constructor(props: string) {
        super(props)

        this.state = {
            DIRLocationsOfEveryPage: [],    // 
            imageUrl: null,                 // Image url in menu
            imageDetailUrls: [],            // Array of pictures
            numberOfImagesInDetailUrls: 1000,   // Number of images In detail urls
            currentImagelUrl: null,             // Url in modal
            modalVisible: false,
            wasLoaded: false,               // Set 1. load
            numberOfPage: 0,    // Which page comics is on
        }

        // Binding methotds
        this.setModalVisible = this.setModalVisible.bind(this)
        this.setActualUrl = this.setActualUrl.bind(this)
        this.cleanData = this.cleanData.bind(this)
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
        // console.log("GOOT HERE")

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

    cleanData = () => {
        this.setState({
            imageDetailUrls: [],
            numberOfPage: 0
        }, () => {
            console.log("Deleted all urls // CleanData()")
            console.log(this.state.imageDetailUrls)
        })
    }

    setModalVisible = (visible: boolean) => {
        // Set state for modal
        this.setState({
            modalVisible: visible
        })
    }

    loadPagesForComics = async (urlCompare) => {

        // Load states
        const { imageDetailUrls, currentImagelUrl } = this.state
        let done = false;

        // Comics vars
        const episodes = this.props.route.params.episodes;

        // console.log(urlCompare + " URL compare () 1")
        // console.log(urlCompare + " ID_Clicked compare () 1")

        episodes.map(async (item) => {
            // console.log(item.id + " ID compare () 2")

            if (urlCompare == item.id) {
                for (let index = 1; !done; index++) {
                    let image_url

                    if (index < 10) {
                        // to setup initial url
                        image_url = storage().refFromURL(item.episodeUrl + "/0" + index + ".jpg")

                        // console.log(image_url + " // loadPagesForComics ()")
                        // Set 1. picture of comics
                        if (index == 1) {
                            this.setActualUrl(currentImagelUrl)
                        }
                    } else {
                        image_url = storage().refFromURL(item.episodeUrl + "/" + index + ".jpg")
                    }



                    await image_url.getDownloadURL()
                        .then((response) => {
                            imageDetailUrls.push(response)
                        })
                        .catch((error) => {
                            if (error) {
                                done = true
                                this.setState({
                                    wasLoaded: true,
                                    numberOfImagesInDetailUrls: index - 1
                                })
                            }
                            console.log("ERROR")
                            console.log(error)
                        })
                }
            }

        })


        console.log(urlCompare + "In load pages for comics")

        // Got here
        // console.log(imageDetailUrls)
    }


    async componentDidMount() {
        const { DIRLocationsOfEveryPage } = this.state

        // Comics vars
        const episodes = this.props.route.params.episodes;

        episodes.map(async (item, index) => {
            // Load image URL
            let image_url = storage().refFromURL(item.firstPageUrl)

            // Get image URL
            await image_url.getDownloadURL()
                .then((response) => {
                    DIRLocationsOfEveryPage.push(response)
                    // Index
                    console.log(index)
                    this.setState({ currentImagelUrl: response })
                })
                .catch((error) => {
                    console.log("ERROR")
                    console.log(error)
                })
        })
    }


    render() {
        const { DIRLocationsOfEveryPage, modalVisible, currentImagelUrl, numberOfImagesInDetailUrls, numberOfPage } = this.state

        // Comics vars
        const itemId = this.props.route.params.itemId;

        // Right && Left arrow for modal
        let rightArrow
        let leftArrow
        let newArray = []

        // New array of new pages for new picture
        newArray = DIRLocationsOfEveryPage.map((item, index) => {
            return (
                <TouchableOpacity
                    style={styles.headline}
                    // onPress={this.pressed}
                    onPress={() => {
                        this.loadPagesForComics(index)
                        this.setModalVisible(true)
                    }}>
                    <Text>The Walking Dead</Text>
                    <Text>itemId: {JSON.stringify(itemId)}</Text>
                    <Text>This is text</Text>
                    <Image style={styles.headline} source={{ uri: item }} />
                </TouchableOpacity >
            )
        })

        // Right arrow render
        if ((numberOfImagesInDetailUrls - 1) > numberOfPage) {
            rightArrow = (
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                        // Implement dissapear after reading it
                        this.setPageNum(true)
                    }}
                >
                    <Text style={styles.textStyle}>Next Modal</Text>
                </Pressable>
            )
        } else {
            rightArrow = <></>
        }

        // Left arrow render
        if (0 < numberOfPage) {
            leftArrow = (
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                        this.setPageNum(false)
                    }}
                >
                    <Text style={styles.textStyle}>Previous Modal</Text>
                </Pressable >
            )
        } else {
            leftArrow = <></>
        }

        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.cleanData()
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
                                    this.cleanData()
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>

                            {/*Next modal */}
                            {rightArrow}

                            {/*Previous modal */}
                            {leftArrow}
                        </View>
                    </View>
                </Modal>
                {newArray}
            </View>
        );
    }
}

export default ComicDetail;

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


