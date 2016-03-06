/* @flow */
'use strict';

var React = require('react-native');
var {
    Text,
    Image,
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} = React;

var styles = require('../Styles/style');
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;
var ImagePickerManager = require('NativeModules').ImagePickerManager;

//var Camera = require('react-native-camera');
import Camera from 'react-native-camera';

var capturedBase64='';

var options = {
  title: 'Select Photo', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  customButtons: {
    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  maxWidth: 400, // photos only
  maxHeight: 400, // photos only
  aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.5, // photos only
  angle: 0, // photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
    skipBackup: true, // image will NOT be backed up to icloud
    path: 'images' // will save image at /Documents/images rather than the root
  }
};




var CameraScreen = React.createClass({
  // getInitialState: function() {
  //       return {
  //           cameraType: Camera.constants.Type.back,
  //       }
  // },
  getInitialState: function() {
    //console.log("CAMERA:", Camera);
          return ({
              capturedBase64: '',
              type: Camera.constants.Type.back,
              avatarSource: undefined
          });
  },

  switchCamera: function() {
    this.setState({ type: this.state.type === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back });
  },

  takePicture: function() {
      this.refs.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));
  },

  selectPhoto: function() {
    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data:
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // uri (on iOS)
        //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        const source = {uri: response.uri, isStatic: true};
        console.log("BASE64", response.data);
        this.setState({
          avatarSource: source
        });
      }
    });


  },

	render: function() {

	    return (
        <View style={styles.bg}>
          <Image source={this.state.avatarSource} style={localStyles.preview} />
          <Button onPress={this.selectPhoto}
            style={styles.buttonText}
            containerStyle={styles.buttonRounded}>
            Capture
          </Button>
        </View>
	    );
  }
});

const localStyles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
});

module.exports = CameraScreen;
