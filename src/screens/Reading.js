import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import SettingModal from '../components/SettingModal';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { BaseManager } from '../utils/SqliteDb'
import { BookPagesScroll } from '../components/BookPagesScroll';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

var db = new BaseManager()
var pageSize
let positionX = 0
export const Reading = ({ route, navigation }) => {
    const isFocus = useIsFocused()

    const [book, setBook] = useState({})
    // To divide to the pages
    const [bookContent, setBookContent] = useState([])
    const [fontSize, setFontSize] = useState(16)
    const [justify, setJustify] = useState('auto')
    const [darkMode, setDarkMode] = useState('#273746')
    const [color, setColor] = useState('white')

    const [isEnabledDark, setIsEnabledDark] = useState(true);
    const [isEnabledFavorite, setIsEnabledFavorite] = useState(false);
    const [visibleSetting, setVisibleSetting] = useState(false)

    const [pageNumber, setPageNumber] = useState(1)
    const scRef = useRef(null)

    useEffect(() => {
        setBook(Object.assign(book, route.params.book))
        db.getBookByTitle(book.title).then(res => {
            if (res.length != 0) setIsEnabledFavorite(true)
        })
    }, [route.params.book.title])
    useFocusEffect(
        React.useCallback(() => {
            setIsEnabledFavorite(false)
            setVisibleSetting(false)

            const bookLenght = book.content.length
            const wordsNumbersInAnPage = heightPercentageToDP('100%') + 150
            pageSize = bookLenght / wordsNumbersInAnPage
            let startText = 0
            let endText = wordsNumbersInAnPage
            let gatheredContents = []
            for (let index = 0; index < pageSize; index++) {
                let dividedText = book.content.substring(startText, endText)

                startText = endText
                endText += wordsNumbersInAnPage
                gatheredContents.push({ dividedText })
            }

            setBookContent([...gatheredContents])

        }, [])
    );


    const onClickSetting = () => {
        setVisibleSetting(!visibleSetting)
    }
    const savePosition = async () => {

        const data = {
            title: route.params.book.title,
            position: positionX
        }
        await AsyncStorage.setItem('position', JSON.stringify(data))
    }
    if (!isFocus) {
        savePosition()
    }
    const toggleSwitchDark = () => {

        setIsEnabledDark(previousState => !previousState);

        if (isEnabledDark && darkMode === "#273746") {
            setDarkMode('white')
            setColor('black')
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
                imageurl: book.imageurl,
                gender: book.gender,
                size: book.lenght,
                currentPage: 0
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
        navigation.navigate('Translate', { word: content })
    }
    //https://stackoverflow.com/questions/43370807/react-native-get-current-page-in-flatlist-when-using-pagingenabled
    const onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        // Increasing one because of pageNum is starting from zero
        positionX = contentOffset.x
        pageNum++;
        setPageNumber(pageNum)
    }


    return (
        <View style={[styles.container, { backgroundColor: darkMode, }]}>
            <View style={styles.header}>
                <Text selectable style={[styles.title, { color: color }]}>{book.title}</Text>
                <Text style={{ fontSize: hp('1.8%'), color }}>{pageNumber} / {parseInt(pageSize)} </Text>
                <View style={{ marginRight: 15 }}>
                    <Icon onPress={onClickSetting} name="font" size={24} color="orange" />
                </View>
            </View>
            <View style={{ borderWidth: 0.2, borderColor: 'grey', marginTop: 10 }} />
            <ScrollView>
                <BookPagesScroll
                    page={bookContent}
                    onTextPress={onTextPress}
                    onScrollEnd={onScrollEnd}
                    pageNumber={pageNumber}
                    fontSize={fontSize}
                    title={book.title}
                    justify={justify}
                    color={color}
                    scRef={scRef} />
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
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5
    },
    title: {
        fontSize: hp('2.3%'),
        fontFamily: 'Roboto-Medium',
        marginLeft: 5,
        flexShrink: 1,
    },
})