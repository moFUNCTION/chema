export const INITIAL_STATE = {
  loading: true,
  error: undefined,
  data: undefined,
};

function ShuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export const GetQuizReducer = (state, action) => {
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
