import { RecursivePartial } from 'shared/models';
import { RootState } from 'store/reducers/rootReducer';

export const rootReducer = jest.fn((state, action) => {
  return {
    summary: {},
    transaction: {},
    setting: {},
    category: {},
    account: {},
    transfer: {},
    auth: {},
    user: {},
    app: {}
  };
});

export type MockRootState = RecursivePartial<RootState>;

export default rootReducer;
