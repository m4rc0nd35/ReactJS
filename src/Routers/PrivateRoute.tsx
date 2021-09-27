// import React, {Component, ElementRef, ElementType} from 'react';
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Authentication } from '../services/AuthService';

export const PrivateRoute = ({ ...props }: RouteProps) => {
	return (
		new Authentication().keepAlive()
			? <Route {...props} />
			: <Redirect to='/auth' />
	)
}

export const PublicRoute = ({ ...props }: RouteProps) => {
	return (
		new Authentication().keepAlive()
			? <Redirect to='/' />
			: <Route {...props} />
	)
}