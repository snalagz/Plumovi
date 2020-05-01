import { useContext, useReducer } from "react";


import Store from "../store/store";
import reducer from "../reducer/reducer";

function MyApp({ Component, pageProps }) {
    const globalStore = useContext(Store);
    const [state, dispatch] = useReducer(reducer, globalStore)

    return (
      <Store.Provider value={{ state, dispatch }}>
        <Component {...pageProps} />
      </Store.Provider>
    )
}


export default MyApp