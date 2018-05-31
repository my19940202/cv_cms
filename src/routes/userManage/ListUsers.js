import React from 'react';
import { connect } from 'dva';
import { IndexLink } from 'dva/router';
import {Table, Input, Radio, Row, Pagination} from 'antd';
import styles from './ListUsers.less';
import { userViewData } from '../../constant/fakeData';

const Search = Input.Search;
const RadioGroup = Radio.Group;

class ListUsers extends React.Component {

  newColumns = [{
    title: 'Nick',
    dataIndex: 'nick',
    key: 'nick',
    render: text => <div>{text}</div>,
  }, {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    render: (text) => (
      <div>{ parseInt(text) === 1 ? "女" : "男"}</div>
    )
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    render: text => <div>{text}</div>,
  },{
    title: '微信号',
    dataIndex: 'weChat',
    key: 'we_chat',
  }, {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },  {
    title: '最近一次修改时间',
    dataIndex: 'gmtModified',
    key: 'gmtModified',
  }, {
    title: '详细',
    key: 'uid',
    dataIndex: 'uid',
    render: (text, record) => (
      <span>
        <IndexLink to={"/userManage/reView?uid=" + text}>查看详细</IndexLink>
      </span>
    ),
  }];

  componentWillMount() {
    this.props.dispatch({
      type: 'listUsers/getUsers',
      page: 1
    });
  }

  handleCateChange(cate) {
    this.props.dispatch({
      type: "listUsers/setData",
      userType: cate.target.value,
    });
    this.props.dispatch({
      type: "listUsers/getUsers",
      kw: this.props.kw,
      userType: cate.target.value,
      page: 1
    });
  }

  handleSearch(value) {
    this.props.dispatch({
      type: "listUsers/getUsers",
      kw: value,
      userType: this.props.userType,
      page: 1
    });
  }

  pageChangeHandler(page) {
    this.props.dispatch({
      type: 'listUsers/getUsers',
      kw: '',
      userType: this.props.userType,
      page: page
    });
  }

  render() {

    const {
      list,
      total,
      page,
    } = this.props;

    return (
      <div className={styles.normal}>
        <Row className={styles.rowMargin}>
          <Search
            placeholder="输入手机、昵称、微信号搜索"
            style={{width: 400, height: 30}}
            onSearch={(value) => {this.handleSearch(value)}}
            onChange={(e) => {this.props.dispatch({type: 'listUsers/setData', kw: e.target.value});}}
          />
        </Row>
        {
            /*
            <Row className={styles.rowMargin}>
              <RadioGroup onChange={::this.handleCateChange} defaultValue={""}>
                <Radio value={""}>全部</Radio>
                <Radio value={2}>网红</Radio>
                <Radio value={4}>经纪人</Radio>
                <Radio value={1}>媒体</Radio>
              </RadioGroup>
            </Row>
            */
        }
        <Table
          columns={this.newColumns}
          rowKey={record => record.uid}
          dataSource={userViewData || list}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={page}
          pageSize={10}
          onChange={::this.pageChangeHandler}
        />
      </div>

    );
  }
};

export default connect(state => state.listUsers)(ListUsers);
