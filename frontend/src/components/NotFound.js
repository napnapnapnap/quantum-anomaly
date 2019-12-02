import React, {Component} from 'react';
import {seo} from '../helpers/';

export default class NotFound extends Component {
  render() {
    seo({
      title:           'This page does not exist',
      metaDescription: '404 page'
    });
    return (
      <section className="not-found">
        <h1>Resource not found on the server</h1>
        <p>Here are the most common reasons why this is happening</p>
        <ul className="not-found__list">
          <li>This page was removed</li>
          <li>This page was accessed from old bookmark or link and could be moved, please double check in top navigation if there is a link to the content you are looking for</li>
          <li>Something went really wrong on our server, blame a developer</li>
          <li>Something went really wrong on our frontend, blame a developer</li>
        </ul>
      </section>
    );
  }
}
