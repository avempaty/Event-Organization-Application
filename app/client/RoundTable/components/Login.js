import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, Navigator, Alert, StyleSheet, TextInput, Text, View, Button,Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import Register from 'RoundTable/components/Register';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usertext: '',
      passtext: '',
      authenticated: false,
    };
  }

  login(username) {
    return fetch('https://event-organization-app.herokuapp.com/api/loginvalidation/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.usertext,
        password: this.state.passtext,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.authenticated === true) {
            this.setState({authenticated: true});
        }
        this.state.authenticated ?
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.init({
            routeName: 'Main',
            params: { username },
          })],
        })) :
        Alert.alert("incorrect username/password");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /*static navigationOptions = {
    title: 'Login',
  }; */

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style ={{flex: 1, backgroundColor: '#fff'}}>
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <View style={styles.image}>
           <Image
                style={{height: 135}}
                source={require('../images/cloud.png')}
              />
          </View>
          <View style={styles.row}>
            <TextInput
              onChangeText={(text) => {
                this.setState({usertext: text});
              }}
              placeholder='username'
              style={styles.inputtextuser}
              value={this.state.usertext}
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
          <View style={styles.row}>

            <TextInput
              onChangeText={(text) => {
                this.setState({passtext: text});
              }}
              placeholder='password'
              style={styles.inputtextpass}
              value={this.state.passtext}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.row}>
          <View style= {styles.buttonL}>
            <Button
              onPress={() => {
                Keyboard.dismiss();
                this.login(this.state.usertext);
              }}
              title="Login"
              color='#fff'
            />
          </View>
          <View style= {styles.buttonR}>
            <Button
              onPress={() => {
                Keyboard.dismiss();
                this.props.navigation.dispatch(NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Register' })],
                }));
              }}
              title="Register"
              color='#81D4FA'
            />
          </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image:{
      marginTop: 105,
      alignItems: 'center'
  },
  buttonL: {
     paddingTop: 8,
     paddingBottom: 8,
     paddingRight: 18,
     paddingLeft: 18,
     marginRight: 25,
     marginLeft: 25,
     borderRadius: 7,
     backgroundColor: '#81D4FA'

  },
  buttonR: {
      marginTop: 5,
     paddingTop: 8,
     paddingBottom: 8,
     paddingRight: 18,
     paddingLeft: 18,
     borderRadius: 5,
     backgroundColor: '#fff',
     borderColor: '#81D4FA',
          marginRight: 25,
    marginLeft: 25,
     borderWidth: 2
  },
  view: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {

    fontSize: 16,
    fontWeight: 'bold',
  },
  inputtextuser: {
    marginTop:30,
    borderColor: '#81D4FA',
    borderWidth: 2,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 25,
    marginLeft: 25,
    paddingLeft: 5,
    paddingRight: 2,
    borderRadius: 1,
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7

  },
   inputtextpass: {
    marginBottom: 20,
    borderColor: '#81D4FA',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 2,
    paddingBottom: 10,
    marginRight: 25,
    marginLeft: 25,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7

  }
});
