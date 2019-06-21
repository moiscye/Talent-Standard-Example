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
      showNewExperienceSection: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.openNewExperienceSection = this.openNewExperienceSection.bind(this);
    this.closeNewExperienceSection = this.closeNewExperienceSection.bind(this);
    this.addNewExperience = this.addNewExperience.bind(this);
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.experienceList);
    console.log("experienceList", this.state.experienceList);
    //   data[event.target.name] = event.target.value;

    //   this.setState({
    //     newExperience: data
    //   });
    console.log("value", event.target.value);
    console.log("name", event.target.name);
  }

  openNewExperienceSection() {
    const details = Object.assign({}, this.props.details);
    this.setState({
      showNewExperienceSection: true
    });
  }

  closeNewExperienceSection() {
    this.setState({
      showNewExperienceSection: false
    });
  }

  addNewExperience(newItem) {
    const list = this.props.experienceData;
    list.push(newItem);
    this.props.updateProfileData(list);
    this.closeNewExperienceSection();
  }

  render() {
    let experienceList = this.props.experienceData;
    console.log("experienceList", experienceList);

    // console.log("id", experienceList[0].id);

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
          <Table.Cell>
            <Button type="button" size="mini" icon floated="right">
              <Icon name="pencil" />
            </Button>
            <Button type="button" size="mini" icon floated="right">
              <Icon name="cancel" />
            </Button>
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
          />
        )}
        <Table fixed>
          <Table.Header>
            <Table.Row colSpan="6">
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
      newExperience: {
        company: "",
        position: "",
        responsibilities: "",
        start: moment(),
        end: moment()
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
    // let dateOnly = moment(date).format("MM/DD/YYYY");
    data[name] = date;

    this.setState({
      newExperience: data
    });
    // console.log("new experience", this.state.newExperience);
  }

  addExperience() {
    this.props.addNewExperience(this.state.newExperience);
    console.log("newExperience", this.state.newExperience);
  }

  render() {
    return (
      <div className="ui two wide column">
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

          <Grid.Row columns={2}>
            <Grid.Column>
              <Label>Start Date</Label>
              <br />
              <DatePicker
                selected={this.state.newExperience.start}
                onChange={date => this.handleDateChange(date, "start")}
              />
            </Grid.Column>
            <Grid.Column>
              <Label>End Date</Label>
              <br />
              <DatePicker
                selected={this.state.newExperience.end}
                onChange={date => this.handleDateChange(date, "end")}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
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
          <Grid.Row>
            <Grid.Column>
              <Button type="button" color="black" onClick={this.addExperience}>
                Add
              </Button>
              <Button
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
