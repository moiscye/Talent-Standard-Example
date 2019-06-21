import React from "react";
import ReactDOM from "react-dom";
import { Dropdown } from "semantic-ui-react";
import { countries } from "../Employer/common.js";
import { Grid } from "semantic-ui-react";

export class Location extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.renderLocation = this.renderLocation.bind(this);
    this.renderNationality = this.renderNationality.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  handleChange(event) {
    var data = Object.assign({}, this.props.location);
    //required
    const name = event.target.name;
    let value = event.target.value;
    const id = event.target.id;

    data[name] = value;
    if (name == "country") {
      data["city"] = "";
    }
    var updateData = {
      target: { name: "location", value: data }
    };
    console.log("xyz", event.target);
    //update props here
    this.props.handleChange(updateData);
  }

  handleCountryChange(event) {
    var updateData = {
      target: { name: "nationality", value: event.target.value }
    };

    //update props here
    this.props.handleChange(updateData);
  }

  render() {
    return this.props.option === "location"
      ? this.renderLocation()
      : this.renderNationality();
  }

  renderLocation() {
    let countriesOptions = [];
    let citiesOptions = [];
    const selectedCountry = this.props.location.country;
    const selectedCity = this.props.location.city;

    countriesOptions = Object.keys(countries).map(x => (
      <option key={x} value={x}>
        {x}
      </option>
    ));

    if (selectedCountry != "" && selectedCountry != null) {
      var popCities = countries[selectedCountry].map(x => (
        <option key={x} value={x}>
          {" "}
          {x}
        </option>
      ));

      citiesOptions = (
        <span>
          <select
            className="ui dropdown"
            placeholder="City"
            value={selectedCity}
            onChange={this.handleChange}
            name="city"
            label="City"
          >
            <option value="0"> Select a town or city</option>
            {popCities}
          </select>
          <br />
        </span>
      );
    }

    return (
      <React.Fragment>
        <Grid.Column>
          <label>Country</label>
          <div style={{ marginBottom: "5px", marginTop: "5px" }}>
            <select
              className="ui right labeled dropdown"
              placeholder="Country"
              value={selectedCountry}
              onChange={this.handleChange}
              name="country"
            >
              {" "}
              <option value="">Select a country</option>
              {countriesOptions}
            </select>
          </div>
        </Grid.Column>
        <Grid.Column>
          <label>City</label>
          <div style={{ marginBottom: "5px", marginTop: "5px" }} />
          {citiesOptions}
        </Grid.Column>
      </React.Fragment>
    );
  }

  renderNationality() {
    let countriesOptions = [];
    const selectedCountry = this.props.location;

    countriesOptions = Object.keys(countries).map(x => (
      <option key={x} value={x}>
        {x}
      </option>
    ));

    return (
      <React.Fragment>
        <label>Country</label>
        <select
          className="ui right labeled dropdown"
          placeholder="Country"
          value={selectedCountry}
          onChange={this.handleCountryChange}
          name="country"
        >
          {" "}
          <option value="">Select your nationality</option>
          {countriesOptions}
        </select>
      </React.Fragment>
    );
  }
}
