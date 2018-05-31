import React from 'react';
import { connect } from 'dva';
import styles from './ArticleManage.less';
import ViewArticle from './ViewArticle';

class ArticleManage extends React.Component {

  render() {
    return (
      <div className={styles.normal}>
        { this.props.children || <ViewArticle /> }
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ArticleManage);
