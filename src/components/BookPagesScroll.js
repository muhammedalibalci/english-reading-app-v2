import React, { useRef, useEffect, useLayoutEffect } from 'react'
import { View, FlatList, Dimensions, StyleSheet, AsyncStorage } from 'react-native'
import { SelectableText } from '@astrocoders/react-native-selectable-text'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const BookPagesScroll = ({title, page, fontSize, justify, color, onTextPress, onScrollEnd }) => {
    const scRef = useRef(null)

    useEffect(() => {
        getPositionAndScrollTo()
    }, [title])

    const getPositionAndScrollTo =async () =>{
        let position = await AsyncStorage.getItem('position')
        if (position != null) {
            position = JSON.parse(position)
            if (position.title == title) {
                scRef.current.getScrollResponder().scrollTo({ x: position.position, y: 0, animated: true })
            }
        }
    }

    const _renderItem = (result) => {
        return (
            <View style={styles.container}>
                <SelectableText
                    style={[
                        styles.text,
                        {
                            color,
                            fontSize,
                            justify
                        }
                    ]
                    }
                    menuItems={["Translate", "Paint"]}
                    onSelection={({ eventType, content }) => { onTextPress(eventType, content) }}
                    value={result.item.dividedText + "..."}
                />
            </View>
        )
    }


    return (
        <FlatList
            data={page}
            ref={scRef}
            keyExtractor={(item, index) => index.toString()}
            onScroll={(e) => onScrollEnd(e)}
            renderItem={_renderItem}
            horizontal
            pagingEnabled
        />
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 5,
        paddingBottom:20,
        width: wp('100%')-5,
        height: hp('100%'),
    },
    text: {
        marginTop: 5,
        marginLeft: 5,
        fontFamily: 'PTSerif-Regular',
        lineHeight: hp('5%'),
        flexShrink:1,
    },
})