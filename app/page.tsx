"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MapPin, Package } from "lucide-react"

export default function Component() {
  const [formData, setFormData] = useState({
    isim: "",
    soyisim: "",
    il: "",
    ilce: "",
    adres: "",
    urunTuru: "",
    urunAdedi: "",
    notlar: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form verileri:", formData)
    // Form gönderme işlemi burada yapılacak
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const turkiyeIlleri = [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Isparta",
    "Mersin",
    "İstanbul",
    "İzmir",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Kahramanmaraş",
    "Mardin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Şanlıurfa",
    "Uşak",
    "Van",
    "Yozgat",
    "Zonguldak",
    "Aksaray",
    "Bayburt",
    "Karaman",
    "Kırıkkale",
    "Batman",
    "Şırnak",
    "Bartın",
    "Ardahan",
    "Iğdır",
    "Yalova",
    "Karabük",
    "Kilis",
    "Osmaniye",
    "Düzce",
  ]

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
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Heart className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-green-800">Deprem Dayanışma Ağı</h1>
          </div>
          <p className="text-green-700">Yardım koordinasyonu ve dayanışma platformu</p>
        </div>

        {/* Form Card */}
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Yardım Kaydı Formu
            </CardTitle>
            <CardDescription className="text-green-100">
              Yardım malzemelerinizi kaydetmek için aşağıdaki formu doldurun
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Kişisel Bilgiler */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-green-800">
                  <MapPin className="h-5 w-5" />
                  Kişisel Bilgiler
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="isim" className="text-green-700">
                      İsim *
                    </Label>
                    <Input
                      id="isim"
                      value={formData.isim}
                      onChange={(e) => handleInputChange("isim", e.target.value)}
                      placeholder="Adınızı girin"
                      required
                      className="border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="soyisim" className="text-green-700">
                      Soyisim *
                    </Label>
                    <Input
                      id="soyisim"
                      value={formData.soyisim}
                      onChange={(e) => handleInputChange("soyisim", e.target.value)}
                      placeholder="Soyadınızı girin"
                      required
                      className="border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Konum Bilgileri */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">Konum Bilgileri</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="il" className="text-green-700">
                      İl *
                    </Label>
                    <Select value={formData.il} onValueChange={(value) => handleInputChange("il", value)}>
                      <SelectTrigger className="border-green-300 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="İl seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {turkiyeIlleri.map((il) => (
                          <SelectItem key={il} value={il}>
                            {il}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ilce" className="text-green-700">
                      İlçe *
                    </Label>
                    <Input
                      id="ilce"
                      value={formData.ilce}
                      onChange={(e) => handleInputChange("ilce", e.target.value)}
                      placeholder="İlçe adını girin"
                      required
                      className="border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adres" className="text-green-700">
                    Açık Adres *
                  </Label>
                  <Textarea
                    id="adres"
                    value={formData.adres}
                    onChange={(e) => handleInputChange("adres", e.target.value)}
                    placeholder="Detaylı adres bilgisini girin"
                    required
                    className="border-green-300 focus:border-green-500 focus:ring-green-500"
                    rows={3}
                  />
                </div>
              </div>

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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urunAdedi" className="text-green-700">
                      Ürün Adedi *
                    </Label>
                    <Input
                      id="urunAdedi"
                      type="number"
                      value={formData.urunAdedi}
                      onChange={(e) => handleInputChange("urunAdedi", e.target.value)}
                      placeholder="Adet girin"
                      required
                      min="1"
                      className="border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Notlar */}
              <div className="space-y-2">
                <Label htmlFor="notlar" className="text-green-700">
                  Belirtilmek İstenen Notlar
                </Label>
                <Textarea
                  id="notlar"
                  value={formData.notlar}
                  onChange={(e) => handleInputChange("notlar", e.target.value)}
                  placeholder="Ek bilgiler, özel durumlar veya notlarınızı buraya yazabilirsiniz"
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
              >
                Yardım Kaydını Gönder
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
