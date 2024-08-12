export interface AuthState {
  Loading: boolean;
  userInfo: User | null;
  isAuthenticated:boolean;
  
}
export interface User {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  passwordResetToken: string | null;
  passwordResetExpires: string | null;
  profileUrl: string | null;
  isVerified: boolean;
  verifycode: string;
  VerifyCodeExpiry: string;
  refreshToken: string | null;
  roles: string[];
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
 
}
