import Cookies from "js-cookie"

export interface User {
  isim: string
  soyisim: string
  email: string
  telefon: string
  kayitTarihi: string
}

export interface AuthToken {
  user: User
  loginTime: number
  expiresAt: number
}

const AUTH_COOKIE_NAME = "deprem_auth_token"
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 saat

export const authService = {
  // Giriş yap
  login: (email: string, sifre: string): boolean => {
    try {
      const kullaniciBilgileri = localStorage.getItem("kullaniciBilgileri")

      if (kullaniciBilgileri) {
        const kullanici = JSON.parse(kullaniciBilgileri)

        if (kullanici.email === email && kullanici.sifre === sifre) {
          const user: User = {
            isim: kullanici.isim,
            soyisim: kullanici.soyisim,
            email: kullanici.email,
            telefon: kullanici.telefon,
            kayitTarihi: kullanici.kayitTarihi,
          }

          const authToken: AuthToken = {
            user,
            loginTime: Date.now(),
            expiresAt: Date.now() + SESSION_DURATION,
          }

          // Cookie'ye güvenli şekilde kaydet
          Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(authToken), {
            expires: 1, // 1 gün
            secure: true, // HTTPS'de çalışır
            sameSite: "strict", // CSRF koruması
            httpOnly: false, // Client-side erişim için false (gerçek uygulamada httpOnly: true olmalı)
          })

          return true
        }
      }
      return false
    } catch (error) {
      console.error("Login hatası:", error)
      return false
    }
  },

  // Çıkış yap
  logout: (): void => {
    Cookies.remove(AUTH_COOKIE_NAME)
  },

  // Kullanıcı bilgilerini al
  getCurrentUser: (): User | null => {
    try {
      const authCookie = Cookies.get(AUTH_COOKIE_NAME)
      if (!authCookie) return null

      const authToken: AuthToken = JSON.parse(authCookie)

      // Token süresi kontrol et
      if (Date.now() > authToken.expiresAt) {
        authService.logout()
        return null
      }

      return authToken.user
    } catch (error) {
      console.error("Token parse hatası:", error)
      authService.logout()
      return null
    }
  },

  // Authentication durumu kontrol et
  isAuthenticated: (): boolean => {
    return authService.getCurrentUser() !== null
  },

  // Token'ı yenile
  refreshToken: (): boolean => {
    try {
      const user = authService.getCurrentUser()
      if (!user) return false

      const authToken: AuthToken = {
        user,
        loginTime: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION,
      }

      Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(authToken), {
        expires: 1,
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      })

      return true
    } catch (error) {
      console.error("Token yenileme hatası:", error)
      return false
    }
  },
}
