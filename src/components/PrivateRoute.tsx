import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from "../context/AuthContext";

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const {currentUser, loading} = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (!currentUser) {
        return <Navigate to="/login" />
    }

    return <>{children}</>;
}

