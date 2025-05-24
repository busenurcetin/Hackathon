"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, LogIn, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function GirisPage() {
  const [formData, setFormData] = useState({
    email: "",
    sifre: "",
    beniHatirla: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
        // localStorage'dan kullanıcı bilgilerini al
        const kayitliBilgiler = localStorage.getItem("kullaniciBilgileri")

        if (kayitliBilgiler) {
          const kullanici = JSON.parse(kayitliBilgiler)

          // Email ve şifre kontrolü
          if (kullanici.email === formData.email && kullanici.sifre === formData.sifre) {
            console.log("Giriş başarılı:", formData.email)

            // Simüle edilmiş giriş işlemi
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Başarılı giriş sonrası dashboard'a yönlendir
            router.push("/dashboard")
          } else {
            setErrors({ email: "Email veya şifre hatalı" })
          }
        } else {
          setErrors({ email: "Bu email ile kayıtlı kullanıcı bulunamadı" })
        }
      } catch (error) {
        console.error("Giriş hatası:", error)
        setErrors({ email: "Giriş sırasında bir hata oluştu" })
      }
    }

    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Heart className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">Deprem Dayanışma Ağı</h1>
          </div>
          <p className="text-green-700">Hesabınıza giriş yapın</p>
        </div>

        {/* Giriş Card */}
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              Giriş Yap
            </CardTitle>
            <CardDescription className="text-green-100">
              Hesabınıza giriş yaparak dayanışma ağımıza katılın
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

              {/* Beni Hatırla ve Şifremi Unuttum */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="beniHatirla"
                    checked={formData.beniHatirla}
                    onCheckedChange={(checked) => handleInputChange("beniHatirla", checked as boolean)}
                    className="border-green-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    disabled={isLoading}
                  />
                  <Label htmlFor="beniHatirla" className="text-sm text-green-700">
                    Beni hatırla
                  </Label>
                </div>
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
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>

            {/* Sosyal Giriş */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-green-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-green-600">Veya</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                  disabled={isLoading}
                >
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                  disabled={isLoading}
                >
                  Facebook
                </Button>
              </div>
            </div>

            {/* Kayıt Linki */}
            <div className="mt-6 text-center">
              <p className="text-green-700">
                Hesabınız yok mu?{" "}
                <Link href="/kayit" className="text-green-600 hover:underline font-semibold">
                  Üye Ol
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-green-600">
          <p>Deprem Dayanışma Ağı - Birlikte daha güçlüyüz 💚</p>
        </div>
      </div>
    </div>
  )
}
