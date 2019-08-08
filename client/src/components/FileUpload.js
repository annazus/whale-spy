import React, { Component } from "react";
import axios from "axios";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { fileToUpload: "", url: "", isLoading: false };
  }

  onChange = e => {
    let _url;
    e.preventDefault();
    this.setState({ fileToUpload: "", url: "" });
    const _file = e.target.files[0];
    if (_file && window.URL) {
      _url = window.URL.createObjectURL(_file);
    }
    this.setState({ fileToUpload: _file, url: _url });

    if (this.props.changeHandler) this.props.changeHandler(_file, _url);
  };

  discardData = () => {
    this.setState({ fileToUpload: "", url: "" });
  };

  uploadToCloudinary = async () => {
    if (this.state.isLoading) return;
    const data = new FormData();

    data.append("file", this.state.fileToUpload);
    data.append("upload_preset", process.env.REACT_APP_CL_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CL_CLOUD_NAME);

    try {
      this.setState({ ...this.state, isLoading: true });
      const result = await axios.post(process.env.REACT_APP_CL_ENDPOINT, data);
      this.setState({
        fileToUpload: "",
        url: result.data.url,
        isLoading: false
      });

      return result.data.url;
    } catch (error) {
      console.log(error);
      this.setState({
        fileToUpload: "",
        url: "",
        isLoading: false
      });
    }
    return "";
  };
  render() {
    const { children } = this.props;
    return (
      <label htmlFor="FileUploadInput">
        {children}
        <input
          style={{ opacity: "0" }}
          id="FileUploadInput"
          type="file"
          name="uploadImage"
          accept="image/png,image/jpeg,image/jpg"
          onChange={this.onChange}
        />
      </label>
    );
  }
}

export default FileUpload;
