const KEY = 'token'

export const session = {
    get: () => localStorage.getItem(KEY),
    set: (t: string) => localStorage.setItem(KEY, t),
    clear: () => localStorage.removeItem(KEY),
}

// Lee el "exp" del payload del JWT (en ms). Solo lectura, no valida la firma.
export function getExpiry(token: string): number | null {
    try {
        const payload = token.split('.')[1]!
        const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        const { exp } = JSON.parse(json)
        return typeof exp === 'number' ? exp * 1000 : null
    } catch {
        return null
    }
}

export function isExpired(token: string, skewMs = 5000): boolean {
    const exp = getExpiry(token)
    return exp === null || Date.now() >= exp - skewMs
}