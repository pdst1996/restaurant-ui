import APICallsProvider from '@/common/APICallsProvider'
import http from './http'
import type { LoginRequest, UserResponse } from './types'

export const authService = {
    login: (body: LoginRequest) => APICallsProvider.login(body),
    me: () => APICallsProvider.me(),
}