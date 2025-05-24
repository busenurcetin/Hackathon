"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = "/" }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      setIsAuthenticated(authenticated)

      if (!authenticated) {
        // Yetkisiz erişim, giriş sayfasına yönlendir
        router.push(redirectTo)
      } else {
        // Token'ı yenile
        authService.refreshToken()
      }

      setIsLoading(false)
    }

    checkAuth()

    // Her 5 dakikada bir auth durumunu kontrol et
    const interval = setInterval(checkAuth, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [router, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <Card className="border-green-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Heart className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">Deprem Dayanışma Ağı</h1>
            </div>
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Yetkilendirme kontrol ediliyor...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Redirect işlemi devam ediyor
  }

  return <>{children}</>
}
