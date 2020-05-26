import React from 'react'
import { View, Text, Switch, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


const SettingModal = (props) => {

    return (

        props.visibleSetting ? <View style={styles.modal}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={{ flex: 0.3, padding: 10 }}>
                    <Icon name="search-plus" size={24} color="#2E86C1" onPress={() => props.onClickTextZoom()} />
                </View>
                <View
                    style={{
                        borderLeftWidth: 1,
                        borderLeftColor: 'gray',
                        marginRight: 20
                    }}
                />
                <View style={{ flex: 0.3, padding: 10 }}>
                    <Icon onPress={() => props.onClickTextUnZoom()} name="search-minus" size={24} color="#2E86C1" />
                </View>
                <View
                    style={{
                        borderLeftWidth: 1,
                        borderLeftColor: 'gray',
                        marginRight: 20
                    }}
                />
                <View style={{ flex: 0.3, padding: 10 }}>
                    <Icon onPress={() => props.onClickJustify()} name="align-justify" size={24} color="#2E86C1" />
                </View>
            </View>
            <View style={styles.lineStyle} />
            <View style={{ flex: 1, marginLeft: 10, marginTop: 20, flexDirection: 'row' }}>


                <View style={{ flex: 0.7 }}>
                    <Text style={styles.text}>

                        <Icon name={props.isEnabledDark ? "moon-o" : "sun-o"} size={24} color="black" />
                                Dark Mode</Text>

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

            <View style={{ flex: 1, marginLeft: 10, marginTop: 20, flexDirection: 'row' }}>


                <View style={{ flex: 0.8 }}>
                    <Text style={styles.text}>
                        <Icon name={props.isEnabledFavorite ? "star" : "star-o"} size={24} color="orange" />
                                Add To Favorite</Text>

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
        padding: 10,
        top: 50,
        backgroundColor: '#273746',
        marginLeft: 160,
        height: 200,
        width: 200
    },
    lineStyle: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 14,
        fontFamily: 'Roboto-Medium',
        color: 'white',
    }
})




export default SettingModal