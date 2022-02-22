import React, { Component, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableHighlightBase, ActivityIndicator, FlatList } from 'react-native';

// Data
import jsonData from '../listOfComics.json'


export class Comics extends Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            randomData: [],
            data: [],
            isLoading: true
        };

        this.getMovies = this.getMovies.bind(this)
        // this.sortData = this.sortData.bind(this)
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


    async getMovies() {
        try {
            const response = await fetch('https://api.shortboxed.com/comics/v1/new');
            const json = await response.json();
            this.setState({
                data: json.comics
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {
        this.getMovies();
    }

    render() {
        const { isLoading, data } = this.state;
        const initialProgram = []

        const random = Math.floor(Math.random() * 100);

        // Datas
        data.map((element, id) => {
            if(id == random) {
                initialProgram.push(element)
            }
        });

        // const sortedData = data.limit(1);

        return (
            <View>
                {isLoading ? <ActivityIndicator /> : (
                    <FlatList
                        data={initialProgram}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <View>
                                <Text>
                                    {item.publisher}
                                </Text>
                                <Text>
                                    {item.title}, 
                                    {item.releaseYear}
                                </Text>
                            </View>
                        )} />
                )}
                {isLoading ? <ActivityIndicator /> : (
                    jsonData.Comics.map((item, key) => {
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
                                    }}>
                                    <Text>{item.title}</Text>
                                </Pressable>
                            </View>
                        )
                    })
                )}
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