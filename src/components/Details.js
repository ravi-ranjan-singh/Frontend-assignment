import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

export default class Details extends Component {
  state = {
    back: false,
    status: 'success',
    data: {}
  };

  formatDate(date) {
    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  render() {
    // console.log('Arpit Bada waala hai', this.props);
    const profile = this.props.profile.data.user;
    // console.log(this.props.profile);

    if (this.state.back) return <Search />;

    return (
      <div className="profile">
        <div className="card p-4 my-4 ">
          <div className="inline-block">
            <Link
              className="btn d-inline bg-dark p-3 text-light"
              onClick={() => {
                this.setState({ back: true });
              }}
            >
              <i class="fas fa-arrow-left"></i>
            </Link>
            <h3
              className="text-info d-inline-block"
              style={{ marginLeft: '20%' }}
            >
              {profile.Name.toUpperCase()}
            </h3>
          </div>

          <hr />
          <li className="list-group-item p-2">
            {' '}
            <h5>
              {' '}
              {this.formatDate(new Date(profile.DOB)) ===
              '1 January 1970' ? null : (
                <span className="text-dark my-2">
                  <span className="bg-primary p-2">Date Of Birth:</span>
                  {this.formatDate(new Date(profile.DOB))}
                </span>
              )}{' '}
            </h5>
          </li>
          <li className="list-group-item p-2">
            {' '}
            <h5>
              {' '}
              <span className="bg-success p-2">Email:</span> {profile.Email}
            </h5>
          </li>
          <hr />
          <li className="list-group-item p-2">
            <h5>
              {' '}
              <span className="bg-warning p-2">Contact: </span>{' '}
              {profile.Contact_Number}
            </h5>
          </li>
          <hr />
          <li className="list-group-item p-2">
            {' '}
            <h5>
              <span className="bg-info p-2"> Course Level: </span>
              {profile.Course_Level}
            </h5>
          </li>

          <hr />

          <li className="list-group-item p-2">
            {' '}
            <h5>
              <span className="bg-secondary p-2"> Country Preferencres: </span>
              {profile.Country_Pref.join(',')}{' '}
            </h5>
          </li>
        </div>
      </div>
    );
  }

  static getDerivedStateFromProps(props) {
    return {
      profile: props.profile
    };
  }
}
