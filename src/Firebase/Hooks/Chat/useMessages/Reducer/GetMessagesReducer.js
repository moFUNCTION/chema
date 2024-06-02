export const INITIAL_STATE = {
  loading: true,
  error: false,
  data: [],
};
export const GetMessagesReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        error: false,
        data: [],
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: false,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: true,
        data: [],
      };
  }
};
