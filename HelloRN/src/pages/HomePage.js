'use strict';
import React, {Component} from "react";
import {ActivityIndicator, Animated, FlatList, ScrollView, StyleSheet, Text, View,Image} from "react-native";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const REQUEST_URL = 'https://api.github.com/search/repositories?q=javascript&sort=stars';

export default class HomePage extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
        };
    }

    // Life Cycle
    componentDidMount() {
        //请求数据
        this.fetchData();
    }

    //网络请求
        fetchData() {
            fetch(REQUEST_URL)
                .then((response) => response.json())
                .then((responseData) => {
                    let data = responseData.items;
                    let dataBlob = [];
                    let i = 0;
                    data.map(function (item) {
                        dataBlob.push({
                            key: i,
                            value: item,
                        })
                        i++;
                    });
                    this.setState({
                        //复制数据源
                        dataArray: dataBlob,
                        isLoading: false,
                    });
                    data = null;
                    dataBlob = null;
                })
                .catch((error) => {
                    this.setState({
                        error: true,
                        errorInfo: error
                    })
                })
                .done();
        }

        //加载等待的view
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    style={[styles.gray, {height: 80}]}
                    size="large"
                />
            </View>
        );
    }

    //加载失败view
    renderErrorView(error) {
        return (
            <View style={styles.container}>
                <Text>
                    Fail: {error}
                </Text>
            </View>
        );
    }

    //返回itemView
    renderItemView({item}) {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.avatar} source={{uri: item.value.owner.avatar_url, cache: 'force-cache'}}/>
                    <Text style={styles.username}> {item.value.name} </Text>
                </View>
                <Text style={styles.content}>{item.value.description}</Text>
            </View>
        );
    }

    //分割线
    sepa(){
      return(
        <View style={{height:1,
                      width: (window.width - 40),
                      alignItems: 'center',
                      backgroundColor:'rgb(220,220,220)'}}>
        </View>
      );
    }

    renderData() {
        return (
          <AnimatedFlatList
              ItemSeparatorComponent={this.sepa}
              data={this.state.dataArray}
              renderItem={this.renderItemView}
          />
        );
    }

    render() {
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView(this.state.errorInfo);
        }
        //加载数据
        return this.renderData();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    avatar: {
        width: 43,
        height: 43,
        left: 3,
        top: 3,
    },
    username: {
        top: 3,
        left : 3,
        fontSize: 19,
        color: 'black'
    },
    contentImage:{
        width: window.width,
        height: window.height,
        top: 3,
    },
    content: {
        fontSize: 15,
        color: 'black',
    }
});
