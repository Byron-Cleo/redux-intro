//IN THIS SLICE, THIS IS REACT TOOLKIT used to improvise its functionality
//REACT TOOLKIT HS THE FOLLOWING IMPROVISATIONS
//a.AUTOMATICALLY CREATE ACTIONS FROM ACTION CREATORS CREATORS
//hence no need of switch statement and the default value is also handled
//b. STATE CAN ALSO BE MUTATED EASILY INSIDE THE REDUCERS
//instaed of spreading the state then picking the slice of the state to update.
//🔥🔥🔥🔥here we mutate directly 🔥🔥🔥🔥🔥
import { createSlice } from "@reduxjs/toolkit";

//THE GLOBAL STATE
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

//HERE WE MODIFY WHAT WE WANT without touching the entire state
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      // state.balance = state.balance + action.payload;
      state.balance += action.payload;
    },
    withdraw(state, action) {
      //state.balance = state.balance - action.payload;
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {amount, purpose}
        }
      },
      reducer(state, action) {
      if (state.loan > 0) return;
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance = state.balance + action.payload.amount;
    }},
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});
console.log("=======", accountSlice);

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

/*
//STEP 1: REDUCER TO UPDATE THE GLOBAL STATE
//reducer to update state based on actions to be dispatched
//NB: THE REDUCER SHOULD NOT HAVE A SIDE EFFECT i.e which is computing capabilites
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

//THSE ARE ACTION CREATORS FROM THE USER GENERATING ACTIONS
//ACTIONS
//STEP 2: ACTION CREATOR FUNCTIONS THAT ANUTOMATICALLY DISPATCH THE ACTION TYPES WITH
//USER DEFINED VALUES
//these functions return actions which are the objects being defined in step 1
//here we can do as much logic as possible and even side effects like fetching data from the API
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //THIS IS THE MIDLLEWARE SITTING BETWEEN THE DISPATCH AND THE STORE
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    //API call
    const url = `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`;

    const res = await fetch(url);
    const data = await res.json();
    const convertedAmount = (amount * data.rates.USD).toFixed(4);

    //dispatch with final value to update the state being determined and the reducer
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      purpose: purpose,
    },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
*/