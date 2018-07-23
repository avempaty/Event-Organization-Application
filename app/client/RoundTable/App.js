import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Login from 'RoundTable/components/Login';
import Register from 'RoundTable/components/Register';
import Profile from 'RoundTable/components/Profile';
import QRModal from 'RoundTable/components/QRModal';
import Scanner from 'RoundTable/components/Scanner';
import EventList from 'RoundTable/components/EventList';
import EditProfile from 'RoundTable/components/EditProfile';
import Events from 'RoundTable/components/Events';
import EventScanner from 'RoundTable/components/EventScanner';
import Connections from 'RoundTable/components/Connections';
import ConnectionProfile from 'RoundTable/components/ConnectionProfile';
import ParticipantScanner from 'RoundTable/components/ParticipantScanner';

// class RoundTables extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Register/>
//       </View>
//     );
//   }
// }

const ProfileNavigation = TabNavigator ({
  Profile: { screen: Profile},
  Connect: { screen: Scanner },
  EventList: { screen: EventList },
  Network: { screen: Connections },
},
{
  initialRouteName: 'Profile',
}
);

const App = StackNavigator({
  Login: { screen: Login },
  Register: {screen: Register },
  Main: {screen: ProfileNavigation },
  ConnectionProfile: {screen: ConnectionProfile},
  EditProfile: { screen: EditProfile },
  IndividualEvents: { screen: Events },
  EventScanner: {screen: EventScanner},
  Profile: { screen: Profile },
  ParticipantScanner: { screen: ParticipantScanner },
});

const whatever = StackNavigator ({
  QRModal: { screen: QRModal },
});

export default App;
