import React, { Component } from 'react';
import InputMask, { Props } from 'react-input-mask';

interface IProps {
	name: string;
	type: string;
	placeholder?: string;
	value?: string;
	onChange?: any;
}

export class PhoneInput extends Component<IProps> {

	render() {
		console.log(this.props)
		return <InputMask
			{...this.props}
			mask="99999999999"
		/>;
	}
}