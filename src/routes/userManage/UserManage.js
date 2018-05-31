import React from 'react';
import { connect } from 'dva';
import styles from './UserManage.less';
import View from './ListUsers';

class UserManage extends React.Component {
  render() {
    return (
      <div className={styles.normal}>
        {this.props.children || <View />}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserManage);
