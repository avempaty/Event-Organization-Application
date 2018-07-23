import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  Button,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  Navigator,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';


export default class Connections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connections: [],
            username: props.navigation.state.params.username,
        }
    }
  static navigationOptions = function(props) {
    return {
      title: 'Network',
    }

  }

  componentWillReceiveProps() {
    fetch('https://event-organization-app.herokuapp.com/api/connections/getconnections', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        username: this.state.username,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          connections: responseJson.connections,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

 componentDidMount() {
    return fetch('https://event-organization-app.herokuapp.com/api/connections/getconnections', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        username: this.state.username,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.connections);
        this.setState({connections: responseJson.connections});
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
  }
  render() {
    const { navigate } = this.props.navigation;
    var responses = this.state.connections.map((connection, index) => {
        return(
        <TouchableOpacity
          onPress={() =>
            navigate('ConnectionProfile', { username: connection.username })
          }
          key={index}
        >
          <View style={{height: 100, backgroundColor: 'white',borderColor: "#81D4FA",borderBottomWidth: 1}}>
          <Text style = {styles.title}>{connection.fullname}</Text>
          </View>
        </TouchableOpacity>
    )});
    return (
        <View style={{flex: 1}}>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                {responses}
            </KeyboardAwareScrollView>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    top: 40,
    fontSize: 18
  },
  date: {
      color: '#BDBDBD',
      fontSize: 13,
      left: 40,
      top: 40,
  },
  img: {
     width: 40,
     height: 40,
     alignSelf: 'flex-end',
     right: 25,
  }

});
