import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md p-2 mb-2 navbar-dark bg-primary">
      <div className="container">
        <a href="/" className="navbar-brand">
          {' '}
          <img
            src="https://image.flaticon.com/icons/png/512/608/608950.png"
            alt=""
            height="50px"
          />
          <span className="d-inline-block ml-3">Profile Manager</span>{' '}
        </a>

        <ul className="navbar-nav">
          <Link to="/" className="nav-link">
            <i
              className="fas fa-home rounded-circle bg-danger p-2 text-light active-link"
              onClick={e => {
                e.target.classList.add('active-link');

                document
                  .querySelector('.fa-search')
                  .classList.remove('active-link');
              }}
            ></i>
          </Link>
          <Link to="/search" className="nav-link  text-light ">
            <i
              className="fas fa-search ml-2 bg-warning p-2 rounded-circle "
              onClick={e => {
                e.target.classList.add('active-link');

                document
                  .querySelector('.fa-home')
                  .classList.remove('active-link');
              }}
            ></i>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
