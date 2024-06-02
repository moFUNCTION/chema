export const INITIAL_STATE = {
  data: undefined,
  loading: true,
  error: undefined,
};
export const GetVideoReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        data: undefined,
        loading: true,
        error: undefined,
      };
    case "FETCH_SUCCESS":
      return {
        data: action.payload,
        loading: false,
        error: undefined,
      };
    case "FETCH_ERROR":
      return {
        data: undefined,
        loading: false,
        error: action.payload,
      };
  }
};
