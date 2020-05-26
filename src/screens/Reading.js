import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import { SelectableText } from "@astrocoders/react-native-selectable-text";
import Icon from 'react-native-vector-icons/FontAwesome'
import SettingModal from '../components/SettingModal';
import { Footer } from '../components/Footer';
import { useFocusEffect } from '@react-navigation/native';
import { BaseManager } from '../utils/SqliteDb'
import Pagination from 'react-native-pagination';//{Icon,Dot} also available
import { BookPagesScroll } from '../components/BookPagesScroll';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

var db = new BaseManager()
var pageSize = 0;
export const Reading = ({ route }) => {

    const [book, setBook] = useState({})
    // To divide the pages
    const [bookContent, setBookContent] = useState([])

    const [fontSize, setFontSize] = useState(18)
    const [justify, setJustify] = useState('auto')
    const [darkMode, setDarkMode] = useState('white')
    const [color, setColor] = useState('black')

    const [isEnabledDark, setIsEnabledDark] = useState(false);
    const [isEnabledFavorite, setIsEnabledFavorite] = useState(false);
    const [visibleSetting, setVisibleSetting] = useState(false)
    const [footerVisible, setFooterVisible] = useState(false)

    const [translateWord, setTranslateWord] = useState('')
    const [pageNumber, setPageNumber] = useState(1)


    useEffect(() => {
        setBook(Object.assign(book, route.params.book))
    }, [route.params.book.title])

    useFocusEffect(
        React.useCallback(() => {
            setIsEnabledFavorite(false)
            setVisibleSetting(false)
            setFooterVisible(false)
            db.getBookByTitle(book.title).then(res => {
                // If it is favorite, set true
                if (res === 1) setIsEnabledFavorite(true)
            }).catch(er => {
                console.log("Error", er);
            })

            const bookLenght = book.content.length
            const wordsNumbersInAPage = 680
            pageSize = bookLenght / wordsNumbersInAPage
            let startText = 0
            let endText = wordsNumbersInAPage
            let gatheredContents = []
            for (let index = 0; index < pageSize; index++) {
                let dividedText = book.content.substring(startText, endText)
                startText = endText
                endText = 690 + endText
                gatheredContents.push({ dividedText })
            }
            setBookContent([...gatheredContents])
        }, [])
    );




    const onClickSetting = () => {

        setVisibleSetting(!visibleSetting)
    }

    const toggleSwitchDark = () => {

        setIsEnabledDark(previousState => !previousState);

        if (isEnabledDark) {
            if (darkMode === "#273746") {
                setDarkMode('white')
                setColor('black')
            }
        }
        if (darkMode === "white") {
            setDarkMode('#273746')
            setColor('white')
        }

    }

    const toggleSwitchFavorite = () => {

        setIsEnabledFavorite(previousState => !previousState);
        if (!isEnabledFavorite) {

            let data = {
                id: book.title,
                title: book.title,
                content: book.content,
                image: book.imageurl,
                gender: book.gender,
                size: book.lenght
            }

            db.addTable(data).then(res => {
                //console.log(res);
            }).catch(er => {
                console.log("Erorr", er);

            })

        }
        else {
            db.deleteData(book.title).then(res => {

            }).catch(er => {
                console.log(er);
            })
        }


    }

    const onClickTextZoom = () => {
        if (fontSize < 26) {
            let size = fontSize
            setFontSize(++size)
        }
    }
    const onClickTextUnZoom = () => {
        if (fontSize > 12) {
            let size = fontSize
            setFontSize(--size)
        }
    }
    const onClickJustify = () => {
        if (justify === "auto") setJustify('justify')
        if (justify === "justify") setJustify('auto')
    }

    const onTextPress = (event, content) => {
        setTranslateWord(content)
        setFooterVisible(true)
    }

    //https://stackoverflow.com/questions/43370807/react-native-get-current-page-in-flatlist-when-using-pagingenabled
    const onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        // Increasing one because of starting from zero
        pageNum++;
        setPageNumber(pageNum)
    }
    console.log(pageNumber);

    return (
        <View style={[styles.container, { backgroundColor: darkMode, }]}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: book.image || book.imageurl }} style={styles.image} />
                <View style={{ flex: 0.9 }}>
                    <Text selectable style={[styles.title, { color: color }]}>{book.title} </Text>
                </View>
                <View style={{ flex: 0.1, marginTop: 10 }}>
                    <Icon onPress={onClickSetting} name="font" size={24} color="orange" />
                </View>
            </View>
            <ScrollView>
                
                <Text style={{ textAlign: 'center' }}>{pageNumber} / {parseInt(pageSize)} </Text>
                <View style={styles.lineStyle} />
                <BookPagesScroll
                    page={bookContent}
                    onTextPress={onTextPress}
                    onScrollEnd={onScrollEnd}
                    fontSize={fontSize}
                    justify={justify}
                    color={color} />
            </ScrollView>
            <SettingModal
                onClickTextZoom={onClickTextZoom}
                onClickTextUnZoom={onClickTextUnZoom}
                onClickJustify={onClickJustify}
                isEnabledDark={isEnabledDark}
                toggleSwitchDark={toggleSwitchDark}
                isEnabledFavorite={isEnabledFavorite}
                toggleSwitchFavorite={toggleSwitchFavorite}
                visibleSetting={visibleSetting}
            />
            {footerVisible && <Footer translateWord={translateWord} />}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingLeft: 5
    },
    title: {
        fontSize: 28,
        marginBottom: 5,
        fontFamily: 'Roboto-Medium',
        marginTop: 5
    },
    text: {
        fontFamily: 'PTSerif-Italic',
        lineHeight: 35
    },
    lineStyle: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.2,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: 20
    }
})