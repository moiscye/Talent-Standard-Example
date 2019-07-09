import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import TalentCard from "../TalentFeed/TalentCard.jsx";
import { Loader } from "semantic-ui-react";
import CompanyProfile from "../TalentFeed/CompanyProfile.jsx";
import FollowingSuggestion from "../TalentFeed/FollowingSuggestion.jsx";
import { BodyWrapper, loaderData } from "../Layout/BodyWrapper.jsx";
import { Segment, Card, Pagination, Icon } from "semantic-ui-react";

export default class TalentFeed extends React.Component {
  constructor(props) {
    super(props);

    let loader = loaderData;
    loader.allowedUsers.push("Employer");
    loader.allowedUsers.push("Recruiter");

    this.state = {
      loadNumber: 5,
      loadPosition: 0,
      totalCount: 0,
      feedData: [],
      watchlist: [],
      loaderData: loader,
      loadingFeedData: false,
      companyDetails: null
    };

    this.init = this.init.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  init() {
    let loaderData = TalentUtil.deepCopy(this.state.loaderData);
    loaderData.isLoading = false;
    this.setState({ loaderData }); //comment this
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.loadData();
  }

  loadData() {
    var cookies = Cookies.get("talentAuthToken");
    var data = {
      Position: this.state.loadPosition,
      Number: this.state.loadNumber
    };
    $.ajax({
      url: "http://localhost:60290/profile/profile/getTalent",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json"
      },
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      data,
      success: function(res) {
        this.setState({
          feedData: this.state.feedData.concat(res.data),
          totalCount: res.totalCount
        });
      }.bind(this),
      error: function(res) {}
    });
    this.init();
  }

  handleScroll() {
    const win = $(window);
    if (
      $(document).height() - win.height() == Math.round(win.scrollTop()) ||
      $(document).height() - win.height() - Math.round(win.scrollTop()) == 1
    ) {
      if (
        !(
          this.state.loadPosition + this.state.loadNumber >
          this.state.totalCount
        )
      ) {
        this.setState(
          { loadPosition: this.state.loadPosition + this.state.loadNumber },
          function() {
            this.loadData();
          }
        );
      }
    }
  }

  renderTalentCard() {
    const { feedData } = this.state;
    var listOfCards = feedData.map((x, count) => {
      return <TalentCard key={count} feedData={x} />;
    });

    return listOfCards;
  }

  render() {
    const { feedData } = this.state;
    return (
      <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
        <div className="ui talent-feed container grid">
          <div className="four wide column">
            <CompanyProfile />
          </div>

          <div className="eight wide column">
            {feedData.length > 0 ? (
              this.renderTalentCard()
            ) : (
              <p>There are no talens found for your recruitment company</p>
            )}
          </div>

          <div className="four wide column">
            <div className="ui card">
              <FollowingSuggestion />
            </div>
          </div>
        </div>
      </BodyWrapper>
    );
  }
}
