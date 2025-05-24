"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function EmailDogrulamaPage() {
  const [dogrulamaState, setDogrulamaState] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    if (!token || !email) {
      setDogrulamaState("error")
      setMessage("Geçersiz doğrulama linki")
      return
    }

    // Simüle edilmiş doğrulama işlemi
    const dogrulamaYap = async () => {
      try {
        // 2 saniye bekle (API çağrısı simülasyonu)
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Rastgele başarı/hata simülasyonu (gerçek uygulamada API'den gelecek)
        const basarili = Math.random() > 0.2 // %80 başarı oranı

        if (basarili) {
          setDogrulamaState("success")
          setMessage("Email adresiniz başarıyla doğrulandı!")
          console.log(`Email doğrulandı: ${email}`)
        } else {
          setDogrulamaState("error")
          setMessage("Doğrulama linki geçersiz veya süresi dolmuş")
        }
      } catch (error) {
        setDogrulamaState("error")
        setMessage("Doğrulama sırasında bir hata oluştu")
        console.error("Doğrulama hatası:", error)
      }
    }

    dogrulamaYap()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Heart className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">Deprem Dayanışma Ağı</h1>
          </div>
          <p className="text-green-700">Email doğrulaması</p>
        </div>

        {/* Doğrulama Card */}
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="flex items-center gap-2">
              {dogrulamaState === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
              {dogrulamaState === "success" && <CheckCircle className="h-5 w-5" />}
              {dogrulamaState === "error" && <XCircle className="h-5 w-5" />}
              Email Doğrulaması
            </CardTitle>
            <CardDescription className="text-green-100">
              {dogrulamaState === "loading" && "Email adresiniz doğrulanıyor..."}
              {dogrulamaState === "success" && "Doğrulama başarılı!"}
              {dogrulamaState === "error" && "Doğrulama başarısız"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                {dogrulamaState === "loading" && <Loader2 className="h-8 w-8 text-green-600 animate-spin" />}
                {dogrulamaState === "success" && <CheckCircle className="h-8 w-8 text-green-600" />}
                {dogrulamaState === "error" && <XCircle className="h-8 w-8 text-red-600" />}
              </div>

              <h3 className="mb-2 text-lg font-semibold text-green-800">
                {dogrulamaState === "loading" && "Doğrulanıyor..."}
                {dogrulamaState === "success" && "Başarılı!"}
                {dogrulamaState === "error" && "Hata!"}
              </h3>

              <p className={`mb-4 ${dogrulamaState === "error" ? "text-red-600" : "text-green-700"}`}>{message}</p>

              {dogrulamaState === "success" && (
                <p className="text-sm text-green-600 mb-6">
                  Artık hesabınıza giriş yapabilir ve dayanışma ağımıza katılabilirsiniz.
                </p>
              )}

              {dogrulamaState === "error" && (
                <p className="text-sm text-green-600 mb-6">
                  Yeni bir doğrulama emaili almak için kayıt sayfasından tekrar deneyebilirsiniz.
                </p>
              )}
            </div>

            <div className="space-y-3">
              {dogrulamaState === "success" && (
                <Link href="/giris">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Giriş Yap</Button>
                </Link>
              )}

              {dogrulamaState === "error" && (
                <>
                  <Link href="/kayit">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Tekrar Kayıt Ol</Button>
                  </Link>
                  <Link href="/giris">
                    <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                      Giriş Sayfasına Dön
                    </Button>
                  </Link>
                </>
              )}

              {dogrulamaState === "loading" && (
                <Button disabled className="w-full bg-green-600 text-white">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Lütfen bekleyin...
                </Button>
              )}
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
