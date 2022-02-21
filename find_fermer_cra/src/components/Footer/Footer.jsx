import React from 'react';
import axios from 'axios';

import { env } from '../../secret';

function Footer() {
  const subscribe = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;

    const response = await axios.post(
      `${env.REACT_APP_URL}/subscription`,
      {
        email,
      },
      { withCredentials: true },
    );

    console.log('response subscription', response);

    event.target.email.value = '';
  };

  return (
    <footer id="footerDelete" className="bg-dark text-center text-white">
      <div className="container p-4 pb-0">
        <section className="">
          <form onSubmit={subscribe}>
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Подпишитесь на нашу рассылку</strong>
                </p>
              </div>
              <div className="col-md-5 col-12">
                <div className="form-outline form-white mb-4">
                  <input
                    type="email"
                    id="form5Example29"
                    className="form-control"
                    name="email"
                  />
                  <label className="form-label" htmlFor="form5Example29">
                    Адрес электронной почты
                  </label>
                </div>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-outline-light mb-4">
                  Подписаться
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
      >
        © 2022 Copyright
      </div>
    </footer>
  );
}

export default Footer;
