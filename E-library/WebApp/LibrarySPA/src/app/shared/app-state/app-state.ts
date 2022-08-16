export interface IAppState {
    accessToken? : string;
    refreshToken? : string;
    userName?: string;
    roles? : string | string[];


    hasRole(role: string) : boolean; 
    clone() : IAppState;

}

export class AppState implements IAppState {
    public accessToken? : string;
    public refreshToken? : string;
    public userName?: string;
    public roles? : string | string[];

    public constructor();
    public constructor(accessToken? : string, refreshToken? : string, userName? : string, roles? : string | string[]);


    public constructor(...args : any[]) {
        if (args.length == 0) {
            return;
        }

        if(args.length == 4) {
            this.accessToken = args[0];
            this.refreshToken = args[1];
            this.userName = args[2];
            this.roles = args[3];
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

    public clone( ) : IAppState {
        const newState = new AppState();
        
        Object.assign(newState, this);

        return newState;
    }

}