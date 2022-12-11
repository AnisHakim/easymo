import React from "react";
import CustomNavigation from "../../Navigation/Navigation";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"
export default function PublicRoute(props) {
    const accessToken = useSelector(state => state.auth.accessToken)
    if (!accessToken) {
        return <CustomNavigation >
            {props.children}
        </CustomNavigation>

    } else {
        return <Navigate to="/properties" replace />
    }

}