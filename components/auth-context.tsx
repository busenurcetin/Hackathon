"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  isim: string
  soyisim: string
  email: string
  telefon: string
  kayitTarihi: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, sifre: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcı bilgilerini kontrol et
    const kullaniciBilgileri = localStorage.getItem("kullaniciBilgileri")
    if (kullaniciBilgileri) {
      const kullanici = JSON.parse(kullaniciBilgileri)
      setUser({
        isim: kullanici.isim,
        soyisim: kullanici.soyisim,
        email: kullanici.email,
        telefon: kullanici.telefon,
        kayitTarihi: kullanici.kayitTarihi,
      })
    }
  }, [])

  const login = (email: string, sifre: string): boolean => {
    const kullaniciBilgileri = localStorage.getItem("kullaniciBilgileri")

    if (kullaniciBilgileri) {
      const kullanici = JSON.parse(kullaniciBilgileri)

      if (kullanici.email === email && kullanici.sifre === sifre) {
        setUser({
          isim: kullanici.isim,
          soyisim: kullanici.soyisim,
          email: kullanici.email,
          telefon: kullanici.telefon,
          kayitTarihi: kullanici.kayitTarihi,
        })
        return true
      }
    }

    return false
  }

  const logout = () => {
    setUser(null)
    // localStorage'ı temizlemek istemiyoruz, sadece oturumu kapatıyoruz
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
