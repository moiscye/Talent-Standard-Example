import React from "react";
import Cookies from "js-cookie";
import { default as Countries } from "../../../../util/jsonFiles/countries.json";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
import { Location } from "./SelectLocation.jsx";
import { Grid } from "semantic-ui-react";

export class Address extends React.Component {
  constructor(props) {
    super(props);

    const details = props.details
      ? Object.assign({}, props.details)
      : {
          number: "",
          street: "",
          suburb: "",
          country: "",
          city: "",
          postCode: ""
        };

    this.state = {
      showEditSection: false,
      newContact: details
    };
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
  }

  openEdit() {
    const details = Object.assign({}, this.props.details);
    this.setState({
      showEditSection: true,
      newContact: details
    });
  }

  closeEdit() {
    this.setState({
      showEditSection: false
    });
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newContact);

    if (event.target.name === "location") {
      data["city"] = event.target.value.city;
      data["country"] = event.target.value.country;
    } else {
      data[event.target.name] = event.target.value;
    }

    this.setState({
      newContact: data
    });
  }
  saveContact() {
    const data = Object.assign({}, this.state.newContact);
    this.props.controlFunc(this.props.componentId, data);
    this.closeEdit();
  }

  render() {
    return this.state.showEditSection
      ? this.renderEdit()
      : this.renderDisplay();
  }

  renderEdit() {
    let location = { city: "", country: "" };
    if (this.state.newContact && this.state.newContact.country) {
      location.country = this.state.newContact.country;
    }
    if (this.state.newContact && this.state.newContact.city) {
      location.city = this.state.newContact.city;
    }

    return (
      <div className="ui sixteen wide column">
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <ChildSingleInput
                inputType="text"
                label="Number"
                name="number"
                value={this.state.newContact.number}
                controlFunc={this.handleChange}
                maxLength={80}
                placeholder="Enter house number"
                errorMessage="Please enter a valid number"
              />
            </Grid.Column>
            <Grid.Column>
              <ChildSingleInput
                inputType="text"
                label="Street"
                name="street"
                value={this.state.newContact.street}
                controlFunc={this.handleChange}
                maxLength={80}
                placeholder="Enter your street"
                errorMessage="Please enter a valid street"
              />
            </Grid.Column>
            <Grid.Column>
              <ChildSingleInput
                inputType="text"
                label="Suburb"
                name="suburb"
                value={this.state.newContact.suburb}
                controlFunc={this.handleChange}
                maxLength={80}
                placeholder="Enter Suburb"
                errorMessage="Please enter a valid Suburb"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Location
              option="location"
              location={location}
              handleChange={this.handleChange}
            />
            <Grid.Column>
              <ChildSingleInput
                inputType="text"
                label="Post Code"
                name="postCode"
                value={this.state.newContact.postCode}
                controlFunc={this.handleChange}
                maxLength={12}
                placeholder="Enter your post code"
                errorMessage="Please enter a valid post code"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <button
          type="button"
          className="ui teal button"
          onClick={this.saveContact}
        >
          Save
        </button>
        <button type="button" className="ui button" onClick={this.closeEdit}>
          Cancel
        </button>
      </div>
    );
  }

  renderDisplay() {
    let address = this.props.details
      ? `${this.props.details.number}, ${this.props.details.street},
        ${this.props.details.suburb}, ${this.props.details.postCode}`
      : "";
    let country = this.props.details ? this.props.details.country : "";
    let city = this.props.details ? this.props.details.city : "";

    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <React.Fragment>
            <p>Address: {address}</p>
            <p>Country: {country}</p>
            <p>City: {city}</p>
          </React.Fragment>
          <button
            type="button"
            className="ui right floated teal button"
            onClick={this.openEdit}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
}

export class Nationality extends React.Component {
  constructor(props) {
    super(props);

    const nationality = props.nationality;

    this.state = {
      newContact: nationality
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveContact = this.saveContact.bind(this);
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newContact);

    data[event.target.name] = event.target.value;

    this.setState(
      {
        newContact: data
      },
      this.saveContact
    );
  }
  saveContact() {
    const data = Object.assign({}, this.state.newContact);
    this.props.saveProfileData(data);
  }

  render() {
    let nationality = this.props.nationality ? this.props.nationality : "";
    return (
      <div className="ui six wide column">
        <Location
          location={nationality}
          handleChange={this.handleChange}
          option="nationality"
        />
      </div>
    );
  }
}
