import { Request } from 'express';

// extend defintion for request
export interface IAuthRequest extends Request {
	user: string | object | any;
}
