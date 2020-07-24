import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import eumaContent from '../../content/mDao__euma.md';

import './eumaDoc.scss';

class EumaDoc extends Component {
  constructor(props) {
    super(props);
    this.state = { terms: null };
  }

  componentWillMount() {
    fetch(eumaContent)
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

export default EumaDoc;
