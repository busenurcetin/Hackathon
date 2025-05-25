"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
import { Heart, Plus, Home, Package, User, Settings, LogOut, Edit, Trash2, Shield, Car, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth"

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

// Varsayılan hizmetler
const varsayilanHizmetler: Hizmet[] = [
  {
    id: 1,
    tur: "Gıda",
    urun: "Konserve",
    adet: 50,
    durum: "Aktif",
    tarih: "2024-01-15",
    konum: "İstanbul, Kadıköy",
    aciklama: "Çeşitli konserve çeşitleri mevcut",
  },
  {
    id: 2,
    tur: "Giyim",
    urun: "Mont",
    adet: 10,
    durum: "Teslim Edildi",
    tarih: "2024-01-14",
    konum: "Ankara, Çankaya",
    aciklama: "Kışlık mont, çeşitli bedenler",
  },
  {
    id: 3,
    tur: "Battaniye",
    urun: "Yün Battaniye",
    adet: 25,
    durum: "Aktif",
    tarih: "2024-01-13",
    konum: "İzmir, Konak",
    aciklama: "Kaliteli yün battaniyeler",
  },
]

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

export default function DashboardPage() {
  const [hizmetler, setHizmetler] = useState<Hizmet[]>([])
  const router = useRouter()

  // Hizmetleri localStorage'dan yükle
  useEffect(() => {
    const kayitliHizmetler = localStorage.getItem("hizmetler")
    if (kayitliHizmetler) {
      setHizmetler(JSON.parse(kayitliHizmetler))
    } else {
      // İlk kez açılıyorsa varsayılan hizmetleri yükle
      setHizmetler(varsayilanHizmetler)
      localStorage.setItem("hizmetler", JSON.stringify(varsayilanHizmetler))
    }
  }, [])

  const handleYeniHizmet = () => {
    router.push("/dashboard/yeni-hizmet")
  }

  const handleEdit = (id: number) => {
    console.log("Düzenle:", id)
    router.push(`/dashboard/hizmet-duzenle/${id}`)
  }

  const handleDelete = (id: number) => {
    if (confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) {
      const yeniHizmetler = hizmetler.filter((h) => h.id !== id)
      setHizmetler(yeniHizmetler)
      localStorage.setItem("hizmetler", JSON.stringify(yeniHizmetler))
      console.log("Hizmet silindi:", id)
    }
  }

  const getDurumBadge = (durum: string) => {
    switch (durum) {
      case "Aktif":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Aktif</Badge>
      case "Teslim Edildi":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Teslim Edildi</Badge>
      default:
        return <Badge variant="secondary">{durum}</Badge>
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            <h1 className="text-lg font-semibold text-green-800">Güvenli Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">Güvenli Oturum</span>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Ana İçerik */}
          <div className="space-y-6">
            {/* Başlık ve Yeni Butonu */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-green-800">Yardım için Verebileceğim Hizmetler</h2>
                <p className="text-green-600">Deprem mağdurlarına yardım etmek için sunduğunuz hizmetler</p>
              </div>
              <Button onClick={handleYeniHizmet} className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Yeni
              </Button>
            </div>

            {/* İstatistikler */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">Toplam Hizmet</CardTitle>
                  <Package className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">{hizmetler.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">Aktif Hizmetler</CardTitle>
                  <Heart className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">
                    {hizmetler.filter((h) => h.durum === "Aktif").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">Teslim Edilen</CardTitle>
                  <Package className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">
                    {hizmetler.filter((h) => h.durum === "Teslim Edildi").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hizmetler Tablosu */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Hizmet Listesi</CardTitle>
                <CardDescription>Sunduğunuz tüm hizmetleri buradan yönetebilirsiniz</CardDescription>
              </CardHeader>
              <CardContent>
                {hizmetler.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-green-700">Ürün Türü</TableHead>
                          <TableHead className="text-green-700">Ürün Adı</TableHead>
                          <TableHead className="text-green-700">Adet</TableHead>
                          <TableHead className="text-green-700">Durum</TableHead>
                          <TableHead className="text-green-700">Tarih</TableHead>
                          <TableHead className="text-green-700">İşlemler</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {hizmetler.map((hizmet) => (
                          <TableRow key={hizmet.id}>
                            <TableCell className="font-medium">{hizmet.tur}</TableCell>
                            <TableCell>{hizmet.urun}</TableCell>
                            <TableCell>{hizmet.adet}</TableCell>
                            <TableCell>{getDurumBadge(hizmet.durum)}</TableCell>
                            <TableCell>{hizmet.tarih}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(hizmet.id)}
                                  className="border-green-300 text-green-700 hover:bg-green-50"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(hizmet.id)}
                                  className="border-red-300 text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-green-300 mb-4" />
                    <h3 className="text-lg font-medium text-green-800 mb-2">Henüz hizmet eklenmemiş</h3>
                    <p className="text-green-600 mb-4">İlk hizmetinizi eklemek için "Yeni" butonuna tıklayın</p>
                    <Button onClick={handleYeniHizmet} className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      İlk Hizmeti Ekle
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}