"use strict";

import React from 'react';
import axios from "axios";

const SAMPLE_RESOURCE_URI = "/resource/oh-my-github.json";
export default class ProfileUtil extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Since we are planning to split a resource to multiple URI, keep multiple getters
   */
  static getMetaInfoPromise() {
    return axios.get(SAMPLE_RESOURCE_URI)
      .then(result => {
        return result.meta || {};
      });
  }

  static getUserPromise() {
    return axios.get(SAMPLE_RESOURCE_URI)
      .then(result => {
        return result.data.user || {};
      });
  }

  static getActivityPromise() {
    return axios.get(SAMPLE_RESOURCE_URI)
      .then(result => {
        return result.data.activities || {};
      });
  }

  static getLanguagePromise() {
    return axios.get(SAMPLE_RESOURCE_URI)
      .then(result => {
        return result.data.languages || {};
      });
  }

  static getRepositoryPromise() {
    return axios.get(SAMPLE_RESOURCE_URI)
      .then(result => {
        return result.data.repositories || {};
      });
  }
}