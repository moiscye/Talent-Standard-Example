/* Skill section */
import React from "react";
import Cookies from "js-cookie";
import { Button, Table, Icon, Input, Select } from "semantic-ui-react";

export default class Skill extends React.Component {
  constructor(props) {
    super(props);

    const details = this.props.skillData
      ? this.props.skillData
      : [{ name: "", level: "", id: "" }];

    this.state = {
      skillList: details,
      showNewSkillSection: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.openNewSkillSection = this.openNewSkillSection.bind(this);
    this.closeNewSkillSection = this.closeNewSkillSection.bind(this);
    this.addNewSkill = this.addNewSkill.bind(this);
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.skillList);
    console.log("skillList", this.state.skillList);
    //   data[event.target.name] = event.target.value;

    //   this.setState({
    //     newSkill: data
    //   });
    console.log("value", event.target.value);
    console.log("name", event.target.name);
  }

  openNewSkillSection() {
    const details = Object.assign({}, this.props.details);
    this.setState({
      showNewSkillSection: true
    });
  }

  closeNewSkillSection() {
    this.setState({
      showNewSkillSection: false
    });
  }

  addNewSkill(newItem) {
    const list = this.props.skillData;
    list.push(newItem);
    this.props.updateProfileData(list);
    console.log("list before saving ", list);

    this.closeNewSkillSection();
  }

  render() {
    let skillList = this.props.skillData;
    console.log("skillList", skillList);

    // console.log("id", skillList[0].id);

    let tableData = null;

    if (skillList != "") {
      tableData = skillList.map(skill => (
        <Table.Row key={skill.id}>
          <Table.Cell>{skill.name}</Table.Cell>
          <Table.Cell>{skill.level}</Table.Cell>
          <Table.Cell>
            <Button size="mini" icon floated="right">
              <Icon name="pencil" />
            </Button>
            <Button size="mini" icon floated="right">
              <Icon name="cancel" />
            </Button>
          </Table.Cell>
        </Table.Row>
      ));
    }

    return (
      <div className="ui sixteen wide column">
        {this.state.showNewSkillSection && (
          <NewSkill
            // handleChange={this.handleChange}
            addNewSkill={this.addNewSkill}
            closeNewSkillSection={this.closeNewSkillSection}
          />
        )}
        <Table fixed>
          <Table.Header>
            <Table.Row colSpan="3">
              <Table.HeaderCell>Skill</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>

              <Table.HeaderCell>
                <Button
                  type="button"
                  floated="right"
                  color="black"
                  onClick={this.openNewSkillSection}
                >
                  <i aria-hidden="true" className="add  icon" />
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

class NewSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSkill: { name: "", level: "" }
    };

    this.handleChange = this.handleChange.bind(this);
    this.addSkill = this.addSkill.bind(this);
  }

  handleChange(e, { value, name }) {
    const data = Object.assign({}, this.state.newSkill);
    if (name === "name") data[name] = value;
    else data["level"] = value;
    this.setState({
      newSkill: data
    });
  }

  addSkill() {
    this.props.addNewSkill(this.state.newSkill);
  }

  render() {
    const skillOptions = [
      { key: "b", value: "Beginner", text: "Beginner" },
      { key: "i", value: "Intermediate", text: "Intermediate" },
      { key: "e", value: "Expert", text: "Expert" }
    ];

    return (
      <React.Fragment>
        <Input
          type="text"
          name="name"
          value={this.state.newSkill.name}
          onChange={this.handleChange}
          maxLength={80}
          placeholder="Add Skill"
        />

        <Select
          placeholder="Skill Level"
          options={skillOptions}
          onChange={this.handleChange}
        />
        <Button type="button" color="black" onClick={this.addSkill}>
          Add
        </Button>
        <Button type="button" onClick={this.props.closeNewSkillSection}>
          Cancel
        </Button>
      </React.Fragment>
    );
  }
}
