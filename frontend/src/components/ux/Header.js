import React, {Component} from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state      = {
      visibleMobile: false
    };
    this.showMobile = this.showMobile.bind(this);
  }

  userLoggedIn() {
    return document.cookie.indexOf('loggedIn=') === -1;
  }

  showMobile() {
    this.setState({
      visibleMobile: !this.state.visibleMobile
    });
  }

  render() {
    return (
      <header className="page-content-header">
        <nav className={'navigation ' + (this.state.visibleMobile ? 'navigation--visible' : '')}>
          <span className="navigation__mobile" onClick={this.showMobile}></span>
          <div className="navigation__title"><a href="/">Quantum Anomaly</a>
          </div>
          <ul className="navigation__content">
            <li className="navigation__link"><a href="/efs-ships">Fitting simulator</a></li>
            {/*<li className="navigation__link"><a href="/skills">Skills</a></li>*/}
            <li className="navigation__link">
              <a href="/incursion-manager">Incursion Manager</a></li>
            <li className="navigation__link"><a href="/epic-arcs">Epic arcs</a>
            </li>
            {this.userLoggedIn() ? (
              <li className="navigation__link"><a href="/auth/google">Login</a></li>
            ) : (
              <li className="navigation__link"><a href="/logout">Logout</a></li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
};
