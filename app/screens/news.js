import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Header from "../layouts/Header";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [
        {
          id: 1,
          title: "بازار کساد املاک در بورس تهران",
          image: require("../../assets/images/1.jpg"),
          abstract: "در اطلاعیه‌های منتشر شده در سامانه کدال در خصوص افشای اطلاعات با اهمیت مانند روز گذشته برخی شرکت های سرمایه گذاری و بانک ها از به نتیجه نرسیدن مزایده املاک و سهام خود صحبت کردند."

        },
        {
          id: 2,
          title: "بازار کساد املاک در بورس تهران",
          image: require("../../assets/images/1.jpg"),
          abstract: "در اطلاعیه‌های منتشر شده در سامانه کدال در خصوص افشای اطلاعات با اهمیت مانند روز گذشته برخی شرکت های سرمایه گذاری و بانک ها از به نتیجه نرسیدن مزایده املاک و سهام خود صحبت کردند."

        },
        {
          id: 3,
          title: "بازار کساد املاک در بورس تهران",
          image: require("../../assets/images/1.jpg"),
          abstract: "در اطلاعیه‌های منتشر شده در سامانه کدال در خصوص افشای اطلاعات با اهمیت مانند روز گذشته برخی شرکت های سرمایه گذاری و بانک ها از به نتیجه نرسیدن مزایده املاک و سهام خود صحبت کردند."

        },
        {
          id: 4,
          title: "بازار کساد املاک در بورس تهران",
          image: require("../../assets/images/1.jpg"),
          abstract: "در اطلاعیه‌های منتشر شده در سامانه کدال در خصوص افشای اطلاعات با اهمیت مانند روز گذشته برخی شرکت های سرمایه گذاری و بانک ها از به نتیجه نرسیدن مزایده املاک و سهام خود صحبت کردند."
        },
        {
          id: 5,
          title: "بازار کساد املاک در بورس تهران",
          image: require("../../assets/images/1.jpg"),
          abstract: "در اطلاعیه‌های منتشر شده در سامانه کدال در خصوص افشای اطلاعات با اهمیت مانند روز گذشته برخی شرکت های سرمایه گذاری و بانک ها از به نتیجه نرسیدن مزایده املاک و سهام خود صحبت کردند."
        },
        {
          id: 6,
          title: "بازار کساد املاک در بورس تهران",
          image: require("../../assets/images/1.jpg"),
          abstract: "در اطلاعیه‌های منتشر شده در سامانه کدال در خصوص افشای اطلاعات با اهمیت مانند روز گذشته برخی شرکت های سرمایه گذاری و بانک ها از به نتیجه نرسیدن مزایده املاک و سهام خود صحبت کردند."
        },
        {
          id: 7,
          title: "بازار کساد املاک در بورس تهران",
          image: require("../../assets/images/1.jpg"),
          abstract: "در اطلاعیه‌های منتشر شده در سامانه کدال در خصوص افشای اطلاعات با اهمیت مانند روز گذشته برخی شرکت های سرمایه گذاری و بانک ها از به نتیجه نرسیدن مزایده املاک و سهام خود صحبت کردند."
        },
        {
          id: 8,
          title: "بازار کساد املاک در بورس تهران",
          image: require("../../assets/images/1.jpg"),
          abstract: "در اطلاعیه‌های منتشر شده در سامانه کدال در خصوص افشای اطلاعات با اهمیت مانند روز گذشته برخی شرکت های سرمایه گذاری و بانک ها از به نتیجه نرسیدن مزایده املاک و سهام خود صحبت کردند."
        },

      ],
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title="اخبار" onBackPress={() => { this.props.navigation.goBack() }} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingStart: -1,
            paddingEnd:5,
            marginTop: 10,
          }}
          data={this.state.news}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item, index }) => {
            return (
              <View style={{ backgroundColor: "#fff", marginVertical: 5 }}>
                <TouchableOpacity activeOpacity={0.9}>
                  <View style={[styles.row, { backgroundColor: "#fff", borderTopColor: "#ececec", borderTopWidth: 0.8 }]}>
                    <View style={{ flex: 2, flexDirection: "column", marginRight: 10 }}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.abstract}>{item.abstract}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Image style={styles.coverImage} source={item.image} />
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
  coverImage: {
    width: "100%",
    height: 90,
    borderRadius: 5,
  },
  title: {
    fontSize: 12,
    fontFamily: "Dana-FaNum-Bold",
    color: "#666",
    marginTop: 2
  },
  abstract: {
    fontSize: 10,
    fontFamily: "Dana-FaNum-Medium",
    color: "#777",
    textAlign: 'right'
  },
});