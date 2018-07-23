import React, { Component } from 'react';
import { Keyboard, Alert, StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usertext: '',
      passtext1: '',
      passtext2: '',
      firstname: '',
      lastname: '',
    };
  }

  onPressButton() {
    Alert.alert('it works');
  }
/* 0848 0857 0935*/
  register() {
    if (this.state.usertext === '' || this.state.passtext1 === '' || this.state.passtext2 === '' || this.state.firstname === '' || this.state.lastname === '') {
      return (Alert.alert("Cannot leave fields empty"));
    }
    if (this.state.passtext1 !== this.state.passtext2) {
      return (Alert.alert("Passwords do not match"));
    }
    return fetch('https://event-organization-app.herokuapp.com/api/loginvalidation/register/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.usertext,
        password: this.state.passtext1,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var username = this.state.usertext;
        if (responseJson.message === 'User created!') {
          Alert.alert('User created!');
          this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.init({
              routeName: 'Main',
              params: {username},
            })],
          }));
        }
        else if (responseJson.code === 11000) {
          Alert.alert('User already exists');
        }
      })
      .catch((error) => {
        Alert.alert(error);
        console.error(error);
      });
  }

  static navigationOptions = {
    title: 'Register',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style ={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <View style={styles.toprow}>
            <TextInput
              onChangeText={(firstname) => this.setState({firstname})}
              style={styles.inputtext}
              placeholder= 'first name'
              value={this.state.firstname}
              autoCapitalize='words'
              autoCorrect={false}
            />
        </View>
        <View style={styles.row}>
          <TextInput
            onChangeText={(lastname) => this.setState({lastname})}
            style={styles.inputtext}
            placeholder= 'last name'
            value={this.state.lastname}
            autoCapitalize='words'
            autoCorrect={false}
          />
        </View>
        <View style={styles.rowmiddle}>
          <TextInput
            onChangeText={(usertext) => this.setState({usertext})}
            style={styles.inputtext}
            placeholder= 'username'
            value={this.state.usertext}
            autoCapitalize='none'
            autoCorrect={false}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            onChangeText={(passtext1) => this.setState({passtext1})}
            style={styles.inputtext}
            placeholder= 'password'
            value={this.state.passtext1}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.bottomrow}>
          <TextInput
            onChangeText={(passtext2) => this.setState({passtext2})}
            style={styles.inputtext}
            placeholder= 're-enter password'
            value={this.state.passtext2}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonR}>
          <Button
            onPress={() => {
              Keyboard.dismiss();
              this.register();
            }}
            title="Register"
            color='#fff'
          />
        </View>
        <View style={styles.buttonCancel}>
          <Button
            onPress={() => {
              Keyboard.dismiss();
              this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
              }));
            }}
            title="Cancel"
            color='#81D4FA'
          />
         </View>

        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonCancel: {
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
  buttonR: {

     paddingTop: 8,
     paddingBottom: 8,
     paddingRight: 18,
     paddingLeft: 18,
     marginRight: 25,
     marginLeft: 25,
     borderRadius: 7,
     backgroundColor: '#81D4FA'
  },
  toprow: {
    marginTop: 100,
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
  row: {
    borderColor: '#81D4FA',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 2,
    paddingBottom: 10,
    marginRight: 25,
    marginLeft: 25,
  },
  rowmiddle: {
      borderColor: '#81D4FA',
    borderWidth: 2,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 2,
    paddingBottom: 10,
    marginRight: 25,
    marginLeft: 25,
    borderLeftWidth: 2,
    borderRightWidth: 2
  },
  bottomrow: {
    marginBottom: 62,
    borderColor: '#81D4FA',
    borderWidth: 2,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 2,
    paddingBottom: 10,
    marginRight: 25,
    marginLeft: 25,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7
  },
  view: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputtext: {
    borderColor: '#0091EA',
  }
});
