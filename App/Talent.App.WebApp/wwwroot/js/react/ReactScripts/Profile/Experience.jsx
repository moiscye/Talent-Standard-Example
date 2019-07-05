/* Experience section */
import React from "react";
import Cookies from "js-cookie";
import {
  Button,
  Grid,
  Label,
  Table,
  Icon,
  Input,
  Select
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";
export default class Experience extends React.Component {
  constructor(props) {
    super(props);

    const details = this.props.experienceData
      ? this.props.experienceData
      : [
          {
            company: "",
            position: "",
            responsibilities: "",
            start: "",
            end: "",
            id: ""
          }
        ];

    this.state = {
      experienceList: details,
      showNewExperienceSection: false,
      showEditExperienceSection: false,
      experienceData: {
        company: "",
        position: "",
        responsibilities: "",
        start: "",
        end: "",
        id: ""
      }
    };

    // this.openNewExperienceSection = this.openNewExperienceSection.bind(this);
    // this.closeNewExperienceSection = this.closeNewExperienceSection.bind(this);
    // this.addNewExperience = this.addNewExperience.bind(this);
    this.openNewExperienceSection = this.openNewExperienceSection.bind(this);
    this.openEditExperienceSection = this.openEditExperienceSection.bind(this);
    this.closeNewExperienceSection = this.closeNewExperienceSection.bind(this);
    this.closeEditExperienceSection = this.closeEditExperienceSection.bind(
      this
    );
    this.addNewExperience = this.addNewExperience.bind(this);
    this.editExperience = this.editExperience.bind(this);
    this.deleteExperience = this.deleteExperience.bind(this);
  }

  openNewExperienceSection() {
    this.setState({
      showNewExperienceSection: true
    });
  }

  closeNewExperienceSection() {
    this.setState({
      showNewExperienceSection: false
    });
  }

  openEditExperienceSection(id) {
    const currentValue = this.props.experienceData.find(d => d.id === id);

    console.log("here", currentValue);

    this.setState({
      showEditExperienceSection: true,
      experienceData: currentValue
    });
  }

  closeEditExperienceSection() {
    this.setState({
      showEditExperienceSection: false
    });
  }

  addNewExperience(newItem) {
    let isValid = true;
    let errorMessage;
    //verify there are not empty fields
    const startDate = moment(newItem.start);
    const endDate = moment(newItem.end);

    if (!endDate.isAfter(startDate)) {
      isValid = false;
      errorMessage = "End date should be after start date";
    }

    if (!newItem.company || !newItem.position || !newItem.responsibilities) {
      isValid = false;
      errorMessage = "Please fill out all the fields";
    }

    if (!isValid) {
      return TalentUtil.notification.show(errorMessage, "error", null, null);
    }

    const list = this.props.experienceData;
    list.push(newItem);
    this.props.updateProfileData(this.props.componentId, list);
    this.closeNewExperienceSection();
  }

  editExperience(newItem) {
    console.log("edit part", newItem);

    let isValid = true;
    let errorMessage;
    //verify there are not empty fields
    const startDate = moment(newItem.start);
    const endDate = moment(newItem.end);

    if (!endDate.isAfter(startDate)) {
      isValid = false;
      errorMessage = "End date should be after start date";
    }

    if (!newItem.company || !newItem.position || !newItem.responsibilities) {
      isValid = false;
      errorMessage = "Please fill out all the fields";
    }

    if (!isValid) {
      return TalentUtil.notification.show(errorMessage, "error", null, null);
    }

    const newExperienceList = [...this.props.experienceData];
    const index = newExperienceList.findIndex(
      experience => experience.id === newItem.id
    );

    newExperienceList[index] = newItem;
    this.props.updateProfileData(this.props.componentId, newExperienceList);
    this.closeEditExperienceSection();
  }

  deleteExperience(itemToDelete) {
    let newExperienceList = [...this.props.experienceData];

    newExperienceList = newExperienceList.filter(
      experience => experience.id !== itemToDelete
    );
    this.props.updateProfileData(this.props.componentId, newExperienceList);
  }

  render() {
    let experienceList = this.props.experienceData;

    let tableData = null;

    if (experienceList != "") {
      tableData = experienceList.map(experience => (
        <Table.Row key={experience.id}>
          <Table.Cell>{experience.company}</Table.Cell>
          <Table.Cell>{experience.position}</Table.Cell>
          <Table.Cell>{experience.responsibilities}</Table.Cell>
          <Table.Cell>
            {moment(experience.start).format("MMM Do YYYY")}
          </Table.Cell>
          <Table.Cell>
            {moment(experience.end).format("MMM Do YYYY")}
          </Table.Cell>
          <Table.Cell textAlign="right">
            <Icon
              name="pencil"
              onClick={() => this.openEditExperienceSection(experience.id)}
            />

            <Icon
              name="cancel"
              onClick={() => this.deleteExperience(experience.id)}
            />
          </Table.Cell>
        </Table.Row>
      ));
    }

    return (
      <div className="ui sixteen wide column">
        {this.state.showNewExperienceSection && (
          <NewExperience
            // handleChange={this.handleChange}
            addNewExperience={this.addNewExperience}
            closeNewExperienceSection={this.closeNewExperienceSection}
            experienceData=""
            buttonContent="Add"
            buttonBasic={false}
            buttonColor="black"
            buttonColorCancel="grey"
          />
        )}
        <Table fixed>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>Company</Table.HeaderCell>
              <Table.HeaderCell>Position</Table.HeaderCell>
              <Table.HeaderCell>Responsibilities</Table.HeaderCell>
              <Table.HeaderCell>Start</Table.HeaderCell>
              <Table.HeaderCell>End</Table.HeaderCell>
              <Table.HeaderCell>
                <Button
                  type="button"
                  floated="right"
                  color="black"
                  onClick={this.openNewExperienceSection}
                >
                  {/* <i aria-hidden="true" className="add  icon" /> */}
                  Add New
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>

        <Table.Row>
          {this.state.showEditExperienceSection && (
            <NewExperience
              // handleChange={this.handleChange}
              addNewExperience={this.editExperience}
              closeNewExperienceSection={this.closeEditExperienceSection}
              experienceData={this.state.experienceData}
              buttonContent="Update"
              buttonBasic={true}
              buttonColor="blue"
              buttonColorCancel="red"
            />
          )}
        </Table.Row>

        <Table fixed>
          <Table.Body>{tableData}</Table.Body>
        </Table>
      </div>
    );
  }
}

class NewExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newExperience: this.props.experienceData
        ? this.props.experienceData
        : {
            company: "",
            position: "",
            responsibilities: "",
            start: moment(), //new Date()).format("MMM Do YYYY"),
            end: moment() //new Date()).format("MMM Do YYYY")
          }
    };

    this.handleChange = this.handleChange.bind(this);
    this.addExperience = this.addExperience.bind(this);
  }

  handleChange(e, { value, name }) {
    const data = Object.assign({}, this.state.newExperience);
    data[name] = value;
    this.setState({
      newExperience: data
    });
  }

  handleDateChange(date, name) {
    const data = Object.assign({}, this.state.newExperience);
    data[name] = date;
    this.setState({
      newExperience: data
    });
  }

  addExperience() {
    this.props.addNewExperience(this.state.newExperience);
    // console.log("newExperience", this.state.newExperience);
  }

  render() {
    let startFormatted = this.state.newExperience.start
      ? moment(this.state.newExperience.start)
      : moment();
    let endFormatted = this.state.newExperience.end
      ? moment(this.state.newExperience.end)
      : moment();

    return (
      <div className="ui wide column field">
        <Grid columns="equal">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Label>Company</Label>
              <br />
              <Input
                //label="Company"
                type="text"
                name="company"
                value={this.state.newExperience.company}
                onChange={this.handleChange}
                maxLength={80}
                placeholder="Add Company"
              />
            </Grid.Column>
            <Grid.Column>
              <Label>Position</Label>
              <br />
              <Input
                //label="Position"
                type="text"
                name="position"
                value={this.state.newExperience.position}
                onChange={this.handleChange}
                maxLength={80}
                placeholder="Add Position"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Label>Responsibilities</Label>
              <br />
              <Input
                //label="Responsibilities"
                type="text"
                name="responsibilities"
                value={this.state.newExperience.responsibilities}
                onChange={this.handleChange}
                maxLength={80}
                placeholder="Add responsibilities"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={4}>
            <Grid.Column>
              <Label>Start Date</Label>
              <br />
              <DatePicker
                selected={startFormatted}
                onChange={date => this.handleDateChange(date, "start")}
              />
            </Grid.Column>
            <Grid.Column>
              <Label>End Date</Label>
              <br />
              <DatePicker
                selected={endFormatted}
                onChange={date => this.handleDateChange(date, "end")}
              />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <br />
              <Button
                type="button"
                basic={this.props.buttonBasic}
                color={this.props.buttonColor}
                onClick={this.addExperience}
              >
                {this.props.buttonContent}
              </Button>
              <Button
                basic={this.props.buttonBasic}
                color={this.props.buttonColorCancel}
                type="button"
                onClick={this.props.closeNewExperienceSection}
              >
                Cancel
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
