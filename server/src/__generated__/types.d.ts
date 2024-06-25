export type UserRole = 'user' | 'admin';
export type UserLoginMethod = 'normal' | 'google';
export type Subsription_type = "none" | "temp" | "permanent"
export type UserInfoToCreateToken = {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  role: UserRole,
  subscription_type: Subsription_type,
  free_tokens: number,
  login_method: UserLoginMethod
};

export type UserContext = UserInfoToCreateToken | null
export interface GeneralStats {
  [key: string]: string
}
