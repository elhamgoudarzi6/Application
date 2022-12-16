import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Text } from "react-native";
import { IconOutline } from "@ant-design/icons-react-native";

export default class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <StatusBar hidden={false} backgroundColor='#32cd32' />
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <IconOutline name="left" color='#777' size={30}
                            onPress={this.props.onBackPress}
                            style={{ marginLeft: 20, textAlign: "left", flex: 1 }} />
                        <Text style={styles.header}>{this.props.title}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.89,
        shadowRadius: 4.65,
        elevation: 2,
    },
    header: {
        flex: 1,
        textAlign: 'right',
        fontSize: 16,
        fontFamily: 'Dana-FaNum-Bold',
        color: '#444',
        marginRight: 20
    },
});