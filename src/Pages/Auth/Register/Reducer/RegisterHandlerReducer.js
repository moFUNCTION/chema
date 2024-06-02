export const INITIAL_STATE = {
  loading: false,
  error: false,
  data: {
    username: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    grade: "first-secondary",
    phoneNumber: "",
    parentPhoneNumber: "",
  },
};
export const RegisterHandlerReducer = (state, action) => {
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
          phoneNumber: "",
          parentPhoneNumber: "",
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
