export default function reducer(state, action) {
    switch (action.type) {
      case "ADD_TODO":
        return {
          ...state,
          todos: [...state.todos, action.payload]
        };
      default:
        return state;
    }
}