import React from "react";
import firebase from "firebase";
import Uploader from "./Uploader";

const config = {
  storage: "images",
  acceptedType: "image/*",
  isMultiple: true
};
class App extends React.Component {
  render() {
    return (
      <div>
        <Uploader config={config} />
      </div>
    );
  }
}
export default App;
