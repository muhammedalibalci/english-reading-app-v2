import React from 'react'
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Translate = ({route}) => {
    return (
        <View style={{ width: wp('100%'), height: hp('100%') }}>
            <WebView source={{ uri: `https://translate.google.com/?source=gtx#view=home&op=translate&sl=en&tl=tr&text=${route.params.word}` }} />
        </View>
    )
}
