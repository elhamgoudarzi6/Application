import React, { Component } from 'react';
import { StatusBar, Text, View, Platform, StyleSheet, Animated, Easing } from 'react-native';
import { Dialog } from 'react-native-simple-dialogs';
import NetInfo from "@react-native-community/netinfo";
import { IconOutline } from "@ant-design/icons-react-native";

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
        }
        this.animatedValue1 = new Animated.Value(0);
        this.animatedValue2 = new Animated.Value(0);
        this.animatedValue3 = new Animated.Value(0);
        this.CheckConnectivity();
    }

    componentDidMount() {
        this.CheckConnectivity();
        this.animate();
    }


    CheckConnectivity = () => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (!state.isConnected) {
                this.setState({ dialogVisible: true });
            } else {
                setTimeout(() => { this.props.navigation.navigate('Dashboard') }, 2000);
            }
        });
        NetInfo.refresh().then(state => {
            if (!state.isConnected) {
                this.setState({ dialogVisible: true });
            } else {
                setTimeout(() => { this.props.navigation.navigate('Dashboard') }, 2000);
            }
        });
    };

    animate() {
        this.animatedValue1.setValue(0);
        this.animatedValue2.setValue(0);
        this.animatedValue3.setValue(0);
        const createAnimation = (value, duration, easing, delay = 0) => {
            return Animated.timing(value, {
                toValue: 1,
                duration,
                easing,
                delay,
                useNativeDriver: false
            });
        };
        Animated.sequence([
            createAnimation(this.animatedValue1, 1000, Easing.ease),
            createAnimation(this.animatedValue2, 1000, Easing.ease),
            createAnimation(this.animatedValue3, 1000, Easing.ease),
        ]).start();
    }

    render() {
        const scale = this.animatedValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.1, 1],
        });
        const opacity = this.animatedValue2.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });
        const introtext = this.animatedValue3.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 10],
        });
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} translucent={true} networkActivityIndicatorVisible={true} barStyle="light-content" />
                {/* <Animated.View style={{bottom: introtext}}> */}
                <Animated.View style={{ opacity }}>
                    {/* <Animated.View style={{ transform: [{ scale: scale }] }}> */}
                    <Text style={styles.text}>پتوس</Text>
                </Animated.View>
                <Dialog
                    visible={this.state.dialogVisible}
                    dialogStyle={styles.dialogStyle}
                    onTouchOutside={() => this.setState({ dialogVisible: false })}>
                    <View style={{ marginTop: -5, alignSelf: 'center' }}>
                        <IconOutline name="wifi" color='#999' size={45} style={{ textAlign: "center", }} />
                        <Text style={styles.textDialog}>اتصال اینترنت برقرار نیست</Text>
                    </View>
                </Dialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#01A545',
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 50,
        fontFamily: 'Ghonche',
    },
    dialogStyle: {
        borderRadius: 5,
        alignSelf: 'center',
        width: '80%'
    },
    textDialog: {
        textAlign: "center",
        fontFamily: 'Dana-FaNum-Medium',
        marginTop: 10,
        color: '#444'
    },
});
