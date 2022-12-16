import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, BackHandler, TouchableOpacity, Alert, FlatList } from 'react-native';
import { IconOutline } from "@ant-design/icons-react-native";
import { SliderBox } from "react-native-image-slider-box";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dialog } from 'react-native-simple-dialogs';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SliderUrl: [
                require("../../assets/images/1.jpg"),
                require("../../assets/images/2.jpg"),
                require("../../assets/images/3.jpg"),
            ],
            property: [
                {
                    id: 1,
                    title: "خانه دو خوابه جدید ساز",
                    image: require("../../assets/images/1.jpg"),
                    price: "20000",
                    transactionType: "اجاره",
                    priceType: 0,
                    adress: " کوی اساتید کوچه اساتید 2",
                    bed: 2,
                    bath: 1,
                    age: 3,
                    area: 160,
                },
                {
                    id: 2,
                    title: "خانه دو خوابه جدید ساز",
                    image: require("../../assets/images/1.jpg"),
                    price: "20000",
                    transactionType: "فروش",
                    priceType: 1,
                    adress: "میدان علوی کوچه آرش 2",
                    bed: 2,
                    bath: 1,
                    age: 3,
                    area: 160,
                },
                {
                    id: 3,
                    title: "خانه دو خوابه جدید ساز",
                    image: require("../../assets/images/1.jpg"),
                    price: "20000",
                    transactionType: "اجاره",
                    priceType: 0,
                    adress: "میدان 22 بهمن فاز یک",
                    bed: 2,
                    bath: 1,
                    age: 3,
                    area: 160,
                },
                {
                    id: 4,
                    title: "خانه دو خوابه جدید ساز",
                    image: require("../../assets/images/1.jpg"),
                    price: "20000",
                    transactionType: "فروش",
                    priceType: 1,
                    adress: "خیابان مطهری",
                    bed: 2,
                    bath: 1,
                    age: 3,
                    area: 160,
                },

            ],
        }
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    }

    backPressed = () => {
        if (this.props.navigation.isFocused()) {
            Alert.alert(
                "",
                "آیا قصد خروج از اپلیکیشن را دارید؟",
                [
                    {
                        text: "خیر",
                        onPress: () => console.log("Cancel Pressed"),
                        style:{fontSize:30},
                    },
                    { text: "بله", onPress: () => BackHandler.exitApp() },
                ],
                { cancelable: false },
             
            );
            return true;
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor='#32cd32' />
                <View style={styles.head}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* <Icon name='search' color='#fff' size={25} style={{ marginLeft: 5 }} /> */}
                        <IconOutline name="search" color='#fff' size={30}
                            style={{ marginLeft: 15 }} />
                        <IconOutline name="filter" color='#fff' size={25} style={{ marginLeft: 10, textAlign: "right", }} />
                        <Text style={styles.header}>پتوس</Text>
                        <IconOutline name="menu" color='#fff' size={28} onPress={() => this.props.navigation.openDrawer()}
                            style={{ marginRight: 20, textAlign: "right", }} />
                    </View>
                </View>
                <SliderBox autoplay circleLoop autoplayInterval={5000}
                    images={this.state.SliderUrl} style={styles.slider}
                    position={this.state.position}
                    onPositionChanged={position => this.setState({ position })}
                    dotColor="#01A545"
                    resizeMethod={"resize"}
                    resizeMode={"cover"}
                    inactiveDotColor="#fff"
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 10,
                        marginHorizontal: 2,
                        padding: 0,
                        margin: 0,
                    }}
                    paginationBoxStyle={{
                        position: "absolute",
                        bottom: 0,
                        padding: 0,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        paddingVertical: 10,
                    }} />

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    inverted
                    contentContainerStyle={{
                        paddingStart: 1,
                        paddingEnd: 5,
                    }}
                    data={this.state.property}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                height: 590,
                                paddingVertical: 15,
                                paddingHorizontal: 5

                            }}>
                                <View style={{
                                    width: 220,
                                    borderRadius: 5,
                                    padding: 5,
                                    marginHorizontal: 2,
                                    backgroundColor: '#fff',
                                    marginHorizontal: 2,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.89,
                                    shadowRadius: 4.65,
                                    elevation: 2,

                                }}>
                                    <TouchableOpacity activeOpacity={0.8}
                                        onPress={() => this.props.navigation.navigate("PropertyDetail")}>
                                        <Image style={styles.coverImage} source={item.image} />
                                        <View style={styles.textView}>
                                            <Text style={[styles.imageText, { backgroundColor: (item.priceType === 0 ? "rgba(1, 165, 69, 0.8)" : "rgba(253, 185, 60, 0.8)"), color: '#fff' }]}>{(item.priceType === 0 ? "به قیمت" : "مناسب")}</Text>
                                            <Text style={styles.imageText}>{item.transactionType}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ marginTop: -3, marginHorizontal: 15, marginBottom: 10 }}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <View style={styles.row}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.icon}>{[item.bath, " حمام"]}</Text>
                                                <IconOutline name="inbox" color='#a4a4a4' size={22} />
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.icon}>{[item.bed, " خوابه"]}</Text>
                                                <View>
                                                    <IconOutline name="layout" color='#a4a4a4' size={22} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.icon}>{[item.area, " متر "]}</Text>
                                                <IconOutline name="expand" color='#a4a4a4' size={22} />
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.icon}>{[item.age, "  سال "]}</Text>
                                                <IconOutline name="calendar" color='#a4a4a4' size={22} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        );
                    }
                    }
                />

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    //inverted
                    contentContainerStyle={{
                        paddingStart: -1,
                        paddingEnd: 10,
                        marginTop: 5,
                    }}
                    data={this.state.property}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ backgroundColor: "#fff", marginVertical: 3 }}>
                                <TouchableOpacity activeOpacity={0.9}>
                                    <View style={[styles.row, { backgroundColor: "#fff", borderTopColor: "#ececec", borderTopWidth: 0.8 }]}>
                                        <View style={{ flex: 2, flexDirection: "column", marginRight: 10 }}>
                                            <Text style={styles.title}>{item.title}</Text>
                                            <View>
                                                <View style={styles.row}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={styles.icon}>{[item.bath, " حمام"]}</Text>
                                                        <Icon name='bath' color='#a4a4a4' size={25} style={{ marginLeft: 2 }} />
                                                    </View>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={styles.icon}>{[item.bed, " خوابه"]}</Text>
                                                        <View>
                                                            <Icon name='bed' color='#a4a4a4' size={25} style={{ marginLeft: 2 }} />
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={styles.row}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={styles.icon}>{[item.area, " متر "]}</Text>
                                                        <IconOutline name="expand" color='#a4a4a4' size={25} style={{ marginLeft: 2 }} />
                                                    </View>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={styles.icon}>{[item.age, " سال"]}</Text>
                                                        <IconOutline name="calendar" color='#a4a4a4' size={25} style={{ marginLeft: 2 }} />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 2 }}>
                                            <Image style={styles.coverImage} source={item.image} />
                                            <View style={styles.textView}>
                                                <Text style={[styles.imageText, { backgroundColor: (item.priceType === 0 ? "rgba(1, 165, 69, 0.8)" : "rgba(253, 185, 60, 0.8)"), color: '#fff' }]}>{(item.priceType === 0 ? "به قیمت" : "مناسب")}</Text>
                                                <Text style={styles.imageText}>{item.transactionType}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }
                    }
                />

            </View>
        );
    }
}


