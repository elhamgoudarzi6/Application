import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, ScrollView, StatusBar, Modal } from 'react-native';
//import SMSVerifyCode from 'react-native-sms-verifycode'
import { Dialog } from 'react-native-simple-dialogs';
import { IconOutline } from "@ant-design/icons-react-native";
import AsyncStorage from '@react-native-community/async-storage';
const { height } = Dimensions.get('window');
const Storage = require('../storage');
const Config = require('../config');
export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            messageDialog: '',
            mobile: '09168509001',
            verifycode: '',
            modalVisibleVerifyCode: false,
            userData: {}
        };
    }



    getUser = async () => {
        try {
            const value = await AsyncStorage.getItem(Storage.SECRET_KEY)
            this.setState({ userData: value !== null ? JSON.parse(value) : null });
            console.log(this.state.userData)
        } catch (error) {
            // error reading value
            console.log(error);
        }
    }

    randomNumber() {
        var text = '';
        var possible = '123456789';
        for (var i = 0; i < 5; i++) {
            var sup = Math.floor(Math.random() * possible.length);
            text += i > 0 && sup == i ? '0' : possible.charAt(sup);
        }
        return text;
    }

    login() {
        if (this.state.mobile === '') {
            this.setState({ messageDialog: 'لطفا اطلاعات را به طور کامل وارد کنید' });
            this.setState({ dialogVisible: true });
        } else {
            fetch(Config.baseUrl + 'authUser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: this.state.mobile,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    LocalStorage.removeUser();
                    LocalStorage.saveUser(responseJson.data);
                    LocalStorage.getUser();
                    this.getUser();
                    //  this.clearInputText();
                }).catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor='#01A545' />
                <ScrollView>
                    <View style={styles.head}>
                        <Text style={styles.logo}>پتوس</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={text => this.setState({ mobile: text })}
                            maxLength={11}
                            text={'required'}
                            textContentType={'telephoneNumber'}
                            placeholder="موبایل"
                            keyboardType='numeric'
                            value={this.state.mobile}
                            style={styles.textInput}
                        />
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle}
                            onPress={() => { this.login() }}  >
                            <Text style={styles.txtButton}>ورود</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Dialog
                    visible={this.state.dialogVisible}
                    dialogStyle={styles.dialogStyle}
                    onTouchOutside={() => this.setState({ dialogVisible: false })}>
                    <View style={{ marginTop: -5, alignSelf: 'center' }}>
                        <IconOutline name="check-circle" color='#01A545' size={45} style={{ textAlign: "center", }} />
                        <Text style={styles.textDialog}>{this.state.messageDialog}</Text>
                    </View>
                </Dialog>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    head: {
        paddingTop: height * 0.18,
    },
    logo: {
        fontSize: 48,
        textAlign: 'center',
        fontFamily: 'Ghonche',
        color: "#01A545",
    },
    inputContainer: {
        marginTop: height * 0.07,
        width: '80%',
        alignSelf: 'center'
    },
    textInput: {
        padding: 10,
        fontFamily: 'Dana-FaNum-Medium',
        borderRadius: 5,
        marginVertical: 5,
        borderColor: "#999",
        borderWidth: 0.5,
        borderStyle: 'solid',
        textAlign: 'center',
    },
    text: {
        fontFamily: 'Dana-FaNum-Medium',
        fontSize: 20,
        color: '#01A545',
        marginTop: 30,
        marginRight: 20
    },
    buttonStyle: {
        backgroundColor: "#01A545",
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginHorizontal: "0.5%",
        borderRadius: 5,
        marginTop: 30,
    },
    txtButton: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Dana-FaNum-Bold",
    },
    message: {
        textAlign: 'right',
        fontSize: 12,
        color: '#444',
        fontFamily: "Dana-FaNum-Medium",
        marginTop: 10
    },
    row: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    txtReturn: {
        color: "#01a545",
        textAlign: "center",
        fontFamily: "Dana-FaNum-Bold",
    },
    verifyContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    btnVerify: {
        backgroundColor: "#01A545",
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 20
    },
    btnReturn: {
        backgroundColor: "#fff",
        borderColor: "#01a545",
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 20
    }
});

