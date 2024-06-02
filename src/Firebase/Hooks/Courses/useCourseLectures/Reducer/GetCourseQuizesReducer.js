export const INITIAL_STATE = {
  data: [],
  loading: true,
  error: undefined,
};
export const GetCourseLecturesReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        data: [],
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
        data: [],
        loading: false,
        error: action.payload,
      };
  }
};
