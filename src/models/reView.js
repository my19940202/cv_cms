import { requestGet } from '../utils/request';

export default {
  namespace: 'reView',
  state: {},
  reducers: {},
  effects: {
    *getReviewList(args, { call, put }) {
      const { code, data, message } = yield call(requestGet, "/api/UserView/getReviewList.json");
      console.log(code, data, message);
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/userManage/reView') {
          dispatch({
            type: 'getReviewList'
          });
        }
      });
    }
  },
};
