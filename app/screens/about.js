import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from "../layouts/Header";

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [

        {
          id: 1,
          level: "معاون",
          title: 'ابوذر ملکی',
          image: require('../../assets/images/user.png'),
        },
        {
          id: 2,
          title: 'مصیب ملکی',
          level: "مدیرعامل",
          image: require('../../assets/images/user.png'),
        },
        {
          id: 3,
          title: 'مصیب ملکی',
          level: " مدیر داخلی",
          image: require('../../assets/images/user.png'),
        },
        {
          id: 4,
          title: 'مصیب ملکی',
          level: "مدیر فناوری ",
          image: require('../../assets/images/user.png'),
        },
        {
          id: 5,
          title: 'مصیب ملکی',
          level: "مدیر فناوری ",
          image: require('../../assets/images/user.png'),
        },
        {
          id: 6,
          title: 'مصیب ملکی',
          level: "مدیر فناوری ",
          image: require('../../assets/images/user.png'),
        },
        {
          id: 7,
          title: 'مصیب ملکی',
          level: "مدیر فناوری ",
          image: require('../../assets/images/user.png'),
        },
        {
          id: 8,
          title: 'مصیب ملکی',
          level: "مدیر فناوری ",
          image: require('../../assets/images/user.png'),
        },
      ]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title="درباره ما" onBackPress={() => { this.props.navigation.goBack() }} />
        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.header}>درباره پتوس</Text>
            <Text style={styles.paragraph}>
              اپلیکیشن پتوس  فعالیت خود را از سال 1400 در حوزه خرید و فروش رهن و اجاره  انواع ملک آغاز نموده است. پتوس فعال در حوزه بازاریابی و فروش انواع ملک می باشد. پتوس   فروش را آغاز تعاملی با مشتریان خود می داند تا با آسودگی خاطر تمامی نیازهای مشتریان را فراهم نماید. پتوس  رعایت جانب انصاف و صداقت را بعنوان اصلی ترین پایه  اعتماد  سرلوحه کار خود می داند.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>چرا پتوس</Text>
            <Text style={styles.paragraph}>
              اپلیکیشن پتوس  فعالیت خود را از سال 1400 در حوزه خرید و فروش رهن و اجاره  انواع ملک آغاز نموده است. پتوس فعال در حوزه بازاریابی و فروش انواع ملک می باشد. پتوس   فروش را آغاز تعاملی با مشتریان خود می داند تا با آسودگی خاطر تمامی نیازهای مشتریان را فراهم نماید. پتوس  رعایت جانب انصاف و صداقت را بعنوان اصلی ترین پایه  اعتماد  سرلوحه کار خود می داند.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>تیم پتوس</Text>
          </View>
          <FlatList nestedScrollEnabled
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}
            data={this.state.data}
            numColumns={2}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity style={{ marginHorizontal: 25, marginVertical: 5 }}
                    activeOpacity={1}
                    onPress={() => { this.clickEventListener(item); }}>
                    <View>
                      <Image style={{ alignSelf: 'center' }} source={item.image} />
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.level}>{item.level}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 5,
    paddingHorizontal: 25,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  header: {
    color: "#555",
    marginTop: 10,
    fontFamily: 'Dana-FaNum-Bold',
    fontSize: 14,
    textAlign: "center",
  },
  paragraph: {
    color: "#555",
    fontFamily: 'Dana-FaNum-Medium',
    fontSize: 12,
    textAlign: "right",
  },
  title: {
    fontFamily: 'Dana-FaNum-Bold',
    fontSize: 12,
    color: "#666",
    textAlign: 'center',
  },
  level: {
    fontFamily: 'Dana-FaNum-Medium',
    fontSize: 12,
    color: "#01A545",
    textAlign: 'center'
  },

});
