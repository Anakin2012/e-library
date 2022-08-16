import { JwtPayloadKeys } from "./jwt-payload-keys";

export interface IJwtPayload {
    [JwtPayloadKeys.Username] : string;
    [JwtPayloadKeys.Email] : string;
    [JwtPayloadKeys.Role] : string | string[];
    [JwtPayloadKeys.ExpiredMembership] : string;
    exp : number;
    iss : string;
    aud : string;
}
