export declare class AuthService {
    private readonly googleClient;
    constructor();
    verifyGoogleToken(token: string): Promise<any>;
}
