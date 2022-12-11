import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CustomNavigation from "./Navigation/Navigation";
import Signup from "./Pages/PageSignUp/Signup";
export default function Root(props) {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<CustomNavigation><Signup logo={props.logo} signup={props.signup} signupSuccess={props.signupSuccess} /></CustomNavigation>} />
      </Routes>
    </Router>
  );
}
