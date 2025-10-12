//Creating initial state for customers
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

//creating reducers to update state based on the dispatched actions
//from the action creator functions.
export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

//2. CREATING ACTION CREATOR FUNCTIONS TO DISPATCH TYPE OF ACTIONS THAT UPDATE THE CUSTOMER'S INITIAL STATE
export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}
