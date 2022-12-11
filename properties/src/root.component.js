import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from "./Route/PrivateRoute/PrivateRoute";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useDispatch } from 'react-redux'
import PropStore, { persistor } from "./Store/Store";
import ListProperties from "./Pages/ListProperties/ListProperties";
import React from "react";
import AddProperties from "./Pages/AddProperties/AddProperties";
export default function Root(props) {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={PropStore}>
        <SubscribeListen subscribe={props.subscribe} />
        <Router>
          <Routes>
            <Route path="/properties" element={<PrivateRoute publish={props.publish} shortLogo={props.shortLogo} subscribe={props.subscribe} logo={props.logo}><ListProperties subscribe={props.subscribe} publish={props.publish} /></PrivateRoute>} />
            <Route path="/properties/add" element={<PrivateRoute publish={props.publish} shortLogo={props.shortLogo} subscribe={props.subscribe} logo={props.logo}><AddProperties subscribe={props.subscribe} publish={props.publish} /></PrivateRoute>} />
          </Routes>
        </Router >
      </Provider>
    </PersistGate>
  );
}
function SubscribeListen(props) {
  const dispatch = useDispatch()
  React.useEffect(() => {
    props.subscribe('ADD_CONTACT', (msg, data) => {
      dispatch({ type: "ADD_CONTACT", payload: data })
    })
  }, [])
  return null
}
