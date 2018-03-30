import React from 'react';
import { Button, Image, View, Text,WebView } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class WebScreen extends React.Component {
    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
  
      return {
        title: params ? params.otherParam : 'A Nested Details Screen',
        /* These values are used instead of the shared configuration! */
        headerStyle: {
          backgroundColor: navigationOptions.headerTintColor,
        },
        headerTintColor: navigationOptions.headerStyle.backgroundColor,
      };
    };

  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const link= params? params.link:null;

    return (
        <View>
        <Text> {link}</Text>

</View>
    );
  }
}
  