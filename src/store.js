import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
//STEP 1
//created the store for global state; that can be accessed from anywhere
//This is the manual way of demnstrating how the action mutate the state hence will be replaced
//with action creators in step 2
const store = createStore(rootReducer);

export default store;
