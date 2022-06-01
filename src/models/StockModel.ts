import { getStocks } from '@/services/stock/stock';
import type { Effect, ImmerReducer, Subscription } from 'umi';

export interface StockModelState {
  stocks: API.Stock[],
}

export interface StockModelType {
  namespace: 'stockModel';
  state: StockModelState;
  effects: {
    getStocks: Effect;
  };
  reducers: {
    updateStocks: ImmerReducer<StockModelState>;
  };
  subscriptions: { setup: Subscription };
}

const StockModel: StockModelType = {
  namespace: 'stockModel',

  state: {
    stocks: [],
  },

  effects: {
    *getStocks({ payload }, { call, put }) {
      const request = yield call(getStocks, payload);
      if (request) {
        yield put({ type: 'updateStocks', payload: request });
      }
    },
  },

  reducers: {
    updateStocks(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.stocks = action.payload.data;
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/stock/index') {
          dispatch({
            type: 'getStocks',
          });
        }
      });
    },
  },
};

export default StockModel;
