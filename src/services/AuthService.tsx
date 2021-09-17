import jwtDecode from "jwt-decode";
import { config } from '../setting'

interface IPayload {
	name: string;
	email: string;
	iat: Number;
	exp: Number;
}

export class Authentication {

	create = (token: string): boolean => {
		try {
			sessionStorage.setItem(config.TOKEN, token);
			return true;
		} catch (error) {
			return false;
		}
	}

	payload = (): IPayload => {
		try {
			const payload: IPayload = jwtDecode(String(sessionStorage.getItem(config.TOKEN)));
			return payload;
		} catch (error) {
			throw new Error("Error payload");
		}
	}

	keepAlive = (): boolean => {
		try {
			const payload: IPayload = jwtDecode(String(sessionStorage.getItem(config.TOKEN)));
			const now: Number = (Date.now() / 1000);
			const alive = (payload.exp > now) ? true : false;
			console.log(now);
			if (!alive)
				this.delete();
				
			return alive;
		} catch (error) {
			this.delete();
			return false;
		}
	}

	delete = (): boolean => {
		try {
			sessionStorage.removeItem(config.TOKEN);
			return true;
		} catch (error) {
			return false;
		}
	}
}