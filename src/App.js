import React, { Component } from 'react';
import './App.css';
import ReactGA from 'react-ga';
import QueryString from 'query-string';
import CopyToClipboard from 'react-copy-to-clipboard';
import StringFunctions from './stringFunctions.js'
import fileDownload from 'react-file-download';
import Dropzone from 'react-dropzone';
import upsideDown from 'flip-text';

let dropzoneRef;
class App extends Component {
  constructor(props) {
    super(props);
    this.functions = {
      "reverseText": StringFunctions.reverseText,
      "reverseEachLine": StringFunctions.reverseEachLine,
      "reverseWords": StringFunctions.reverseWords,
      "flipWords": StringFunctions.flipWords,
      "upsideDown": upsideDown
    };

    this.state = {
      currentTab: this.getCurrentTab(),
      text: this.getInputText()
    };

    ReactGA.initialize('UA-102948975-1', {debug: true});
    ReactGA.pageview(window.location.pathname);

    this.downloadFile = this.downloadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    let fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
      let loadedText = fileLoadedEvent.target.result;
      this.setState({text: loadedText});
    };
    fileReader.readAsText(files[0], "UTF-8");
  }

  handleChange(event) {
    this.setState({'text': event.target.value});
  }

  getCurrentTab() {
    let parsed = QueryString.parse(window.location.search);
    return parsed.mode || 'reverseText';
  }

  getInputText() {
    let parsed = QueryString.parse(window.location.search);
    return parsed.text || 'Enter text here';
  }

  transformText(text, tab) {
    return this.functions[tab](text);
  }

  buildLink() {
    return `textreverser.com?text=${this.state.text}&mode=${this.state.currentTab}`;
  }

  transform() {
    return this.functions[this.state.currentTab](this.state.text);
  }

  getActiveClass(tab) {
    if (this.state.currentTab === tab) return 'active';
    return '';
  }

  selectTab(tab) {
    this.setState({currentTab: tab});
  }

  downloadFile() {
    fileDownload(this.transform(), 'text.txt');
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
              <a className="navbar-brand" href="/">
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
                  <li className={this.getActiveClass('upsideDown')} role="presentation"><a onClick={x => this.selectTab('upsideDown')}>Upside-Down Text</a></li>
                </ul>
                <div id="register-form">
                  <div className='textInput'>
                    <div className="form-group">
                      <textarea value={this.state.text} onChange={this.handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <textarea readOnly value={this.transform()} className="form-control" />
                    </div>
                  </div>
                  <div className='text-right'>
                    <CopyToClipboard text={this.buildLink()}>
                      <a className="btn btn-md btn-default btn-pill page-scroll">Copy Link</a>
                    </CopyToClipboard>
                    <CopyToClipboard text={this.transform()}>
                      <a className="btn btn-md btn-default btn-pill page-scroll">Copy to Clipboard</a>
                    </CopyToClipboard>
                    <a onClick={() => {dropzoneRef.open() }} className="btn btn-md btn-default btn-pill page-scroll">Load from File</a>
                    <a onClick={this.downloadFile} className="btn btn-md btn-default btn-pill page-scroll">Save as File</a>
                    <Dropzone accept='text/*' multiple={false} style={{display: 'none'}} ref={(node) => {dropzoneRef = node; }} onDrop={this.onDrop}>
                      <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                  </div>
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
                <h3>Upside Down Text</h3>
                <p>Flips all of the text upside down.</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default App;
