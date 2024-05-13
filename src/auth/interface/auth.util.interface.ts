export interface IAuthUtil {
  genAccessToken(userId: number): Promise<string>;
  genRefreshToken(userId: number): Promise<string>;
}
