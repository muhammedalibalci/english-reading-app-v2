import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import firebase from '../utils/firebase'
import { BooksScroll } from '../components/BooksScroll';
import Icon from 'react-native-vector-icons/FontAwesome'
import { BaseManager } from '../utils/SqliteDb'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var db = new BaseManager()

const Books = ({ navigation }) => {

    const [books, setBooks] = useState({})
    const [elementary, setElementaryBooks] = useState({})
    const [intermediate, setIntermediateBooks] = useState({})
    const [preIntermediate, setPreIntermediateBooks] = useState({})
    const [upIntermediate, setUpIntermediateBooks] = useState({})
    const [advance, setAdvanceBooks] = useState({})
    const [pendingApiCall, setPendignApiCall] = useState(true)

    useEffect(() => {
        db.createTable()
        firebase.database().ref('Book/').on('value', function (res) {
            res.forEach(function (snap) {

                var item = snap.val();
                item.key = snap.key;

                setBooks(Object.assign(books, item))

                if (item.key === "Elemantary") setElementaryBooks(item)
                if (item.key === "Intermediate") setIntermediateBooks(item)
                if (item.key === "PreIntermediate") setPreIntermediateBooks(item)
                if (item.key === "UpIntermediate") setUpIntermediateBooks(item)
                if (item.key === "Advance") setAdvanceBooks(item)

            });
            setPendignApiCall(false)
        });

    }, [])


    const onClickBook = (bookTitle) => {
        const bookId = Object.keys(books).filter(item => books[item].title === bookTitle);
        const pressBook = books[bookId]
        navigation.navigate('Reading', { book: pressBook })
    }

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Library</Text>
            {!pendingApiCall ? <ScrollView>
                <BooksScroll books={elementary} title="Elementary Books" onClickBook={onClickBook} />
                <BooksScroll books={intermediate} title="Intermediate Books" onClickBook={onClickBook} />
                <BooksScroll books={preIntermediate} title="Pre-Intermediate Books" onClickBook={onClickBook} />
                <BooksScroll books={upIntermediate} title="Up-Intermediate Books" onClickBook={onClickBook} />
                <BooksScroll books={advance} title="Advance Books" onClickBook={onClickBook} />
            </ScrollView> : <ActivityIndicator size="large" color="gray" />}
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom:hp('5%')
    },
    searchInput: {
        flex: 4,
        height: hp('2%'),
        justifyContent: 'center',
    },
    searchIcon: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 12
    },
    title: {
        fontSize: wp('8%'),
        marginBottom: 5,
        fontFamily: 'Roboto-Black'
    }
})


export default Books