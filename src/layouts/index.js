import styles from "./index.less";
import Helmet from "react-helmet";
import "../global.js";
import React, { Component } from "react";

export default class BasicLayout extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className={styles.normal}>
        <Helmet title={"小金桔"} />
        {this.props.children}
        <div className={styles.beian}>
          <a href="http://www.miibeian.gov.cn/" rel="nofollow" target="_blank">
            鲁ICP备19011264号-1
          </a>
        </div>
      </div>
    );
  }
}
