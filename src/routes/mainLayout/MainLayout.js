import React from 'react';
import { Layout, Menu } from 'antd';
import { IndexLink, hashHistory } from 'dva/router';
import styles from './MainLayout.less';
import UserManage from '../userManage/UserManage';

const {
    Header, Content, Sider, Footer,
} = Layout;

class MainLayout extends React.Component {
        setPaths() {
        const { route, location } = this.props;
        const routePaths = location.pathname.split('/');
        let [, topPath, secPath] = routePaths;
        if (!topPath) {
          topPath = route.childRoutes[0].path;
        }
        let topKey = `${route.childRoutes.map(item => item.path).indexOf(topPath)}`;
        //console.log(route.childRoutes.map(item => item.path), topKey);
        let secKey = '0';
        let hasSec = false;
        if (topKey !== '-1') {
          if (route.childRoutes[topKey].childRoutes) {
            hasSec = true;
            secKey = `${route.childRoutes[topKey].childRoutes.map(item => item.path).indexOf(secPath)}`;
            if (secKey === '-1') {
              secKey = '0';
              secPath = route.childRoutes[topKey].childRoutes[0].path;
            }
          }
        } else {
          topKey = '0';
        }
        return {
          topPath,
          secPath,
          topKey,
          secKey,
          hasSec,
        };
    }

    render() {
        const { route, location } = this.props;
        const paths = this.setPaths();
        // const realPath = ["", paths.topPath, paths.secPath].join("/");
        //
        // if (realPath !== location.pathname) {
        //   location.pathname = realPath;
        //   hashHistory.push(realPath);
        // }
        //console.log(this.props);
        //console.log(paths);
        return (
          <Layout className={styles.mainLayout}>
            <Header className={styles.header}>
              <div className={styles.logo}>
                简历管理系统
              </div>
              <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={[paths.topPath]}
                style={{ lineHeight: '64px' }}
              >
                {
                  route.childRoutes.map(item => item.label ?
                    (<Menu.Item key={item.path}>
                      <IndexLink to={`/${item.path}`}>{item.label}</IndexLink>
                    </Menu.Item>) : <Menu.Item key="1"/>)
                }
              </Menu>
            </Header>

            <Layout style={{ backgroundColor: 'white', padding: '0.3rem 0.2rem' }}>
              {paths.hasSec &&
              <Sider style={{ borderRight: '1px solid #e9e9e9', backgroundColor: 'white' }}>

                <Menu
                  theme="light"
                  mode="vertical"
                  selectedKeys={[paths.secPath]}
                  style={{ lineHeight: '64px', border: 'none', padding: '0.2rem 0 0 0.2rem' }}
                >
                  {route.childRoutes[paths.topKey].childRoutes.map(item => (
                    <Menu.Item key={item.path}>
                      <IndexLink to={`/${paths.topPath}/${item.path}`}>{item.label}</IndexLink>
                    </Menu.Item>
                  ))}
                </Menu>
              </Sider>
              }

              <Content style={{ padding: '0 0.5rem' }}>
                {this.props.children || <UserManage /> }
              </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
              © 简历管理CMS 2018
            </Footer>
          </Layout>
    );
  }
}

export default MainLayout;
