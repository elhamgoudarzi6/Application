import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { IconOutline } from "@ant-design/icons-react-native";
const Config = require('../config');
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
const { width } = Dimensions.get('window');
import Header from "../layouts/Header";

export default class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            isLoading: true,
            faq: [],
        };
        this.getAllFaq();
    }

    componentDidMount() {
        this.getAllFaq();
    }

    getAllFaq() {
        fetch(Config.baseUrl + 'getAllFaq').then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    faq: responseJson.data
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title="سوالات متداول" onBackPress={() => { this.props.navigation.goBack() }} />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingStart: -1,
                        paddingEnd: 5,
                        marginTop: 30
                    }}
                    data={this.state.faq}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <Collapse isExpanded={(item.id === 0 ? true : false)} style={styles.Collapse}>
                                <CollapseHeader style={{ paddingHorizontal: 5, paddingVertical: 8, flexDirection: "row" }}>
                                    <IconOutline name='left' color='#555' size={18} style={{ textAlign: "left", marginRight: 5, marginTop: 2 }} />
                                    <Text style={styles.question}>{item.question}</Text>
                                    <IconOutline name="question-circle" color='#777' size={23} style={{ marginLeft: 5, textAlign: "right", }} />
                                </CollapseHeader>
                                <CollapseBody style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Text style={styles.reply}>
                                        {item.reply}
                                    </Text>
                                </CollapseBody>
                            </Collapse>
                        )
                    }
                    }
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    Collapse: {
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderColor: "#999",
        padding: 5,
        borderWidth: 0.5,
        borderStyle: 'solid',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.89,
        // shadowRadius: 4.65,
        // elevation: 3,
    },
    question: {
        fontFamily: 'Dana-FaNum-Bold',
        fontSize: 13,
        textAlign: "right",
        color: "#666",
        width: width - 100,
    },
    reply: {
        marginTop: 10,
        marginBottom: 5,
        fontFamily: 'Dana-FaNum-Medium',
        fontSize: 13,
        marginHorizontal: 10,
        textAlign: 'right',
        color: "#777"
    },
});







// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList, useWindowDimensions } from 'react-native';
// import { IconOutline } from "@ant-design/icons-react-native";
// const Config = require('../config');
// import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
// import Header from "../layouts/Header";

// export default function Faq(props) {
//     const [faq, setFaq] = useState([]);
//     useEffect(() => { getAllFaq() }, []);

//     function getAllFaq() {
//         fetch(Config.baseUrl + 'getAllFaq').then((response) => response.json())
//             .then((responseJson) => { setFaq(responseJson.data) })
//             .catch((error) => { console.error(error) });
//     }

//     return (
//         <View style={styles.container}>
//             <Header title="سوالات متداول" onBackPress={() => { props.navigation.goBack() }} />
//             <FlatList
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={{
//                     paddingStart: -1,
//                     paddingEnd: 5,
//                     marginTop: 30
//                 }}
//                 data={faq}
//                 keyExtractor={(item) => {
//                     return item.id;
//                 }}
//                 renderItem={({ item }) => {
//                     return (
//                         <Collapse isExpanded={(item.id === 0 ? true : false)} style={styles.Collapse}>
//                             <CollapseHeader style={{ paddingHorizontal: 5, paddingVertical: 8, flexDirection: "row" }}>
//                                 <IconOutline name='left' color='#555' size={18} style={{ textAlign: "left", marginRight: 5, marginTop: 2 }} />
//                                 <Text style={styles.question}>{item.question}</Text>
//                                 <IconOutline name="question-circle" color='#777' size={23} style={{ marginLeft: 5, textAlign: "right", }} />
//                             </CollapseHeader>
//                             <CollapseBody style={{ alignItems: "center", justifyContent: "center" }}>
//                                 <Text style={styles.reply}>
//                                     {item.reply}
//                                 </Text>
//                             </CollapseBody>
//                         </Collapse>
//                     )
//                 }
//                 }
//             />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     Collapse: {
//         backgroundColor: "#fff",
//         marginHorizontal: 10,
//         marginVertical: 5,
//         borderRadius: 5,
//         borderColor: "#999",
//         padding: 5,
//         borderWidth: 0.5,
//         borderStyle: 'solid',
//         // shadowColor: "#000",
//         // shadowOffset: {
//         //     width: 0,
//         //     height: 1,
//         // },
//         // shadowOpacity: 0.89,
//         // shadowRadius: 4.65,
//         // elevation: 3,
//     },
//     question: {
//         fontFamily: 'Dana-FaNum-Bold',
//         fontSize: 13,
//         textAlign: "right",
//         color: "#666",
//         width: useWindowDimensions().width - 100,
//     },
//     reply: {
//         marginTop: 10,
//         marginBottom: 5,
//         fontFamily: 'Dana-FaNum-Medium',
//         fontSize: 13,
//         marginHorizontal: 10,
//         textAlign: 'right',
//         color: "#777"
//     },
// });






