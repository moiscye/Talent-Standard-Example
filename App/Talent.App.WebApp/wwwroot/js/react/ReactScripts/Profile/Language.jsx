/* Language section */
import React from "react";
import Cookies from "js-cookie";
import { Button, Table, Icon, Input, Select } from "semantic-ui-react";

export default class Language extends React.Component {
  constructor(props) {
    super(props);

    const details = this.props.languageData
      ? this.props.languageData
      : [{ name: "", level: "", id: "" }];

    this.state = {
      languageList: details,
      showNewLanguageSection: false,
      showEditLanguageSection: false,
      languageData: { name: "", level: "" }
    };

    this.openNewLanguageSection = this.openNewLanguageSection.bind(this);
    this.openEditLanguageSection = this.openEditLanguageSection.bind(this);
    this.closeNewLanguageSection = this.closeNewLanguageSection.bind(this);
    this.closeEditLanguageSection = this.closeEditLanguageSection.bind(this);
    this.addNewLanguage = this.addNewLanguage.bind(this);
    this.editLanguage = this.editLanguage.bind(this);
    this.deleteLanguage = this.deleteLanguage.bind(this);
  }

  openNewLanguageSection() {
    // const details = Object.assign({}, this.props.details);
    this.setState({
      showNewLanguageSection: true
    });
  }

  closeNewLanguageSection() {
    this.setState({
      showNewLanguageSection: false
    });
  }

  openEditLanguageSection(name) {
    const currentValue = this.props.languageData.find(d => d.name === name);

    this.setState({
      showEditLanguageSection: true,
      languageData: currentValue
    });
  }

  closeEditLanguageSection() {
    this.setState({
      showEditLanguageSection: false
    });
  }

  addNewLanguage(newItem) {
    let isValid = true;
    let errorMessage;
    //verify there are not empty fields
    if (newItem.name === "" || newItem.level === "") {
      isValid = false;
      errorMessage = "Please enter Language & Level";
    }

    //verify the language is not already in the records
    if (this.props.languageData.find(d => d.name === newItem.name)) {
      isValid = false;
      errorMessage =
        "The Language is already in the records. Try Another Language!";
    }

    if (!isValid) {
      return TalentUtil.notification.show(errorMessage, "error", null, null);
    }

    const list = this.props.languageData;
    list.push(newItem);

    this.props.updateProfileData(this.props.componentId, list);
    this.closeNewLanguageSection();
  }

  editLanguage(newItem) {
    if (newItem.name === "" || newItem.level === "") {
      return TalentUtil.notification.show(
        "Please enter Language & Level",
        "error",
        null,
        null
      );
    }

    const newLanguageList = [...this.props.languageData];
    const index = newLanguageList.findIndex(
      language => language.id === newItem.id
    );

    const { name: oldName, level: oldLevel } = newLanguageList[index];
    //if the values are the same dont update
    if (oldName === newItem.name && oldLevel === newItem.level) {
      return TalentUtil.notification.show(
        "Same data as before",
        "error",
        null,
        null
      );
    }

    newLanguageList[index] = newItem;
    this.props.updateProfileData(this.props.componentId, newLanguageList);
    this.closeEditLanguageSection();
  }

  deleteLanguage(itemToDelete) {
    let newLanguageList = [...this.props.languageData];

    newLanguageList = newLanguageList.filter(
      language => language.id !== itemToDelete
    );
    this.props.updateProfileData(this.props.componentId, newLanguageList);
  }

  render() {
    let languageList = this.props.languageData;

    let tableData = null;

    if (languageList != "") {
      tableData = languageList.map((language, index) => (
        <Table.Row key={index}>
          <Table.Cell>{language.name}</Table.Cell>
          <Table.Cell>{language.level}</Table.Cell>
          <Table.Cell textAlign="right">
            <Icon
              name="pencil"
              onClick={() => this.openEditLanguageSection(language.name)}
            />
            <Icon
              name="cancel"
              onClick={() => this.deleteLanguage(language.id)}
            />
          </Table.Cell>
        </Table.Row>
      ));
    }

    return (
      <div className="ui sixteen wide column">
        {this.state.showNewLanguageSection && (
          <NewLanguage
            addNewLanguage={this.addNewLanguage}
            closeNewLanguageSection={this.closeNewLanguageSection}
            languageData=""
            buttonContent="Add"
            buttonBasic={false}
            buttonColor="black"
            buttonColorCancel="grey"
          />
        )}
        <Table fixed>
          <Table.Header>
            <Table.Row colSpan="3">
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>

              <Table.HeaderCell>
                <Button
                  type="button"
                  floated="right"
                  color="black"
                  onClick={this.openNewLanguageSection}
                >
                  <i aria-hidden="true" className="add  icon" />
                  Add New
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
        <Table.Row>
          <Table.Cell colSpan="3">
            {this.state.showEditLanguageSection && (
              <NewLanguage
                addNewLanguage={this.editLanguage}
                closeNewLanguageSection={this.closeEditLanguageSection}
                languageData={this.state.languageData}
                buttonContent="Update"
                buttonBasic={true}
                buttonColor="blue"
                buttonColorCancel="red"
              />
            )}
          </Table.Cell>
        </Table.Row>

        <Table>
          <Table.Body>{tableData}</Table.Body>
        </Table>
      </div>
    );
  }
}

class NewLanguage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newLanguage: this.props.languageData
        ? this.props.languageData
        : { name: "", level: "" }
    };

    this.handleChange = this.handleChange.bind(this);
    this.addLanguage = this.addLanguage.bind(this);
  }

  handleChange(e, { value, name }) {
    const data = Object.assign({}, this.state.newLanguage);
    if (name === "name") data[name] = value;
    else data["level"] = value;
    this.setState({
      newLanguage: data
    });
  }

  addLanguage() {
    this.props.addNewLanguage(this.state.newLanguage);
  }

  render() {
    const languageOptions = [
      { key: "b", value: "Basic", text: "Basic" },
      { key: "c", value: "Conversational", text: "Conversational" },
      { key: "f", value: "Fluent", text: "Fluent" },
      { key: "n", value: "Native", text: "Native" }
    ];

    return (
      <React.Fragment>
        <Input
          type="text"
          name="name"
          value={this.state.newLanguage.name}
          onChange={this.handleChange}
          maxLength={80}
          placeholder="Add Language"
        />

        <Select
          //overflow="inherit"
          placeholder="Language Level"
          value={this.state.newLanguage.level}
          options={languageOptions}
          onChange={this.handleChange}
        />
        <Button
          type="button"
          basic={this.props.buttonBasic}
          color={this.props.buttonColor}
          onClick={this.addLanguage}
        >
          {this.props.buttonContent}
        </Button>
        <Button
          basic={this.props.buttonBasic}
          color={this.props.buttonColorCancel}
          type="button"
          onClick={this.props.closeNewLanguageSection}
        >
          Cancel
        </Button>
      </React.Fragment>
    );
  }
}
