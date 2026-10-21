import http from '@/api/http'
import type { LoginRequest, ErrorResponse, LoginResponse, UserResponse } from '../api/types'
import { isAxiosError } from 'axios'
import i18n from '@/locales'
import Utils from './Utils'


export default class APICallsProvider {


    public static async login(params: LoginRequest): Promise<LoginResponse | null> {
        try {
            const response = await http.post<LoginResponse>('/auth/login', params)
            return response.data
        } catch (error: unknown) {
            const errorResponse = isAxiosError<ErrorResponse>(error) ? error.response?.data : undefined
            Utils.showNotification(
                'error',
                i18n.global.t('login.loginError'),
                errorResponse,
                i18n.global.t('login.title'),
            )
            return null
        }
    }

    public static async me(): Promise<UserResponse | null> {
        try {
            const response = await http.get<UserResponse>('/me').then(r => r.data!);
            return response;
        } catch (error: unknown) {
            const errorResponse = isAxiosError<ErrorResponse>(error) ? error.response?.data : undefined
            Utils.showNotification(
                'error',
                i18n.global.t('login.loginError'),
                errorResponse,
                i18n.global.t('login.title'),
            )
            return null
        }
    }
}
