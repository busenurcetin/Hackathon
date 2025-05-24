"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, UserPlus, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function KayitPage() {
  const [formData, setFormData] = useState({
    isim: "",
    soyisim: "",
    email: "",
    telefon: "",
    sifre: "",
    sifreTekrar: "",
    sozlesmeKabul: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basit validasyon
    const newErrors: Record<string, string> = {}

    if (!formData.isim) newErrors.isim = "İsim gereklidir"
    if (!formData.soyisim) newErrors.soyisim = "Soyisim gereklidir"
    if (!formData.email) newErrors.email = "Email gereklidir"
    if (!formData.sifre) newErrors.sifre = "Şifre gereklidir"
    if (formData.sifre.length < 6) newErrors.sifre = "Şifre en az 6 karakter olmalıdır"
    if (formData.sifre !== formData.sifreTekrar) newErrors.sifreTekrar = "Şifreler eşleşmiyor"
    if (!formData.sozlesmeKabul) newErrors.sozlesmeKabul = "Kullanım şartlarını kabul etmelisiniz"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log("Kayıt verileri:", formData)

        // Kullanıcı bilgilerini localStorage'a kaydet
        const kullaniciBilgileri = {
          isim: formData.isim,
          soyisim: formData.soyisim,
          email: formData.email,
          sifre: formData.sifre,
          telefon: formData.telefon,
          kayitTarihi: new Date().toLocaleDateString("tr-TR"),
        }

        localStorage.setItem("kullaniciBilgileri", JSON.stringify(kullaniciBilgileri))

        // Simüle edilmiş kayıt işlemi
        await new Promise((resolve) => setTimeout(resolve, 1500))

        alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.")

        // Kayıt başarılı, giriş sayfasına yönlendir
        router.push("/")
      } catch (error) {
        console.error("Kayıt hatası:", error)
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
          <p className="text-green-700">Dayanışma ağımıza katılın</p>
        </div>

        {/* Kayıt Card */}
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Üye Ol
            </CardTitle>
            <CardDescription className="text-green-100">
              Yeni hesap oluşturun ve dayanışma ağımıza katılın
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* İsim Soyisim */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="isim" className="text-green-700">
                    İsim *
                  </Label>
                  <Input
                    id="isim"
                    value={formData.isim}
                    onChange={(e) => handleInputChange("isim", e.target.value)}
                    placeholder="Adınız"
                    className="border-green-300 focus:border-green-500 focus:ring-green-500"
                  />
                  {errors.isim && <p className="text-sm text-red-600">{errors.isim}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soyisim" className="text-green-700">
                    Soyisim *
                  </Label>
                  <Input
                    id="soyisim"
                    value={formData.soyisim}
                    onChange={(e) => handleInputChange("soyisim", e.target.value)}
                    placeholder="Soyadınız"
                    className="border-green-300 focus:border-green-500 focus:ring-green-500"
                  />
                  {errors.soyisim && <p className="text-sm text-red-600">{errors.soyisim}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-700">
                  Email Adresi *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="ornek@email.com"
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Telefon */}
              <div className="space-y-2">
                <Label htmlFor="telefon" className="text-green-700">
                  Telefon Numarası
                </Label>
                <Input
                  id="telefon"
                  type="tel"
                  value={formData.telefon}
                  onChange={(e) => handleInputChange("telefon", e.target.value)}
                  placeholder="0555 123 45 67"
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Şifre */}
              <div className="space-y-2">
                <Label htmlFor="sifre" className="text-green-700">
                  Şifre *
                </Label>
                <div className="relative">
                  <Input
                    id="sifre"
                    type={showPassword ? "text" : "password"}
                    value={formData.sifre}
                    onChange={(e) => handleInputChange("sifre", e.target.value)}
                    placeholder="En az 6 karakter"
                    className="border-green-300 focus:border-green-500 focus:ring-green-500 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
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

              {/* Şifre Tekrar */}
              <div className="space-y-2">
                <Label htmlFor="sifreTekrar" className="text-green-700">
                  Şifre Tekrar *
                </Label>
                <div className="relative">
                  <Input
                    id="sifreTekrar"
                    type={showPasswordConfirm ? "text" : "password"}
                    value={formData.sifreTekrar}
                    onChange={(e) => handleInputChange("sifreTekrar", e.target.value)}
                    placeholder="Şifrenizi tekrar girin"
                    className="border-green-300 focus:border-green-500 focus:ring-green-500 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  >
                    {showPasswordConfirm ? (
                      <EyeOff className="h-4 w-4 text-green-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-green-600" />
                    )}
                  </Button>
                </div>
                {errors.sifreTekrar && <p className="text-sm text-red-600">{errors.sifreTekrar}</p>}
              </div>

              {/* Sözleşme Kabul */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sozlesmeKabul"
                  checked={formData.sozlesmeKabul}
                  onCheckedChange={(checked) => handleInputChange("sozlesmeKabul", checked as boolean)}
                  className="border-green-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />
                <Label htmlFor="sozlesmeKabul" className="text-sm text-green-700">
                  <Link href="/kullanim-sartlari" className="text-green-600 hover:underline">
                    Kullanım şartlarını
                  </Link>{" "}
                  ve{" "}
                  <Link href="/gizlilik-politikasi" className="text-green-600 hover:underline">
                    gizlilik politikasını
                  </Link>{" "}
                  kabul ediyorum *
                </Label>
              </div>
              {errors.sozlesmeKabul && <p className="text-sm text-red-600">{errors.sozlesmeKabul}</p>}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
              </Button>
            </form>

            {/* Giriş Linki */}
            <div className="mt-6 text-center">
              <p className="text-green-700">
                Zaten hesabınız var mı?{" "}
                <Link href="/giris" className="text-green-600 hover:underline font-semibold">
                  Giriş Yap
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
