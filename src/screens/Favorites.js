import React, { useEffect, useState, useRef } from 'react'
import { View, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BaseManager } from '../utils/SqliteDb'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var db = new BaseManager()
const Favorites = ({ navigation }) => {

    const [books, setBooks] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    useFocusEffect(
        React.useCallback(() => {
            listBook()
        }, [])
    );

    const listBook = () => {
        setIsEmpty(false)
        db.getTable().then(res => {
            if (res.length === 0) setIsEmpty(true)
            console.log(res);
            setBooks(res)
        })
    }

    const onPressDelete = (title) => {
        db.deleteData(title).then(res => {
            listBook()
        }).catch(er => {
            console.log(er);
        })
    }


    return (
        <View style={styles.container}>
           
            <Text style={styles.title}>My Favorites</Text>
            {
                books.map((l, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.imageurl } }}
                        onPress={() => navigation.navigate('Reading', { book: l })}
                        title={l.title}
                        titleStyle={{fontSize:wp('5%')}}
                        subtitle={l.gender}
                        subtitleStyle={{fontSize:wp('4%')}}
                        rightElement={<Button
                            onPress={() => onPressDelete(l.title)}
                            icon={{
                                name: "delete",
                                size: wp('4%'),
                                color: "white"
                            }}
                            buttonStyle={{ backgroundColor: '#E74C3C' }}
                        />}
                        bottomDivider
                    />
                ))
            }
            {isEmpty && <View style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <View >
                    <Icon name="ban" size={ wp('5%')} />
                </View>
                <View>
                    <Text style={styles.isEmpty}>List Empty</Text>
                </View>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: wp('7%'),
        marginBottom: 10,
        fontFamily: 'Roboto-Black'
    },

    isEmpty: {
        fontSize:  wp('4%'),
        textAlign: "center",
        marginLeft: 5,
        fontFamily: 'Roboto-Medium'
    }
})


export default Favorites