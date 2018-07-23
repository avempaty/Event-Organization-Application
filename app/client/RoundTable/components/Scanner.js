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


export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      curruser: props.navigation.state.params.username,
      hasCameraPermission: null,
      lastScannedUrl: null,
    }
  }
  static navigationOptions = {
    title: 'Connect',
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
      this.setState({
        username: result.data,
        lastScannedUrl: result.data,
      },
      this.findRoutes
      )
    }
  };

  findRoutes() {
    return fetch(`https://event-organization-app.herokuapp.com/api/users/${this.state.username}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.firstName !== undefined && responseJson.lastName !== undefined) {
          this.setState({
            firstName: responseJson.firstName,
            lastName: responseJson.lastName,
          });
          this._handlePressUrl();
        }
        else if (responseJson.message === 'Not Found' || responseJson.message === 'User does not exist.'){
          Alert.alert('User not found!');
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
