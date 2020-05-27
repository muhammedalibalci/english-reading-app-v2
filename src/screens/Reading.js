import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import SettingModal from '../components/SettingModal';
import { useFocusEffect } from '@react-navigation/native';
import { BaseManager } from '../utils/SqliteDb'
import { BookPagesScroll } from '../components/BookPagesScroll';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

var db = new BaseManager()
var pageSize = 0;
var comingPage = 0


export const Reading = ({ route, navigation }) => {

    const [book, setBook] = useState({})
    // To divide to the pages
    const [bookContent, setBookContent] = useState([])
    const [fontSize, setFontSize] = useState(18)
    const [justify, setJustify] = useState('auto')
    const [darkMode, setDarkMode] = useState('white')
    const [color, setColor] = useState('black')

    const [isEnabledDark, setIsEnabledDark] = useState(false);
    const [isEnabledFavorite, setIsEnabledFavorite] = useState(false);
    const [visibleSetting, setVisibleSetting] = useState(false)

    const [pageNumber, setPageNumber] = useState(1)
    const [copyPageNumber, setCopyPageNumber] = useState(1)

    useEffect(() => {
        setBook(Object.assign(book, route.params.book))
        db.getBookByTitle(book.title).then(res => {
            setPageNumber(res[0].currentPage)
            comingPage = res[0].currentPage
            // If it is favorite, set true
            if (res) setIsEnabledFavorite(true)
        }).catch(er => {
            console.log("Error", er);
        })
    }, [route.params.book.title])

    useFocusEffect(
        React.useCallback(() => {

            setIsEnabledFavorite(false)
            setVisibleSetting(false)

            const bookLenght = book.content.length
            const wordsNumbersInAPage = 575
            pageSize = bookLenght / wordsNumbersInAPage
            let startText = 0
            let endText = wordsNumbersInAPage
            let gatheredContents = []
            for (let index = 0; index < pageSize; index++) {
                let dividedText = book.content.substring(startText, endText)
                endText;
                startText = endText
                endText = 600 + endText
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
        pageNum++;
        setCopyPageNumber(pageNum)
        setPageNumber(pageNum)
    }

    const addBookmark = () => {
        if (!isEnabledFavorite) {
            alert("To use the bookmark, please add to the favorites")
        }
        db.updateData(book.title, pageNumber).then(res => {
        }).catch(er => {
            console.log(er);
        })
        setCopyPageNumber(comingPage)
    }
    return (
        <View style={[styles.container, { backgroundColor: darkMode, }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={{ uri: book.imageurl }} style={styles.image} />
                <View >
                    <Text selectable style={[styles.title, { color: color }]}>{book.title} </Text>
                </View>
                <View style={{ marginTop: hp('2%'), marginRight: 10 }}>
                    <Icon onPress={onClickSetting} name="font" size={24} color="orange" />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Icon onPress={addBookmark} name={copyPageNumber === comingPage ? "bookmark" : "bookmark-o"} size={wp('5%')} />
                <Text style={{ textAlign: 'center', marginLeft: 15, fontSize: wp('4%') }}>{pageNumber} / {parseInt(pageSize)} </Text>
            </View>
            <ScrollView >
                <BookPagesScroll
                    page={bookContent}
                    onTextPress={onTextPress}
                    onScrollEnd={onScrollEnd}
                    comingPage={comingPage}
                    pageNumber={pageNumber}
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
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingLeft: 5,

    },
    title: {
        fontSize: wp('7%'),
        fontFamily: 'Roboto-Medium',
        marginTop: 8,
    },
    image: {
        height: hp('8%'),
        width: wp('15%'),
        borderRadius: 50,
        marginTop: 3,
        marginLeft: 5
    }
})