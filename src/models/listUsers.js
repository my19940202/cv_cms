import { requestGet } from '../utils/request';
import { message as Message } from 'antd';
const listUrl = '/api/UserView/getUsersByCondition.json';

export default {
    namespace: 'listUsers',
    state: {
        list: [],
        total: null,
        page: 1,
        userType: null,
        kw: null
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
        *getUsers(args, { call, put }) {
            const { code, data, message } = yield call(
                requestGet,
                listUrl,
                {...args, num: 7}
            );
            if (code === 0) {
                yield put({
                    type: 'setData',
                    list: data.data || [],
                    total: data.total || 1,
                    page: args.page
                });
            } else {
                Message.error(message);
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
        }
    }
}
