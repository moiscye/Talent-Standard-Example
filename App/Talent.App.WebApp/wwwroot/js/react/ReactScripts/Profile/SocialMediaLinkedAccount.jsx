/* Social media JSX */
import React from "react";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
import { Popup } from "semantic-ui-react";

export default class SocialMediaLinkedAccount extends React.Component {
  constructor(props) {
    super(props);

    const details = props.linkedAccounts
      ? Object.assign({}, props.linkedAccounts)
      : {
          linkedIn: "",
          github: ""
        };

    this.state = {
      showEditSection: false,
      newAccount: details
    };

    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newAccount);
    data[event.target.name] = event.target.value;
    this.setState({
      newAccount: data
    });
  }

  openEdit() {
    const details = Object.assign({}, this.props.linkedAccounts);
    this.setState({
      showEditSection: true,
      newAccount: details
    });
  }

  closeEdit() {
    this.setState({
      showEditSection: false
    });
  }

  saveContact() {
    const data = Object.assign({}, this.state.newAccount);
    this.props.controlFunc(this.props.componentId, data);
    this.closeEdit();
  }

  render() {
    return this.state.showEditSection
      ? this.renderEdit()
      : this.renderDisplay();
  }

  renderEdit() {
    return (
      <div className="ui sixteen wide column">
        <ChildSingleInput
          inputType="text"
          label="LinkedIn"
          name="linkedIn"
          value={this.state.newAccount.linkedIn}
          controlFunc={this.handleChange}
          maxLength={80}
          placeholder="Enter your LinkedIn URL"
          errorMessage="Please enter a valid URL"
        />
        <ChildSingleInput
          inputType="text"
          label="Github"
          name="github"
          value={this.state.newAccount.github}
          controlFunc={this.handleChange}
          maxLength={80}
          placeholder="Enter your Guthub URL"
          errorMessage="Please enter a valid URL"
        />

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
    let linkedIn = this.props.linkedAccounts
      ? `${this.props.linkedAccounts.linkedIn} `
      : "";
    let github = this.props.linkedAccounts
      ? `${this.props.linkedAccounts.github} `
      : "";
    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <a className="ui linkedin button" href={linkedIn}>
            <i className="linkedin icon" />
            LinkedIn
          </a>
          <a className="ui github button" href={github}>
            <i className="github icon" />
            Github
          </a>

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
