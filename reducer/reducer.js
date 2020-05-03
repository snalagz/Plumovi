export default function reducer(state, action) {
    switch (action.type) {
      case "ADD_TODO":
        return {
          ...state,
          todos: [...state.todos, action.payload]
        };

      case "SET_UID":
        console.log("reducer")
        state.uid = action.payload
        return{
          ...state
        };
        
      default:
        return state;
    }
}