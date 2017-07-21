import React, { Component } from 'react';

export default class ReverseEachLine extends Component {
  reverseText(value) {
    return this.reverse(value);
  }

  reverse(s) { 
    return s.split(/\r?\n/).map(x => x.split('').reverse().join('')).join('\n');
  }

  render() {
    return (
      <div className='textInput'>
        <div className="form-group">
          <textarea value={this.props.text} onChange={this.props.handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <textarea value={this.reverseText(this.props.text)} className="form-control" />
        </div>
      </div>
    );
  }
}
