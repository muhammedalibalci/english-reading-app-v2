import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { BookList } from './BookList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const BooksScroll = (props) => {
    return (
        <View style={styles.outerScroll}>
            <Text style={styles.title}>{props.title}</Text>
            <ScrollView horizontal={true}>
                <View style={styles.scroll} >
                    {Object.keys(props.books).map((item) => {
                        if (item !== "key") {
                            return (
                                <BookList key={item} book={props.books[item]} onClickBook={props.onClickBook} />
                            )
                        }
                    })}
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    outerScroll: {
        marginTop: 10

    },
    scroll: {
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        fontSize: wp('6%'),
        marginBottom: 5,
        fontFamily: 'Roboto-Light'
    }
})