import React from 'react';
import { connect } from 'dva';
import styles from './UserArticles.less';

function UserArticles() {
  return (
    <div className={styles.normal}>
      Route Component: UserArticles
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserArticles);
