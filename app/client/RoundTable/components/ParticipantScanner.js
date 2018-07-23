import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { BarCodeScanner, Permissions } from 'expo';

import Connections from 'RoundTable/components/Connections';


export default class ParticipantScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      user: '',
      attendees: '',
      participants: props.navigation.state.params.participants,
      eventId: props.navigation.state.params.id,
      curruser: props.navigation.state.params.username,
      hasCameraPermission: null,
      lastScannedUrl: null,
    }
  }
  static navigationOptions = {
    title: 'Participant Scanner',
  }

  componentDidMount() {
    this._requestCameraPermission();
      var eventId = this.props.navigation.state.params.id;
      return fetch(`https://event-organization-app.herokuapp.com/api/events/${eventId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({title: responseJson.title,
                      attendees: responseJson.attendees,
                      participants: responseJson.participants});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
        console.log(result.data);
      this.setState({
        user: result.data,
        lastScannedUrl: result.data,
      },
      //this.findRoutes
        this.checkUser
      )
    }
  };

  checkUser() {
      console.log(this.state.user);
      return fetch(`https://event-organization-app.herokuapp.com/api/users/${this.state.user}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);  
        if (responseJson.message === 'Not Found' || responseJson.message === 'User does not exist.'){
          Alert.alert('User not found!');
        } else {
            this.findRoutes();

        }
      })
      .catch((error) => {
        console.error(error);
      });
      
  }
    findRoutes() {
    console.log('helloooo');
    var user = this.state.user;
    var attendees = this.state.attendees;
    var participants = this.state.participants;
    var a = attendees.some((element) => element === user);
    var p = participants.some((element) => element === user);
    //must be in attendees to be scanned, but if already in participants then can't be scanned
    if(a && !p) {
    return fetch(`https://event-organization-app.herokuapp.com/api/events/${this.state.eventId}/participants`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: user,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        Alert.alert('Participant Scanned!');
        /*if (responseJson.firstName !== undefined && responseJson.lastName !== undefined) {
          this.setState({
            firstName: responseJson.firstName,
            lastName: responseJson.lastName,
          });
          this._handlePressUrl();
        }*/
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
        Alert.alert("Participant already Scanned!");
    }
  }
  addUser() {
    //api call here
    const { navigate } = this.props.navigation;
    return fetch(`https://event-organization-app.herokuapp.com/api/connections/${this.state.curruser}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        connectingUser: this.state.username,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        var username = this.state.username;
        if (responseJson.message === 'User connected!') {
          Alert.alert('User Connected!');
          navigate('Network', { username: username })
        }
        else if (responseJson.message === 'Already connected!') {
          Alert.alert('User already connected!');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}
        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      `Add ${this.state.firstName} ${this.state.lastName}?`,
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => this.addUser(),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});
