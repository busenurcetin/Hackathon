"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, User, Eye, EyeOff, Camera, Save, Trash2, Mail, Phone, Lock, Shield } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"
import { authService } from "@/lib/auth"

export default function ProfilDuzenlePage() {
  // Mevcut kullanıcı bilgileri auth service'den al
  const [kullaniciBilgileri, setKullaniciBilgileri] = useState({
    isim: "",
    soyisim: "",
    email: "",
    telefon: "",
    profilFoto: "",
    kayitTarihi: "",
  })

  const [sifreForm, setSifreForm] = useState({
    mevcutSifre: "",
    yeniSifre: "",
    yeniSifreTekrar: "",
  })

  const [showPasswords, setShowPasswords] = useState({
    mevcut: false,
    yeni: false,
    tekrar: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"bilgiler" | "sifre">("bilgiler")

  // Kullanıcı bilgilerini yükle
  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setKullaniciBilgileri({
        isim: currentUser.isim,
        soyisim: currentUser.soyisim,
        email: currentUser.email,
        telefon: currentUser.telefon,
        profilFoto: "",
        kayitTarihi: currentUser.kayitTarihi,
      })
    }
  }, [])

  const handleBilgiGuncelle = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basit validasyon
    const newErrors: Record<string, string> = {}

    if (!kullaniciBilgileri.isim) newErrors.isim = "İsim gereklidir"
    if (!kullaniciBilgileri.soyisim) newErrors.soyisim = "Soyisim gereklidir"
    if (!kullaniciBilgileri.email) newErrors.email = "Email gereklidir"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        // Simüle edilmiş güncelleme işlemi
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log("Bilgiler güncellendi:", kullaniciBilgileri)

        // localStorage'daki kullanıcı bilgilerini güncelle
        const mevcutBilgiler = localStorage.getItem("kullaniciBilgileri")
        if (mevcutBilgiler) {
          const guncelBilgiler = {
            ...JSON.parse(mevcutBilgiler),
            isim: kullaniciBilgileri.isim,
            soyisim: kullaniciBilgileri.soyisim,
            email: kullaniciBilgileri.email,
            telefon: kullaniciBilgileri.telefon,
          }
          localStorage.setItem("kullaniciBilgileri", JSON.stringify(guncelBilgiler))
        }

        // Auth token'ı yenile
        authService.refreshToken()

        // Başarı mesajı göster
        alert("Bilgileriniz başarıyla güncellendi!")
      } catch (error) {
        console.error("Güncelleme hatası:", error)
      }
    }

    setIsLoading(false)
  }

  const handleSifreGuncelle = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Şifre validasyonu
    const newErrors: Record<string, string> = {}

    if (!sifreForm.mevcutSifre) newErrors.mevcutSifre = "Mevcut şifre gereklidir"
    if (!sifreForm.yeniSifre) newErrors.yeniSifre = "Yeni şifre gereklidir"
    if (sifreForm.yeniSifre.length < 6) newErrors.yeniSifre = "Şifre en az 6 karakter olmalıdır"
    if (sifreForm.yeniSifre !== sifreForm.yeniSifreTekrar) {
      newErrors.yeniSifreTekrar = "Şifreler eşleşmiyor"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        // Simüle edilmiş şifre güncelleme işlemi
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log("Şifre güncellendi")

        // localStorage'daki şifreyi güncelle
        const mevcutBilgiler = localStorage.getItem("kullaniciBilgileri")
        if (mevcutBilgiler) {
          const guncelBilgiler = {
            ...JSON.parse(mevcutBilgiler),
            sifre: sifreForm.yeniSifre,
          }
          localStorage.setItem("kullaniciBilgileri", JSON.stringify(guncelBilgiler))
        }

        // Formu temizle
        setSifreForm({
          mevcutSifre: "",
          yeniSifre: "",
          yeniSifreTekrar: "",
        })

        alert("Şifreniz başarıyla güncellendi!")
      } catch (error) {
        console.error("Şifre güncelleme hatası:", error)
      }
    }

    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.includes("sifre")) {
      setSifreForm((prev) => ({
        ...prev,
        [field]: value,
      }))
    } else {
      setKullaniciBilgileri((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

    // Hata mesajını temizle
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleProfilFotoYukle = () => {
    // Dosya seçme işlemi (simülasyon)
    console.log("Profil fotoğrafı yükleme işlemi")
    // Gerçek uygulamada file input açılacak
  }

  const handleHesapSil = () => {
    if (confirm("Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      console.log("Hesap silme işlemi")
      // Hesap silme API çağrısı
      authService.logout()
      localStorage.removeItem("kullaniciBilgileri")
      localStorage.removeItem("hizmetler")
      window.location.href = "/"
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Heart className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">Deprem Dayanışma Ağı</h1>
            </div>
            <p className="text-green-700">Profil bilgilerinizi güvenli şekilde düzenleyin</p>
            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-green-600">
              <Shield className="h-4 w-4" />
              <span>Güvenli oturum aktif</span>
            </div>
          </div>

          {/* Profil Card */}
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="bg-green-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Güvenli Profil Düzenle
              </CardTitle>
              <CardDescription className="text-green-100">
                Kişisel bilgilerinizi ve güvenlik ayarlarınızı yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Profil Fotoğrafı */}
              <div className="mb-6 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={kullaniciBilgileri.profilFoto || "/placeholder.svg"} />
                  <AvatarFallback className="bg-green-100 text-green-800 text-2xl">
                    {kullaniciBilgileri.isim.charAt(0)}
                    {kullaniciBilgileri.soyisim.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  onClick={handleProfilFotoYukle}
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Fotoğraf Değiştir
                </Button>
              </div>

              {/* Tab Buttons */}
              <div className="mb-6 flex space-x-1 rounded-lg bg-green-100 p-1">
                <Button
                  onClick={() => setActiveTab("bilgiler")}
                  variant={activeTab === "bilgiler" ? "default" : "ghost"}
                  className={`flex-1 ${
                    activeTab === "bilgiler"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "text-green-700 hover:bg-green-200"
                  }`}
                >
                  <User className="mr-2 h-4 w-4" />
                  Kişisel Bilgiler
                </Button>
                <Button
                  onClick={() => setActiveTab("sifre")}
                  variant={activeTab === "sifre" ? "default" : "ghost"}
                  className={`flex-1 ${
                    activeTab === "sifre"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "text-green-700 hover:bg-green-200"
                  }`}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Şifre Değiştir
                </Button>
              </div>

              {/* Kişisel Bilgiler Tab */}
              {activeTab === "bilgiler" && (
                <form onSubmit={handleBilgiGuncelle} className="space-y-4">
                  {/* İsim Soyisim */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="isim" className="text-green-700">
                        İsim *
                      </Label>
                      <Input
                        id="isim"
                        value={kullaniciBilgileri.isim}
                        onChange={(e) => handleInputChange("isim", e.target.value)}
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
                        value={kullaniciBilgileri.soyisim}
                        onChange={(e) => handleInputChange("soyisim", e.target.value)}
                        className="border-green-300 focus:border-green-500 focus:ring-green-500"
                      />
                      {errors.soyisim && <p className="text-sm text-red-600">{errors.soyisim}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-green-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Adresi *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={kullaniciBilgileri.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    <p className="text-sm text-green-600">
                      Email değiştirirseniz yeni adresinizi doğrulamanız gerekecek
                    </p>
                  </div>

                  {/* Telefon */}
                  <div className="space-y-2">
                    <Label htmlFor="telefon" className="text-green-700 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Telefon Numarası
                    </Label>
                    <Input
                      id="telefon"
                      type="tel"
                      value={kullaniciBilgileri.telefon}
                      onChange={(e) => handleInputChange("telefon", e.target.value)}
                      className="border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  {/* Kayıt Tarihi */}
                  <div className="space-y-2">
                    <Label className="text-green-700">Kayıt Tarihi</Label>
                    <Input value={kullaniciBilgileri.kayitTarihi} disabled className="bg-gray-50 border-green-300" />
                  </div>

                  {/* Güncelle Button */}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Güncelleniyor..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Bilgileri Güvenli Güncelle
                      </>
                    )}
                  </Button>
                </form>
              )}

              {/* Şifre Değiştir Tab */}
              {activeTab === "sifre" && (
                <form onSubmit={handleSifreGuncelle} className="space-y-4">
                  {/* Mevcut Şifre */}
                  <div className="space-y-2">
                    <Label htmlFor="mevcutSifre" className="text-green-700">
                      Mevcut Şifre *
                    </Label>
                    <div className="relative">
                      <Input
                        id="mevcutSifre"
                        type={showPasswords.mevcut ? "text" : "password"}
                        value={sifreForm.mevcutSifre}
                        onChange={(e) => handleInputChange("mevcutSifre", e.target.value)}
                        className="border-green-300 focus:border-green-500 focus:ring-green-500 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPasswords((prev) => ({ ...prev, mevcut: !prev.mevcut }))}
                      >
                        {showPasswords.mevcut ? (
                          <EyeOff className="h-4 w-4 text-green-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                    </div>
                    {errors.mevcutSifre && <p className="text-sm text-red-600">{errors.mevcutSifre}</p>}
                  </div>

                  {/* Yeni Şifre */}
                  <div className="space-y-2">
                    <Label htmlFor="yeniSifre" className="text-green-700">
                      Yeni Şifre *
                    </Label>
                    <div className="relative">
                      <Input
                        id="yeniSifre"
                        type={showPasswords.yeni ? "text" : "password"}
                        value={sifreForm.yeniSifre}
                        onChange={(e) => handleInputChange("yeniSifre", e.target.value)}
                        placeholder="En az 6 karakter"
                        className="border-green-300 focus:border-green-500 focus:ring-green-500 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPasswords((prev) => ({ ...prev, yeni: !prev.yeni }))}
                      >
                        {showPasswords.yeni ? (
                          <EyeOff className="h-4 w-4 text-green-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                    </div>
                    {errors.yeniSifre && <p className="text-sm text-red-600">{errors.yeniSifre}</p>}
                  </div>

                  {/* Yeni Şifre Tekrar */}
                  <div className="space-y-2">
                    <Label htmlFor="yeniSifreTekrar" className="text-green-700">
                      Yeni Şifre Tekrar *
                    </Label>
                    <div className="relative">
                      <Input
                        id="yeniSifreTekrar"
                        type={showPasswords.tekrar ? "text" : "password"}
                        value={sifreForm.yeniSifreTekrar}
                        onChange={(e) => handleInputChange("yeniSifreTekrar", e.target.value)}
                        placeholder="Yeni şifrenizi tekrar girin"
                        className="border-green-300 focus:border-green-500 focus:ring-green-500 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPasswords((prev) => ({ ...prev, tekrar: !prev.tekrar }))}
                      >
                        {showPasswords.tekrar ? (
                          <EyeOff className="h-4 w-4 text-green-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                    </div>
                    {errors.yeniSifreTekrar && <p className="text-sm text-red-600">{errors.yeniSifreTekrar}</p>}
                  </div>

                  {/* Şifre Güncelle Button */}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Güncelleniyor..."
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Şifreyi Güvenli Güncelle
                      </>
                    )}
                  </Button>
                </form>
              )}

              <Separator className="my-6" />

              {/* Tehlikeli İşlemler */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-700">Tehlikeli İşlemler</h3>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <h4 className="font-medium text-red-800 mb-2">Hesabı Sil</h4>
                  <p className="text-sm text-red-600 mb-4">
                    Hesabınızı sildiğinizde tüm verileriniz kalıcı olarak silinir. Bu işlem geri alınamaz.
                  </p>
                  <Button onClick={handleHesapSil} variant="destructive" className="bg-red-600 hover:bg-red-700">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hesabı Sil
                  </Button>
                </div>
              </div>

              {/* Geri Dön */}
              <div className="mt-6 text-center">
                <Link href="/dashboard" className="text-green-600 hover:underline">
                  ← Dashboard'a dön
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-green-600">
            <p>Deprem Dayanışma Ağı - Birlikte daha güçlüyüz 💚</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
