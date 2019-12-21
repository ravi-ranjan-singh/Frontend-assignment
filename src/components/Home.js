import React from 'react';

export default function Home() {
  const countries = [
    'UK',
    'US',
    'Canada',
    'Ireland',
    'Germany',
    'NewZeland',
    'Australia'
  ];

  const textChecker = text => {
    text = text.replace(/ /g, '');

    if (text.match(/^[A-Za-z]+$/)) {
      return true;
    } else {
      return false;
    }
  };

  const urlPost = 'https://profiler-ravi.herokuapp.com/user';

  const NumberChecker = text => {
    if (text.match(/^[0-9]+$/)) return true;
    else return false;
  };
  const validateEmail = email => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const lengthChecker = text => {
    if (text.length === 0) return false;
    else return true;
  };

  const getUI1 = () => {
    return (
      <div className=" custom-control custom-checkbox">
        <h5 className=" mb-2 text-capitalize">
          Please select your Course level.
        </h5>
        <div className="pretty p-default p-round p-thick p-bigger">
          <input type="radio" name="course" className="PG" />
          <div className="state p-primary-o">
            <label>PG</label>
          </div>
        </div>

        <div className="pretty p-default p-round p-thick p-bigger">
          <input type="radio" name="course" className="UG" />
          <div className="state p-primary-o">
            <label> UG</label>
          </div>
        </div>
      </div>
    );
  };

  const getUI2 = () => {
    return countries.map((country, i) => (
      <div className="pretty p-default p-round p-thick p-bigger mb-2" key={i}>
        <input type="radio" className={`${country}`} />
        <div className="state p-primary-o">
          <label> {country.replace('Z', ' Z')}</label>
        </div>
      </div>
    ));
  };
  return (
    <div className="Form my-form my-4">
      <div className="card p-4 my-2 container clearfix">
        <h3 className="text-secondary d-inline">User Details</h3>
        <img
          src="https://image.flaticon.com/icons/png/512/1500/1500330.png"
          alt=""
          height="70px"
          className="float-right "
        />

        <hr />
        <div className="alert successHome p-0 d-none" role="alert"></div>

        <form className="form-group m-auto">
          <div className="p-4">
            <input
              type="text"
              name="Name"
              className="form-input name"
              placeholder="Name"
              style={{ width: '40%' }}
              required
            />

            <input
              type="text"
              name="Contact_Number"
              className="form-input mobile"
              placeholder="Contact Number"
              style={{ width: '40%' }}
              required
              maxLength="10"
              minLength="10"
            />
          </div>
          <div className="px-4">
            <input
              type="email"
              name="Email"
              className="form-input email"
              placeholder="Email"
              style={{ width: '80%' }}
              required
            />
          </div>
          <div className="mt-4 ml-4">
            <input
              type="date"
              name="DOB"
              className="form-input dob"
              placeholder="Date of birth "
              size="30"
            />
          </div>

          <hr />
          <div className="row choices">
            <div className="col-md-6">{getUI1()}</div>

            <div className="col-md-6">
              <h5 className="mb-3">Please Select Your Country Preferences.</h5>

              {getUI2()}
            </div>
          </div>
          <hr />
          <div className="alert alertHome p-0" role="alert"></div>

          <button
            className="btn btn-outline-success bg-success text-light mt-2 btn float-right"
            onClick={e => {
              e.preventDefault();
              const user = {
                Country_Pref: [],
                Course_Level: '',
                Name: '',
                Contact_Number: '',
                DOB: '',
                Email: ''
              };

              countries.map(country => {
                let query = '.' + String(country);
                console.log(query);
                if (document.querySelector(query).checked) {
                  if (country === 'NewZeland') country = 'New Zeland';

                  user.Country_Pref.push(country);
                }
              });

              if (document.querySelector('.PG').checked)
                user.Course_Level = 'PG';
              else if (document.querySelector('.UG').checked)
                user.Course_Level = 'UG';

              user.Name = document.querySelector('.name').value;
              user.Contact_Number = document.querySelector('.mobile').value;
              user.DOB = document.querySelector('.dob').value;
              user.Email = document.querySelector('.email').value;
              const Error = document.querySelector('.alertHome');
              let errorFlag = false;
              if (!textChecker(user.Name) || !lengthChecker(user.Name)) {
                errorFlag = true;

                console.log('errorFlag' + 1);
              }

              if (
                !NumberChecker(user.Contact_Number) ||
                !lengthChecker(user.Contact_Number)
              ) {
                errorFlag = true;
                console.log('errorFlag' + 2);
              }

              // if (!lengthChecker(user.DOB)) {
              //   errorFlag = true;
              //   console.log('errorFlag' + 2);
              // }
              if (!validateEmail(user.Email) || !lengthChecker(user.Email)) {
                errorFlag = true;
                console.log('errorFlag' + 3);
              }

              if (user.Course_Level === '') errorFlag = true;

              if (!user.Country_Pref.length) errorFlag = true;

              Error.innerHTML = '';
              Error.classList.remove('p-2');
              let SuccessMsg = document.querySelector('.successHome');

              if (errorFlag) {
                Error.classList.add('p-2');

                Error.innerHTML +=
                  "<i className='fas fa-exclamation-triangle mr-3'>Credentials are not valid.</i>";
                setTimeout(() => {
                  Error.innerHTML = '';
                  Error.classList.remove('p-2');
                }, 2000);
              } else if (!errorFlag) {
                fetch(urlPost, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(user)
                })
                  .then(data => {
                    SuccessMsg.classList.add('p-2');
                    SuccessMsg.classList.add('d-block');
                    SuccessMsg.classList.add('bg-success');
                    SuccessMsg.innerHTML +=
                      "<i className='fas fa-check-circle'></i>Your response has been registerd successfuly.";
                    setTimeout(() => {
                      window.location = '/';
                    }, 3000);
                  })
                  .catch(err => console.log(err));
              }
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
