import React from "react";
import { useNavigate } from "react-router-dom";
export default function CustomNavigation({ children }) {
    const navigate = useNavigate()
    function navigation(path) {
        path && navigate(path)
    }
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { navigation });
        }
        return child;
    });

    return childrenWithProps
}