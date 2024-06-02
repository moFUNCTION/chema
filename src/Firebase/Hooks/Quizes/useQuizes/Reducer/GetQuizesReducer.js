export const INITIAL_STATE = {
  loading: true,
  error: undefined,
  data: [],
};
export const GetQuizesReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        error: undefined,
        data: state.data,
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      };
    case "FETCH_MORE":
      return {
        loading: false,
        error: undefined,
        data: [...state.data, ...action.payload],
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: action.payload,
        data: state.data,
      };
  }
};
