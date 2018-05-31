import React from 'react';
import { connect } from 'dva';
import styles from './ReView.less';
import { userViewData } from '../../constant/fakeData';
import { Avatar,Table } from 'antd';

let demoData = userViewData[0];
//  format demoData
// for (let key in demoData) {
//     console.log(key, demoData[key]);
// }
let demoDataSource = [];
Object.keys(demoData).map((val, idx) => {
    console.log(val, idx)
    demoDataSource.push({
        key: idx,
        name: val,
        value: demoData[val]
    })
});

const columns = [{
  title: 'key',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'value',
  dataIndex: 'value',
  key: 'value',
}];

class ReView extends React.Component {
    render() {
        console.log(demoData);
        return (
            <div className={styles.normal}>
                <Avatar src={demoData.head} style={{backgroundColor: '#87d068', width: 200, height: 200}}/>
                <Table dataSource={demoDataSource} columns={columns} />
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(ReView);
