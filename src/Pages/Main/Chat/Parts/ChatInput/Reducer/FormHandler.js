export const INITIAL_STATE = {
  loading: false,
  error: false,
  data: {
    message: "",
    image: "",
  },
};
export const FormHandlerReducer = (state, action) => {
  switch (action.type) {
    case "FORM_HANDLER":
      return {
        ...state,
        data: { ...state.data, [action.payload.name]: action.payload.value },
      };

    case "POST_START":
      return {
        ...state,
        loading: true,
      };
    case "POST_SUCCESS":
      return {
        loading: false,
        error: false,
        data: {
          message: "",
          image: "",
        },
      };
    case "POST_ERROR":
      return {
        ...state,
        error: true,
        loading: false,
      };
  }
};
