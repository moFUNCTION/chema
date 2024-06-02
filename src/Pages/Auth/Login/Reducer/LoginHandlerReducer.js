export const INITIAL_STATE = {
  loading: false,
  error: false,
  data: {
    email: "",
    password: "",
    showPassword: true,
    grade: "first-secondary",
  },
};
export const LoginHandlerReducer = (state, action) => {
  switch (action.type) {
    case "FORM_HANDLER":
      return {
        ...state,
        data: { ...state.data, [action.payload.name]: action.payload.value },
      };
    case "SHOW_PASSWORD":
      return {
        ...state,
        data: { ...state.data, showPassword: action.payload },
      };
    case "POST_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "POST_SUCCESS":
      return {
        loading: false,
        error: false,
        data: {
          email: "",
          password: "",
          grade: "first-secondary",
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
