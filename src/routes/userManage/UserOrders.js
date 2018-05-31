import React from 'react';
import { connect } from 'dva';
import styles from './UserOrders.less';

function UserOrders() {
  return (
    <div className={styles.normal}>
      Route Component: UserOrders
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserOrders);
