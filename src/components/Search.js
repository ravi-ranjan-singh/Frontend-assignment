import React, { Component } from 'react';

import Details from './Details';
import { Redirect } from 'react-router-dom';

export default class Search extends Component {
  state = {
    errorFrontend: false,
    errorMsg: ' ',
    errorBackend: false,
    search: '',
    urlGet: 'https://profiler-ravi.herokuapp.com/user?email=',
    urlPost: 'https://profiler-ravi.herokuapp.com/user',
    headers: {
      'Content-Type': 'application/json'
    },
    resultRender: false,
    profileData: null
  };

  validateEmail = email => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  show = async () => {
    const email = this.state.search;

    if (email.length < 4) {
      if (email.length == 0)
        this.setState({
          errorMsg: "Email Field Can't Be Empty",
          errorFrontend: true,
          errorBackend: false
        });
      else
        this.setState({
          errorMsg: 'Email length Must Be More Then 3 Characters',
          errorFrontend: true,
          errorBackend: false
        });
    } else if (!this.validateEmail(email))
      this.setState({
        errorMsg: 'Please enter a valid email',
        errorFrontend: true,
        errorBackend: false
      });
    else {
      const res = await fetch(this.state.urlGet + email);
      const resData = await res.json();
      if (resData.status === 'fail' || resData.status === 'error') {
        this.setState({
          errorBackend: true,
          errorMsg: resData.message,
          errorFrontend: false
        });
      } else {
        this.setState({ resultRender: true, profileData: resData });
      }
    }
  };
  render() {
    if (this.state.resultRender)
      return <Details profile={this.state.profileData} />;

    return (
      <div className="search card Form-card">
        <div className="content p-4">
          {this.state.errorFrontend || this.state.errorBackend ? (
            <div className="alert" role="alert">
              <i className="fas fa-exclamation-triangle mr-3"></i>
              {this.state.errorMsg}
            </div>
          ) : null}
          <div className=" d-block my-4  ">
            <input
              type="search"
              className="form-input search-mail"
              placeholder="Search For Email (sam123@hmail.com)"
              onChange={() =>
                this.setState({
                  search: document.querySelector('.search-mail').value.trim()
                })
              }
            />
          </div>
          <button
            className="btn btn-info bg-info text-light float-right"
            onClick={this.show}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}
