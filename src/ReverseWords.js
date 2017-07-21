import React, { Component } from 'react';

export default class ReverseWords extends Component {
  reverseWords(value) {
    return this.reverse(value);
  }

  reverse(s) { 
    return s.split(/\r?\n/).map(line => line.split(' ').map(word => word.split('').reverse().join('')).join(' ')).join('\n');
  }

  render() {
    return (
      <div className='textInput'>
        <div className="form-group">
          <textarea value={this.props.text} onChange={this.props.handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <textarea value={this.reverseWords(this.props.text)} className="form-control" />
        </div>
      </div>
    );
  }
}
