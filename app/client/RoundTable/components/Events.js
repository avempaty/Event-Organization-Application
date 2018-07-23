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
  Image,
  Button,
  Navigator
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import QRCode from 'react-native-qrcode';

import EventScanner from 'RoundTable/components/Scanner';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      information: '',
      location: '',
      id: '',
      username: props.navigation.state.params.username,
      moderators: [],
      participants: [],
      eventId: props.navigation.state.params.id,
    };
  }

  /*static navigationOptions = function(props) {
    return {
      title: 'Events',
      headerRight: (<Button title='Add Participant'
                    onPress={() => {
                      props.navigation.navigate('EventScanner');
                      }}
                    />),
    }
  }*/
  componentDidMount() {
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
        this.setState({
          id: responseJson._id,
          title: responseJson.title,
          date: responseJson.date,
          information: responseJson.information,
          location: responseJson.location,
          moderators: responseJson.moderators
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    let {title, date, information, location, moderators, username, eventId, participants} = this.state;
    const { navigate } = this.props.navigation;
    var m = moderators.some((element) => element === username);
    var d = new Date(date);
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    var time = mon + '-' + day + '-' + year;
    if(m) {
        return (
        <View>
          <View style={styles.QRcontainer}>
            <QRCode
              value={this.state.id}
              size={200}
              bgColor='#212121'
              fgColor='white'
            />
          </View>
          <View>
              <Text style={styles.eventTitle}>{title}</Text>
          </View>
          <View>
              <Text style={styles.eventGeneric}>{time}</Text>
          </View>
           <View>
              <Text style={styles.eventGeneric}>{location}</Text>
          </View>
           <View>
              <Text style={styles.eventInfo}>{information}</Text>
        </View>
        <Button
        title = 'Add Participant'
        onPress={() => {
            navigate('ParticipantScanner', {id: eventId, participants: participants})
          }}
        />
      </View>
        );
    }
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.QRcontainer}>
          <QRCode
            value={this.state.id}
            size={200}
            bgColor='#212121'
            fgColor='white'
          />
        </View>
        <View>
            <Text style={styles.eventTitle}>{title}</Text>
        </View>
        <View>
            <Text style={styles.eventGeneric}>{time}</Text>
        </View>
        <View>
            <Text style={styles.eventGeneric}>{location}</Text>
        </View>
        <View>
            <Text style={styles.eventInfo}>{information}</Text>
        </View>
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
  QRcontainer: {
    marginTop: 20,
    alignSelf: 'center',
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    eventTitle: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold',
    },
    eventGeneric: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
    },
    eventInfo: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});
