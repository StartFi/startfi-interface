export interface Users {
  ethAddress: string
  wishlist: number[]
  name?: string
  email?: string
  bio?: string
  pic?: string
  role?: UserRole
}
export enum UserRole {
  Admin,
  Normal
}
