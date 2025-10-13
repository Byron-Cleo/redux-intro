//THIS IS CREATING STORE WITH THUNK INCLUDED
//TWO MAIN FUNCTIONS ARE USED:
//a. applyMiddleware() function TO CREATE A FUNCTION REFERED TO AS MIDDLEWARE 
// where app computations and side effects are computed
//NB: rmemeber the middleware is a returned function wthich does the heavy work of
//API fetching or computations like Dates()function or Math() functions
import { applyMiddleware, combineReducers, createStore } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
//STEP 1
//created the store for global state; that can be accessed from anywhere
//the thunk in place is used by the application as a middleware which sits in between the reducers(STORE) and the actions
// to do the computations and side effects as required by the application being built
//HERE WE ARE SAYING WE WANT TO USE THUNK IN OUR APPLICATION
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
