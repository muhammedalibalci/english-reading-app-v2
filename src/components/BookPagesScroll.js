import React from 'react'
import { View, FlatList, Dimensions, StyleSheet } from 'react-native'
import { SelectableText } from '@astrocoders/react-native-selectable-text'
var i = 0;
export const BookPagesScroll = ({ page, comePage, fontSize, justify, color, onTextPress, onScrollEnd, pageNumber }) => {
    //console.log("Pagenumber",pageNumber);



    return (
        <FlatList
            data={page}
            ref={(ref) => { page = ref; }}
            keyExtractor={(item, index) => index.toString()}
            onContentSizeChange={() => {
                console.log(comePage);

                if (i === 0) {
                    if (page && page.scrollToIndex) {
                        if (comePage != 0) {
                            comePage--
                            page.scrollToIndex({ index: comePage });
                        }
                        page.scrollToIndex({ index: comePage });
                    }
                }
                i++;


            }}
            onScroll={(e) => onScrollEnd(e)}

            renderItem={result => {
                return (
                    <View style={styles.container}>
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
                            onSelection={({ eventType, content }) => { onTextPress(eventType, content) }}
                            value={result.item.dividedText + "..."}
                        />
                    </View>)
            }}

            horizontal={true}

            pagingEnabled
        />
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        width: Dimensions.get("window").width - 5,
        height: Dimensions.get("window").height,

    },

    text: {
        fontFamily: 'PTSerif-Italic',
        lineHeight: 35,
    },

})