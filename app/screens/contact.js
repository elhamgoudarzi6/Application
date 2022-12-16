import React, { Component } from 'react';
import {
    StyleSheet, Text, View, SafeAreaView, ScrollView, Platform, Linking, TouchableOpacity, Dimensions, SectionList, TextInput
} from 'react-native';
const Config = require('../config');
import Header from "../layouts/Header";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dialog } from 'react-native-simple-dialogs';
import { IconOutline } from "@ant-design/icons-react-native";

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageDialog: '',
            dialogVisible: false,
            name: '',
            email: '',
            mobile: '',
            message: '',
            title: '',
            supportNumber: '+989168509001',
            helpNumber: '+989168509002',
            agentNumber: '+989168509003',
            whatsAppMsg: "سلام من در سوال دارم",
            support: [
                { id: 1, title: 'راه های ارتباطی', data: [{ id: 0, title: 'pethos.app', icon: 'send-o' }, { id: 1, title: 'pethos.app', icon: 'instagram' }, { id: 2, title: 'info@pethos.app', icon: 'envelope-o' }, { id: 3, title: 'https://pethos.app', icon: 'chrome' }] },
                { id: 2, title: 'آدرس ما', data: [{ id: 0, title: 'لرستان خرم آباد خیابان انقلاب املاک سرمایه', icon: 'map-marker' }] }
            ]
        };
    }
    componentDidMount() {
    }


    registerContact = () => {
        if (this.state.name === '' || this.state.email === '' || this.state.mobile === '' ||
            this.state.title === '' || this.state.message === '') {
            this.setState({ messageDialog: 'لطفا اطلاعات را به طور کامل وارد کنید' });
            this.setState({ dialogVisible: true });
        } else {
            fetch(Config.baseUrl + 'registerContactUs', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: this.state.name,
                    email: this.state.email,
                    mobile: this.state.mobile,
                    title: this.state.title,
                    message: this.state.message,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ messageDialog: 'ثبت شد' });
                    this.setState({ dialogVisible: true });
                    this.clearInputText();
                }).catch((error) => {
                    console.error(error);
                });
        }
    }

    clearInputText() {
        setTimeout(() => {
            this.setState({
                name: "",
                mobile: "",
                message: "",
                title: "",
                email: ""
            })
        }, 2);
    }

    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };

    whatsappMessage = () => {
        let url = "whatsapp://send?text=" + whatsAppMsg + "&phone=" + this.state.supportNumber;
        Linking.openURL(url);
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header title="ارتباط با ما" onBackPress={() => { this.props.navigation.goBack() }} />
                <ScrollView>
                    <View style={styles.section}>
                        <View style={{ marginTop: 5 }}>
                            <Text style={styles.header}>با ما در ارتباط باشید</Text>
                            <Text style={styles.paragraph}>املاک پتوس جهت هرگونه پرسش، انتقاد و پیشنهاد همیشه به روی شما باز است</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                onChangeText={text => this.setState({ name: text })}
                                maxLength={40}
                                text={'required'}
                                textContentType={'familyName'}
                                placeholder="نام و نام خانوادگی"
                                value={this.state.name}
                                style={styles.textInput}
                            />
                            <TextInput
                                onChangeText={text => this.setState({ email: text })}
                                maxLength={40}
                                text={'required'}
                                textContentType={'emailAddress'}
                                placeholder="ایمیل"
                                value={this.state.email}
                                style={styles.textInput}
                            />
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
                            <TextInput
                                onChangeText={text => this.setState({ title: text })}
                                maxLength={40}
                                text={'required'}
                                textContentType={'familyName'}
                                placeholder="عنوان"
                                value={this.state.title}
                                style={styles.textInput}
                                selectionColor={'#01A545'}
                            />
                            <TextInput
                                multiline
                                numberOfLines={5}
                                onChangeText={text => this.setState({ message: text })}
                                maxLength={40}
                                text={'required'}
                                textContentType={'familyName'}
                                placeholder="پیغام"
                                value={this.state.message}
                                style={styles.textInput}
                            />
                            <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle}
                                onPress={this.registerContact}>
                                <Text style={styles.txtButton}>ارسال</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={{ marginTop: 5 }}>
                            <Text style={styles.header}>تماس با ما</Text>
                            <Text style={styles.paragraph}>املاک پتوس جهت هرگونه پرسش، انتقاد و پیشنهاد همیشه به روی شما باز است</Text>
                        </View>

                        <Text style={styles.titleTouchable}>راهنما</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { this.dialCall(this.state.helpNumber) }} style={styles.touchableStyle}>
                            <Text style={styles.txtTouchable}>+98-901-1234567</Text>
                        </TouchableOpacity>

                        <Text style={styles.titleTouchable}>مشاوره</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { this.dialCall(this.state.agentNumber) }} style={styles.touchableStyle}>
                            <Text style={styles.txtTouchable}>+98-901-1234567</Text>
                        </TouchableOpacity>

                        <Text style={styles.titleTouchable}>پشتیبانی</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { this.dialCall(this.state.supportNumber) }} style={styles.touchableStyle} >
                            <Text style={styles.txtTouchable}>+98-901-1234567</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <SectionList
                            sections={this.state.support}
                            renderItem={({ item }) =>
                                <View style={styles.sectionItem}>
                                    <Text style={styles.item}>{item.title} </Text>
                                    <Icon name={item.icon} color='#777' size={25} style={{ color: '#777', marginRight: 5 }} />
                                </View>
                            }
                            renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                            keyExtractor={(item) => { return item.id }}
                        />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: '#01A545', paddingVertical: 5, paddingHorizontal: 25 }} activeOpacity={0.9} onPress={() => Linking.openURL('https://apprad.ir')}>
                        <Text style={styles.txtFooter}> طراحی و پیاده سازی شرکت ایده پردازان پارس آراد</Text>
                        <Text style={styles.txtFooter}>apprad.ir</Text>
                    </TouchableOpacity>
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
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    section: {
        marginHorizontal: 0,
        marginBottom: 10,
        paddingHorizontal: 25,
        paddingVertical: 20,
        shadowColor: "#f8f8f8",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 5,
            marginBottom: 3,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 2
    },
    header: {
        color: "#555",
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 13,
        textAlign: "right"
    },
    paragraph: {
        color: "#555",
        fontFamily: 'Dana-FaNum-Medium',
        fontSize: 12,
        textAlign: "right"
    },
    touchableStyle: {
        marginVertical: 5,
        borderColor: "#01A545",
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
    },
    titleTouchable: {
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 16,
        color: "#666",
        textAlign: 'center',
        marginTop: 10
    },
    txtTouchable: {
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 16,
        color: "#01A545",
        textAlign: 'center'
    },
    txtFooter: {
        fontFamily: 'Dana-FaNum-Medium',
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
    },
    buttonStyle: {
        backgroundColor: "#01A545",
        padding: 10,
        borderRadius: 5,
        marginTop: 25
    },
    txtButton: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Dana-FaNum-Bold",
    },
    dialogStyle: {
        borderRadius: 5,
        alignSelf: 'center',
        width: '80%'
    },
    textDialog: {
        textAlign: "center",
        fontFamily: 'Dana-FaNum-Medium',
        marginTop: 10
    },
    textInput: {
        //  backgroundColor: '#f5f5f5',
        padding: 10,
        fontFamily: 'Dana-FaNum-Medium',
        borderRadius: 5,
        marginVertical: 5,
        borderColor: "#999",
        borderWidth: 0.5,
        borderStyle: 'solid',
    },
    sectionHeader: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        fontFamily: "Dana-FaNum-Bold",
        marginVertical: 10,
        borderRadius: 5

    },
    sectionItem: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        padding: 10
    },
    item: {
        fontFamily: 'Dana-FaNum-Medium',
        textAlign: 'right',
        marginRight: 5,
        fontSize: 14,
    }

});
