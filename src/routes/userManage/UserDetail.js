import React from 'react';
import {connect} from 'dva';
import styles from './UserDetail.less';
import UserInfo from './UserInfo';

class UserDetail extends React.Component {

  render() {
    return (
      <div className={styles.normal}>
        {this.props.children || <UserInfo/>}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserDetail);
