import React, { useEffect, useState } from 'react'
import { ScrollView, Image, StyleSheet, Text, ImageBackground, View, Button, TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-elements'

export const BookList = (props) => {


    let size = (
        <Badge status="primary"  badgeStyle={{padding:5}} value={<Text style={styles.size}>Short</Text>} />
    )
    if (parseInt(props.book.lenght) > 3500) {
        size = (
            <Badge status="success"  badgeStyle={{padding:5}} value={<Text style={styles.size}>Medium</Text>} />
        )
    }
    if (parseInt(props.book.lenght) > 10000) {
        size = (
            <Badge status="warning"  badgeStyle={{padding:5}} value={<Text style={styles.size}>Long</Text>} />
        )
    }

    return (

        <View >
            <TouchableOpacity onPress={() => props.onClickBook(props.book.title)}>

                <ImageBackground source={{ uri: props.book.imageurl }} style={styles.book}>
                    <View style={styles.insideText}>
                        {size}
                        <Badge
                            status="error"
                            badgeStyle={{padding:7,marginTop:2}}
                            value={<Text style={styles.genderText}>
                                {props.book.gender}</Text>}>

                        </Badge>

                    </View>

                    <Text style={styles.text}>{props.book.title}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    book: {
        height: 250,
        width: 150,
        marginRight: 10
    },
    insideText: {
        position: 'relative',
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        marginLeft: 5,
        alignItems: 'flex-start',
        marginTop: 5,

    },
    gender: {
        padding: 20
    },
    genderText: {
        color: 'white',
        fontSize: 12,
    },
    text: {
        padding: 10,
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto-Black'
    },
    size: {
        color: 'white',
        padding: 5,
        fontSize: 12
    }
})
