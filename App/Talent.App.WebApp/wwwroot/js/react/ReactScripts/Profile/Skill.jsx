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
      showNewSkillSection: false,
      showEditSkillSection: false,
      skillData: { name: "", level: "" }
    };

    this.openNewSkillSection = this.openNewSkillSection.bind(this);
    this.openEditSkillSection = this.openEditSkillSection.bind(this);
    this.closeNewSkillSection = this.closeNewSkillSection.bind(this);
    this.closeEditSkillSection = this.closeEditSkillSection.bind(this);
    this.addNewSkill = this.addNewSkill.bind(this);
    this.editSkill = this.editSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
  }

  openNewSkillSection() {
    //const details = Object.assign({}, this.props.details);
    this.setState({
      showNewSkillSection: true
    });
  }

  closeNewSkillSection() {
    this.setState({
      showNewSkillSection: false
    });
  }

  openEditSkillSection(name) {
    const currentValue = this.props.skillData.find(d => d.name === name);

    this.setState({
      showEditSkillSection: true,
      skillData: currentValue
    });
  }

  closeEditSkillSection() {
    this.setState({
      showEditSkillSection: false
    });
  }

  addNewSkill(newItem) {
    let isValid = true;
    let errorMessage;
    //verify there are not empty fields
    if (newItem.name === "" || newItem.level === "") {
      isValid = false;
      errorMessage = "Please enter Skill & Level";
    }

    //verify the skill is not already in the records
    if (this.props.skillData.find(d => d.name === newItem.name)) {
      isValid = false;
      errorMessage = "The Skill is already in the records. Try Another Skill!";
    }

    if (!isValid) {
      return TalentUtil.notification.show(errorMessage, "error", null, null);
    }

    const list = this.props.skillData;
    list.push(newItem);

    this.props.updateProfileData(this.props.componentId, list);
    this.closeNewSkillSection();
  }

  editSkill(newItem) {
    if (newItem.name === "" || newItem.level === "") {
      return TalentUtil.notification.show(
        "Please enter Skill & Level",
        "error",
        null,
        null
      );
    }

    const newSkillList = [...this.props.skillData];
    const index = newSkillList.findIndex(skill => skill.id === newItem.id);

    const { name: oldName, level: oldLevel } = newSkillList[index];
    //if the values are the same dont update
    if (oldName === newItem.name && oldLevel === newItem.level) {
      return TalentUtil.notification.show(
        "Same data as before",
        "error",
        null,
        null
      );
    }

    newSkillList[index] = newItem;
    this.props.updateProfileData(this.props.componentId, newSkillList);
    this.closeEditSkillSection();
  }

  deleteSkill(itemToDelete) {
    let newSkillList = [...this.props.skillData];

    newSkillList = newSkillList.filter(skill => skill.id !== itemToDelete);
    this.props.updateProfileData(this.props.componentId, newSkillList);
  }

  render() {
    let skillList = this.props.skillData;
    let tableData = null;

    if (skillList != "") {
      tableData = skillList.map(skill => (
        <Table.Row key={skill.id}>
          <Table.Cell>{skill.name}</Table.Cell>
          <Table.Cell>{skill.level}</Table.Cell>
          <Table.Cell textAlign="right">
            <Icon
              name="pencil"
              onClick={() => this.openEditSkillSection(skill.name)}
            />

            <Icon name="cancel" onClick={() => this.deleteSkill(skill.id)} />
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
            skillData=""
            buttonContent="Add"
            buttonBasic={false}
            buttonColor="black"
            buttonColorCancel="grey"
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
        </Table>
        <Table.Row>
          {this.state.showEditSkillSection && (
            <NewSkill
              // handleChange={this.handleChange}
              addNewSkill={this.addNewSkill}
              closeNewSkillSection={this.closeEditSkillSection}
              skillData={this.state.skillData}
              buttonContent="Update"
              buttonBasic={true}
              buttonColor="blue"
              buttonColorCancel="red"
            />
          )}
        </Table.Row>

        <Table>
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
      newSkill: this.props.skillData
        ? this.props.skillData
        : { name: "", level: "" }
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
          value={this.state.newSkill.level}
          onChange={this.handleChange}
        />
        <Button
          type="button"
          basic={this.props.buttonBasic}
          color={this.props.buttonColor}
          onClick={this.addSkill}
        >
          {this.props.buttonContent}
        </Button>
        <Button
          basic={this.props.buttonBasic}
          color={this.props.buttonColorCancel}
          type="button"
          onClick={this.props.closeNewSkillSection}
        >
          Cancel
        </Button>
      </React.Fragment>
    );
  }
}
