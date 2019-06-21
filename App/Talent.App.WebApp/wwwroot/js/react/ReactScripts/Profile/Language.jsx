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
      showNewLanguageSection: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.openNewLanguageSection = this.openNewLanguageSection.bind(this);
    this.closeNewLanguageSection = this.closeNewLanguageSection.bind(this);
    this.addNewLanguage = this.addNewLanguage.bind(this);
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.languageList);
    console.log("languageList", this.state.languageList);
    //   data[event.target.name] = event.target.value;

    //   this.setState({
    //     newLanguage: data
    //   });
    console.log("value", event.target.value);
    console.log("name", event.target.name);
  }

  openNewLanguageSection() {
    const details = Object.assign({}, this.props.details);
    this.setState({
      showNewLanguageSection: true
    });
  }

  closeNewLanguageSection() {
    this.setState({
      showNewLanguageSection: false
    });
  }

  addNewLanguage(newItem) {
    const list = this.props.languageData;
    list.push(newItem);
    this.props.updateProfileData(list);
    this.closeNewLanguageSection();
  }

  render() {
    let languageList = this.props.languageData;
    // console.log("languageList", languageList);

    // console.log("id", languageList[0].id);

    let tableData = null;

    if (languageList != "") {
      tableData = languageList.map(language => (
        <Table.Row key={language.id}>
          <Table.Cell>{language.name}</Table.Cell>
          <Table.Cell>{language.level}</Table.Cell>
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
        {this.state.showNewLanguageSection && (
          <NewLanguage
            // handleChange={this.handleChange}
            addNewLanguage={this.addNewLanguage}
            closeNewLanguageSection={this.closeNewLanguageSection}
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
      newLanguage: { name: "", level: "" }
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
          placeholder="Language Level"
          options={languageOptions}
          onChange={this.handleChange}
        />
        <Button type="button" color="black" onClick={this.addLanguage}>
          Add
        </Button>
        <Button type="button" onClick={this.props.closeNewLanguageSection}>
          Cancel
        </Button>
      </React.Fragment>
    );
  }
}
