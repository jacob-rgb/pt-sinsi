import { Navigate } from 'react-router-dom';
import { ReactElement, useContext } from 'react';
import { StateContext } from '../state/state';

export const PrivateRoutes = ({ children }: { children: ReactElement }) => {

    const { auth: { isLogged } } = useContext(StateContext);
    return (
       isLogged ? 
         children : <Navigate to={'/'} replace />
    );
};