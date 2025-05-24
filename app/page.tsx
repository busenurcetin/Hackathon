"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, LogIn, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth"

export default function LandingPage() {
  const [formData, setFormData] = useState({
    email: "",
    sifre: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Sayfa yüklendiğinde zaten giriş yapılmış mı kontrol et
  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.push("/dashboard")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basit validasyon
    const newErrors: Record<string, string> = {}

    if (!formData.email) newErrors.email = "Email gereklidir"
    if (!formData.sifre) newErrors.sifre = "Şifre gereklidir"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        // Simüle edilmiş giriş işlemi
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Auth service ile giriş yap
        const loginSuccess = authService.login(formData.email, formData.sifre)

        if (loginSuccess) {
          console.log("Giriş başarılı:", formData.email)

          // Başarılı giriş sonrası dashboard'a yönlendir
          router.push("/dashboard")
        } else {
          setErrors({ email: "Email veya şifre hatalı" })
        }
      } catch (error) {
        console.error("Giriş hatası:", error)
        setErrors({ email: "Giriş sırasında bir hata oluştu" })
      }
    }

    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Hata mesajını temizle
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid min-h-screen grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Sol Taraf - Fotoğraf ve Açıklama */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-center">
              <div className="mb-6 flex items-center justify-center gap-3">
                <Heart className="h-12 w-12 text-green-600" />
                <h1 className="text-4xl font-bold text-green-800 lg:text-5xl">Deprem Dayanışma Ağı</h1>
              </div>
              <p className="text-lg text-green-700 mb-8 max-w-md mx-auto">
                Deprem sonrası yardımlaşma ve dayanışma platformu. Birlikte daha güçlüyüz, birlikte iyileştiriyoruz.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative w-full max-w-md">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Dayanışma ve yardımlaşma"
                className="w-full h-auto rounded-2xl shadow-lg border-4 border-green-200"
              />
              <div className="absolute inset-0 bg-green-600 bg-opacity-10 rounded-2xl"></div>
            </div>

            {/* Özellikler */}
            <div className="grid grid-cols-1 gap-4 w-full max-w-md sm:grid-cols-2">
              <div className="text-center p-4 bg-white bg-opacity-50 rounded-lg">
                <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800">Yardımlaşma</h3>
                <p className="text-sm text-green-600">İhtiyaç sahipleriyle buluşun</p>
              </div>
              <div className="text-center p-4 bg-white bg-opacity-50 rounded-lg">
                <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800">Dayanışma</h3>
                <p className="text-sm text-green-600">Birlikte daha güçlüyüz</p>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Giriş Formu */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <Card className="border-green-200 shadow-xl">
                <CardHeader className="bg-green-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Güvenli Giriş
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Hesabınıza güvenli giriş yapın ve dayanışma ağımıza katılın
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-green-700">
                        Email Adresi
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="ornek@email.com"
                        className="border-green-300 focus:border-green-500 focus:ring-green-500"
                        disabled={isLoading}
                      />
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    {/* Şifre */}
                    <div className="space-y-2">
                      <Label htmlFor="sifre" className="text-green-700">
                        Şifre
                      </Label>
                      <div className="relative">
                        <Input
                          id="sifre"
                          type={showPassword ? "text" : "password"}
                          value={formData.sifre}
                          onChange={(e) => handleInputChange("sifre", e.target.value)}
                          placeholder="Şifrenizi girin"
                          className="border-green-300 focus:border-green-500 focus:ring-green-500 pr-10"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-green-600" />
                          ) : (
                            <Eye className="h-4 w-4 text-green-600" />
                          )}
                        </Button>
                      </div>
                      {errors.sifre && <p className="text-sm text-red-600">{errors.sifre}</p>}
                    </div>

                    {/* Şifremi Unuttum */}
                    <div className="text-right">
                      <Link href="/sifremi-unuttum" className="text-sm text-green-600 hover:underline">
                        Şifremi unuttum
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Giriş yapılıyor..." : "Güvenli Giriş Yap"}
                    </Button>
                  </form>

                  {/* Güvenlik Bilgisi */}
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-green-700 text-center">
                      🔒 Giriş bilgileriniz güvenli cookie teknolojisi ile korunmaktadır
                    </p>
                  </div>

                  {/* Kayıt Linki */}
                  <div className="mt-6 text-center">
                    <p className="text-green-700">
                      Hesabınız yok mu?{" "}
                      <Link href="/kayit" className="text-green-600 hover:underline font-semibold">
                        Kayıt Ol
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
