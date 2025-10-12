import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

//reducer to update state based on actions to be dispatched
function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

//STEP 1
//created the store for global state; that can be accessed from anywhere
//This is the manual way of demnstrating how the action mutate the state hence will be replaced
//with action creators in step 2
const store = createStore(reducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());
// //advanced payload as an object to pass many pieces of data
// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 1000,
//     purpose: "Buy a house",
//   },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

//STEP 2: ACTION CREATORS FUNCTIONS THAT ANUTOMATICALLY DISPATCH THE ACTION TYPES WITH
//USER DEFINED VALUES
//these functions return actions which are the objects being defined in step 1
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      purpose: purpose,
    },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

//dspatchin actions to update state now
store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(200));
console.log(store.getState());
store.dispatch(requestLoan(1000, "Buy a radio"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());
