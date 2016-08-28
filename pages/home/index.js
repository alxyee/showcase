/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import {title, html} from './index.md';
import {connect} from 'react-redux'


class HomePageView extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
  };

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout className={s.content}>
        <button className={"mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"}
                onClick={()=>{this.props.buttonWasClicked()}}>Click me now
        </button>
        <div>This is a boilerplate</div>
      </Layout>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    buttonWasClicked: () => {

    }
  }
}

const HomePage =
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePageView)

export default HomePage;
