import request, { requestGet } from '../utils/request';
import { message as Message } from 'antd';

export default {
  namespace: 'userInfo',
  state: {
    uid: -1,
    userInfo: {},
    mediaInfo: null,
    celeInfo: null,
    servInfo: null,
    status: null,
    reason: null,
    newReason: null
  },

  reducers: {
    setData(state, data) {
      return {
        ...state,
        ...data
      }
    }
  },

  effects: {
    *getUserById(args, { call, put }) {
      const { code, data, message } = yield call(requestGet, '/api/UserView/getUserById.json', args);
      if (data.userType & 1) {
        yield put({
          type: 'getMediaInfoByUid',
          uid: args.uid
        });
      }
      if (data.userType & 2) {
        yield put({
          type: 'getCeleInfoByUid',
          uid: args.uid
        });
      }
      yield put({
        type: 'setData',
        userInfo: data
      });
    },
    *getMediaInfoByUid(args, { call, put }) {
      const { code, data, message } = yield call(requestGet, '/api/UserView/getMediaInfoByUid.json', args);
      yield put({
        type: 'setData',
        mediaInfo: data,
        serv: JSON.parse(data.serv),
        status: data.mediaStatus,
        reason: data.mediaReason
      });
    },
    *getCeleInfoByUid(args, { call, put }) {
      const { code, data, message } = yield call(requestGet, '/api/UserView/getCeleInfoByUid.json', args);
      yield put({
        type: 'setData',
        celeInfo: data,
        serv: JSON.parse(data.serv),
        status: data.status,
        reason: data.reason
      });
    },
    *reviewCeleInfo(args, { call, put }) {
      const {code, message, data} = yield call(request, "/api/UserView/setCeleInfo.json", args);
      if (code === 0) {
        yield put({
          type: "setData",
          celeInfo: data
        });
      } else {
        Message.error(message);
      }
    },

    *reviewMedia(args, { call, put }) {
      const { code, data, message } = yield call(request, "/api/UserView/setMedia.json", args);
      if (code === 0) {
        yield put({
          type: "setData",
          mediaInfo: data
        });
      } else {
        Message.error(message);
      }
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({pathname, query}) => {
        if (pathname === '/userDetail/userInfo') {
          if (query.uid) {
            dispatch({
              type: "setData",
              uid: query.uid
            });
          }
        }
      });
    }
  },
};
