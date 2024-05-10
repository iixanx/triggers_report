export interface IAuthUtil {
  genAccessToken(userId: number): Promise<string>;
  genRefreshToken(accessToken: string): Promise<string>;
}
