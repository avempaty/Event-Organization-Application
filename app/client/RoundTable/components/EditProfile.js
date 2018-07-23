import React, { Component } from 'react';
import { ActivityIndicator, Header, Navigator, Alert, StyleSheet, TextInput, Text, View, Button,Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { ImagePicker } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import Register from 'RoundTable/components/Register';
import QRModal from 'RoundTable/components/QRModal';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.navigation.state.params.description,
      snapchat: props.navigation.state.params.snapchat,
      facebook: props.navigation.state.params.facebook,
      instagram: props.navigation.state.params.instagram,
      image: props.navigation.state.params.image,
      username: props.navigation.state.params.username,
      result: {},
      sha: props.navigation.state.params.sha,
      loading: false,
    };
  }

  doStuff() {
    Alert.alert('Logged Out');
  }

  static navigationOptions = function(props) {
    return {
      title: 'Edit Profile',
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      exif: true,
      base64: true,
    });

    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        result: result,
      });
      //make a call to server and it returns filename and filpath
      //upload image to filepath with that filename
    }
  };

  saveImage(result) {
    let { image, snapchat, facebook, instagram, count, description, username, loading } = this.state;
    return fetch(`https://event-organization-app.herokuapp.com/api/profileimages/setprofileimage`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.state.username,
      data: result.base64,
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        image: result.uri,
      })
    })
    .then(() => {
      this.saveData(image, snapchat, facebook, instagram, count, description, username);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  delay(time) {
    this.setState({loading: true});
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
    this.setState({loading: false});
  }

  saveData(image, snapchat, facebook, instagram, count, description, username) {
    this.delay(5000)
    .then(() => {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.init({
          routeName: 'Main',
          params: {image, snapchat, facebook, instagram, count, description, username},
        })],
      }));
    })
  }

  render() {
    let { image, snapchat, facebook, instagram, count, description, username, loading, result } = this.state;
    if (loading) {
      return (
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', paddingTop: '50%'}}>
          <View style={{alignItems:'center', paddingBottom: 10}}>
            <Text>Saving...</Text>
          </View>
          <View style={styles.loading}>
            <ActivityIndicator
              animating={true}
              size="large"
            />
          </View>
        </View>
      )
    }
    else {
      return (
        <View style ={{flex: 1, backgroundColor: '#fff'}}>
           <View style = {styles.profileImage}>
              <TouchableOpacity onPress={this._pickImage}>
                <Image
                  style={{width: 125, height: 125, borderWidth: 5, borderColor: '#81D4FA'}}
                  source={{uri: image}}
                />
              </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
          >
          <View>
              <TextInput
                onChangeText={(text) => {
                  this.setState({description: text});
                }}
                style={styles.descinputtext}
                placeholderTextColor='#BDBDBD'
                placeholder={description}
                autoCorrect={true}
                multiline={true}
                numberOfLines={4}
              />
          </View>
          <View>
            <Text style={styles.socialTitle}>SOCIAL MEDIA</Text>

          </View>


          <View style = {styles.socialRow}>
              <Image
            style={{width: 35, height: 35}}
            source={require('../images/linkedin.png')}
              />
              <TextInput
                onChangeText={(text) => {
                  this.setState({snapchat: text});
                }}
                style={styles.inputtext}
                placeholderTextColor='#BDBDBD'
                placeholder={snapchat}
                autoCapitalize='none'
                autoCorrect={false}
              />
          </View>
          <View style = {styles.socialRow}>
              <Image
            style={{width: 35, height: 35}}
            source={require('../images/fb.png')}
              />
              <TextInput
                onChangeText={(text) => {
                  this.setState({facebook: text});
                }}
                style={styles.inputtext}
                placeholderTextColor='#BDBDBD'
                placeholder={facebook}
                autoCapitalize='none'
                autoCorrect={false}
              />
          </View>

          <View style={styles.socialRow}>
              <Image
            style={{width: 35, height: 35}}
            source={require('../images/ig.png')}
              />
              <TextInput
                onChangeText={(text) => {
                  this.setState({instagram: text});
                }}
                style={styles.inputtext}
                placeholderTextColor='#BDBDBD'
                placeholder={instagram}
                autoCapitalize='none'
                autoCorrect={false}
              />
          </View>
          <View style={styles.row}>
          <View style ={styles.button}>
              <Button
                title='Cancel'
                color='#fff'
                onPress={() => {
                  this.props.navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.init({
                      routeName: 'Main',
                      params: {username},
                    })],
                  }));
                }}
              />
              </View>
              <View style ={styles.button}>
              <Button
                title='Save'
                color='#fff'
                onPress={() => {
                  this.saveImage(result);
                }}
              />
              </View>
          </View>
          </KeyboardAwareScrollView>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
 button: {
     paddingTop: 10,
     paddingBottom: 10,
     paddingRight: 20,
     paddingLeft: 20,
     borderRadius: 10,
     backgroundColor: '#81D4FA'
 },
 loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
 },
  profileImage: {
      marginTop: 20,
      alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
    marginRight: 50,
    marginLeft: 50,
  },
  descinputtext: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 120,
    width: '90%',
    borderColor: '#81D4FA',
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  inputtext: {
    height: 30,
    width: 125,
    borderColor: '#81D4FA',
    borderBottomWidth: 1.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 70,
    marginRight: 70,
    marginTop: 25,
  },
  socialRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      marginLeft: 70,
      marginRight: 70,

  },
  socialTitle: {
      textAlign: 'center',
      marginBottom: 10,
      fontSize: 20,
      fontWeight: 'bold',
  },
  social: {
      fontSize: 16,
      margin:0,
  },

});
