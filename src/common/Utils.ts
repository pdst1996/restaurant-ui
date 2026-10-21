import { ref } from 'vue'
import { VAR_LOADING } from './Constants'
import type { NlsMessage } from './types'
import type { ErrorResponse } from '../api/types'
import { getLocale } from '@/locales'
import { ElMessage, ElNotification, type MessageType, type NotificationType } from 'element-plus'

const initialAppLoading = localStorage.getItem(VAR_LOADING) === 'false'
export const appLoading = ref(initialAppLoading)

export function setAppLoading(value: boolean): void {
  appLoading.value = value
  localStorage.setItem(VAR_LOADING, value.toString())
}

export function getAppLoading(): boolean {
  return appLoading.value
}

export default class Utils {

  public static showMessage(
    messageType: MessageType,
    message: string,
    axiosDataResponse: ErrorResponse | undefined,
  ): void {
    const errorMessage = Utils.getNlsMessageString(
      axiosDataResponse?.errorMessage,
      getLocale(),
      message,
    )
    ElMessage({
      message: errorMessage,
      type: messageType,
    })
  }

  public static showNotification(
    messageType: NotificationType,
    message: string,
    axiosDataResponse: ErrorResponse | undefined,
    title: string | undefined,
  ): void {
    const errorMessage = Utils.getNlsMessageString(
      axiosDataResponse?.errorMessage,
      getLocale(),
      message
    )
    const colorError: object = {
      color: [
        { color: '#c62828', percentage: 10 },
        { color: '#e52b20', percentage: 25 },
        { color: '#f44336', percentage: 40 },
        { color: '#f65e19', percentage: 55 },
        { color: '#f87616', percentage: 70 },
        { color: '#f98b16', percentage: 85 },
        { color: '#fa9f17', percentage: 100 }
      ],
    };
    const colorSuccess: object = {
      color: [
        { color: '#17c964', percentage: 10 },
        { color: '#25d67b', percentage: 25 },
        { color: '#36df98', percentage: 40 },
        { color: '#35dfb7', percentage: 55 },
        { color: '#32d9d8', percentage: 70 },
        { color: '#3bcfe9', percentage: 85 },
        { color: '#4bcef6', percentage: 100 }
      ],
    };
    ElNotification({
      title,
      type: messageType,
      message: errorMessage,
      duration: 4000,
      progress: (messageType == 'error' ? colorError : colorSuccess)
    })
  }

  public static getNlsMessageString(
    nlsObject: NlsMessage | undefined,
    locale: string,
    fallbackMessage: string
  ): string {
    if (nlsObject !== undefined && nlsObject[locale] !== undefined) {
      return nlsObject[locale];
    } else if (nlsObject !== undefined && nlsObject.default !== undefined) {
      return nlsObject.default;
    }

    return fallbackMessage;
  }

}
