import { Component } from 'react';

export default class StringFunctions extends Component {
  static reverseText(s) {
    return s.split("").reverse().join("");
  }
  static reverseEachLine(s) {
    return s.split(/\r?\n/).map(x => x.split('').reverse().join('')).join('\n');
  }
  static reverseWords(s) {
    return s.split(/\r?\n/).map(line => line.split(' ').map(word => word.split('').reverse().join('')).join(' ')).join('\n');
  }
  static flipWords(s) {
    return s.split(/\r?\n/).reverse().map(x => x.split(' ').reverse().join(' ')).join('\n')
  }
}
