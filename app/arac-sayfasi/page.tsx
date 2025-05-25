"use client"

import { useState } from "react"
import {
  Plus,
  Trash2,
  Apple,
  Droplets,
  Shirt,
  Bed,
  Home,
  SoupIcon as Soap,
  Pill,
  Baby,
  SprayCanIcon as Spray,
  Flame,
  Smartphone,
  Package,
  Heart,
  User,
  Settings,
  LogOut,
  Shield,
  Car,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth"

// Malzeme kategorileri
const malzemeKategorileri = [
  { id: "gida", name: "Gıda", icon: Apple },
  { id: "su", name: "Su", icon: Droplets },
  { id: "giyim", name: "Giyim", icon: Shirt },
  { id: "battaniye", name: "Battaniye", icon: Bed },
  { id: "cadir", name: "Çadır", icon: Home },
  { id: "hijyen", name: "Hijyen Malzemesi", icon: Soap },
  { id: "ilac", name: "İlaç", icon: Pill },
  { id: "bebek", name: "Bebek Malzemesi", icon: Baby },
  { id: "temizlik", name: "Temizlik Malzemesi", icon: Spray },
  { id: "isinma", name: "Isınma Malzemesi", icon: Flame },
  { id: "elektronik", name: "Elektronik", icon: Smartphone },
  { id: "diger", name: "Diğer", icon: Package },
]

// Malzeme tipi
interface Malzeme {
  id: string
  kategori: string
  adet: number
  eklemeTarihi: string
}

function AppSidebar() {
  const router = useRouter()
  const currentUser = authService.getCurrentUser()

  const menuItems = [
    {
      title: "Ana Sayfa",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Yardım Toplama Sayfası",
      url: "/yardim-toplama-sayfasi",
      icon: Heart,
    },
    {
      title: "Araç Sayfası",
      url: "/arac-sayfasi",
      icon: Car,
    },
    {
      title: "Genel Talepler",
      url: "/genel-talepler",
      icon: Users,
    },
    {
      title: "Profil",
      url: "/profil-duzenle",
      icon: User,
    },
    {
      title: "Ayarlar",
      url: "/dashboard/ayarlar",
      icon: Settings,
    },
  ]
  

  const handleLogout = () => {
    if (confirm("Çıkış yapmak istediğinizden emin misiniz?")) {
      console.log("Çıkış yapılıyor...")
      authService.logout()
      router.push("/")
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Heart className="h-6 w-6 text-green-600" />
          <span className="font-bold text-green-800">Deprem Dayanışma</span>
        </div>
        {currentUser && (
          <div className="px-4 py-2 bg-green-50 border-t border-green-200">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <div className="text-sm">
                <p className="font-medium text-green-800">
                  {currentUser.isim} {currentUser.soyisim}
                </p>
                <p className="text-green-600 text-xs">{currentUser.email}</p>
              </div>
            </div>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menü</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut />
              <span>Güvenli Çıkış</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function AracSayfasi() {
  const [malzemeler, setMalzemeler] = useState<Malzeme[]>([
    {
      id: "1",
      kategori: "gida",
      adet: 50,
      eklemeTarihi: "2024-01-15",
    },
    {
      id: "2",
      kategori: "su",
      adet: 100,
      eklemeTarihi: "2024-01-10",
    },
  ])

  const [modalAcik, setModalAcik] = useState(false)
  const [secilenKategori, setSecilenKategori] = useState("")
  const [adet, setAdet] = useState("")

  const [silmeOnayModalAcik, setSilmeOnayModalAcik] = useState(false)
  const [silinecekMalzemeId, setSilinecekMalzemeId] = useState<string>("")

  const kategoriAdi = (kategoriId: string) => {
    return malzemeKategorileri.find((k) => k.id === kategoriId)?.name || kategoriId
  }

  const kategoriIcon = (kategoriId: string) => {
    const kategori = malzemeKategorileri.find((k) => k.id === kategoriId)
    return kategori?.icon || Package
  }

  const yeniMalzemeEkle = () => {
    if (secilenKategori && adet && Number.parseInt(adet) > 0) {
      const yeniMalzeme: Malzeme = {
        id: Date.now().toString(),
        kategori: secilenKategori,
        adet: Number.parseInt(adet),
        eklemeTarihi: new Date().toISOString().split("T")[0],
      }

      setMalzemeler((prev) => [...prev, yeniMalzeme])
      setSecilenKategori("")
      setAdet("")
      setModalAcik(false)
    }
  }

  const malzemeSil = (id: string) => {
    setSilinecekMalzemeId(id)
    setSilmeOnayModalAcik(true)
  }

  const silmeOnayla = () => {
    setMalzemeler((prev) => prev.filter((malzeme) => malzeme.id !== silinecekMalzemeId))
    setSilmeOnayModalAcik(false)
    setSilinecekMalzemeId("")
  }

  const toplamMalzeme = malzemeler.reduce((toplam, malzeme) => toplam + malzeme.adet, 0)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-green-600" />
            <h1 className="text-lg font-semibold text-green-800">Araç Sayfası</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">Güvenli Oturum</span>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="container mx-auto">
            {/* Başlık */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">Yardım Malzemesi Yönetimi</h1>
              <p className="text-green-600">Yardım malzemelerinizi yönetin ve takip edin</p>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-green-100">
                <h3 className="text-sm font-medium text-green-600 mb-2">Toplam Malzeme</h3>
                <p className="text-3xl font-bold text-green-800">{toplamMalzeme}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-green-100">
                <h3 className="text-sm font-medium text-green-600 mb-2">Kategori Sayısı</h3>
                <p className="text-3xl font-bold text-green-800">{new Set(malzemeler.map((m) => m.kategori)).size}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-green-100">
                <h3 className="text-sm font-medium text-green-600 mb-2">Aktif Kayıt</h3>
                <p className="text-3xl font-bold text-green-800">{malzemeler.length}</p>
              </div>
            </div>

            {/* Tablo Kartı */}
            <div className="bg-white rounded-lg shadow-sm border border-green-100">
              {/* Tablo Başlığı */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b border-green-100">
                <div>
                  <h2 className="text-xl font-semibold text-green-800 mb-1">Malzeme Listesi</h2>
                  <p className="text-sm text-green-600">Tüm yardım malzemelerinizi görüntüleyin ve yönetin</p>
                </div>

                {/* Yeni Buton */}
                <Dialog open={modalAcik} onOpenChange={setModalAcik}>
                  <DialogTrigger asChild>
                    <Button className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Yeni
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-green-800">Yeni Malzeme Ekle</DialogTitle>
                      <DialogDescription className="text-green-600">
                        Malzeme kategorisini seçin ve adet bilgisini girin.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="kategori" className="text-green-700">
                          Kategori
                        </Label>
                        <Select value={secilenKategori} onValueChange={setSecilenKategori}>
                          <SelectTrigger className="border-green-200 focus:border-green-500">
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {malzemeKategorileri.map((kategori) => {
                              const Icon = kategori.icon
                              return (
                                <SelectItem key={kategori.id} value={kategori.id}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4 text-green-600" />
                                    {kategori.name}
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="adet" className="text-green-700">
                          Adet
                        </Label>
                        <Input
                          id="adet"
                          type="number"
                          placeholder="Adet girin"
                          value={adet}
                          onChange={(e) => setAdet(e.target.value)}
                          min="1"
                          className="border-green-200 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setModalAcik(false)}
                        className="border-green-200 text-green-700 hover:bg-green-50"
                      >
                        İptal
                      </Button>
                      <Button
                        type="button"
                        onClick={yeniMalzemeEkle}
                        disabled={!secilenKategori || !adet || Number.parseInt(adet) <= 0}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Ekle
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Tablo */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-green-100">
                      <TableHead className="text-green-700 font-semibold">Kategori</TableHead>
                      <TableHead className="text-green-700 font-semibold">Adet</TableHead>
                      <TableHead className="text-green-700 font-semibold">Ekleme Tarihi</TableHead>
                      <TableHead className="text-green-700 font-semibold">Durum</TableHead>
                      <TableHead className="text-green-700 font-semibold">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {malzemeler.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-green-600">
                          Henüz malzeme eklenmemiş. Yeni butonuna tıklayarak malzeme ekleyebilirsiniz.
                        </TableCell>
                      </TableRow>
                    ) : (
                      malzemeler.map((malzeme) => {
                        const Icon = kategoriIcon(malzeme.kategori)
                        return (
                          <TableRow key={malzeme.id} className="border-green-50 hover:bg-green-25">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                  <Icon className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="font-medium text-green-800">{kategoriAdi(malzeme.kategori)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                                {malzeme.adet} adet
                              </Badge>
                            </TableCell>
                            <TableCell className="text-green-600">
                              {new Date(malzeme.eklemeTarihi).toLocaleDateString("tr-TR")}
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-600 hover:bg-green-700">Aktif</Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => malzemeSil(malzeme.id)}
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Silme Onay Modalı */}
            <AlertDialog open={silmeOnayModalAcik} onOpenChange={setSilmeOnayModalAcik}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-600">Malzeme Silme Onayı</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bu malzemeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-gray-200 text-gray-700 hover:bg-gray-50">
                    Hayır
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={silmeOnayla} className="bg-red-600 hover:bg-red-700 text-white">
                    Evet, Sil
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}