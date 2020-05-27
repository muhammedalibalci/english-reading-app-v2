import React from 'react'
import { View, FlatList, Dimensions, StyleSheet } from 'react-native'
import { SelectableText } from '@astrocoders/react-native-selectable-text'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// To run the scroll just one time 
var counter = 0
export const BookPagesScroll = ({ page, comingPage,fontSize,justify, color, onTextPress, onScrollEnd }) => {
    return (
        <FlatList
            data={page}
            ref={(ref) => { page = ref; }}
            keyExtractor={(item, index) => index.toString()}
            onContentSizeChange={() => {
                if (counter === 0) {
                    if (page && page.scrollToIndex) {
                        if (comingPage != 0) {
                            comingPage--
                            page.scrollToIndex({ index: comingPage });
                        }
                        page.scrollToIndex({ index: comingPage });
                    }
                }
                counter++;
            }}
            onScroll={(e) => onScrollEnd(e)}
            renderItem={result => {
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
            }}
            horizontal
            pagingEnabled
        />
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        width: wp('100%')-5,
        height: hp('100%'),
    },
    text: {
        marginTop:5,
        marginLeft:5,
        fontSize: hp('3.3%'),
        fontFamily: 'PTSerif-Italic',
        lineHeight: hp('5%'),

    },
})