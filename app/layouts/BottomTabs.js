import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { IconOutline, IconFill } from "@ant-design/icons-react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Profile from '../screens/profile';
import AddProperty from '../screens/addProperty';

const Tab = createBottomTabNavigator();

function TabBar({ state, descriptors, navigation }) {
    return (
        <View style={styles.tabBar}>
            <StatusBar hidden={false} backgroundColor='#32cd32' />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;
                let iconName;
                if (route.name === 'پتوس') {
                    iconName = isFocused ? 'shop' : 'shop';
                } else if (route.name === 'حساب من') {
                    iconName = isFocused ? 'user' : 'user';
                } else if (route.name === 'ثبت آگهی') {
                    iconName = isFocused ? 'plus-circle' : 'plus-circle';
                }
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabItem}>
                        <IconOutline name={iconName} color={isFocused ? '#01A545' : '#999'} size={23} style={{ textAlign: "center" }} />
                        <Text style={{ color: isFocused ? '#01A545' : '#999', textAlign: "center", fontFamily: 'Dana-FaNum-Bold', fontSize: 12 }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


export default function Tabs() {
    return (
        <Tab.Navigator 
            initialRouteName={"Home"}
            screenOptions={{
                headerShown: false,
                lazy: false,
            }}
            tabBar={props => <TabBar {...props} />}>
            <Tab.Screen name="پتوس" component={Home} />
            <Tab.Screen name="ثبت آگهی" component={AddProperty} />
            <Tab.Screen name="حساب من" component={Profile} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row-reverse',
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderTopColor: '#ddd',
        borderTopWidth: 0.5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.19,
        shadowRadius: 4.65,
        elevation: 7,
    },
    tabItem: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});






// const Tab = createBottomTabNavigator();
// function Tabs() {
//     return (
//         <Tab.Navigator
//             initialRouteName="Contact"
//             screenOptions={{
//                 tabBarActiveTintColor: '#01A545',
//                 tabBarInactiveTintColor: '#999',
//                 tabBarLabelStyle: { fontFamily: 'Dana-FaNum-Bold', fontSize: 13 },
//                 tabBarStyle: { paddingVertical: 5, borderTopLeftRadius: 35, borderTopRightRadius: 35, backgroundColor: '#fff', position: 'absolute', height: 55 },
//                 headerShown: false,
//             }}
//         >
//             <Tab.Screen name="درباره" component={About}
//             />
//             <Tab.Screen name="تماس" component={Contact}
//             />
//         </Tab.Navigator>
//     );
// }
