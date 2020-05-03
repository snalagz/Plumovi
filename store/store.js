import React from "react";

const Store = React.createContext({
  todos: [
    "Buy milk",
  ],
  uid: null,
});

export default Store;