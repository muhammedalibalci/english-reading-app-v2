import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import Axios from 'axios'
import { Badge } from 'react-native-elements'

export const Footer = (props) => {

    const [means, setMeans] = useState([])
    const [translateWord, setTranslateWord] = useState('')
    const [footerVisible, setFooterVisible] = useState(false)


    useEffect(() => {
        const url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20190723T075559Z.8f5b85d142dd9291.b65705fc3cb011117f1a24b08eb45d44ca888139&lang=en-tr&text=" + props.translateWord
        Axios.get(url).then(res => {
            let a = []
            setFooterVisible(true)

            res.data.def.map(element => {
                setTranslateWord(element.text)
                element.tr.map(item => {
                    a.push(item)
                    setMeans([...a])
                })
            })

        })

    }, [props.translateWord])

    return (

        footerVisible ? <View style={styles.footer}>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>{translateWord}</Text>
            </View>
            <ScrollView style={styles.scroll}>
                <View>
                    {means.map((mean) => {
                        return (
                            <Badge status="success" badgeStyle={{ padding: 10 }}
                                value={<Text style={styles.text}> {mean.text} ({mean.pos.substring(0, 3)})</Text>}
                            >

                            </Badge>
                        )
                    })}
                </View>
            </ScrollView >
        </View> : null
    )
}
const styles = StyleSheet.create({

    footer: {
        position: 'absolute',
        paddingLeft: 15,
        paddingTop: 5,
        bottom: 60,
        backgroundColor: '#95A5A6',
        height: 150,
        width:135
    },
    scroll: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        color: 'red',
        fontSize: 16,
        marginBottom: 5,
        flex: 0.9,
        textAlign: 'center'
    },
    text: {
        color: 'white',
        fontSize: 12,
    },
    close: {
        flex: 0.1,
        color: 'red'
    }
})