import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    InteractionManager,
    Platform,
    Image,
} from 'react-native'
import HomePage from './HomePage'
import { StackNavigator,NavigationActions } from 'react-navigation';


export default class WelcomePage extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);
    this.timer = setTimeout(() => {
        this.props.navigation.dispatch(resetAction);
    }, 500);
  }

  render() {
        return (
            <View style={styles.container}>
                {<Image style={{flex:1,width:null}} resizeMode='repeat' source={require('../../res/images/LaunchScreen.png')}/>}
            </View>
        );
    }
}

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
})

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
