import * as React from 'react';
import { View, StyleSheet, useWindowDimensions, Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { IconOutline } from "@ant-design/icons-react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import About from '../screens/about';
import Contact from '../screens/contact';
import Faq from '../screens/faq';
import News from '../screens/news';
import Tabs from '../layouts/BottomTabs';

const Stack = createStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} nestedScrollEnabled={true}>
      <View style={styles.head}>
        {/* <Image style={styles.logo} source={require('../../assets/images/user.png')} /> */}
        <Text style={styles.name}>پتوس</Text>
      </View>
      <View style={styles.menuItemsCard}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => { props.navigation.navigate('Tabs') }}
          style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={styles.label}>صفحه اصلی</Text>
          <IconOutline name="home" color='#777' size={23} style={{ marginLeft: 10, textAlign: "right", }} />
        </TouchableOpacity>
      </View>
      <View style={styles.menuItemsCard}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => { props.navigation.navigate('News') }}
          style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={styles.label}>اخبار پتوس</Text>
          <Icon name='newspaper-o' color='#777' size={23} style={{ marginLeft: 10, textAlign: "right", }} />
        </TouchableOpacity>
      </View>
      <View style={styles.menuItemsCard}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => { props.navigation.navigate('Faq') }}
          style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={styles.label}>سوالات متداول</Text>
          <IconOutline name="question-circle" color='#777' size={23} style={{ marginLeft: 10, textAlign: "right", }} />
        </TouchableOpacity>
      </View>
      <View style={styles.menuItemsCard}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => { props.navigation.navigate('About') }}
          style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={styles.label}>درباره ما</Text>
          <IconOutline name="info-circle" color='#777' size={23} style={{ marginLeft: 10, textAlign: "right", }} />
        </TouchableOpacity>
      </View>
      <View style={styles.menuItemsCard}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => { props.navigation.navigate('Contact') }}
          style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={styles.label}>تماس با ما</Text>
          <IconOutline name="phone" color='#777' size={23} style={{ marginLeft: 10, textAlign: "right", }} />
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function Dashboard() {
  return (
    <NavigationContainer>
      <StatusBar hidden={false} backgroundColor='#32cd32' />
      <Drawer.Navigator
        initialRouteName={"Tabs"}
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
          drawerStyle: {
            width: useWindowDimensions().width * 0.6,
          },
        }}
        drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Tabs" component={Tabs} />
        <Drawer.Screen name="Faq" component={Faq} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Contact" component={Contact} />
        <Drawer.Screen name="News" component={News} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    paddingBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: 30
  },
  menuItemsCard: {
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 10,
    paddingRight: 20
  },
  label: {
    fontSize: 13,
    textAlign: 'right',
    fontFamily: 'Dana-FaNum-Bold',
    color: "#444",
  },
  name: {
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Ghonche',
    color: "#01A545",
    paddingTop: 25
  }
});