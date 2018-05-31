import React from 'react';
import { Router, Route } from 'dva/router';

import MainLayout from './routes/mainLayout/MainLayout.js';
import UserManage from './routes/userManage/UserManage.js';
import ListUsers from './routes/userManage/ListUsers.js';
import ReView from './routes/userManage/ReView.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={MainLayout}>
        <Route path="userManage" component={UserManage} label="简历管理">
          <Route path="listUsers" component={ListUsers} label="列表页" />
          <Route path="reView" component={ReView} label="详情页" />
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
