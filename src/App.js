import React, { useRef, useState } from 'react';
import './App.css';
import upsideDown from 'flip-text';
import fileDownload from 'js-file-download';

const functions = {
  "reverseText": (s) => s.split("").reverse().join(""),
  "reverseEachLine": (s) => s.split(/\r?\n/).map(x => x.split('').reverse().join('')).join('\n'),
  "reverseWords": (s) => s.split(/\r?\n/).map(line => line.split(' ').map(word => word.split('').reverse().join('')).join(' ')).join('\n'),
  "flipWords": (s) => s.split(/\r?\n/).reverse().map(x => x.split(' ').reverse().join(' ')).join('\n'),
  "upsideDown": upsideDown
};

const getTabFromQueryString = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('mode') ? params.get('mode') : 'reverseText';
}

const getTextFromQueryString = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('text') ? params.get('text') : 'Enter Text Here';
}

const App = () => {
  const [tab, setTab] = useState(getTabFromQueryString());
  const [text, setText] = useState(getTextFromQueryString());
  const inputFile = useRef(null)

  const buildLink = () => `textreverser.com?text=${text}&mode=${tab}`;

  const onChange = ({ target }) => {
    if (target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target.result);
      };
      reader.readAsText(target.files[0]);
    }
  }

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
              <li><a href='http://textreverser.com' className="page-scroll"><span>Reverse Text Generator</span></a></li>
            </ul>
          </div>
        </nav>
        <div className="header-content">
          <div className="row">
            <div className="col-sm-9 header-content-feature">
              <ul className="nav nav-tabs">
                <li className={tab === "reverseText" ? "active" : ""}>
                  <a onClick={() => setTab("reverseText")}>Reverse Text</a>
                </li>
                <li className={tab === "reverseWords" ? "active" : ""} role="presentation">
                  <a onClick={() => setTab("reverseWords")}>Reverse Words</a>
                </li>
                <li className={tab === "reverseEachLine" ? "active" : ""} role="presentation">
                  <a onClick={() => setTab("reverseEachLine")}>Reverse Each Line</a>
                </li>
                <li className={tab === "flipWords" ? "active" : ""} role="presentation">
                  <a onClick={() => setTab("flipWords")}>Flip Words</a>
                </li>
                <li className={tab === "upsideDown" ? "active" : ""} role="presentation">
                  <a onClick={() => setTab("upsideDown")}>Upside-Down Text</a>
                </li>
              </ul>
              <div id="register-form">
                <div className='textInput'>
                  <div className="form-group">
                    <textarea 
                      value={text} 
                      onChange={(e) => setText(e.target.value)} 
                      className="form-control" 
                    />
                  </div>
                  <div className="form-group">
                    <textarea readOnly value={functions[tab](text)} className="form-control" />
                  </div>
                </div>
                <div className='text-right'>
                  <a onClick={() => navigator.clipboard.writeText(buildLink())} className="btn btn-md btn-default btn-pill page-scroll">Copy Link</a>
                  <a onClick={() => navigator.clipboard.writeText(functions[tab](text))} className="btn btn-md btn-default btn-pill page-scroll">Copy to Clipboard</a>
                  <a onClick={() => inputFile.current.click()} className="btn btn-md btn-default btn-pill page-scroll">Load from File</a>
                  <a onClick={() => fileDownload(functions[tab](text), "text.txt")} className="btn btn-md btn-default btn-pill page-scroll">Save as File</a>
                  <input onChange={onChange} type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
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
  )
};

export default App;
