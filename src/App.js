import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReverseText from './ReverseText.js';
import ReverseWords from './ReverseWords.js';
import FlipWords from './FlipWords.js';
import ReverseEachLine from './ReverseEachLine.js';
import ReactGA from 'react-ga';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'reverseText',
      text: 'Enter text here'
    };
    this.handleChange = this.handleChange.bind(this);

    ReactGA.initialize('UA-102948975-1', {debug: true});
    ReactGA.pageview(window.location.pathname);
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  renderActiveTab() {
    if (this.state.currentTab == 'reverseText') 
      return <ReverseText text={this.state.text} handleChange={this.handleChange} />;
    if (this.state.currentTab == 'reverseWords') 
      return <ReverseWords text={this.state.text} handleChange={this.handleChange} />;
    if (this.state.currentTab == 'flipWords') 
      return <FlipWords text={this.state.text} handleChange={this.handleChange} />;
    if (this.state.currentTab == 'reverseEachLine') 
      return <ReverseEachLine text={this.state.text} handleChange={this.handleChange} />;
  }

  getActiveClass(tab) {
    if (this.state.currentTab === tab) return 'active';
    return '';
  }

  selectTab(tab) {
    this.setState({currentTab: tab});
  }

  render() {
    return (
      <header id="header-2" className="dark-header">
        <div className="container">
          <nav className="navbar-1 navbar navbar-default-transparent navbar-default">
            <div className="container-fluid navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                <h3 className="header-brand">Text<span className="text-primary">Reverser</span> </h3>
              </a>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li><a href='http://textreverser.com' className="page-scroll"><span>Text Reverser</span></a></li>
              </ul>
            </div>
          </nav>
          <div className="header-content">
            <div className="row">
              <div className="col-sm-8 header-content-feature">
                <ul className="nav nav-tabs">
                  <li className={this.getActiveClass('reverseText')} role="presentation"><a onClick={x => this.selectTab('reverseText')}>Reverse Text</a></li>
                  <li className={this.getActiveClass('reverseWords')} role="presentation"><a onClick={x => this.selectTab('reverseWords')}>Reverse Words</a></li>
                  <li className={this.getActiveClass('reverseEachLine')} role="presentation"><a onClick={x => this.selectTab('reverseEachLine')}>Reverse Each Line</a></li>
                  <li className={this.getActiveClass('flipWords')} role="presentation"><a onClick={x => this.selectTab('flipWords')}>Flip Words</a></li>
                </ul>
                <div id="register-form">
                  {this.renderActiveTab()}
                </div>
              </div>
              <div className="col-sm-4">
                <br />
                <h3>Reverse Text</h3>
                <p>Reverses the entire text entered in the box.</p>
                <br />
                <h3>Reverse Words</h3>
                <p>Reverses each word in the text. Keep words in the same order.</p>
                <br />
                <h3>Reverse Each Line</h3>
                <p>Reverses the text of each line.</p>
                <br />
                <h3>Flip Words</h3>
                <p>Flips the order of all words in the text. Keeps each word in it's original form.</p>
                <br />
                <p>
                  <a href="#" className="btn btn-md btn-primary-filled btn-pill page-scroll">See Examples</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default App;
