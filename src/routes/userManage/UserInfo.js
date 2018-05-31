import React from 'react';
import { connect } from 'dva';
import { Collapse, Row, Col, Tag, Button, Modal, Input, message } from 'antd';
import ImgDisplayer from '../../components/imgDisplayer/ImgDisplayer';
import styles from './UserInfo.less';

const Panel = Collapse.Panel;
const statusDefine = [
  {
    label: '审核中',
    color: 'blue'
  },
  {
    label: '审核通过',
    color: 'green'
  },
  {
    label: '审核不通过',
    color: 'red'
  }
]

class UserInfo extends React.Component {

  componentWillMount() {
    this.props.dispatch({
      type: 'userInfo/getUserById',
      uid: this.props.uid
    });
  }

  submitReview(status, reason) {
    if (this.props.userInfo.userType & 1) {
      this.props.dispatch({
        type: "userInfo/reviewMedia",
        mediaStatus: status,
        mediaReason: reason,
        uid: this.props.uid
      });
    } else if (this.props.userInfo.userType & 2) {

      this.props.dispatch({
        type: "userInfo/reviewCeleInfo",
        status,
        reason,
        uid: this.props.uid
      });
    }
  }

  render() {
    const { userInfo, mediaInfo, celeInfo, serv } = this.props;
    const status = statusDefine[this.props.status];
    return (
      <div className={styles.normal}>
        {userInfo &&
        <div>
          <div>
            <div className={styles.headWrapper}>
              <ImgDisplayer src={userInfo.head}/>
              <br/>
              <span>{userInfo.nick}</span>
            </div>
            <div className={styles.headWrapper}>
              <ImgDisplayer src={userInfo.binCode}/>
              <br/>
              <span>{userInfo.weChat}</span>
            </div>
          </div>

          <Collapse  bordered={false} defaultActiveKey={['1', '2', '3', '4']}>
            <Panel header="个人资料" className={styles.panelStyle} key="1">
              <Row gutter={16} className={styles.row}>
                <Col span={8}>账户余额: {userInfo.vailMoney}</Col>
                <Col span={8}>注册手机: {userInfo.phone}</Col>
                <Col span={8}>性别: {userInfo.gender === '0' ? '男' : '女'}</Col>
              </Row>
              <Row gutter={16} className={styles.row}>
                <Col span={8}>年龄: {userInfo.age}</Col>
                <Col span={8}>职业: {userInfo.pro}</Col>
                <Col span={8}>注册地址: {`${userInfo.provName}/${userInfo.cityName}/${userInfo.districtName}`}</Col>
              </Row>
              <Row gutter={16} className={styles.row}>
                <Col span={8}>注册时间: {userInfo.gmtCreate}</Col>
                <Col span={8}>修改时间: {userInfo.gmtModified}</Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>个人介绍: {userInfo.perDesc}</Col>
              </Row>
            </Panel>



            {((userInfo.userType & 1) !== 0) && mediaInfo &&
              <Panel header={`媒体资料(${mediaInfo.mediaName})`} className={styles.panelStyle} key="2">
                <Row gutter={16} className={styles.row}>
                  <Col span={8}>
                    公众号二维码:
                    <br />
                    <ImgDisplayer src={JSON.parse(mediaInfo.mediaBinCode)[0].url}/>
                  </Col>
                  <Col span={8}>
                    公众号头像:
                    <br />
                    <ImgDisplayer src={JSON.parse(mediaInfo.mediaHead)[0].url}/>
                  </Col>
                </Row>
                <Row gutter={16} className={styles.row}>
                  <Col span={8}>负责人姓名: {mediaInfo.ownerName}</Col>
                  <Col span={8}>负责人微信号: {mediaInfo.ownerWechat}</Col>
                  <Col span={8}>负责人联系手机: {mediaInfo.ownerPhone}</Col>
                </Row>
                <Row gutter={16} className={styles.row}>
                  <Col span={8}>注册时间: {mediaInfo.gmtCreate}</Col>
                  <Col span={8}>修改时间: {mediaInfo.gmtModified}</Col>
                </Row>
                <Row gutter={16} className={styles.row}>
                  <Col span={8}>身份证(正面):
                    <br />
                    <ImgDisplayer src={JSON.parse(mediaInfo.ownerIdCard)[0].url}/>
                  </Col>
                  <Col span={8}>身份证(反面):
                    <br />
                    <ImgDisplayer src={JSON.parse(mediaInfo.ownerIdCard)[1].url}/>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>办公地址: {mediaInfo.officeAddress}</Col>
                </Row>

              </Panel>
            }



            {((userInfo.userType & 2) !== 0) && celeInfo &&
              <Panel header={`网红资料(${celeInfo.catePath})`} className={styles.panelStyle} key="3">
                <Row gutter={16} className={styles.row}>

                  <Col span={24}>
                    {JSON.parse(celeInfo.imgs).map((img, idx) => (

                      <span style={{ padding: '0.1rem' }} key={"celeImgs" + idx}>
                        <ImgDisplayer src={img.url}/>
                      </span>
                    ))}
                  </Col>
                </Row>

                <Row gutter={16} className={styles.row}>
                  <Col span={8}>身高: {celeInfo.height} CM</Col>
                  <Col span={8}>体重: {celeInfo.weight} KG</Col>
                  <Col span={8}>三围: {`${celeInfo.chest} ${celeInfo.waist} ${celeInfo.hip}`}</Col>
                </Row>

                <Row gutter={16} className={styles.row}>
                  <Col span={8}>兴趣爱好: {celeInfo.hobby}</Col>
                  <Col span={8}>眼睛颜色: {celeInfo.eyes}</Col>
                  <Col span={8}>头发颜色: {celeInfo.hair}</Col>
                </Row>

                <Row gutter={16} className={styles.row}>
                  <Col span={8}>鞋码: {celeInfo.shoes}</Col>
                  <Col span={8}>魅力部位: {celeInfo.hotPartTag}</Col>
                </Row>

                <Row gutter={16} className={styles.row}>
                  <Col span={8}>气质标签:
                    {JSON.parse(celeInfo.qizhiTag).map(((tag, idx) => (
                      <Tag color="#ec52b6" key={"qizhiTag" + idx}>{tag.label}</Tag>
                    )))}
                  </Col>
                  <Col span={8}>体型标签:
                    {JSON.parse(celeInfo.shape).map(((tag, idx) => (
                      <Tag color="#2db7f5" key={"shapeTag" + idx}>{tag.label}</Tag>
                    )))}
                  </Col>
                </Row>

                <Row gutter={16} className={styles.row}>
                </Row>

                <Row gutter={16} className={styles.row}>
                  <Col span={8}>直播平台: {celeInfo.zhiboPlatform}</Col>
                  <Col span={8}>直播id: {celeInfo.zhiboId}</Col>
                  <Col span={8}>粉丝数量: {celeInfo.zhiboFensNum}</Col>
                </Row>

                <Row gutter={16} className={styles.row}>
                  <Col span={8}>微博: {celeInfo.weibo}</Col>
                  <Col span={8}>微博粉丝数量: {celeInfo.weiboFensNum}</Col>
                </Row>

                <Row gutter={16} className={styles.row}>
                  <Col span={8}>直播风格:
                    {JSON.parse(celeInfo.zhiboStyle).map(((tag, idx) => (
                      <Tag color="#2db7f5" key={"zhiboStyleTag" + idx}>{tag.label}</Tag>
                    )))}
                  </Col>
                  <Col span={8}>直播公告: {celeInfo.zhiboContent}</Col>
                </Row>

              </Panel>
            }
            {serv &&
              <Panel header={`服务信息`} className={styles.panelStyle} key="4">
                {serv.map((item, idx) => (
                  <Tag color="#524f4f" key={"servTag" + idx} style={{ marginBottom: '0.2rem' }}>
                    {`${item.servName}: ${item.price} /${item.unit}`}
                  </Tag>
                ))}
              </Panel>
            }
          </Collapse>
          {this.props.status !== null &&
            <div>
              <span>
                审核状态:<Tag color={status.color}>{status.label}</Tag>
              </span>
              {
                (this.props.status === 2) &&
                //true &&
                <span style={{marginLeft: '0.2rem'}}>
                  不通过原因: {this.props.reason}
                </span>
              }
              {
                (this.props.status === 0) &&
                //true &&
                  <span style={{ marginLeft: '0.2rem' }}>
                    <Button.Group>
                      <Button onClick={() => {
                        message.success('审核通过');
                        this.submitReview(1);
                        this.props.dispatch({
                          type: 'userInfo/setData',
                          status: 1
                        });
                      }}>
                        通 过
                      </Button>
                      <Button type="danger" onClick={() => {
                        if (!this.props.newReason) {
                          message.error("未填写不通过原因");
                        } else {
                          message.success("审核不通过: " + this.props.newReason);
                          this.submitReview(2, this.props.newReason);
                          this.props.dispatch({
                            type: 'userInfo/setData',
                            status: 2,
                            reason: this.props.newReason
                          });
                        }
                      }}>
                        不通过
                      </Button>
                    </Button.Group>
                    <Input placeholder='填写不通过原因'
                           style={{ marginLeft: '0.2rem', width: '4rem'}}
                           onChange={(e) => {
                             this.props.dispatch({
                               type: 'userInfo/setData',
                               newReason: e.target.value
                             });
                           }}
                    />
                  </span>
              }
            </div>
          }
        </div>
        }
      </div>
    );
  }
}

export default connect(state => state.userInfo)(UserInfo);
