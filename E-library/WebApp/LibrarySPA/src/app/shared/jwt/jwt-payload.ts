import { JwtPayloadKeys } from "./jwt-payload-keys";

export interface IJwtPayload {
    [JwtPayloadKeys.Username] : string;
    [JwtPayloadKeys.Email] : string;
    [JwtPayloadKeys.ExpiredMembership] : string;
    [JwtPayloadKeys.Role] : string | string[];
    exp : number;
    iss : string;
    aud : string;
}
