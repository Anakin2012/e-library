export enum JwtPayloadKeys {
    Username = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    Email = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    ExpiredMembership = "http://schemas.microsoft.com/ws/2008/06/identity/claims/expired",
    Role = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
    MembershipPaid = "membership-paid-until"
}
