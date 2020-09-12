import React from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SettingModal = (props) => {
    return (
        props.visibleSetting ? <View style={styles.modal}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={{ flex: 0.3, padding: 5 }}>
                    <Icon name="search-plus" size={24} color="white" onPress={() => props.onClickTextZoom()} />
                </View>
                <View
                    style={{
                        borderLeftWidth: 1,
                        borderLeftColor: 'gray',
                        marginRight: 20
                    }}
                />
                <View style={{ flex: 0.3, padding: 5 }}>
                    <Icon onPress={() => props.onClickTextUnZoom()} name="search-minus" size={24} color="white" />
                </View>
                <View
                    style={{
                        borderLeftWidth: 1,
                        borderLeftColor: 'gray',
                        marginRight: 20
                    }}
                />
                <View style={{ flex: 0.3, padding: 5 }}>
                    <Icon onPress={() => props.onClickJustify()} name="align-justify" size={24} color="white" />
                </View>
            </View>
            <View style={styles.lineStyle} />
            <View style={{ flex: 1, marginLeft: 10,  flexDirection: 'row' ,alignItems: 'center' }}>
                <View style={{ flex: 0.7,flexDirection:'row', alignItems: 'center' }}>
                    <Icon name={props.isEnabledDark ? "moon-o" : "sun-o"} size={24} color="black" />
                    <Text style={styles.text}>
                        Dark Mode
                    </Text>
                </View>
                <View style={{ flex: 0.3 }}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={props.isEnabledDark ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={props.toggleSwitchDark}
                        value={props.isEnabledDark}
                    />
                </View>
            </View>
            <View style={styles.lineStyle} />
            <View style={{ flex: 1, marginLeft: 10,  flexDirection: 'row',alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name={props.isEnabledFavorite ? "star" : "star-o"} size={24} color="orange" />
                    <Text style={styles.text}>
                        Add To Favorite
                    </Text>
                </View>
                <View style={{ flex: 0.3 }}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={props.isEnabledFavorite ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={props.toggleSwitchFavorite}
                        value={props.isEnabledFavorite}
                    />
                </View>
            </View>
        </View> : <View></View>

    )
}
const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        padding: 15,
        top: hp('5%'),
        backgroundColor: '#273746',
        left: wp('32%'),
        height: hp('25%'),
        width: wp('60')
    },
    lineStyle: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 14,
        fontFamily: 'Roboto-Medium',
        color: 'white',
        marginLeft:10
    }
})




export default SettingModal