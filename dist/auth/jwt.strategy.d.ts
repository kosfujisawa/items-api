import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwtPayload';
import { RequestUser } from '../types/requestUser';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<RequestUser>;
}
export {};
