export const INITIAL_STATE = {
  loading: true,
  error: undefined,
  data: undefined,
};
export const GetVideosPurchasedReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        error: undefined,
        data: undefined,
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: action.payload,
        data: undefined,
      };
  }
};
