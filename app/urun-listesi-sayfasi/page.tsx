"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
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
  Eye,
  Search,
  Calendar,
  MapPin,
  User,
  Hash,
} from "lucide-react"

interface Urun {
  id: number
  kategori: string
  urunAdi: string
  miktar: number
  birim: string
  gelisTarihi: string
  bagisciAdi: string
  toplanmaYeri: string
  durum: "yeni_geldi" | "depolandi" | "dagitildi" | "hasar_gordu"
  aciklama: string
  sonKullanmaTarihi?: string
  beden?: string
}

export default function UrunListesiSayfasi() {
  const [urunler, setUrunler] = useState<Urun[]>([
    {
      id: 1,
      kategori: "Gıda",
      urunAdi: "Konserve Fasulye",
      miktar: 50,
      birim: "adet",
      gelisTarihi: "2024-01-15",
      bagisciAdi: "Ahmet Yılmaz",
      toplanmaYeri: "Bursa Merkez",
      durum: "depolandi",
      aciklama: "Kaliteli konserve fasulye, son kullanma tarihi uzun",
      sonKullanmaTarihi: "2025-12-31",
    },
    {
      id: 2,
      kategori: "Giyim",
      urunAdi: "Çocuk Çorabı",
      miktar: 100,
      birim: "çift",
      gelisTarihi: "2024-01-14",
      bagisciAdi: "Ayşe Demir",
      toplanmaYeri: "İstanbul Kadıköy",
      durum: "yeni_geldi",
      aciklama: "Renkli çocuk çorapları, farklı desenler",
      beden: "25-30",
    },
    {
      id: 3,
      kategori: "Hijyen",
      urunAdi: "Sabun",
      miktar: 200,
      birim: "adet",
      gelisTarihi: "2024-01-13",
      bagisciAdi: "Mehmet Kaya",
      toplanmaYeri: "Ankara Çankaya",
      durum: "dagitildi",
      aciklama: "Katı sabun, hijyen için uygun",
    },
    {
      id: 4,
      kategori: "Bebek",
      urunAdi: "Bebek Bezi",
      miktar: 300,
      birim: "adet",
      gelisTarihi: "2024-01-12",
      bagisciAdi: "Fatma Özkan",
      toplanmaYeri: "İzmir Konak",
      durum: "depolandi",
      aciklama: "3 numara bebek bezi, kaliteli marka",
      beden: "3 Numara",
    },
    {
      id: 5,
      kategori: "Battaniye",
      urunAdi: "Yün Battaniye",
      miktar: 25,
      birim: "adet",
      gelisTarihi: "2024-01-11",
      bagisciAdi: "Ali Veli",
      toplanmaYeri: "Bursa Nilüfer",
      durum: "dagitildi",
      aciklama: "Kalın yün battaniye, kış için ideal",
    },
    {
      id: 6,
      kategori: "İlaç",
      urunAdi: "Ağrı Kesici",
      miktar: 80,
      birim: "kutu",
      gelisTarihi: "2024-01-10",
      bagisciAdi: "Zeynep Kara",
      toplanmaYeri: "Antalya Muratpaşa",
      durum: "hasar_gordu",
      aciklama: "Bazı kutular hasarlı, kontrol edilmeli",
      sonKullanmaTarihi: "2025-06-30",
    },
    {
      id: 7,
      kategori: "Elektronik",
      urunAdi: "Radyo",
      miktar: 15,
      birim: "adet",
      gelisTarihi: "2024-01-09",
      bagisciAdi: "Hasan Özdemir",
      toplanmaYeri: "Bursa Yıldırım",
      durum: "yeni_geldi",
      aciklama: "Pilli radyo, acil durum için uygun",
    },
    {
      id: 8,
      kategori: "Su",
      urunAdi: "Su Şişesi",
      miktar: 500,
      birim: "şişe",
      gelisTarihi: "2024-01-08",
      bagisciAdi: "Elif Yıldız",
      toplanmaYeri: "İstanbul Kadıköy",
      durum: "depolandi",
      aciklama: "0.5L su şişeleri, temiz ambalaj",
    },
  ])

  const [kategoriFiltresi, setKategoriFiltresi] = useState<string>("tümü")
  const [durumFiltresi, setDurumFiltresi] = useState<string>("tümü")
  const [aramaMetni, setAramaMetni] = useState<string>("")
  const [selectedUrun, setSelectedUrun] = useState<Urun | null>(null)

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
      case "Hijyen":
        return <Sparkles className="h-4 w-4 text-pink-500" />
      case "İlaç":
        return <Pill className="h-4 w-4 text-green-500" />
      case "Bebek":
        return <Baby className="h-4 w-4 text-yellow-500" />
      case "Temizlik":
        return <Spray className="h-4 w-4 text-cyan-500" />
      case "Isınma":
        return <Flame className="h-4 w-4 text-red-600" />
      case "Elektronik":
        return <Smartphone className="h-4 w-4 text-gray-600" />
      default:
        return <Package className="h-4 w-4 text-gray-500" />
    }
  }

  const getDurumBadge = (durum: string) => {
    switch (durum) {
      case "yeni_geldi":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Yeni Geldi</Badge>
      case "depolandi":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Depolandı</Badge>
      case "dagitildi":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Dağıtıldı</Badge>
      case "hasar_gordu":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
            Hasar Gördü
          </Badge>
        )
      default:
        return <Badge variant="secondary">Bilinmiyor</Badge>
    }
  }

  // Filtrelenmiş ürünler
  const filtrelenmisUrunler = urunler.filter((urun) => {
    const kategoriKoşulu = kategoriFiltresi === "tümü" || urun.kategori === kategoriFiltresi
    const durumKoşulu = durumFiltresi === "tümü" || urun.durum === durumFiltresi
    const aramaKoşulu =
      aramaMetni === "" ||
      urun.urunAdi.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      urun.bagisciAdi.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      urun.toplanmaYeri.toLowerCase().includes(aramaMetni.toLowerCase())

    return kategoriKoşulu && durumKoşulu && aramaKoşulu
  })

  // İstatistikler
  const toplamUrun = urunler.length
  const benzersizKategoriler = new Set(urunler.map((u) => u.kategori)).size
  const yeniGelenler = urunler.filter((u) => u.durum === "yeni_geldi").length
  const dagitilmislar = urunler.filter((u) => u.durum === "dagitildi").length

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4 lg:p-6">
        {/* Başlık Bölümü */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">
            <Package className="inline-block h-8 w-8 mr-2 text-green-600" />
            Toplanan Ürünler Listesi
          </h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            Yardım toplama merkezlerimize gelen tüm ürünlerin detaylı listesi ve durumu
          </p>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Toplam Ürün</p>
                  <p className="text-2xl font-bold text-green-800">{toplamUrun}</p>
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
                  <p className="text-sm font-medium text-green-600">Yeni Gelenler</p>
                  <p className="text-2xl font-bold text-green-800">{yeniGelenler}</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Dağıtılanlar</p>
                  <p className="text-2xl font-bold text-green-800">{dagitilmislar}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ana Tablo Kartı */}
        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-800">Ürün Listesi</CardTitle>
            <CardDescription className="text-green-600">
              Toplama merkezlerine gelen ürünleri görüntüleyin ve yönetin
            </CardDescription>
          </CardHeader>

          {/* Filtreleme Bölümü */}
          <div className="p-4 border-b border-green-200 bg-green-25">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kategori-filtresi" className="text-green-700 font-medium">
                  Kategori
                </Label>
                <Select value={kategoriFiltresi} onValueChange={setKategoriFiltresi}>
                  <SelectTrigger className="border-green-300">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tümü">Tüm Kategoriler</SelectItem>
                    <SelectItem value="Gıda">Gıda</SelectItem>
                    <SelectItem value="Su">Su</SelectItem>
                    <SelectItem value="Giyim">Giyim</SelectItem>
                    <SelectItem value="Battaniye">Battaniye</SelectItem>
                    <SelectItem value="Hijyen">Hijyen</SelectItem>
                    <SelectItem value="İlaç">İlaç</SelectItem>
                    <SelectItem value="Bebek">Bebek</SelectItem>
                    <SelectItem value="Elektronik">Elektronik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="durum-filtresi" className="text-green-700 font-medium">
                  Durum
                </Label>
                <Select value={durumFiltresi} onValueChange={setDurumFiltresi}>
                  <SelectTrigger className="border-green-300">
                    <SelectValue placeholder="Durum seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tümü">Tüm Durumlar</SelectItem>
                    <SelectItem value="yeni_geldi">Yeni Geldi</SelectItem>
                    <SelectItem value="depolandi">Depolandı</SelectItem>
                    <SelectItem value="dagitildi">Dağıtıldı</SelectItem>
                    <SelectItem value="hasar_gordu">Hasar Gördü</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="arama" className="text-green-700 font-medium">
                  Arama
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="arama"
                    placeholder="Ürün, bağışçı veya merkez ara..."
                    value={aramaMetni}
                    onChange={(e) => setAramaMetni(e.target.value)}
                    className="pl-10 border-green-300"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-200 w-full">
                  <strong>{filtrelenmisUrunler.length}</strong> ürün gösteriliyor
                </div>
              </div>
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
                      <TableHead className="text-green-700">Ürün Adı</TableHead>
                      <TableHead className="text-green-700">Miktar</TableHead>
                      <TableHead className="text-green-700">Geliş Tarihi</TableHead>
                      <TableHead className="text-green-700">Bağışçı</TableHead>
                      <TableHead className="text-green-700">Merkez</TableHead>
                      <TableHead className="text-green-700">Durum</TableHead>
                      <TableHead className="text-right text-green-700">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtrelenmisUrunler.map((urun) => (
                      <TableRow key={urun.id} className="hover:bg-green-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getKategoriIcon(urun.kategori)}
                            {urun.kategori}
                          </div>
                        </TableCell>
                        <TableCell>{urun.urunAdi}</TableCell>
                        <TableCell>
                          <span className="font-semibold">
                            {urun.miktar} {urun.birim}
                          </span>
                        </TableCell>
                        <TableCell>{urun.gelisTarihi}</TableCell>
                        <TableCell>{urun.bagisciAdi}</TableCell>
                        <TableCell>{urun.toplanmaYeri}</TableCell>
                        <TableCell>{getDurumBadge(urun.durum)}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-300"
                                onClick={() => setSelectedUrun(urun)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Detay
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] border-green-200">
                              <DialogHeader>
                                <DialogTitle className="text-green-800 flex items-center gap-2">
                                  {selectedUrun && getKategoriIcon(selectedUrun.kategori)}
                                  Ürün Detayları
                                </DialogTitle>
                                <DialogDescription className="text-green-600">
                                  {selectedUrun?.urunAdi} hakkında detaylı bilgiler
                                </DialogDescription>
                              </DialogHeader>
                              {selectedUrun && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label className="text-green-700 flex items-center gap-2">
                                        <Hash className="h-4 w-4" />
                                        ID
                                      </Label>
                                      <p className="text-sm bg-green-50 p-2 rounded border border-green-200">
                                        #{selectedUrun.id}
                                      </p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-green-700 flex items-center gap-2">
                                        <Package className="h-4 w-4" />
                                        Kategori
                                      </Label>
                                      <div className="flex items-center gap-2 bg-green-50 p-2 rounded border border-green-200">
                                        {getKategoriIcon(selectedUrun.kategori)}
                                        <span className="text-sm">{selectedUrun.kategori}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-green-700">Ürün Adı</Label>
                                    <p className="text-sm bg-green-50 p-2 rounded border border-green-200">
                                      {selectedUrun.urunAdi}
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label className="text-green-700">Miktar</Label>
                                      <p className="text-sm bg-blue-50 p-2 rounded border border-blue-200 font-semibold">
                                        {selectedUrun.miktar} {selectedUrun.birim}
                                      </p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-green-700 flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Geliş Tarihi
                                      </Label>
                                      <p className="text-sm bg-green-50 p-2 rounded border border-green-200">
                                        {selectedUrun.gelisTarihi}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label className="text-green-700 flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Bağışçı
                                      </Label>
                                      <p className="text-sm bg-green-50 p-2 rounded border border-green-200">
                                        {selectedUrun.bagisciAdi}
                                      </p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-green-700 flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Merkez
                                      </Label>
                                      <p className="text-sm bg-green-50 p-2 rounded border border-green-200">
                                        {selectedUrun.toplanmaYeri}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-green-700">Durum</Label>
                                    <div className="bg-green-50 p-2 rounded border border-green-200">
                                      {getDurumBadge(selectedUrun.durum)}
                                    </div>
                                  </div>

                                  {selectedUrun.beden && (
                                    <div className="space-y-2">
                                      <Label className="text-green-700">Beden</Label>
                                      <p className="text-sm bg-yellow-50 p-2 rounded border border-yellow-200">
                                        {selectedUrun.beden}
                                      </p>
                                    </div>
                                  )}

                                  {selectedUrun.sonKullanmaTarihi && (
                                    <div className="space-y-2">
                                      <Label className="text-green-700">Son Kullanma Tarihi</Label>
                                      <p className="text-sm bg-orange-50 p-2 rounded border border-orange-200">
                                        {selectedUrun.sonKullanmaTarihi}
                                      </p>
                                    </div>
                                  )}

                                  <div className="space-y-2">
                                    <Label className="text-green-700">Açıklama</Label>
                                    <p className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
                                      {selectedUrun.aciklama}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Mobil Kart Görünümü */}
            <div className="lg:hidden p-4 space-y-4">
              {filtrelenmisUrunler.map((urun) => (
                <Card key={urun.id} className="border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getKategoriIcon(urun.kategori)}
                        <span className="font-semibold text-green-800">{urun.kategori}</span>
                      </div>
                      {getDurumBadge(urun.durum)}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Ürün:</span>
                        <span className="font-medium">{urun.urunAdi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Miktar:</span>
                        <span className="font-semibold text-blue-600">
                          {urun.miktar} {urun.birim}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Geliş Tarihi:</span>
                        <span className="font-medium">{urun.gelisTarihi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Bağışçı:</span>
                        <span className="font-medium">{urun.bagisciAdi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Merkez:</span>
                        <span className="font-medium">{urun.toplanmaYeri}</span>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-green-300"
                          onClick={() => setSelectedUrun(urun)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Detayları Görüntüle
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
