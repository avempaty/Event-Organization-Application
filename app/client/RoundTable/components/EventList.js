import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, Navigator, Alert, StyleSheet, TextInput, Text, View, Button,Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import EventScanner from 'RoundTable/components/EventScanner';
import Events from 'RoundTable/components/Events';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import QRCode from 'react-native-qrcode';

export default class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
            responses: [],
            username: props.navigation.state.params.username,
    }
  }

  static navigationOptions = function(props) {
    return {
      title: 'Event List',
      headerRight: (<Button title='Add Events'
                    color='#81D4FA'
                    onPress={() => {
                      props.navigation.navigate('EventScanner', { username: props.navigation.state.params.username });
                      }}
                    />),
    }
  }

  componentWillReceiveProps() {
    return fetch(`https://event-organization-app.herokuapp.com/api/users/${this.state.username}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({responses: responseJson.events});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
      return fetch(`https://event-organization-app.herokuapp.com/api/users/${this.state.username}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({responses: responseJson.events});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    //should access camera and let you check the QR code

    var response = this.state.responses.map((response, index) => {
        var name = response.eventname;
        var newTitle;
        function nameLength(namer) {
            if (namer.length < 30) {
                newTitle = namer;
            } else {
                newTitle = namer.substring(0,27) + '...';
            }
        }
        nameLength(name);
        return(
        <TouchableOpacity
          onPress={() =>
            navigate('IndividualEvents', { id: response.eventid, username: this.props.navigation.state.params.username })
          }
          key={index}
        >
          <View style={{height: 100, backgroundColor: 'white',borderColor: "#81D4FA",borderBottomWidth: 1}}>
            <Text style = {styles.title}>{newTitle}</Text>
            <View style={styles.img}>
              <QRCode
                value={response._id}
                size={50}
                bgColor='#212121'
                fgColor='white'
              />
            </View>
          </View>
        </TouchableOpacity>
    )});
    return (

        <View style={{flex: 1}}>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                {response}
            </KeyboardAwareScrollView>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    left: 40,
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

     width: 30,
     height: 30,
     alignSelf: 'flex-end',
     right: 45,
     top: 3
  }

});
