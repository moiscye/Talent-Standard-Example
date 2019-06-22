import React from "react";
import { Form, Radio, Label } from "semantic-ui-react";
import moment from "moment";

export default class TalentStatus extends React.Component {
  constructor(props) {
    super(props);
    const details = props.status
      ? Object.assign({}, props.status)
      : {
          status: "",
          availableDate: moment()
        };
    this.state = {
      jobSeekingStatus: details
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveData = this.saveData.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const data = Object.assign({}, nextProps.status);
    // data["status"] = value;
    this.setState({ jobSeekingStatus: data });
  }

  handleChange(e, { value }) {
    const data = Object.assign({}, this.state.jobSeekingStatus);
    data["status"] = value;
    this.setState({ jobSeekingStatus: data }, this.saveData);
  }

  saveData() {
    const data = Object.assign({}, this.state.jobSeekingStatus);
    console.log(data);

    this.props.saveProfileData(this.props.componentId, data);
  }

  render() {
    //console.log(this.state.value);
    const skillOptions = [
      { key: "a", value: "Actively looking for a job" },
      { key: "b", value: "Not looking for a job at the moment" },
      { key: "c", value: "Currently employed but open to offers" },
      { key: "d", value: "Will be available on later date" }
    ];

    const optionSection = skillOptions.map(option => (
      <Form.Field key={option.key}>
        <Radio
          label={option.value}
          name="displayProfile"
          value={option.value}
          checked={this.state.jobSeekingStatus.status === option.value}
          onChange={this.handleChange}
        />
      </Form.Field>
    ));

    return (
      <div className="ui column wide">
        <label className="large">Current Status</label>
        <br />
        <br />
        <Form>{optionSection}</Form>
      </div>
    );
  }
}
