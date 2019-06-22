import React from "react";
import { SingleInput } from "../Form/SingleInput.jsx";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Button, Label, Select, Grid } from "semantic-ui-react";

export default class VisaStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { visaStatus: "", visaExpiryDate: moment() },
      showExpiryDateSection: false,
      showButton: false,
      buttonDisabled: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.openExpiryDateSection = this.openExpiryDateSection.bind(this);
    this.closeExpiryDateSection = this.closeExpiryDateSection.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const data = Object.assign({}, this.state.data);
    data["visaStatus"] = nextProps.visaStatus ? nextProps.visaStatus : "";
    data["visaExpiryDate"] = nextProps.visaExpiryDate
      ? nextProps.visaExpiryDate
      : moment();

    let showDate = false;
    if (
      nextProps.visaStatus === "Work Visa" ||
      nextProps.visaStatus === "Student Visa"
    ) {
      showDate = true;
    }
    this.setState({
      data,
      showExpiryDateSection: showDate,
      showButton: true,
      buttonDisabled: true
    });
  }

  openExpiryDateSection() {
    //const details = Object.assign({}, this.props.details);
    this.setState({
      showExpiryDateSection: true
    });
  }

  closeExpiryDateSection() {
    this.setState({
      showExpiryDateSection: false
    });
  }

  saveData() {
    //console.log(this.state.data);
    this.props.saveProfileData(this.state.data);
  }

  handleDateChange(date) {
    const data = Object.assign({}, this.state.data);
    data["visaExpiryDate"] = date;
    this.setState({
      data,
      buttonDisabled: false
    });
  }
  handleChange(e, { value }) {
    const data = Object.assign({}, this.state.data);
    data["visaStatus"] = value;
    this.setState({
      data
    });
    if (value === "Work Visa" || value === "Student Visa") {
      this.setState({
        showExpiryDateSection: true,
        showButton: true,
        buttonDisabled: true
      });
    } else {
      data["visaExpiryDate"] = "";
      this.setState({
        data,
        showExpiryDateSection: false,
        showButton: true,
        buttonDisabled: false
      });
    }
  }

  render() {
    const visaOptions = [
      { key: "c", value: "Citizen", text: "Citizen" },
      { key: "p", value: "Permanent Resident", text: "Permanent Resident" },
      { key: "w", value: "Work Visa", text: "Work Visa" },
      { key: "s", value: "Student Visa", text: "Student Visa" }
    ];
    // console.log(this.props.visaExpiryDate);
    let initialDate = this.state.data.visaExpiryDate
      ? moment(this.state.data.visaExpiryDate)
      : moment();
    return (
      <div className="ui inline sixteen wide column">
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <label>Visa type</label>
              <br />
              <Select
                //label="Visa Type"
                placeholder="Select Visa Type"
                options={visaOptions}
                onChange={this.handleChange}
                value={
                  this.state.data.visaStatus
                  // ? this.state.data.visaStatus
                  // : this.props.visaStatus
                }
              />
            </Grid.Column>
            {this.state.showExpiryDateSection && (
              <Grid.Column>
                <label>Visa expiry date</label>
                <DatePicker
                  selected={initialDate}
                  onChange={date => this.handleDateChange(date)}
                />
              </Grid.Column>
            )}
            {this.state.showButton && (
              <Grid.Column>
                <br />
                <Button
                  floated="right"
                  type="button"
                  color="black"
                  onClick={this.saveData}
                  //{this.state.disabled}// ? "disabled":""}
                  disabled={this.state.buttonDisabled}
                >
                  Save
                </Button>
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

//   handleChange(e, { value, name }) {
//     const data = Object.assign({}, this.state.newLanguage);
//     if (name === "name") data[name] = value;
//     else data["level"] = value;
//     this.setState({
//       newLanguage: data
//     });
//   }

//   addLanguage() {
//     this.props.addExpiryDate(this.state.newLanguage);
//   }
