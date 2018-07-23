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


export default class EventScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.navigation.state.params.username,
      hasCameraPermission: null,
      lastScannedUrl: null,
      eventName: '',
      creator: '',
    }
  }
  static navigationOptions = {
    title: 'Add Event',
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      this.setState({ lastScannedUrl: result.data },
      this.findRoutes
      )
    }
  };

  findRoutes() {
    return fetch(`https://event-organization-app.herokuapp.com/api/events/${this.state.lastScannedUrl}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.title !== undefined && responseJson.creator !== undefined) {
          this.setState({
            eventName: responseJson.title,
            creator: responseJson.creator,
          });
          this._handlePressUrl();
        }
        else if (responseJson.message === 'Not Found'){
          Alert.alert('Event not found!');
        }
        else {
          Alert.alert('Not a valid event QR Code');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addEvent() {
    //api call here
    const { navigate } = this.props.navigation;
    return fetch(`https://event-organization-app.herokuapp.com/api/users/${this.state.username}/events`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: this.state.lastScannedUrl,
        eventname: this.state.eventName,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var username = this.state.username;
        console.log(responseJson);
        if (responseJson.message === 'Event added!') {
          Alert.alert('Event added!');
          navigate('Main', { username: username })
        }
        else if (responseJson.message === 'Event already added!') {
          Alert.alert('Event already added!');
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
      `Add ${this.state.eventName}?`,
      `By ${this.state.creator}`,
      [
        {
          text: 'Yes',
          onPress: () => this.addEvent(),
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
