"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Package, ArrowLeft, Save, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"

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

export default function HizmetDuzenlePage() {
  const [formData, setFormData] = useState({
    urunTuru: "",
    urunAdi: "",
    adet: "",
    durum: "",
    konum: "",
    iletisim: "",
    aciklama: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [hizmetBulunamadi, setHizmetBulunamadi] = useState(false)
  const router = useRouter()
  const params = useParams()
  const hizmetId = Number.parseInt(params.id as string)

  // Hizmet bilgilerini yükle
  useEffect(() => {
    const hizmetler = localStorage.getItem("hizmetler")
    if (hizmetler) {
      const hizmetListesi: Hizmet[] = JSON.parse(hizmetler)
      const hizmet = hizmetListesi.find((h) => h.id === hizmetId)

      if (hizmet) {
        setFormData({
          urunTuru: hizmet.tur,
          urunAdi: hizmet.urun,
          adet: hizmet.adet.toString(),
          durum: hizmet.durum,
          konum: hizmet.konum || "",
          iletisim: hizmet.iletisim || "",
          aciklama: hizmet.aciklama || "",
        })
      } else {
        setHizmetBulunamadi(true)
      }
    } else {
      setHizmetBulunamadi(true)
    }
  }, [hizmetId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basit validasyon
    const newErrors: Record<string, string> = {}

    if (!formData.urunTuru) newErrors.urunTuru = "Ürün türü gereklidir"
    if (!formData.urunAdi) newErrors.urunAdi = "Ürün adı gereklidir"
    if (!formData.adet) newErrors.adet = "Adet gereklidir"
    if (!formData.durum) newErrors.durum = "Durum gereklidir"
    if (!formData.konum) newErrors.konum = "Konum gereklidir"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        // Mevcut hizmetleri al
        const hizmetler = localStorage.getItem("hizmetler")
        if (hizmetler) {
          const hizmetListesi: Hizmet[] = JSON.parse(hizmetler)
          const hizmetIndex = hizmetListesi.findIndex((h) => h.id === hizmetId)

          if (hizmetIndex !== -1) {
            // Hizmeti güncelle
            hizmetListesi[hizmetIndex] = {
              ...hizmetListesi[hizmetIndex],
              tur: formData.urunTuru,
              urun: formData.urunAdi,
              adet: Number.parseInt(formData.adet),
              durum: formData.durum,
              konum: formData.konum,
              iletisim: formData.iletisim,
              aciklama: formData.aciklama,
            }

            // localStorage'a kaydet
            localStorage.setItem("hizmetler", JSON.stringify(hizmetListesi))

            console.log("Hizmet güncellendi:", formData)

            // Simüle edilmiş güncelleme işlemi
            await new Promise((resolve) => setTimeout(resolve, 1500))

            alert("Hizmet başarıyla güncellendi!")

            // Başarılı güncelleme sonrası dashboard'a dön
            router.push("/dashboard")
          }
        }
      } catch (error) {
        console.error("Hizmet güncelleme hatası:", error)
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

  const durumlar = ["Aktif", "Teslim Edildi", "İptal Edildi", "Beklemede"]

  if (hizmetBulunamadi) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Dashboard'a Dön
            </Link>
          </div>
          <Card className="border-red-200 shadow-lg">
            <CardContent className="p-6 text-center">
              <Package className="mx-auto h-12 w-12 text-red-300 mb-4" />
              <h3 className="text-lg font-medium text-red-800 mb-2">Hizmet Bulunamadı</h3>
              <p className="text-red-600 mb-4">Düzenlemek istediğiniz hizmet bulunamadı veya erişim yetkiniz yok.</p>
              <Link href="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Dashboard'a Dön</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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
              <h1 className="text-3xl font-bold text-green-800">Hizmet Düzenle</h1>
            </div>
            <p className="text-green-700">Hizmet bilgilerinizi güvenli şekilde güncelleyin</p>
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
              Hizmet Bilgilerini Düzenle
            </CardTitle>
            <CardDescription className="text-green-100">
              Mevcut hizmet bilgilerinizi güvenli şekilde güncelleyebilirsiniz
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="adet" className="text-green-700">
                      Adet *
                    </Label>
                    <Input
                      id="adet"
                      type="number"
                      value={formData.adet}
                      onChange={(e) => handleInputChange("adet", e.target.value)}
                      placeholder="Kaç adet?"
                      min="1"
                      className="border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                    {errors.adet && <p className="text-sm text-red-600">{errors.adet}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="durum" className="text-green-700">
                      Durum *
                    </Label>
                    <Select value={formData.durum} onValueChange={(value) => handleInputChange("durum", value)}>
                      <SelectTrigger className="border-green-300 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Durum seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {durumlar.map((durum) => (
                          <SelectItem key={durum} value={durum}>
                            {durum}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.durum && <p className="text-sm text-red-600">{errors.durum}</p>}
                  </div>
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
                  "Güncelleniyor..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Değişiklikleri Güvenli Kaydet
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
