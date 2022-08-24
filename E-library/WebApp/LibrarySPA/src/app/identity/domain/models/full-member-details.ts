export interface IFullMemberDetails {
    userName : string;
    name : string;
    surname : string;
    email : string;
    credentials : number;
    dateMembership : Date;
    isMembershipPaid : boolean;
    roles : string[];
}