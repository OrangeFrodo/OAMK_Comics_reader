import React, { Component, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableHighlightBase } from 'react-native';

// Data
import jsonData from '../listOfComics.json'


export class Comics extends Component {

    // Constructor
    constructor(props) {
        super(props)

        // this.state = {
        //     namesOfComics: jsonData,
        //     firstPageUrl: jsonData,

        //     // Comics related atributes
        //     directUrl: "",
        //     titleOfComics: ""
        // }

        // this.setComicSeriesToOpen = this.setComicSeriesToOpen.bind(this)
        // this.printEveryComics = this.printEveryComics.bind(this)
    }

    // setComicSeriesToOpen = (itemArgument) => {
    //     console.log("Was clicked // setComicsSeriesToOpen()")
    //     this.setState({
    //         titleOfComics: itemArgument.title,
    //         directUrl: itemArgument.dicUrl,
    //         firstPageUrl: itemArgument.episodes
    //     })

    //     // console.log(this.state.titleOfComics)
    // }

    // printEveryComics = () => {
    //     const { namesOfComics } = this.state

    //     // Console Log comics
    //     // console.log(namesOfComics)
    // }

    render () {

        return (
            <View>
                {jsonData.Comics.map((item, key) => {
                    // console.log(item)
                    return (
                        <View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    // Implement dissapear after reading it
                                    // this.setComicSeriesToOpen(item)
                                    // this.props.navigation.navigate("ComicsDetail")
                                    console.log("Was clicked")
                                    this.props.navigation.navigate("ComicsDetail", {
                                        itemId: item.id,
                                        episodes: item.episodes,

                                    })
                                }}
                            >

                                <Text>{item.title}</Text>
                            </Pressable>
                            
                        </View>
                    )
                })}
            </View>
        );
    }
}

export default Comics;

const styles = StyleSheet.create({
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
})