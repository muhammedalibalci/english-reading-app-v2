import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, TextInput } from 'react-native';
import firebase from '../utils/firebase'
import { BooksScroll } from '../components/BooksScroll';
import Icon from 'react-native-vector-icons/FontAwesome'
import {BaseManager} from '../utils/SqliteDb'
var db = new BaseManager()
const Books = ({ navigation  }) => {

    const [books, setBooks] = useState({})
    const [elemantary, setElemantaryBooks] = useState({})
    const [intermediate, setIntermediateBooks] = useState({})
    const [preIntermediate, setPreIntermediateBooks] = useState({})
    const [upIntermediate, setUpIntermediateBooks] = useState({})
    const [advance, setAdvanceBooks] = useState({})
    const [pendingApiCall, setPendignApiCall] = useState(true)

    useEffect(() => {
        db.createTable().then(res=>{
            console.log(res);
            
        })
        firebase.database().ref('Book/').on('value', function (res) {
            var returnArray = [];
            res.forEach(function (snap) {
                var item = snap.val();
                item.key = snap.key;

                if (item.key === "Elemantary") setElemantaryBooks(item)

                if (item.key === "Advance") setAdvanceBooks(item)

                if (item.key === "Intermediate") setIntermediateBooks(item)

                if (item.key === "PreIntermediate") setPreIntermediateBooks(item)

                if (item.key === "UpIntermediate") setUpIntermediateBooks(item)

                returnArray.push(item);

            });
            returnArray.map(section => {
                setBooks(section)
            })
            setPendignApiCall(false)
        });

    }, [])


    const onClickBook = (bookTitle) => {
        const bookId = Object.keys(books).filter(item => books[item].title === bookTitle);
        const pressBook = books[bookId]

        navigation.navigate('Reading',{book:pressBook})
    }


    return (

        <View style={styles.container}>
            <View style={styles.top}>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Library</Text>
                </View>

                <View style={styles.searchIcon}>
                    <Icon name="search" size={24} color='#4285f4' />
                </View>
            </View>
            {!pendingApiCall ? <ScrollView>
                <BooksScroll books={books} title="Random Books" onClickBook={onClickBook} />
                <BooksScroll books={elemantary} title="Elemantary Books" onClickBook={onClickBook} />
                <BooksScroll books={intermediate} title="Intermediate Books" onClickBook={onClickBook} />
                <BooksScroll books={preIntermediate} title="PreIntermediate Books" onClickBook={onClickBook} />
                <BooksScroll books={upIntermediate} title="UpIntermediate Books" onClickBook={onClickBook} />
                <BooksScroll books={advance} title="Advance Books" onClickBook={onClickBook} />
            </ScrollView> : <ActivityIndicator size="large" color="#0000ff" />}
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom:40
    },
    top: {
        flexDirection: 'row',
    },
    titleContainer: {
        flex: 9,
        justifyContent: 'flex-start'

    },
    searchInput: {
        flex: 4,
        height: 20,

        justifyContent: 'center',

    },
    searchIcon: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 12
    },

    title: {
        fontSize: 28,
        marginBottom: 5,
        fontFamily: 'Roboto-Black'
    }
})


export default Books