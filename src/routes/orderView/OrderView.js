import React from 'react';
import { connect } from 'dva';
import styles from './OrderView.less';

function OrderView() {
  return (
    <div className={styles.normal}>
      Route Component: OrderView
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(OrderView);
