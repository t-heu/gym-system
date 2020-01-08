import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import student from './student/reducer';
import helpOrders from './helpOrders/reducer';
import plans from './plans/reducer';

export default combineReducers({
  auth,
  user,
  student,
  helpOrders,
  plans
});
