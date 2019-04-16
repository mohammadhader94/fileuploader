import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
var config = {
  apiKey: "AIzaSyB_3zIpSArggwwgfWkOxc9yh9f4BQ3lWUY",
  authDomain: "edupan-38ad5.firebaseapp.com",
  databaseURL: "https://edupan-38ad5.firebaseio.com",
  projectId: "edupan-38ad5",
  storageBucket: "edupan-38ad5.appspot.com",
  messagingSenderId: "1034925747541"
};
firebase.initializeApp(config);

export default class Uploader extends Component {
  state = {
    filenames: [],
    downloadURLs: [],
    isUploading: false,
    uploadProgress: 0
  };

  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });

  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });

  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref(this.props.config.storage)
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      uploadProgress: 100,
      isUploading: false
    }));
  };

  render() {
    return (
      <div>
        <FileUploader
          accept={this.props.config.acceptedType}
          name="image-uploader-multiple"
          randomizeFilename
          storageRef={firebase.storage().ref(this.props.config.storage)}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
          multiple
        />

        <p>Progress: {this.state.uploadProgress}</p>

        <p>Filenames: {this.state.filenames.join(", ")}</p>

        <div>
          {this.state.downloadURLs.map((downloadURL, i) => {
            return <img key={i} src={downloadURL} />;
          })}
        </div>
      </div>
    );
  }
}
