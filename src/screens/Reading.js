import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { SelectableText } from "@astrocoders/react-native-selectable-text";
import Icon from 'react-native-vector-icons/FontAwesome'
import SettingModal from '../components/SettingModal';
import { Footer } from '../components/Footer';
import { useFocusEffect } from '@react-navigation/native';
import { BaseManager } from '../utils/SqliteDb'
var db = new BaseManager()
export const Reading = ({ route }) => {

    const { book } = route.params
    const [fontSize, setFontSize] = useState(18)
    const [justify, setJustify] = useState('auto')
    const [darkMode, setDarkMode] = useState('white')
    const [color, setColor] = useState('black')
    const [isEnabledDark, setIsEnabledDark] = useState(false);
    const [isEnabledFavorite, setIsEnabledFavorite] = useState(false);
    const [visibleSetting, setVisibleSetting] = useState(false)
    const [translateWord, setTranslateWord] = useState('')
    const [footerVisible, setFooterVisible] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            setIsEnabledFavorite(false)
            setVisibleSetting(false)
            setFooterVisible(false)
            db.getBookByTitle(book.title).then(res => {
                if (res === 1) setIsEnabledFavorite(true)
            }).catch(er => {
                console.log("Error", er);
    
            })
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
        else{
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
    return (
        <View style={
            [
                styles.container,
                {
                    backgroundColor: darkMode,

                }
            ]
        }>
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: book.image || book.imageurl }} style={styles.image} />
                <View style={{ flex: 0.9 }}>
                    <Text  selectable style={[styles.title, { color: color }]}>{book.title} </Text>
                </View>
                <View style={{ flex: 0.1, marginTop: 10 }}>
                    <Icon onPress={onClickSetting} name="font" size={24} color="orange" />
                </View>
            </View>
            <View >

                <ScrollView >
                    <View style={styles.lineStyle} />

                    <SelectableText
                        style={[
                            styles.text,
                            {
                                fontSize: fontSize,
                                textAlign: justify,
                                color: color
                            }
                        ]

                        }
                        menuItems={["Translate", "Paint"]}
                        onSelection={({ eventType, content, selectionStart, selectionEnd }) => { onTextPress(eventType, content) }}
                        value={book.content}
                    />
                </ScrollView>
            </View>
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
        padding: 10,
    },
    title: {
        fontSize: 28,
        marginBottom: 25,
        fontFamily: 'Roboto-Medium',
        marginTop: 5
    },
    text: {
        fontFamily: 'PTSerif-Italic',
        lineHeight: 35
    },
    lineStyle: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 25
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: 20
    }
})