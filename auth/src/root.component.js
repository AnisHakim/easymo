import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import DoubleAuth from './Pages/DoubleAuth/DoubleAuth';
import ForgetPswd from './Pages/forgetPswd/ForgetPswd';
import Login from "./Pages/Login/Login";
import NewPswd from './Pages/newPswd/NewPswd';
import { Provider, useDispatch } from 'react-redux'
import Store, { persistor } from './store/Store';
import { PersistGate } from 'redux-persist/integration/react'
import PublicRoute from './Route/PublicRoute/PublicRoute';
import React from 'react';
export default function Root(props) {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={Store}>
        <SubscribeListen subscribe={props.subscribe} />
        <Router>
          <Routes>
            <Route path="/" element={<PublicRoute><Login logo={props.logo} /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login logo={props.logo} /></PublicRoute>} />
            <Route path="/login-two-step-verification" element={<PublicRoute><DoubleAuth logo={props.logo} /></PublicRoute>} />
            <Route path="/forget-password" element={<PublicRoute><ForgetPswd logo={props.logo} /></PublicRoute>} />
            <Route path="/resetpassword/:token" element={<PublicRoute><NewPswd logo={props.logo} /></PublicRoute>} />
          </Routes>
        </Router >
      </Provider>
    </PersistGate>


  );
}
function SubscribeListen(props) {
  const dispatch = useDispatch()
  React.useEffect(() => {
    props.subscribe('SET_TOKEN', (msg, data) => {
      dispatch({ type: "SET_TOKEN", payload: data })
    })
    props.subscribe('RESET_TOKEN', (msg, data) => {
      dispatch({ type: "RESET_TOKEN" })
      dispatch({ type: "RESET_MAIL" })
    })
    props.subscribe('SET_PERPAGE', (msg, data) => {
      dispatch({ type: "SET_PERPAGE", payload: data })
    })
  }, [])
  return null
}