//IN THIS SLICE, THIS IS REACT TOOLKIT used to improvise its functionality
//REACT TOOLKIT HS THE FOLLOWING IMPROVISATIONS
//a.
// 
//THE GLOBAL STATE
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
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
