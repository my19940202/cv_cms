import React from 'react';
import { connect } from 'dva';
import styles from './ViewArticle.less';

class ViewArticle extends React.Component {

  render() {
    return (
      <div className={styles.normal}>
        Route Component: ViewArticle
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ViewArticle);
