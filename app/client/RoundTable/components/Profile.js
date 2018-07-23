import React, { Component } from 'react';
import { Header, Navigator, Alert, StyleSheet, TextInput, Text, View, Button,Image, TouchableOpacity,WebView, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Register from 'RoundTable/components/Register';
import QRModal from 'RoundTable/components/QRModal';
import EditProfile from 'RoundTable/components/EditProfile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

var fb = '';
var ig = '';
var lin = '';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: 'Description',
      image: 'a',
      snapchat: 'Snapchat',
      facebook: 'Facebook',
      instagram: 'Instagram',
      username: props.navigation.state.params.username,
      firstName: '',
      lastName: '',
      sha: '',
    };
  }

  componentWillMount() {
    this.getUserInfo(this.props.navigation.state.params.username)
    .then(() => {
      var username = this.props.navigation.state.params.username;
      this.getImage(username);
    })
    .then(() => {
      var image = null;
      var description = '';
      var snapchat = '';
      var facebook = '';
      var instagram = '';
      if (this.props.navigation.state.params.image !== undefined) {
        image = this.props.navigation.state.params.image;
        description = this.props.navigation.state.params.description;
        snapchat = this.props.navigation.state.params.snapchat;
        facebook = this.props.navigation.state.params.facebook;
        instagram = this.props.navigation.state.params.instagram;
      }
      if (image !== this.state.image && image !== null) {
        this.setState({image: image});
      }
      if (description !== this.state.description && description !== '') {
        this.setState({description: description});
      }
      if (snapchat !== this.state.snapchat && snapchat !== '') {
        this.setState({snapchat: snapchat});
      }
      if (facebook !== this.state.facebook && facebook !== '') {
        this.setState({facebook: facebook});
      }
      if (instagram !== this.state.instagram && instagram !== '') {
        this.setState({instagram: instagram});
      }
      //api call here
      if ((image !== null && image !== undefined) || (description !== '' && description !== undefined) ||
        (snapchat !== '' && snapchat !== undefined) || (facebook !== '' && facebook !== undefined) ||
        (instagram !== '' && instagram !== undefined)) {
          this.updateUser();
      }
    });
  }

  getUserInfo(username) {
    return fetch(`https://event-organization-app.herokuapp.com/api/users/${username}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          description: responseJson.about,
          snapchat: responseJson.linkedin,
          facebook: responseJson.facebook,
          instagram: responseJson.instagram,
          firstName: responseJson.firstName,
          lastName: responseJson.lastName,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getImage(username) {
    //change this to whatever
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
    // return fetch(`https://api.github.com/repos/jiangVL/event-organization-app/contents/images/${jpg}`, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/vnd.github.v3+json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'token 756524d3b60944d5269c09ab79d1ca11a9dc848c',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson);
    //     if (responseJson.message !== 'Not Found') {
    //       var base64 = require('base-64');
    //       var image = base64.decode(responseJson.content);
    //       this.setState({
    //         image: image,
    //         sha: responseJson.sha,
    //       });
    //     }
    //     else {
    //       this.setState({
    //         image: 'https://www.mnsu.edu/international/staff/staffImages/blank-profile.jpg',
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  updateUser() {
      return fetch('https://event-organization-app.herokuapp.com/api/users/update/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        about: this.state.description,
        facebook: this.state.facebook,
        snapchat: this.state.snapchat,
        instagram: this.state.instagram,
        profilePicture: this.state.image,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }
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

  static navigationOptions = function(props) {
    return {
      title: 'Profile',
      headerLeft: (<Button title='Logout'
                   color='#81D4FA'
                    onPress={() =>{
                      props.navigation.dispatch(NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                      }));
                    }}/>),
      headerRight: (<QRModal id={props.navigation.state.params.username}/>),
    }
  };

  editProfile(image, description, snapchat, facebook, instagram, username, sha) {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: 'EditProfile',
        params: {image, description, snapchat, facebook, instagram, username, sha},
      })],
    }));
  }
  render() {
    let { image, description, snapchat, facebook, instagram, username, firstName, lastName, sha } = this.state;
    fb = facebook;
    ig = instagram;
      lin = snapchat;
    var fullName = `${firstName} ${lastName}`;
    return (
      <View style ={{flex: 1, backgroundColor: '#fff'}}>
        <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
        >
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
            <Text style={styles.description}>{description}</Text>
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
        <View style = {styles.button}>
        <Button
          title='Edit Profile'
          color='#fff'
          onPress={() => {
            this.editProfile(image, description, snapchat, facebook, instagram, username, sha);
          }}
        />
        </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
      paddingTop: 10,
     paddingBottom: 10,
     borderRadius: 10,
     marginLeft: 80,
     marginRight: 80,
     backgroundColor: '#81D4FA'
  },
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
