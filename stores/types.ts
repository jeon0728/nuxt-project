export interface LoginResponse {
    accessToken: string
    refreshToken?: string
    // 필요시 user info 포함
    user?: {
        id: number;
        email: string;
        name?: string;
    }
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number
  name: string
  price: number
}