const styles = StyleSheet.create({

    coverImage: {
        width: "100%",
        height: 120,
        borderRadius: 5,
    },
    textView: {
        position: 'absolute',
        flexDirection: 'row',
        top: 5,
        justifyContent: "space-between",
        // paddingHorizontal: 25,
        alignContent: 'stretch',
    },
    imageText: {
        color: '#444',
        fontFamily: "Dana-FaNum-Medium",
        fontSize: 11,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(192,192,192, 0.8)',
        flex: 1,
        textAlign: 'center',
    },
    head: {
        backgroundColor: '#01A545',
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    header: {
        flex: 1,
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'Ghonche',
        color: '#fff'
    },
    slider: {
        width: "100%",
        height: 180,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    row: {
        paddingTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },
    touchableStyle: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 35,
    },
    sectionContainer: {
        backgroundColor: "#fff",
        padding: 5,
        marginTop: 10,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 13,
        textAlign: "center",
        fontFamily: "Dana-FaNum-Bold",
        color: "#777",
    },
    title: {
        fontSize: 12,
        fontFamily: "Dana-FaNum-Bold",
        color: "#666",
        marginTop: 10
    },
    propertyImage: {
        flex: 2,
        width: 140,
        height: 110,
        borderRadius: 5,
        marginLeft: 5,
    },
    icon: {
        fontFamily: "Dana-FaNum-Medium",
        fontSize: 10,
        color: "#555",
        marginTop: 4,
        marginHorizontal: 5,
    },
    priceType: {
        fontFamily: "Dana-FaNum-Medium",
        fontSize: 12,
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 20,
    },
});
