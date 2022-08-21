export interface IAppState {
    accessToken? : string;
    refreshToken? : string;
    userName?: string;
    roles? : string | string[];
    email? : string;
    membershipExpired? : string;
    firstName? : string;
    lastName? : string;
    membershipPaid? : string;


    hasRole(role: string) : boolean; 
    clone() : IAppState;
    isEmpty() : boolean;

}

export class AppState implements IAppState {
    public accessToken? : string;
    public refreshToken? : string;
    public userName?: string;
    public roles? : string | string[];
    public email? : string;
    public membershipExpired?: string;
    public firstName? : string;
    public lastName? : string;
    public membershipPaid? : string;

    public constructor();
    public constructor(accessToken? : string, refreshToken? : string, userName? : string, roles? : string | string[], email? : string, membershipExpired? : string, firstName? : string, lastName? : string, membershipPaid? : string);


    public constructor(...args : any[]) {
        if (args.length == 0) {
            return;
        }

        if(args.length == 9) {
            this.accessToken = args[0];
            this.refreshToken = args[1];
            this.userName = args[2];
            this.roles = args[3];
            this.email = args[4];
            this.membershipExpired = args[5];
            this.firstName = args[6];
            this.lastName = args[7];
            this.membershipPaid = args[8];
        }
    }

    public hasRole(role: string) : boolean {
        if(!this.roles) {
            return false;
        }

        if(typeof this.roles === 'string' ) {
            return this.roles === role 
        }

        return this.roles.find((roleInRoles : string) => roleInRoles === role) !== undefined;
    }

    public isEmpty(): boolean {
        return this.accessToken === undefined && this.refreshToken === undefined && this.userName === undefined && this.roles === undefined && this.email === undefined && this.membershipExpired === undefined && this.firstName === undefined && this.lastName === undefined && this.membershipPaid === undefined;
      }

    public clone( ) : IAppState {
        const newState = new AppState();
        
        Object.assign(newState, this);

        return newState;
    }

}
