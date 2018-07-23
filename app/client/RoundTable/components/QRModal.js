import React, { Component } from 'react';
import { Modal, StyleSheet, Button, View } from 'react-native';
import QRCode from 'react-native-qrcode';

export default class QRModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      id: props.id,
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style ={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={{flex: 1}}>
            <View style={styles.container}>
              <QRCode
                value={this.state.id}
                size={200}
                bgColor='#212121'
                fgColor='white'/>
              <View style={styles.backbutton}>
                <Button
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}
                    title='Back'
                    color='white'
                  />
              </View>
          </View>
         </View>
        </Modal>

        <Button
          onPress={() => {
            this.setModalVisible(true)
          }}
          title='QR Code'
          color='#81D4FA'


        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
   backbutton: {
     marginTop: 30,
     paddingTop: 10,
     paddingBottom: 10,
     paddingRight: 20,
     paddingLeft: 20,
     borderRadius: 10,
     backgroundColor: '#81D4FA'

   },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});
