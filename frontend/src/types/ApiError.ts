// ApiError.ts
export interface ApiError {
  message: string
  response?: {
    data?: {
      message?: string
    }
  }
}
