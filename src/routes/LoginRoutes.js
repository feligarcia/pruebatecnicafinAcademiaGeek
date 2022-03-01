import { Navigate } from "react-router-dom"

export const LoginRoutes=({isAuthenticated, children}) => {
    return !isAuthenticated
    ?children
    : <Navigate to="/"/>
}