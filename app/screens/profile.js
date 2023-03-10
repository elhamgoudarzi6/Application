import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, Share, Image, TouchableOpacity, PermissionsAndroid, FlatList, Modal, Easing, Dimensions, Animated, SectionList } from 'react-native';
//import AwesomeAlert from 'react-native-awesome-alerts';
import { IconOutline } from "@ant-design/icons-react-native";
//import SMSVerifyCode from 'react-native-sms-verifycode'
import Contacts from 'react-native-contacts';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
//import { Dialog } from 'react-native-simple-dialogs';
const { width } = Dimensions.get('window');

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.animatedValue1 = new Animated.Value(0);
        this.state = {
            showAlert: false,
            messageAlert: '',
            textMessageBox: '',
            birthDate: '',
            password: '',
            retypePassword: '',
            userID: '610dab5d4e91686d43f57c81',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjEwZGFiNWQ0ZTkxNjg2ZDQzZjU3YzgxIiwiaWF0IjoxNjMwODgzMzY2LCJleHAiOjE2MzA4ODM0MjZ9.EVmB4JbcKgQUoHqNLISHwpcU8lBsFfBRP5Pso8MRCug',
            level: '',
            fullName: '',
            Image: '',
            walletValue: 0,
            creditAmount: '1000',
            rating: 0,
            mobile: '',
            newMobile: '',
            verifycode: '',
            dialogVisibleOk: false,
            modalVisibleEditInfo: false,
            modalVisibleChangeMobile: false,
            modalVisibleInbox: false,
            modalVisibleWallet: false,
            modalVisibleShare: false,
            modalVisibleMyProperty: false,
            modalVisibleSuggestion: false,
            modalVisibleVerifyCode: false,
            part: [
                { id: 0, title: "مورد علاقه", icon: 'heart' },
                { id: 1, title: "آگهی من", icon: 'calendar' },
                { id: 2, title: "پیشنهادها", icon: 'gift' },
            ],
            data: [
                { id: 0, title: "پیام های دریافتی", icon: 'mail' },
                { id: 1, title: "شارژ کیف پول", icon: 'wallet' },
                { id: 2, title: "ویرایش پروفایل", icon: 'form' },
                { id: 3, title: " دعوت از دوستان", icon: 'contacts' },
                { id: 4, title: "تغییر شماره همراه", icon: 'mobile' },
            ],
            inbox: [
                { id: 0, message: "پیام 1" },
                { id: 1, message: "پیام 2" },
            ],
            walletHistory: [
                { id: 0, amount: 8000, date: "1400/5/2", time: "21:35", success: true },
                { id: 1, amount: 7000, date: "1400/5/14", time: "12:20", success: false },
                { id: 2, amount: 7000, date: "1400/5/14", time: "12:25", success: true },
            ]
        };
        this.getUser();
    }

    permissionsContacts() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.',
                'buttonPositive': 'Please accept bare mortal'
            }
        )
            .then(Contacts.getAll)
            .then(contacts => {
            })
    }

    inviteFriends = async () => {
        try {
            const result = await Share.share({
                title: 'وای اپ پتوس رو دیدی؟',
                message: 'من یک اپ در حوزه املاک و ساخت ساز می شناسم به اسم  پتوس که توش میتونی ملکت رو آگهی کنی برای فروش یا اجاره یا اینکه ملک دلخواهت به راحتی پیدا کنی. همین الان رو لینک دعوت زیر بزن و برای عضویت 10 هزار تومن هدیه بگیر.  لینک اپ: https://pethos.app',
                url: 'https://pethos.app',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    randomNumber() {
        var text = '';
        var possible = '123456789';
        for (var i = 0; i < 5; i++) {
            var sup = Math.floor(Math.random() * possible.length);
            text += i > 0 && sup == i ? '0' : possible.charAt(sup);
        }
        return text;
    }

    onclickVerifycode() {
        if (this.state.newMobile === '') {
            this.setState({ messageAlert: 'شماره همراه جدید را وارد نمائید' })
            this.showAlert();
            this.setState({ newMobile: '' })
        }
        else if (this.state.newMobile.length < 11) {
            this.setState({ messageAlert: 'حداقل طول شماره باید 11 کاراکتر باشد' })
            this.showAlert();
            this.setState({ newMobile: '' })
        }
        else {
            this.setState({ verifycode: this.randomNumber() });
            this.sendSMS()
            this.setState({ modalVisibleVerifyCode: true });
        }
    }

    sendSMS() {
        let token;
        fetch('https://RestfulSms.com/api/Token', {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    UserApiKey: 'f2a1c337366e0cd3ddffc337',
                    SecretKey: 'it66)%#teBC!@*&'
                }
            })
        }).then((response) => response.json()).then((responseJson) => {
            if (responseJson.IsSuccessful === true) {
                token = responseJson.TokenKey;

            } else {
                console.log('err')
            }
        }).catch((error) => {
            console.error('err');
        });
        fetch('https://RestfulSms.com/api/UltraFastSend', {
            method: 'POST',
            'headers': {
                'content-type': 'application/json',
                'x-sms-ir-secure-token': token
            },
            body: JSON.stringify({
                data: {
                    ParameterArray: [
                        { Parameter: 'VerificationCode', ParameterValue: this.state.verifycode }
                    ],
                    Mobile: this.state.newMobile,
                    TemplateId: '53415'
                }
            })
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
            if (responseJson.IsSuccessful === true) {
                console.log('ok')
            } else {
                console.log('err')
            }
        }).catch((error) => {
            console.error('err');
        });
    }

    onInputVerifyCodeCompleted = (text) => {
        if (text.localeCompare(this.state.verifycode)) {
            this.setState({ modalVisibleVerifyCode: false })
            fetch('http://api.pethos.app/api/v1/user/changeMobileNumber/' + this.state.userID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: this.state.newMobile,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ messageAlert: ' با موفقیت ثبت شد' });
                    this.showAlert();
                    this.setState({ newMobile: '' })
                }).catch((error) => {
                });
        }
        else {
            this.setState({ messageAlert: 'کد وارد شده صحیح نمی باشد' });
            this.showAlert();
        }
    }

    currencyFormat(num) {
        // return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    clickdialogVisibleOk = (visible) => {
        this.setState({ dialogVisibleOk: visible });
    };
    setModalVisibleMyProperty(visible) {
        this.setState({ modalVisibleMyProperty: visible });
    }
    setModalVisibleSuggestion(visible) {
        this.setState({ modalVisibleSuggestion: visible });
    }
    setModalVisibleInbox(visible) {
        this.setState({ modalVisibleInbox: visible });
    }
    setModalVisibleShare(visible) {
        this.setState({ modalVisibleShare: visible });
    }
    setModalVisibleWallet(visible) {
        this.setState({ modalVisibleWallet: visible });
    }
    setModalVisibleEditInfo(visible) {
        this.setState({ modalVisibleEditInfo: visible });
    }
    setModalVisibleChangeMobile(visible) {
        this.setState({ modalVisibleChangeMobile: visible });
    }

    showPart = (item) => {
        switch (item.id) {
            case 0: this.props.screenProps.navigate('Favorites');
                break;
            case 1: this.setModalVisibleMyProperty(true);
                break;
            case 2: this.setModalVisibleSuggestion(true);
                break;
            default: this.showMessage(`error`)
        }
    }

    showSection = (item) => {
        switch (item.id) {
            case 0: this.setModalVisibleInbox(true);
                break;
            case 1: this.setModalVisibleWallet(true);
                break;
            case 2: this.setModalVisibleEditInfo(true);
                break;
            case 3: this.setModalVisibleShare(true);
                break;
            case 4: this.setModalVisibleChangeMobile(true);
                break;
            default: this.showMessage(`error`)
        }
    }

    showAlert = () => {
        this.setState({ showAlert: true });
    };
    hideAlert = () => {
        this.setState({ showAlert: false });
    };

    componentDidMount() {
        // this.getUser()
        //  this.animate();

    }



    reset = () => {
        this.verifycode.reset()
        this.setState({ codeText: '' })
    }

    // await fetch(Global.base_url + 'discount/category_list', {
    //     method: 'GET',
    //     headers: {
    //         "Auth": Global.user_token,
    //         "Accept": 'application/json',
    //         "Content-Type": 'application/json',
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if(data.status == 1) {
    //         Global.category_list = data.data;
    //     } else {
    //         Alert.alert("Warning!", 'Error');
    //     }

    // })
    // .catch(function(error) {
    //     Alert.alert('Warning!', 'Network error.');
    // }); 
    getToken() {
        fetch('http://api.pethos.app/api/v1/user/getToken/' + this.state.userID, {
            method: 'GET',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            }
        })
            .then((response) => response.json()).then((responseJson) => {
                this.setState({ token: responseJson.data['token'] });
            })
            .catch((error) => { console.error(error); });
    }

    getUser() {
        fetch('http://api.pethos.app/api/v1/user/getUser/' + this.state.userID, {
            method: 'GET',
            headers: {
                "x-access-token": this.state.token,
                "Accept": 'application/json',
                "Content-Type": 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ fullName: responseJson.data['fullName'] });
                this.setState({ mobile: responseJson.data['mobile'] });
                this.setState({ walletValue: responseJson.data['walletValue'] });
                this.setState({ rating: responseJson.data['rating'] });
                this.setState({ Image: responseJson.data['Image'] });
                this.setState({ level: responseJson.data['level'] });
                this.setState({ birthDate: responseJson.data['birthDate'] });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    updateUser = () => {
        fetch('http://api.pethos.app/api/v1/user/updateuser/' + this.state.userID, {
            method: 'PUT',
            headers: {
                "x-access-token": this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: this.state.fullName,
                image: this.state.image,
                birthDate: this.state.birthDate
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // this.setState({ messageAlert: ' با موفقیت ثبت شد' });
                // this.showAlert();
                this.clickdialogVisibleOk(true)
            }).catch((error) => {
            });
    }

    // changeMobile = () => {
    //         fetch('http://api.pethos.app/api/v1/user/changeMobileNumber/' + this.state.userID, {
    //             method: 'PUT',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 mobile: this.state.newMobile,
    //             })
    //         }).then((response) => response.json())
    //             .then((responseJson) => {
    //                 this.setState({ messageAlert: ' با موفقیت ثبت شد' });
    //                 this.showAlert();
    //                 this.setState({ newMobile: '' })
    //             }).catch((error) => {
    //             });
    // }

    animate() {
        this.animatedValue1.setValue(0);

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
            createAnimation(this.animatedValue1, 800, Easing.ease),
        ]).start();
    }

    render() {
        const scale = this.animatedValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.1, 1],
        });
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <View style={styles.colSpan}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                <View>
                                    <Text style={styles.userType}>{this.state.level}</Text>
                                    <Text style={styles.credit}>{['امتیاز: ', this.state.rating]}</Text>
                                    <Text style={styles.credit}>{['اعتبار: ', this.currencyFormat(this.state.walletValue), ' تومان']}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
                                    <View style={{ marginTop: 15 }}>
                                        <Text style={styles.titleCol}>{this.state.fullName}</Text>
                                        <Text style={styles.titleCol}>{this.state.mobile}</Text>
                                    </View>
                                    <Image style={styles.Profile} source={require('../../assets/images/user.png')} />
                                </View>
                            </View>
                        </View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            numColumns={3}
                            data={this.state.part}
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: 5, paddingVertical: 10, alignSelf: 'center' }}
                            keyExtractor={(item) => { return item.id; }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.8} style={styles.col} onPress={() => this.showPart(item)} >
                                        <IconOutline name={item.icon} color='#01A545' size={35} style={{ alignSelf: 'center' }} />
                                        <Text style={styles.titleCol}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            }} />


                    </View>
                    <View style={{ marginTop: 15, backgroundColor: "#fff" }}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingStart: -1,
                                paddingEnd: 5,
                                marginTop: 20
                            }}
                            data={this.state.data}
                            keyExtractor={(item) => {
                                return item.id;
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.showSection(item)}
                                        style={{ paddingHorizontal: '5%', paddingVertical: 15, borderTopWidth: 0.3, borderTopColor: "#bcbcbe" }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <IconOutline name='left' color='#777' size={23} style={{ marginLeft: 5 }} />
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={{ fontFamily: "Dana-FaNum-Bold", fontSize: 12, color: "#444" }}>{item.title}</Text>
                                                <IconOutline name={item.icon} color='#9e9e9e' size={23} style={{ marginHorizontal: 10 }} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }} />
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: '5%', paddingVertical: 15, marginTop: 40 }}>
                            <Text style={{ fontFamily: "Dana-FaNum-Medium", fontSize: 12, color: "#d63032" }}>خروج</Text>
                            <IconOutline name='poweroff' color='#d74f51' size={23} style={{ marginHorizontal: 10 }} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: '5%', paddingBottom: 10 }}>
                            <Text style={{ fontFamily: "Dana-FaNum-Medium", fontSize: 12, color: "#9e9e9e" }}>نسخه 1.0.0</Text>
                            <IconOutline name="copyright" color='#9e9e9e' size={16} style={{ marginLeft: 5, marginRight: 10 }} />
                        </View>
                    </View>
                </ScrollView>

                <Modal animationType={'center'} transparent={true} position={'center'} coverScreen={true} visible={this.state.modalVisibleEditInfo}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>

                        <View style={styles.head}>
                            <IconOutline name="left" color='#777' size={30}
                                onPress={() => { this.setModalVisibleEditInfo(false) }}
                                style={{ marginLeft: 20, textAlign: "left", flex: 1 }} />
                            <Text style={styles.header}>ویرایش پروفایل</Text>
                        </View>
                        <ScrollView>
                            <View style={{ marginTop: 40 }}>
                                <Image style={{ alignSelf: "center", width: 90, height: 90, borderRadius: 60 }} source={require('../../assets/images/user.png')} />
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Text style={styles.txtChangeProfile}>تغییر تصویر پروفایل</Text>
                                </TouchableOpacity>
                                <View style={{ marginTop: 25, paddingHorizontal: 30 }}>
                                    <TextInput
                                        autoFocus
                                        onChangeText={text => this.setState({ fullName: text })}
                                        maxLength={40}
                                        text={'required'}
                                        textContentType={'familyName'}
                                        placeholder="نام و نام خانوادگی"
                                        value={this.state.fullName}
                                        style={styles.textInput}
                                    />
                                    <TextInput
                                        onChangeText={text => this.setState({ birthDate: text })}
                                        maxLength={40}
                                        text={'required'}
                                        textContentType={'familyName'}
                                        placeholder="تاریخ تولد"
                                        value={this.state.birthDate}
                                        style={styles.textInput}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.8} style={styles.modalButtonStyle} onPress={this.updateUser}>
                                    <Text style={styles.txtButton}>ثبت مشخصات</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>


                <Modal animationType={'center'} transparent={true} position={'center'} coverScreen={true} visible={this.state.modalVisibleChangeMobile}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <View style={styles.head}>
                            <IconOutline name="left" color='#777' size={30}
                                onPress={() => { this.setModalVisibleChangeMobile(false) }}
                                style={{ marginLeft: 20, textAlign: "left", flex: 1 }} />
                            <Text style={styles.header}>تغییر شماره همراه</Text>
                        </View>
                        <ScrollView>
                            <View style={{ marginTop: 50, marginHorizontal: "8%" }}>

                                <TextInput
                                    autoFocus
                                    onChangeText={text => this.setState({ newMobile: text })}
                                    maxLength={11}
                                    text={'required'}
                                    textContentType={'telephoneNumber'}
                                    placeholder="موبایل"
                                    keyboardType='numeric'
                                    value={this.state.newMobile}
                                    style={styles.textInput}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={0.8} style={styles.modalButtonStyle} onPress={() => { this.onclickVerifycode() }} >
                                <Text style={styles.txtButton}>ثبت</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    animationType={"slide"}
                    position={'center'}
                    visible={this.state.modalVisibleVerifyCode}>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <View style={styles.verifyContainer}>
                            <Text style={styles.message}>کد تایید شماره همراه که برای شما پیامک شده را وارد نمایید</Text>
                            <Text>{this.state.verifycode}</Text>
                            {/* <SMSVerifyCode
                                ref={ref => (this.state.verifycode = ref)}
                                onInputCompleted={this.onInputVerifyCodeCompleted}
                                verifyCodeLength={5}
                                containerPaddingVertical={5}
                                containerPaddingHorizontal={70}
                                containerBackgroundColor="#fff"
                                codeViewBorderColor="#999"
                                focusedCodeViewBorderColor="#01a545"
                                codeViewBorderWidth={1}
                                codeViewBorderRadius={5}
                            /> */}
                            <View style={styles.row}>
                                <TouchableOpacity activeOpacity={0.8} style={styles.btnReturn} >
                                    <Text style={styles.txtReturn} >لغو</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} style={styles.btnVerify} >
                                    <Text style={styles.txtButton} >تایید</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal animationType={'center'} transparent={true} position={'center'} coverScreen={true} visible={this.state.modalVisibleInbox}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <View style={styles.head}>
                            <IconOutline name="left" color='#777' size={30}
                                onPress={() => { this.setModalVisibleInbox(false) }}
                                style={{ marginLeft: 20, textAlign: "left", flex: 1 }} />
                            <Text style={styles.header}>صندوق ورودی</Text>
                        </View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={this.state.inbox}
                            keyExtractor={(item) => {
                                return item.id;
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ borderBottomColor: "#f2f1f1", borderBottomWidth: 1, paddingHorizontal: 20, paddingVertical: 10 }}>
                                        <Text style={styles.message}>{item.message}</Text>
                                    </View>
                                )
                            }} />
                    </View>
                </Modal>

                <Modal animationType={'center'} transparent={true} position={'center'} coverScreen={true} visible={this.state.modalVisibleWallet}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <View style={styles.head}>
                            <IconOutline name="left" color='#777' size={30}
                                onPress={() => { this.setModalVisibleWallet(false) }}
                                style={{ marginLeft: 20, textAlign: "left", flex: 1 }} />
                            <Text style={styles.header}>مدیریت کیف پول</Text>
                        </View>
                        <ScrollView>
                            <View style={{ marginTop: 20, marginHorizontal: 40, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={styles.credit}>{[this.currencyFormat(this.state.walletValue), ' تومان']}</Text>
                                <Text style={[styles.credit, { marginLeft: 5 }]}>اعتبار فعلی شما:</Text>
                            </View>
                            <View style={{ justifyContent: "space-between", marginTop: 20, marginHorizontal: 30, flexDirection: 'row' }}>
                                <IconOutline name='minus' color='#9e9e9e' size={20} onPress={() => this.setState({ creditAmount: this.state.creditAmount.substr(0, this.state.creditAmount.length - 1) })} style={{ marginTop: 20 }} />
                                <TextInput
                                    onChangeText={text => this.setState({ creditAmount: text })}
                                    text={'required'}
                                    textContentType={'familyName'}
                                    keyboardType={'numeric'}
                                    placeholder="مبلغ اعتبار (تومان)"
                                    value={this.state.creditAmount}
                                    style={styles.creditInput}
                                />
                                <IconOutline name='plus' color='#9e9e9e' size={20} onPress={() => this.setState({ creditAmount: this.state.creditAmount + 0 })} style={{ marginTop: 20 }} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, paddingHorizontal: 10 }}>
                                <Text style={styles.message}>حداقل شارژ اعتبار {this.currencyFormat(1000)} و حداکثر {this.currencyFormat(1000000)} تومان است</Text>
                                <IconOutline name='info-circle' color='#9e9e9e' size={18} style={{ marginLeft: 10 }} />
                            </View>
                            <TouchableOpacity activeOpacity={0.8} style={styles.modalButtonStyle}>
                                <Text style={styles.txtButton}>پرداخت اعتبار</Text>
                            </TouchableOpacity>
                            <View style={{ marginTop: 50 }}>
                                <Collapse isExpanded={false} style={styles.Collapse}>
                                    <CollapseHeader style={{ padding: 10 }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <IconOutline name='left' color='#555' size={28} style={{ marginLeft: 5 }} />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <Text style={styles.message}>تاریخچه اعتبار </Text>
                                                <IconOutline name="history" color='#9e9e9e' size={30} style={{ marginLeft: 15, marginTop: -5 }} />
                                            </View>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{
                                                paddingStart: -1,
                                                paddingEnd: 5,
                                                marginTop: 10,
                                            }}
                                            data={this.state.walletHistory}
                                            keyExtractor={(item) => {
                                                return item.id;
                                            }}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View style={{ backgroundColor: "#fff", marginVertical: 5 }}>
                                                        <View style={[styles.row, { backgroundColor: "#fff", borderTopColor: "#ececec", borderTopWidth: 0.8 }]}>
                                                            <Text style={styles.message}>{[item.amount, " تومان "]}</Text>
                                                            <Text style={styles.message}>{item.time}</Text>
                                                            <Text style={styles.message}>{item.date}</Text>
                                                            <IconOutline name='check-circle' color='#01a545' size={16} style={{ marginLeft: 5, marginTop: 2 }} />
                                                        </View>
                                                    </View>
                                                )
                                            }} />
                                    </CollapseBody>
                                </Collapse>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
                <Modal animationType={'center'} transparent={true} position={'center'} coverScreen={true} visible={this.state.modalVisibleShare}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>
                        <View style={styles.head}>
                            <IconOutline name="left" color='#777' size={30}
                                onPress={() => { this.setModalVisibleShare(false) }}
                                style={{ marginLeft: 20, textAlign: "left", flex: 1 }} />
                            <Text style={styles.header}>دعوت از دوستان</Text>
                        </View>
                        <ScrollView>
                            <View style={{ marginTop: 20, marginHorizontal: 20, justifyContent: 'center', alignItems: "center" }}>
                                <Text style={{ color: "#01a545", fontSize: 14, fontFamily: "Dana-FaNum-Bold" }}>
                                    با دعوت از دوستان خود تا یک میلیون تومان هدیه بگیرید
                                </Text>
                                <Text style={{ textAlign: "right", fontFamily: "Dana-FaNum-Medium", color: "#555", marginTop: 20, fontSize: 14 }}>
                                    با دعوت از هر دوست جدید به پتوس، 10 هزار تومان هدیه بگیرید. لینک دعوت خود را برای دوستت ارسال کن و کیف پولت شارژ کن
                                </Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.inviteFriends} style={styles.modalButtonStyle}>
                                <Text style={styles.txtButton}>دعوت از دوستان</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </Modal>

                {/* <Dialog visible={this.state.dialogVisibleOk} dialogStyle={styles.dialog} onTouchOutside={() => this.setState({ dialogVisibleOk: false })}>
                    <IconOutline name='check-circle' color='#01a545' size={40} onPress={() => { this.clickdialogVisibleOk(false) }} />
                </Dialog> */}

                {/* <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    message={this.state.messageAlert}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="بسیار خب"
                    confirmButtonColor="#01a545"
                    confirmButtonTextStyle={{ fontSize: 12, fontFamily: 'Dana-FaNum-Bold' }}
                    messageStyle={{ fontSize: 12, fontFamily: 'Dana-FaNum-Medium', paddingHorizontal: 10 }}
                    onConfirmPressed={() => { this.hideAlert(); }}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    head: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -25,
        paddingTop: 25,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.89,
        shadowRadius: 4.65,
        elevation: 4,
    },
    header: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14,
        fontFamily: 'Dana-FaNum-Bold',
        color: '#444',
        marginRight: 20
    },
    Collapse: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: "#9e9e9e",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 12,
            marginTop: 5,
            marginLeft: 10,
            marginBottom: 10,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
        elevation: 1
    },
    dialog: {
        backgroundColor: '#fff',
        width: 85,
        height: 85,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: "#f8f8f8",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 12,
            marginBottom: 10,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 5
    },
    col: {
        width: width / 3 - 25,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        marginHorizontal: 5,
        paddingBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
            marginRight: 12,
            marginBottom: 10,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 3
    },
    colSpan: {
        width: "90%",
        marginTop: 40,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 30,
        shadowColor: "#f8f8f8",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 12,
            marginBottom: 10,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 2
    },
    Profile: {
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    credit: {
        fontSize: 12,
        marginTop: -5,
        fontSize: 12,
        color: '#444',
        fontFamily: "Dana-FaNum-Medium"
    },
    titleCol: {
        alignSelf: 'center',
        fontSize: 12,
        color: '#444',
        fontFamily: "Dana-FaNum-Medium",
    },
    message: {
        textAlign: 'right',
        fontSize: 12,
        color: '#444',
        fontFamily: "Dana-FaNum-Medium",
    },
    creditInput: {
        //backgroundColor: '#f5f5f5',
        padding: 10,
        fontFamily: 'Dana-FaNum-Medium',
        borderRadius: 5,
        borderColor: "#999",
        borderWidth: 0.5,
        borderStyle: 'solid',
        width: '80%',
        marginHorizontal: 10
    },
    textInput: {
        //backgroundColor: '#f5f5f5',
        padding: 10,
        fontFamily: 'Dana-FaNum-Medium',
        borderRadius: 5,
        marginVertical: 5,
        borderColor: "#999",
        borderWidth: 0.5,
        borderStyle: 'solid',
    },
    buttonStyle: {
        backgroundColor: "#01A545",
        paddingHorizontal: 5,
        paddingVertical: 6,
        marginHorizontal: '3%',
        borderRadius: 10,
        marginTop: 15
    },
    txtButton: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "Dana-FaNum-Bold",
    },
    userType: {
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 12,
        color: '#01A545',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 20,
        textAlign: "center",
        marginTop: -5
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
        shadowColor: "#9e9e9e",
        shadowOffset: {
            width: 0,
            height: 1,
            marginRight: 12,
            marginTop: 5,
            marginLeft: 10,
            marginBottom: 10,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
        elevation: 1,
        paddingVertical: 20,
        borderRadius: 20
    },
    btnVerify: {
        backgroundColor: "#01A545",
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 10
    },
    btnReturn: {
        backgroundColor: "#fff",
        borderColor: "#01a545",
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 10
    },
    row: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    ///modal edit info

    section: {
        backgroundColor: "#fff",
        marginHorizontal: 0,
        marginBottom: 10,
        paddingHorizontal: 25,
        paddingVertical: 30
    },
    txtChangeProfile: {
        color: "#666",
        textAlign: "center",
        fontFamily: "Dana-FaNum-Bold",
        marginTop: 15
    },
    modalButtonStyle: {
        backgroundColor: "#01A545",
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginHorizontal: "8%",
        borderRadius: 5,
        marginTop: 30
    },
    modalButtonStyle2: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: "#01A545",
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 30,
        flexDirection: "row"
    },

});