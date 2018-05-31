import React from 'react';
import styles from './ImgDisplayer.less';

class ImgDisplayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showUrl: ''
    }
  }

  onShow(src) {
    this.setState({
      show: true,
      showUrl: src
    });
  }

  render() {
    const { src } = this.props;
    return (
      <span className={styles.normal}>
        <img src={src} className={styles.imgNormal} onClick={this.onShow.bind(this, src)}/>
        {this.state.show &&
          <div onClick={() => {this.setState({show: false});}}
               className={styles.imgShowed}
          >
            <img src={this.state.showUrl}/>
          </div>
        }
      </span>
    );
  }
}

export default ImgDisplayer;
