import React, { Component } from 'react';
import { Header, Navigator, Alert, StyleSheet, TextInput, Text, View, Button,Image, TouchableOpacity,WebView, Linking  } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Register from 'RoundTable/components/Register';
import QRModal from 'RoundTable/components/QRModal';
import EditProfile from 'RoundTable/components/EditProfile';
var fb = '';
var ig = '';
var lin = '';
export default class ConnectionProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      image: '../images/profile.png',
      snapchat: '',
      facebook: '',
      instagram: '',
      fullName: '',
      userName:  props.navigation.state.params.username,
    };
    this.userInformation();
    this.getImage(props.navigation.state.params.username);
  }

    getImage(username) {
    //change this to whatever
    console.log(username);
    return fetch(`https://event-organization-app.herokuapp.com/api/profileimages/getprofileimage/${username}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message !== 'No image.') {
          var base64icon = `data:image/png;base64,${responseJson}`;
          this.setState({
            image: base64icon,
          });
        }
        else {
          this.setState({
            image: 'https://www.mnsu.edu/international/staff/staffImages/blank-profile.jpg',
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    userInformation() {
      var user = this.props.navigation.state.params.username;
      return fetch(`https://event-organization-app.herokuapp.com/api/users/${user}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({snapchat: responseJson.snapchat,
                      facebook: responseJson.facebook,
                      instagram: responseJson.instagram,
                      image: responseJson.profilePicture,
                      fullName: responseJson.firstName + ' ' + responseJson.lastName,
                      description: responseJson.about,
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  static navigationOptions = function(props) {
    return {
      title: 'Connection Profile',
    }
  };
handleFBClick() {
        
        Linking.canOpenURL('https://www.facebook.com/' + fb ).then(supported => {
      if (supported) {
        Linking.openURL('https://www.facebook.com/' +fb);
      } else {
        console.log('Don\'t know how to open URI: ' + 'https://www.facebook.com/' + fb);
      }
    });
    }
    handleIGClick() {
        
        Linking.canOpenURL('https://www.instagram.com/' + ig ).then(supported => {
      if (supported) {
        Linking.openURL('https://www.instagram.com/' + ig);
      } else {
        console.log('Don\'t know how to open URI: ' + 'https://www.instagram.com/' + ig);
      }
    });
    }
    handleLINClick() {
        
        Linking.canOpenURL('https://www.linkedin.com/in/' + lin ).then(supported => {
      if (supported) {
        Linking.openURL('https://www.linkedin.com/in/' + lin);
      } else {
        console.log('Don\'t know how to open URI: ' + 'https://www.linkedin.com/in/' + lin);
      }
    });
    }

  render() {
    let { image, description, snapchat, facebook, instagram, fullName } = this.state;
        fb = facebook;
    ig = instagram;
      lin = snapchat;
    // const { navigate } = this.props.navigation;
    // const navigateAction = NavigationActions.navigate({
    //   routeName: 'QRModal',
    // });
    //
    // this.props.navigation.dispatch(navigateAction);
    return (
      <View style ={{flex: 1, backgroundColor: '#fff'}}>
        <View style = {styles.name}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{fullName}</Text>
        </View>
         <View style = {styles.profileImage}>
            <Image
              style={{width: 125, height: 125, borderWidth: 5, borderColor: '#81D4FA'}}
              source={{uri: image}}
            />
        </View>
        <View>
            <Text style = {styles.description}>{description}</Text>
        </View>
        <View>
          <Text style={styles.socialTitle}>SOCIAL MEDIA</Text>

        </View>


        <View style = {styles.socialRow}>
            <Image
          style={{width: 35, height: 35}}
          source={require('../images/linkedin.png')}
            />
            <TouchableOpacity
                  onPress={this.handleLINClick}>
            <Text style={styles.social}>{snapchat}</Text>
            </TouchableOpacity>
        </View>
        <View style = {styles.socialRow}>
            <Image
          style={{width: 35, height: 35}}
          source={require( '../images/fb.png')}
            />
            <TouchableOpacity
                  onPress={this.handleFBClick}>
                <Text style={styles.social}>{facebook}</Text>
                </TouchableOpacity>
        </View>

        <View style = {styles.socialRow}>
            <Image
          style={{width: 35, height: 35}}
          source={require('../images/ig.png')}
            />
             <TouchableOpacity
                  onPress={this.handleIGClick}>
            <Text style={styles.social}>{instagram}</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
      marginTop: 20,
      alignItems: 'center',
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
