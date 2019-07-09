/* Photo uploadPhoto section */
import React, { Component } from "react";
import Cookies from "js-cookie";
import Dropzone from "react-dropzone";
import { Button, Image, Grid, Label } from "semantic-ui-react";
//Optional Import

import { Icon } from "semantic-ui-react";

export default class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSelected: null,
      imageSource: null,
      hasSelectedNewImage: false
    };
    this.onImageChange = this.onImageChange.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.getObjectURL = this.getObjectURL.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.displayExistingPhoto = this.displayExistingPhoto.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps)
    this.setState({
      // i: nextProps.imageId,
      imageSource: nextProps.imageId
    });
  }

  savePhoto() {
    // e.preventDefault();
    console.log("uploaded", this.state.imageSelected);
    const url = this.props.savePhotoUrl;
    const formData = new FormData();
    formData.append("body", this.state.imageSelected);

    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url: url,
      headers: {
        Authorization: "Bearer " + cookies
      },
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,

      success: function(res) {
        if (res.success == true) {
          TalentUtil.notification.show(
            "Profile updated sucessfully",
            "success",
            null,
            null
          );
          this.props.updateProfileData({
            profilePhotoUrl: this.state.imageSource
          });
          this.setState({ profilePhoto: null });
        } else {
          TalentUtil.notification.show(
            "Profile did not update successfully",
            "error",
            null,
            null
          );
        }
      }.bind(this),
      error: function(res, a, b) {}
    });
  }

  onImageChange(e) {
    console.log(e.target.files[0]);
    // this.setState({
    //   imageSelected: e.target.files[0],
    //   hasSelectedNewImage: true
    // });

    const uploaded = e.target.files[0];
    const reader = new FileReader();
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (uploaded) {
      if (validImageTypes.includes(uploaded.type)) {
        reader.onloadend = () => {
          this.setState({
            imageSelected: uploaded,
            imageSource: reader.result,
            hasSelectedNewImage: true
          });
        };
        //console.log("uploaded", this.state.imageSelected);
        //console.log("imageSource", this.state.imageSource);
        reader.readAsDataURL(uploaded);
      } else {
        TalentUtil.notification.show(
          "Please upload a correct image file",
          "error"
        );
      }
    }
  }

  getObjectURL(file) {
    let url = null;
    if (window.createObjectURL !== undefined) {
      // basic
      url = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  uploadPhoto() {
    return (
      <Grid.Column>
        <div className="field">
          <Image
            src={this.getObjectURL(this.state.imageSelected)}
            size="medium"
            circular
            onClick={() => this.refs.refImgChange.click()}
          />
          <input
            ref="refImgChange"
            hidden
            type="file"
            onChange={this.onImageChange}
          />
        </div>

        <Button type="button" onClick={this.savePhoto} color="black">
          {/* <Icon name="upload" /> */}
          Upload
        </Button>
      </Grid.Column>
    );
  }

  selectPhoto() {
    return (
      <Grid.Column textAlign="right">
        <Icon
          name="camera retro"
          size="massive"
          onClick={() => this.refs.refImg.click()}
        />
        <input ref="refImg" hidden type="file" onChange={this.onImageChange} />
      </Grid.Column>
    );
  }

  displayExistingPhoto() {
    return (
      <Grid columns="equal">
        <Grid.Row columns={2}>
          <Grid.Column>
            <h1>Profile Image</h1>
          </Grid.Column>

          <Grid.Column textAlign="right">
            <img
              style={{ height: "150px", borderRadius: "80%" }}
              src={this.props.imageId}
              onClick={() => this.refs.refImgChanged.click()}
            />

            <input
              ref="refImgChanged"
              hidden
              type="file"
              onChange={this.onImageChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    //console.log("before props", this.props.imageId);

    if (this.props.imageId && !this.state.hasSelectedNewImage) {
      return this.displayExistingPhoto();
    }

    return (
      <Grid columns="equal">
        <Grid.Row columns={3}>
          <Grid.Column>
            <h1>Profile Image</h1>
          </Grid.Column>
          <Grid.Column />
          {this.state.imageSelected ? this.uploadPhoto() : this.selectPhoto()}
        </Grid.Row>
      </Grid>
    );
  }
}
