import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

function RentScreen() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 15, paddingHorizontal: 30 }}>
        <TextInput
          onChangeText={text => setText(text)}
          editable
          maxLength={40}
          text={'required'}
          textContentType={'familyName'}
          placeholder='عنوان ملک'
          value={text}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={text => setText(text)}
          editable
          maxLength={40}
          text={'required'}
          textContentType={'familyName'}
          placeholder='قیمت ملک'
          value={text}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={text => setText(text)}
          editable
          maxLength={40}
          text={'required'}
          textContentType={'familyName'}
          placeholder='تعداد حمام'
          value={text}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={text => setText(text)}
          editable
          maxLength={40}
          text={'required'}
          textContentType={'familyName'}
          placeholder='تعداد خواب'
          value={text}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={text => setText(text)}
          editable
          multiline
          numberOfLines={6}
          maxLength={40}
          text={'required'}
          textContentType={'familyName'}
          placeholder='آدرس ملک'
          value={text}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle} >
        <Text style={styles.txtButton}>ثبت آگهی</Text>
      </TouchableOpacity>
    </View>
  );
}

function SellScreen() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 15, paddingHorizontal: 30 }}>
        <TextInput
          onChangeText={text => setText(text)}
          editable
          maxLength={40}
          text={'required'}
          textContentType={'familyName'}
          placeholder='عنوان ملک'
          value={text}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={text => setText(text)}
          editable
          maxLength={40}
          text={'required'}
          textContentType={'familyName'}
          placeholder='قیمت ملک'
          value={text}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={text => setText(text)}
          editable
          maxLength={40}
          text={'required'}
          textContentType={'familyName'}
          placeholder='تعداد حمام'
          value={text}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={text => setText(text)}
          editable
          maxLength={40}
          text={'required'}
          textContentType={'familyName'}
          placeholder='تعداد خواب'
          value={text}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={text => setText(text)}
          editable
          multiline
          numberOfLines={6}
          maxLength={40}
          text={'required'}
          textContentType={'familyName'}
          placeholder='آدرس ملک'
          value={text}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle} >
        <Text style={styles.txtButton}>ثبت آگهی</Text>
      </TouchableOpacity>
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={"RentScreen"}
      screenOptions={{
        showIcon: true,
        headerShown: false,
        tabBarLabelStyle: { fontSize: 14, fontFamily: "Dana-FaNum-Bold", },
        tabBarActiveTintColor: '#01A545',
        tabBarInactiveTintColor: '#999',
        tabBarPressColor: '#fcfcfc',
        tabBarSelectedItemStyle: {
          borderBottomWidth: 2,
          borderBottomColor: '#01A545',
        },
      }}
    >
      <Tab.Screen name="اجاره" component={RentScreen} />
      <Tab.Screen name="فروش" component={SellScreen} />
    </Tab.Navigator>
  );
}

export default class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{ marginTop: 20, flex: 1 }}>
        <MyTabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  text: {
    fontFamily: 'Dana-FaNum-Medium',
    fontSize: 20,
    color: '#01A545',
    marginTop: 30,
    marginRight: 20
  },
  buttonStyle: {
    backgroundColor: "#01A545",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 30,
    borderRadius: 5,
    marginTop: 25
  },
  txtButton: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Dana-FaNum-Bold",
  },
});