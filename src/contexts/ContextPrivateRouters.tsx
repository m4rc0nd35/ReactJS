// import React, {Component, ElementRef, ElementType} from 'react';
import { Redirect, Route } from "react-router-dom";

const PrivateRouter = ({...props}) =>{
	return( false
	? <Redirect to='/auth' />
	: <Route {...props} />
	)
}
export default PrivateRouter;