"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  X,
  Apple,
  Droplets,
  Shirt,
  Bed,
  Home,
  Sparkles,
  Pill,
  Baby,
  SprayCanIcon as Spray,
  Flame,
  Smartphone,
  Package,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Talep {
  id: number
  kategori: string
  urun: string
  talep_edilen_adet: number
  kalan_adet: number
  toplam_kabul_edilen: number
  talep_eden: string
  tarih: string
  durum: "beklemede" | "kısmi_kabul" | "tamamen_kabul" | "red"
}

export default function GenelTalepler() {
  const [talepler, setTalepler] = useState<Talep[]>([
    {
      id: 1,
      kategori: "Giyim",
      urun: "Çorap",
      talep_edilen_adet: 20,
      kalan_adet: 20,
      toplam_kabul_edilen: 0,
      talep_eden: "Ahmet Yılmaz",
      tarih: "2024-01-15",
      durum: "beklemede",
    },
    {
      id: 2,
      kategori: "Elektronik",
      urun: "Kulaklık",
      talep_edilen_adet: 10,
      kalan_adet: 10,
      toplam_kabul_edilen: 0,
      talep_eden: "Ayşe Demir",
      tarih: "2024-01-14",
      durum: "beklemede",
    },
    {
      id: 3,
      kategori: "Gıda",
      urun: "Konserve",
      talep_edilen_adet: 30,
      kalan_adet: 30,
      toplam_kabul_edilen: 0,
      talep_eden: "Mehmet Kaya",
      tarih: "2024-01-13",
      durum: "beklemede",
    },
    {
      id: 4,
      kategori: "Su",
      urun: "Su Şişesi",
      talep_edilen_adet: 50,
      kalan_adet: 5,
      toplam_kabul_edilen: 45,
      talep_eden: "Fatma Özkan",
      tarih: "2024-01-12",
      durum: "kısmi_kabul",
    },
    {
      id: 5,
      kategori: "Battaniye",
      urun: "Yün Battaniye",
      talep_edilen_adet: 8,
      kalan_adet: 0,
      toplam_kabul_edilen: 8,
      talep_eden: "Ali Veli",
      tarih: "2024-01-11",
      durum: "tamamen_kabul",
    },
    {
      id: 6,
      kategori: "İlaç",
      urun: "Ağrı Kesici",
      talep_edilen_adet: 15,
      kalan_adet: 15,
      toplam_kabul_edilen: 0,
      talep_eden: "Zeynep Kara",
      tarih: "2024-01-10",
      durum: "red",
    },
  ])

  const [selectedTalep, setSelectedTalep] = useState<Talep | null>(null)
  const [durumFiltresi, setDurumFiltresi] = useState<string>("tümü")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [kabulEdilenAdet, setKabulEdilenAdet] = useState(0)

  const handleKabulEt = (talep: Talep) => {
    setSelectedTalep(talep)
    setKabulEdilenAdet(talep.kalan_adet)
    setIsModalOpen(true)
  }

  const handleReddet = (id: number) => {
    setTalepler((prev) => prev.map((talep) => (talep.id === id ? { ...talep, durum: "red" as const } : talep)))
  }

  const handleModalKabul = () => {
    if (selectedTalep) {
      const yeniKalanAdet = selectedTalep.kalan_adet - kabulEdilenAdet
      const yeniToplamKabul = selectedTalep.toplam_kabul_edilen + kabulEdilenAdet

      let yeniDurum: "beklemede" | "kısmi_kabul" | "tamamen_kabul" | "red"
      if (yeniKalanAdet === 0) {
        yeniDurum = "tamamen_kabul"
      } else {
        yeniDurum = "kısmi_kabul"
      }

      setTalepler((prev) =>
        prev.map((talep) =>
          talep.id === selectedTalep.id
            ? {
                ...talep,
                durum: yeniDurum,
                kalan_adet: yeniKalanAdet,
                toplam_kabul_edilen: yeniToplamKabul,
              }
            : talep,
        ),
      )
      setIsModalOpen(false)
      setSelectedTalep(null)
    }
  }

  const getKategoriIcon = (kategori: string) => {
    switch (kategori) {
      case "Gıda":
        return <Apple className="h-4 w-4 text-red-500" />
      case "Su":
        return <Droplets className="h-4 w-4 text-blue-500" />
      case "Giyim":
        return <Shirt className="h-4 w-4 text-purple-500" />
      case "Battaniye":
        return <Bed className="h-4 w-4 text-brown-500" />
      case "Çadır":
        return <Home className="h-4 w-4 text-orange-500" />
      case "Hijyen Malzemesi":
        return <Sparkles className="h-4 w-4 text-pink-500" />
      case "İlaç":
        return <Pill className="h-4 w-4 text-green-500" />
      case "Bebek Malzemesi":
        return <Baby className="h-4 w-4 text-yellow-500" />
      case "Temizlik Malzemesi":
        return <Spray className="h-4 w-4 text-cyan-500" />
      case "Isınma Malzemesi":
        return <Flame className="h-4 w-4 text-red-600" />
      case "Elektronik":
        return <Smartphone className="h-4 w-4 text-gray-600" />
      case "Diğer":
        return <Package className="h-4 w-4 text-gray-500" />
      default:
        return <Package className="h-4 w-4 text-gray-500" />
    }
  }

  const getDurumBadge = (talep: Talep) => {
    switch (talep.durum) {
      case "beklemede":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Beklemede
          </Badge>
        )
      case "kısmi_kabul":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">{talep.toplam_kabul_edilen} Kabul Edildi</Badge>
        )
      case "tamamen_kabul":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Tamamı Kabul Edildi</Badge>
      case "red":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
            Reddedildi
          </Badge>
        )
      default:
        return <Badge variant="secondary">Bilinmiyor</Badge>
    }
  }

  // Butonların görünürlüğünü kontrol eden fonksiyon
  const shouldShowButtons = (talep: Talep) => {
    return (talep.durum === "beklemede" || talep.durum === "kısmi_kabul") && talep.kalan_adet > 0
  }

  // Filtrelenmiş talepler
  const filtrelenmiseTalepler = talepler.filter((talep) => {
    if (durumFiltresi === "tümü") return true
    if (durumFiltresi === "beklemede") return talep.durum === "beklemede"
    if (durumFiltresi === "kabul_edildi") return talep.durum === "kısmi_kabul"
    if (durumFiltresi === "tamamen_kabul") return talep.durum === "tamamen_kabul"
    if (durumFiltresi === "reddedildi") return talep.durum === "red"
    return true
  })

  // İstatistikler
  const toplamTalep = talepler.length
  const benzersizKategoriler = new Set(talepler.map((t) => t.kategori)).size
  const bekleyenTalepler = talepler.filter((t) => t.durum === "beklemede" || t.durum === "kısmi_kabul").length
  const tamamlanmisTalepler = talepler.filter((t) => t.durum === "tamamen_kabul").length

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4 lg:p-6">
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Toplam Talep</p>
                  <p className="text-2xl font-bold text-green-800">{toplamTalep}</p>
                </div>
                <Package className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Kategori Sayısı</p>
                  <p className="text-2xl font-bold text-green-800">{benzersizKategoriler}</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">İşlem Bekleyen</p>
                  <p className="text-2xl font-bold text-green-800">{bekleyenTalepler}</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Tamamlanan</p>
                  <p className="text-2xl font-bold text-green-800">{tamamlanmisTalepler}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ana Tablo Kartı */}
        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-2xl font-bold text-green-800">Genel Talepler</CardTitle>
            <CardDescription className="text-green-600">
              Gelen talepleri görüntüleyin, kabul edin veya reddedin
            </CardDescription>
          </CardHeader>
          {/* Filtreleme Bölümü */}
          <div className="p-4 border-b border-green-200 bg-green-25">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="durum-filtresi" className="text-green-700 font-medium">
                  Durum Filtresi:
                </Label>
                <Select value={durumFiltresi} onValueChange={setDurumFiltresi}>
                  <SelectTrigger className="w-48 border-green-300">
                    <SelectValue placeholder="Durum seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tümü">Tümü</SelectItem>
                    <SelectItem value="beklemede">Beklemede</SelectItem>
                    <SelectItem value="kabul_edildi">Kabul Edildi</SelectItem>
                    <SelectItem value="tamamen_kabul">Tamamı Kabul Edildi</SelectItem>
                    <SelectItem value="reddedildi">Reddedildi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-green-600">{filtrelenmiseTalepler.length} talep gösteriliyor</div>
            </div>
          </div>
          <CardContent className="p-0">
            {/* Masaüstü Tablo Görünümü */}
            <div className="hidden lg:block">
              <div className="rounded-md border border-green-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-green-50">
                      <TableHead className="text-green-700">Kategori</TableHead>
                      <TableHead className="text-green-700">Ürün</TableHead>
                      <TableHead className="text-green-700">Talep Edilen</TableHead>
                      <TableHead className="text-green-700">Kabul Edilen</TableHead>
                      <TableHead className="text-green-700">Kalan Adet</TableHead>
                      <TableHead className="text-green-700">Talep Eden</TableHead>
                      <TableHead className="text-green-700">Tarih</TableHead>
                      <TableHead className="text-green-700">Durum</TableHead>
                      <TableHead className="text-right text-green-700">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtrelenmiseTalepler.map((talep) => (
                      <TableRow key={talep.id} className="hover:bg-green-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getKategoriIcon(talep.kategori)}
                            {talep.kategori}
                          </div>
                        </TableCell>
                        <TableCell>{talep.urun}</TableCell>
                        <TableCell>{talep.talep_edilen_adet}</TableCell>
                        <TableCell>
                          <span className="font-semibold text-blue-600">{talep.toplam_kabul_edilen}</span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-semibold ${talep.kalan_adet === 0 ? "text-green-600" : "text-orange-600"}`}
                          >
                            {talep.kalan_adet}
                          </span>
                        </TableCell>
                        <TableCell>{talep.talep_eden}</TableCell>
                        <TableCell>{talep.tarih}</TableCell>
                        <TableCell>{getDurumBadge(talep)}</TableCell>
                        <TableCell className="text-right">
                          {shouldShowButtons(talep) && (
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                onClick={() => handleKabulEt(talep)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Kabul Et
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleReddet(talep.id)}>
                                <X className="h-4 w-4 mr-1" />
                                Reddet
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Mobil Kart Görünümü */}
            <div className="lg:hidden p-4 space-y-4">
              {filtrelenmiseTalepler.map((talep) => (
                <Card key={talep.id} className="border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getKategoriIcon(talep.kategori)}
                        <span className="font-semibold text-green-800">{talep.kategori}</span>
                      </div>
                      {getDurumBadge(talep)}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ürün:</span>
                        <span className="font-medium">{talep.urun}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Talep Edilen:</span>
                        <span className="font-medium">{talep.talep_edilen_adet}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Kabul Edilen:</span>
                        <span className="font-semibold text-blue-600">{talep.toplam_kabul_edilen}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Kalan Adet:</span>
                        <span
                          className={`font-semibold ${talep.kalan_adet === 0 ? "text-green-600" : "text-orange-600"}`}
                        >
                          {talep.kalan_adet}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Talep Eden:</span>
                        <span className="font-medium">{talep.talep_eden}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tarih:</span>
                        <span className="font-medium">{talep.tarih}</span>
                      </div>
                    </div>

                    {shouldShowButtons(talep) && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleKabulEt(talep)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Kabul Et
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReddet(talep.id)}
                          className="flex-1"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reddet
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px] border-green-200">
            <DialogHeader>
              <DialogTitle className="text-green-800">Talep Kabul Et</DialogTitle>
              <DialogDescription className="text-green-600">
                Kalan {selectedTalep?.kalan_adet} adetten kaç tanesini kabul edeceğinizi belirleyin.
              </DialogDescription>
            </DialogHeader>

            {selectedTalep && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kategori" className="text-right text-green-700">
                    Kategori
                  </Label>
                  <div className="col-span-3 flex items-center gap-2 p-2 border rounded-md bg-green-50 border-green-200">
                    {getKategoriIcon(selectedTalep.kategori)}
                    <span>{selectedTalep.kategori}</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="urun" className="text-right text-green-700">
                    Ürün
                  </Label>
                  <Input
                    id="urun"
                    value={selectedTalep.urun}
                    className="col-span-3 border-green-200 bg-green-50"
                    readOnly
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="toplam-kabul" className="text-right text-green-700">
                    Önceki Kabul
                  </Label>
                  <Input
                    id="toplam-kabul"
                    value={selectedTalep.toplam_kabul_edilen}
                    className="col-span-3 border-green-200 bg-blue-50"
                    readOnly
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kalan-adet" className="text-right text-green-700">
                    Kalan Adet
                  </Label>
                  <Input
                    id="kalan-adet"
                    value={selectedTalep.kalan_adet}
                    className="col-span-3 border-green-200 bg-orange-50"
                    readOnly
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kabul-adet" className="text-right text-green-700">
                    Şimdi Kabul Et
                  </Label>
                  <Input
                    id="kabul-adet"
                    type="number"
                    value={kabulEdilenAdet}
                    onChange={(e) => setKabulEdilenAdet(Number(e.target.value))}
                    className="col-span-3 border-green-300 focus:border-green-500"
                    min="0"
                    max={selectedTalep.kalan_adet}
                  />
                </div>

                {kabulEdilenAdet > 0 && kabulEdilenAdet <= selectedTalep.kalan_adet && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right text-sm text-green-600">Sonuç</Label>
                    <div className="col-span-3 space-y-1">
                      <div className="text-sm text-green-600 bg-green-50 p-2 rounded border border-green-200">
                        ✅ {kabulEdilenAdet} adet daha kabul edilecek
                      </div>
                      <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">
                        📊 Toplam kabul: {selectedTalep.toplam_kabul_edilen + kabulEdilenAdet}
                      </div>
                      <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded border border-orange-200">
                        📦 Yeni kalan: {selectedTalep.kalan_adet - kabulEdilenAdet}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-green-300">
                İptal
              </Button>
              <Button
                onClick={handleModalKabul}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={kabulEdilenAdet <= 0 || kabulEdilenAdet > (selectedTalep?.kalan_adet || 0)}
              >
                Kabul Et
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
