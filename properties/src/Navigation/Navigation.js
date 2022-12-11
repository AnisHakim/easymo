import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function CustomNavigation({ children }) {
    const navigate = useNavigate()
    const location = useLocation()
    function navigation(path) {
        path && navigate(path)
    }
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { navigation: navigation, location: location });
        }
        return child;
    });

    return childrenWithProps
}