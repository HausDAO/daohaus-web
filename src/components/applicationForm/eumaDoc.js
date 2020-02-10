import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import eumaDoc from '../../assets/mDao__euma.md';
import './eumaDoc.scss';

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = { terms: null };
  }

  componentWillMount() {
    fetch(eumaDoc)
      .then(response => response.text())
      .then(text => {
        this.setState({ terms: text });
      });
  }

  render() {
    return (
      <div className="EumaContainer">
        <ReactMarkdown source={this.state.terms} />
      </div>
    );
  }
}

export default Terms;
