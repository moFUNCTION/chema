export const INITIAL_STATE = {
  input: "",
  loading: false,
  error: false,
};
export const AddCommentReducer = (state, action) => {
  switch (action.type) {
    case "FORM_HANDLER":
      return {
        ...state,
        input: action.payload,
      };
    case "POST_START":
      return {
        ...state,
        loading: true,
      };
    case "POST_SUCCESS":
      return {
        input: "",
        loading: false,
        error: false,
      };
    case "POST_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
  }
};
