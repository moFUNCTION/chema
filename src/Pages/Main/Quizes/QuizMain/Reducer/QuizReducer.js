import { v4 } from "uuid";

export const INITIAL_STATE = {
  quistionNumber: 0,
  answers: [],
  result: undefined,
  post_req: {
    loading: false,
    error: false,
  },
};
export const QuizReducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_CHOOSE_ANSWER": {
      const isAnswerFound = state.answers.find((answer) => {
        return answer.id === action.payload.id;
      })
        ? true
        : false;
      if (isAnswerFound) {
        return {
          ...state,
          answers: state.answers.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                chosedAnswer: action.payload.chosedAnswer,
              };
            }
            return item;
          }),
        };
      } else {
        return {
          ...state,
          answers: [
            ...state.answers,
            {
              id: v4(),
              chosedAnswer: action.payload.chosedAnswer,
            },
          ],
        };
      }
    }
    case "HANDLE_MOVE_NEXT":
      return {
        ...state,
        quistionNumber: state.quistionNumber + 1,
      };
    case "HANDLE_MOVE_PREVIOUS":
      return {
        ...state,
        quistionNumber: state.quistionNumber - 1,
      };
    case "POST_START":
      return {
        ...state,
        post_req: {
          ...state.post_req,
          loading: true,
        },
      };
    case "POST_ERROR":
      return {
        ...state,
        post_req: {
          loading: false,
          error: true,
        },
      };
  }
};
