"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Package, ArrowLeft, Save, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Hizmet tipi
interface Hizmet {
  id: number
  tur: string
  urun: string
  adet: number
  durum: string
  tarih: string
  konum?: string
  aciklama?: string
  iletisim?: string
}

export default function YeniHizmetPage() {
  const [formData, setFormData] = useState({
    urunTuru: "",
    urunAdi: "",
    adet: "",
    aciklama: "",
    konum: "",
    iletisim: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basit validasyon
    const newErrors: Record<string, string> = {}

    if (!formData.urunTuru) newErrors.urunTuru = "Ürün türü gereklidir"
    if (!formData.urunAdi) newErrors.urunAdi = "Ürün adı gereklidir"
    if (!formData.adet) newErrors.adet = "Adet gereklidir"
    if (!formData.konum) newErrors.konum = "Konum gereklidir"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        // Mevcut hizmetleri al
        const mevcutHizmetler = localStorage.getItem("hizmetler")
        const hizmetler: Hizmet[] = mevcutHizmetler ? JSON.parse(mevcutHizmetler) : []

        // Yeni ID oluştur
        const yeniId = hizmetler.length > 0 ? Math.max(...hizmetler.map((h) => h.id)) + 1 : 1

        // Yeni hizmet oluştur
        const yeniHizmet: Hizmet = {
          id: yeniId,
          tur: formData.urunTuru,
          urun: formData.urunAdi,
          adet: Number.parseInt(formData.adet),
          durum: "Aktif",
          tarih: new Date().toLocaleDateString("tr-TR"),
          konum: formData.konum,
          aciklama: formData.aciklama,
          iletisim: formData.iletisim,
        }

        // Hizmetleri güncelle
        const guncelHizmetler = [...hizmetler, yeniHizmet]
        localStorage.setItem("hizmetler", JSON.stringify(guncelHizmetler))

        console.log("Yeni hizmet eklendi:", yeniHizmet)

        // Simüle edilmiş kayıt işlemi
        await new Promise((resolve) => setTimeout(resolve, 1500))

        alert("Hizmet başarıyla eklendi!")

        // Başarılı kayıt sonrası dashboard'a dön
        router.push("/dashboard")
      } catch (error) {
        console.error("Hizmet ekleme hatası:", error)
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

  const urunTurleri = [
    "Gıda",
    "Su",
    "Giyim",
    "Battaniye",
    "Çadır",
    "Hijyen Malzemesi",
    "İlaç",
    "Bebek Malzemesi",
    "Temizlik Malzemesi",
    "Isınma Malzemesi",
    "Elektronik",
    "Diğer",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Dashboard'a Dön
          </Link>
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Heart className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-green-800">Yeni Hizmet Ekle</h1>
            </div>
            <p className="text-green-700">Yardım etmek istediğiniz hizmeti güvenli şekilde ekleyin</p>
            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-green-600">
              <Shield className="h-4 w-4" />
              <span>Güvenli oturum aktif</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Hizmet Bilgileri
            </CardTitle>
            <CardDescription className="text-green-100">
              Sunmak istediğiniz hizmet veya bağış bilgilerini girin
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Ürün Bilgileri */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">Ürün Bilgileri</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="urunTuru" className="text-green-700">
                      Ürün Türü *
                    </Label>
                    <Select value={formData.urunTuru} onValueChange={(value) => handleInputChange("urunTuru", value)}>
                      <SelectTrigger className="border-green-300 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Ürün türü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {urunTurleri.map((tur) => (
                          <SelectItem key={tur} value={tur}>
                            {tur}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.urunTuru && <p className="text-sm text-red-600">{errors.urunTuru}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urunAdi" className="text-green-700">
                      Ürün Adı *
                    </Label>
                    <Input
                      id="urunAdi"
                      value={formData.urunAdi}
                      onChange={(e) => handleInputChange("urunAdi", e.target.value)}
                      placeholder="Örn: Kışlık mont, konserve..."
                      className="border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                    {errors.urunAdi && <p className="text-sm text-red-600">{errors.urunAdi}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adet" className="text-green-700">
                    Adet *
                  </Label>
                  <Input
                    id="adet"
                    type="number"
                    value={formData.adet}
                    onChange={(e) => handleInputChange("adet", e.target.value)}
                    placeholder="Kaç adet sunabilirsiniz?"
                    min="1"
                    className="border-green-300 focus:border-green-500 focus:ring-green-500"
                  />
                  {errors.adet && <p className="text-sm text-red-600">{errors.adet}</p>}
                </div>
              </div>

              {/* Konum ve İletişim */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">Konum ve İletişim</h3>
                <div className="space-y-2">
                  <Label htmlFor="konum" className="text-green-700">
                    Konum *
                  </Label>
                  <Input
                    id="konum"
                    value={formData.konum}
                    onChange={(e) => handleInputChange("konum", e.target.value)}
                    placeholder="İl, ilçe veya detaylı adres"
                    className="border-green-300 focus:border-green-500 focus:ring-green-500"
                  />
                  {errors.konum && <p className="text-sm text-red-600">{errors.konum}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iletisim" className="text-green-700">
                    İletişim Bilgisi
                  </Label>
                  <Input
                    id="iletisim"
                    value={formData.iletisim}
                    onChange={(e) => handleInputChange("iletisim", e.target.value)}
                    placeholder="Telefon numarası veya email (opsiyonel)"
                    className="border-green-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Açıklama */}
              <div className="space-y-2">
                <Label htmlFor="aciklama" className="text-green-700">
                  Açıklama
                </Label>
                <Textarea
                  id="aciklama"
                  value={formData.aciklama}
                  onChange={(e) => handleInputChange("aciklama", e.target.value)}
                  placeholder="Ek bilgiler, özel durumlar veya notlarınızı buraya yazabilirsiniz"
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Ekleniyor..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Hizmeti Güvenli Ekle
                  </>
                )}
              </Button>
            </form>
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
