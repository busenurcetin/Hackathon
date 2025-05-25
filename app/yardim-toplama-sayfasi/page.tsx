"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, Phone, Mail, Users, Package, Heart, Navigation, Info, Filter } from "lucide-react"

interface ToplanmaYeri {
  id: number
  ad: string
  il: string
  ilce: string
  adres: string
  telefon: string
  email: string
  koordinatlar: {
    lat: number
    lng: number
  }
  calismaGunleri: string
  calismaSaatleri: string
  sorumluKisi: string
  aciklama: string
  mapUrl: string
}

// Türkiye'nin tüm illeri ve ilçeleri
const ilIlceVerisi = {
  Adana: [
    "Aladağ",
    "Ceyhan",
    "Çukurova",
    "Feke",
    "İmamoğlu",
    "Karaisalı",
    "Karataş",
    "Kozan",
    "Pozantı",
    "Saimbeyli",
    "Sarıçam",
    "Seyhan",
    "Tufanbeyli",
    "Yumurtalık",
    "Yüreğir",
  ],
  Adıyaman: ["Besni", "Çelikhan", "Gerger", "Gölbaşı", "Kahta", "Merkez", "Samsat", "Sincik", "Tut"],
  Afyonkarahisar: [
    "Başmakçı",
    "Bayat",
    "Bolvadin",
    "Çay",
    "Çobanlar",
    "Dazkırı",
    "Dinar",
    "Emirdağ",
    "Evciler",
    "Hocalar",
    "İhsaniye",
    "İscehisar",
    "Kızılören",
    "Merkez",
    "Sandıklı",
    "Sinanpaşa",
    "Sultandağı",
    "Şuhut",
  ],
  Ağrı: ["Diyadin", "Doğubayazıt", "Eleşkirt", "Hamur", "Merkez", "Patnos", "Taşlıçay", "Tutak"],
  Amasya: ["Göynücek", "Gümüşhacıköy", "Hamamözü", "Merkez", "Merzifon", "Suluova", "Taşova"],
  Ankara: [
    "Akyurt",
    "Altındağ",
    "Ayaş",
    "Bala",
    "Beypazarı",
    "Çamlıdere",
    "Çankaya",
    "Çubuk",
    "Elmadağ",
    "Etimesgut",
    "Evren",
    "Gölbaşı",
    "Güdül",
    "Haymana",
    "Kalecik",
    "Kazan",
    "Keçiören",
    "Kızılcahamam",
    "Mamak",
    "Nallıhan",
    "Polatlı",
    "Pursaklar",
    "Sincan",
    "Şereflikoçhisar",
    "Yenimahalle",
  ],
  Antalya: [
    "Akseki",
    "Aksu",
    "Alanya",
    "Demre",
    "Döşemealtı",
    "Elmalı",
    "Finike",
    "Gazipaşa",
    "Gündoğmuş",
    "İbradı",
    "Kaş",
    "Kemer",
    "Kepez",
    "Konyaaltı",
    "Korkuteli",
    "Kumluca",
    "Manavgat",
    "Muratpaşa",
    "Serik",
  ],
  Artvin: ["Ardanuç", "Arhavi", "Borçka", "Hopa", "Merkez", "Murgul", "Şavşat", "Yusufeli"],
  Aydın: [
    "Bozdoğan",
    "Buharkent",
    "Çine",
    "Didim",
    "Efeler",
    "Germencik",
    "İncirliova",
    "Karacasu",
    "Karpuzlu",
    "Koçarlı",
    "Köşk",
    "Kuşadası",
    "Kuyucak",
    "Nazilli",
    "Söke",
    "Sultanhisar",
    "Yenipazar",
  ],
  Balıkesir: [
    "Altıeylül",
    "Ayvalık",
    "Balya",
    "Bandırma",
    "Bigadiç",
    "Burhaniye",
    "Dursunbey",
    "Edremit",
    "Erdek",
    "Gömeç",
    "Gönen",
    "Havran",
    "İvrindi",
    "Karesi",
    "Kepsut",
    "Manyas",
    "Marmara",
    "Savaştepe",
    "Sındırgı",
    "Susurluk",
  ],
  Bartın: ["Amasra", "Kurucaşile", "Merkez", "Ulus"],
  Batman: ["Beşiri", "Gercüş", "Hasankeyf", "Kozluk", "Merkez", "Sason"],
  Bayburt: ["Aydıntepe", "Demirözü", "Merkez"],
  Bilecik: ["Bozüyük", "Gölpazarı", "İnhisar", "Merkez", "Osmaneli", "Pazaryeri", "Söğüt", "Yenipazar"],
  Bingöl: ["Adaklı", "Genç", "Karlıova", "Kiğı", "Merkez", "Solhan", "Yayladere", "Yedisu"],
  Bitlis: ["Adilcevaz", "Ahlat", "Güroymak", "Hizan", "Merkez", "Mutki", "Tatvan"],
  Bolu: ["Dörtdivan", "Gerede", "Göynük", "Kıbrıscık", "Mengen", "Merkez", "Mudurnu", "Seben", "Yeniçağa"],
  Burdur: [
    "Ağlasun",
    "Altınyayla",
    "Bucak",
    "Çavdır",
    "Çeltikçi",
    "Gölhisar",
    "Karamanlı",
    "Kemer",
    "Merkez",
    "Tefenni",
    "Yeşilova",
  ],
  Bursa: [
    "Büyükorhan",
    "Gemlik",
    "Gürsu",
    "Harmancık",
    "İnegöl",
    "İznik",
    "Karacabey",
    "Keles",
    "Kestel",
    "Mudanya",
    "Mustafakemalpaşa",
    "Nilüfer",
    "Orhaneli",
    "Orhangazi",
    "Osmangazi",
    "Yenişehir",
    "Yıldırım",
  ],
  Çanakkale: [
    "Ayvacık",
    "Bayramiç",
    "Biga",
    "Bozcaada",
    "Çan",
    "Eceabat",
    "Ezine",
    "Gelibolu",
    "Gökçeada",
    "Lapseki",
    "Merkez",
    "Yenice",
  ],
  Çankırı: [
    "Atkaracalar",
    "Bayramören",
    "Çerkeş",
    "Eldivan",
    "Ilgaz",
    "Kızılırmak",
    "Korgun",
    "Kurşunlu",
    "Merkez",
    "Orta",
    "Şabanözü",
    "Yapraklı",
  ],
  Çorum: [
    "Alaca",
    "Bayat",
    "Boğazkale",
    "Dodurga",
    "İskilip",
    "Kargı",
    "Laçin",
    "Mecitözü",
    "Merkez",
    "Oğuzlar",
    "Ortaköy",
    "Osmancık",
    "Sungurlu",
    "Uğurludağ",
  ],
  Denizli: [
    "Acıpayam",
    "Babadağ",
    "Baklan",
    "Bekilli",
    "Beyağaç",
    "Bozkurt",
    "Buldan",
    "Çal",
    "Çameli",
    "Çardak",
    "Çivril",
    "Güney",
    "Honaz",
    "Kale",
    "Merkezefendi",
    "Pamukkale",
    "Sarayköy",
    "Serinhisar",
    "Tavas",
  ],
  Diyarbakır: [
    "Bağlar",
    "Bismil",
    "Çermik",
    "Çınar",
    "Çüngüş",
    "Dicle",
    "Eğil",
    "Ergani",
    "Hani",
    "Hazro",
    "Kayapınar",
    "Kocaköy",
    "Kulp",
    "Lice",
    "Silvan",
    "Sur",
    "Yenişehir",
  ],
  Düzce: ["Akçakoca", "Cumayeri", "Çilimli", "Gölyaka", "Gümüşova", "Kaynaşlı", "Merkez", "Yığılca"],
  Edirne: ["Enez", "Havsa", "İpsala", "Keşan", "Lalapaşa", "Meriç", "Merkez", "Süloğlu", "Uzunköprü"],
  Elazığ: [
    "Ağın",
    "Alacakaya",
    "Arıcak",
    "Baskil",
    "Karakoçan",
    "Keban",
    "Kovancılar",
    "Maden",
    "Merkez",
    "Palu",
    "Sivrice",
  ],
  Erzincan: ["Çayırlı", "İliç", "Kemah", "Kemaliye", "Merkez", "Otlukbeli", "Refahiye", "Tercan", "Üzümlü"],
  Erzurum: [
    "Aşkale",
    "Aziziye",
    "Çat",
    "Hınıs",
    "Horasan",
    "İspir",
    "Karaçoban",
    "Karayazı",
    "Köprüköy",
    "Narman",
    "Oltu",
    "Olur",
    "Palandöken",
    "Pasinler",
    "Pazaryolu",
    "Şenkaya",
    "Tekman",
    "Tortum",
    "Uzundere",
    "Yakutiye",
  ],
  Eskişehir: [
    "Alpu",
    "Beylikova",
    "Çifteler",
    "Günyüzü",
    "Han",
    "İnönü",
    "Mahmudiye",
    "Mihalgazi",
    "Mihalıççık",
    "Odunpazarı",
    "Sarıcakaya",
    "Seyitgazi",
    "Sivrihisar",
    "Tepebaşı",
  ],
  Gaziantep: ["Araban", "İslahiye", "Karkamış", "Nizip", "Nurdağı", "Oğuzeli", "Şahinbey", "Şehitkamil", "Yavuzeli"],
  Giresun: [
    "Alucra",
    "Bulancak",
    "Çamoluk",
    "Çanakçı",
    "Dereli",
    "Doğankent",
    "Espiye",
    "Eynesil",
    "Görele",
    "Güce",
    "Keşap",
    "Merkez",
    "Piraziz",
    "Şebinkarahisar",
    "Tirebolu",
    "Yağlıdere",
  ],
  Gümüşhane: ["Kelkit", "Köse", "Kürtün", "Merkez", "Şiran", "Torul"],
  Hakkari: ["Çukurca", "Derecik", "Merkez", "Şemdinli", "Yüksekova"],
  Hatay: [
    "Altınözü",
    "Antakya",
    "Arsuz",
    "Belen",
    "Defne",
    "Dörtyol",
    "Erzin",
    "Hassa",
    "İskenderun",
    "Kırıkhan",
    "Kumlu",
    "Payas",
    "Reyhanlı",
    "Samandağ",
    "Yayladağı",
  ],
  Iğdır: ["Aralık", "Karakoyunlu", "Merkez", "Tuzluca"],
  Isparta: [
    "Aksu",
    "Atabey",
    "Eğirdir",
    "Gelendost",
    "Gönen",
    "Keçiborlu",
    "Merkez",
    "Senirkent",
    "Sütçüler",
    "Şarkikaraağaç",
    "Uluborlu",
    "Yalvaç",
    "Yenişarbademli",
  ],
  İstanbul: [
    "Adalar",
    "Arnavutköy",
    "Ataşehir",
    "Avcılar",
    "Bağcılar",
    "Bahçelievler",
    "Bakırköy",
    "Başakşehir",
    "Bayrampaşa",
    "Beşiktaş",
    "Beykoz",
    "Beylikdüzü",
    "Beyoğlu",
    "Büyükçekmece",
    "Çatalca",
    "Çekmeköy",
    "Esenler",
    "Esenyurt",
    "Eyüpsultan",
    "Fatih",
    "Gaziosmanpaşa",
    "Güngören",
    "Kadıköy",
    "Kağıthane",
    "Kartal",
    "Küçükçekmece",
    "Maltepe",
    "Pendik",
    "Sancaktepe",
    "Sarıyer",
    "Silivri",
    "Sultanbeyli",
    "Sultangazi",
    "Şile",
    "Şişli",
    "Tuzla",
    "Ümraniye",
    "Üsküdar",
    "Zeytinburnu",
  ],
  İzmir: [
    "Aliağa",
    "Balçova",
    "Bayındır",
    "Bayraklı",
    "Bergama",
    "Beydağ",
    "Bornova",
    "Buca",
    "Çeşme",
    "Çiğli",
    "Dikili",
    "Foça",
    "Gaziemir",
    "Güzelbahçe",
    "Karabağlar",
    "Karaburun",
    "Karşıyaka",
    "Kemalpaşa",
    "Kınık",
    "Kiraz",
    "Konak",
    "Menderes",
    "Menemen",
    "Narlıdere",
    "Ödemiş",
    "Seferihisar",
    "Selçuk",
    "Tire",
    "Torbalı",
    "Urla",
  ],
  Kahramanmaraş: [
    "Afşin",
    "Andırın",
    "Çağlayancerit",
    "Dulkadiroğlu",
    "Ekinözü",
    "Elbistan",
    "Göksun",
    "Nurhak",
    "Onikişubat",
    "Pazarcık",
    "Türkoğlu",
  ],
  Karabük: ["Eflani", "Eskipazar", "Merkez", "Ovacık", "Safranbolu", "Yenice"],
  Karaman: ["Ayrancı", "Başyayla", "Ermenek", "Kazımkarabekir", "Merkez", "Sarıveliler"],
  Kars: ["Akyaka", "Arpaçay", "Digor", "Kağızman", "Merkez", "Sarıkamış", "Selim", "Susuz"],
  Kastamonu: [
    "Abana",
    "Ağlı",
    "Araç",
    "Azdavay",
    "Bozkurt",
    "Cide",
    "Çatalzeytin",
    "Daday",
    "Devrekani",
    "Doğanyurt",
    "Hanönü",
    "İhsangazi",
    "İnebolu",
    "Küre",
    "Merkez",
    "Pınarbaşı",
    "Seydiler",
    "Şenpazar",
    "Taşköprü",
    "Tosya",
  ],
  Kayseri:
    "Akkışla,Bünyan,Develi,Felahiye,Hacılar,İncesu,Kocasinan,Melikgazi,Özvatan,Pınarbaşı,Sarıoğlan,Sarız,Talas,Tomarza,Yahyalı,Yeşilhisar".split(
      ",",
    ),
  Kırıkkale: ["Bahşılı", "Balışeyh", "Çelebi", "Delice", "Karakeçili", "Keskin", "Merkez", "Sulakyurt", "Yahşihan"],
  Kırklareli: ["Babaeski", "Demirköy", "Kofçaz", "Lüleburgaz", "Merkez", "Pehlivanköy", "Pınarhisar", "Vize"],
  Kırşehir: ["Akçakent", "Akpınar", "Boztepe", "Çiçekdağı", "Kaman", "Merkez", "Mucur"],
  Kilis: ["Elbeyli", "Merkez", "Musabeyli", "Polateli"],
  Kocaeli: [
    "Başiskele",
    "Çayırova",
    "Darıca",
    "Derince",
    "Dilovası",
    "Gebze",
    "Gölcük",
    "İzmit",
    "Kandıra",
    "Karamürsel",
    "Kartepe",
    "Körfez",
  ],
  Konya: [
    "Ahırlı",
    "Akören",
    "Akşehir",
    "Altınekin",
    "Beyşehir",
    "Bozkır",
    "Cihanbeyli",
    "Çeltik",
    "Çumra",
    "Derbent",
    "Derebucak",
    "Doğanhisar",
    "Emirgazi",
    "Ereğli",
    "Güneysınır",
    "Hadim",
    "Halkapınar",
    "Hüyük",
    "Ilgın",
    "Kadınhanı",
    "Karapınar",
    "Karatay",
    "Kulu",
    "Meram",
    "Sarayönü",
    "Selçuklu",
    "Seydişehir",
    "Taşkent",
    "Tuzlukçu",
    "Yalıhüyük",
    "Yunak",
  ],
  Kütahya: [
    "Altıntaş",
    "Aslanapa",
    "Çavdarhisar",
    "Domaniç",
    "Dumlupınar",
    "Emet",
    "Gediz",
    "Hisarcık",
    "Merkez",
    "Pazarlar",
    "Simav",
    "Şaphane",
    "Tavşanlı",
  ],
  Malatya: [
    "Akçadağ",
    "Arapgir",
    "Arguvan",
    "Battalgazi",
    "Darende",
    "Doğanşehir",
    "Doğanyol",
    "Hekimhan",
    "Kale",
    "Kuluncak",
    "Pütürge",
    "Yazıhan",
    "Yeşilyurt",
  ],
  Manisa: [
    "Ahmetli",
    "Akhisar",
    "Alaşehir",
    "Demirci",
    "Gölmarmara",
    "Gördes",
    "Kırkağaç",
    "Köprübaşı",
    "Kula",
    "Salihli",
    "Sarıgöl",
    "Saruhanlı",
    "Selendi",
    "Soma",
    "Şehzadeler",
    "Turgutlu",
    "Yunusemre",
  ],
  Mardin: ["Artuklu", "Dargeçit", "Derik", "Kızıltepe", "Mazıdağı", "Midyat", "Nusaybin", "Ömerli", "Savur", "Yeşilli"],
  Mersin: [
    "Akdeniz",
    "Anamur",
    "Aydıncık",
    "Bozyazı",
    "Çamlıyayla",
    "Erdemli",
    "Gülnar",
    "Mezitli",
    "Mut",
    "Silifke",
    "Tarsus",
    "Toroslar",
    "Yenişehir",
  ],
  Muğla: [
    "Bodrum",
    "Dalaman",
    "Datça",
    "Fethiye",
    "Kavaklıdere",
    "Köyceğiz",
    "Marmaris",
    "Menteşe",
    "Milas",
    "Ortaca",
    "Seydikemer",
    "Ula",
    "Yatağan",
  ],
  Muş: ["Bulanık", "Hasköy", "Korkut", "Malazgirt", "Merkez", "Varto"],
  Nevşehir: ["Acıgöl", "Avanos", "Derinkuyu", "Gülşehir", "Hacıbektaş", "Kozaklı", "Merkez", "Ürgüp"],
  Niğde: ["Altunhisar", "Bor", "Çamardı", "Çiftlik", "Merkez", "Ulukışla"],
  Ordu: [
    "Akkuş",
    "Altınordu",
    "Aybastı",
    "Çamaş",
    "Çatalpınar",
    "Çaybaşı",
    "Fatsa",
    "Gölköy",
    "Gülyalı",
    "Gürgentepe",
    "İkizce",
    "Kabadüz",
    "Kabataş",
    "Korgan",
    "Kumru",
    "Mesudiye",
    "Perşembe",
    "Ulubey",
    "Ünye",
  ],
  Osmaniye: ["Bahçe", "Düziçi", "Hasanbeyli", "Kadirli", "Merkez", "Sumbas", "Toprakkale"],
  Rize: [
    "Ardeşen",
    "Çamlıhemşin",
    "Çayeli",
    "Derepazarı",
    "Fındıklı",
    "Güneysu",
    "Hemşin",
    "İkizdere",
    "İyidere",
    "Kalkandere",
    "Merkez",
    "Pazar",
  ],
  Sakarya: [
    "Adapazarı",
    "Akyazı",
    "Arifiye",
    "Erenler",
    "Ferizli",
    "Geyve",
    "Hendek",
    "Karapürçek",
    "Karasu",
    "Kaynarca",
    "Kocaali",
    "Pamukova",
    "Sapanca",
    "Serdivan",
    "Söğütlü",
    "Taraklı",
  ],
  Samsun: [
    "19 Mayıs",
    "Alaçam",
    "Asarcık",
    "Atakum",
    "Ayvacık",
    "Bafra",
    "Canik",
    "Çarşamba",
    "Havza",
    "İlkadım",
    "Kavak",
    "Ladik",
    "Ondokuzmayıs",
    "Salıpazarı",
    "Tekkeköy",
    "Terme",
    "Vezirköprü",
    "Yakakent",
  ],
  Siirt: ["Baykan", "Eruh", "Kurtalan", "Merkez", "Pervari", "Şirvan", "Tillo"],
  Sinop: ["Ayancık", "Boyabat", "Dikmen", "Durağan", "Erfelek", "Gerze", "Merkez", "Saraydüzü", "Türkeli"],
  Sivas: [
    "Akıncılar",
    "Altınyayla",
    "Divriği",
    "Doğanşar",
    "Gemerek",
    "Gölova",
    "Gürün",
    "Hafik",
    "İmranlı",
    "Kangal",
    "Koyulhisar",
    "Merkez",
    "Suşehri",
    "Şarkışla",
    "Ulaş",
    "Yıldızeli",
    "Zara",
  ],
  Şanlıurfa: [
    "Akçakale",
    "Birecik",
    "Bozova",
    "Ceylanpınar",
    "Eyyübiye",
    "Halfeti",
    "Haliliye",
    "Harran",
    "Hilvan",
    "Karaköprü",
    "Siverek",
    "Suruç",
    "Viranşehir",
  ],
  Şırnak: ["Beytüşşebap", "Cizre", "Güçlükonak", "İdil", "Merkez", "Silopi", "Uludere"],
  Tekirdağ: [
    "Çerkezköy",
    "Çorlu",
    "Ergene",
    "Hayrabolu",
    "Kapaklı",
    "Malkara",
    "Marmaraereğlisi",
    "Muratlı",
    "Saray",
    "Süleymanpaşa",
    "Şarköy",
  ],
  Tokat: [
    "Almus",
    "Artova",
    "Başçiftlik",
    "Erbaa",
    "Merkez",
    "Niksar",
    "Pazar",
    "Reşadiye",
    "Sulusaray",
    "Turhal",
    "Yeşilyurt",
    "Zile",
  ],
  Trabzon: [
    "Akçaabat",
    "Araklı",
    "Arsin",
    "Beşikdüzü",
    "Çaykara",
    "Çarşıbaşı",
    "Dernekpazarı",
    "Düzköy",
    "Hayrat",
    "Köprübaşı",
    "Maçka",
    "Of",
    "Ortahisar",
    "Sürmene",
    "Şalpazarı",
    "Tonya",
    "Vakfıkebir",
    "Yomra",
  ],
  Tunceli: ["Çemişgezek", "Hozat", "Mazgirt", "Merkez", "Nazımiye", "Ovacık", "Pertek", "Pülümür"],
  Uşak: ["Banaz", "Eşme", "Karahallı", "Merkez", "Sivaslı", "Ulubey"],
  Van: [
    "Bahçesaray",
    "Başkale",
    "Çaldıran",
    "Çatak",
    "Edremit",
    "Erciş",
    "Gevaş",
    "Gürpınar",
    "İpekyolu",
    "Muradiye",
    "Özalp",
    "Saray",
    "Tuşba",
  ],
  Yalova: ["Altınova", "Armutlu", "Çınarcık", "Çiftlikköy", "Merkez", "Termal"],
  Yozgat: [
    "Akdağmadeni",
    "Aydıncık",
    "Boğazlıyan",
    "Çandır",
    "Çayıralan",
    "Çekerek",
    "Kadışehri",
    "Merkez",
    "Saraykent",
    "Sarıkaya",
    "Sorgun",
    "Şefaatli",
    "Yenifakılı",
    "Yerköy",
  ],
  Zonguldak: ["Alaplı", "Çaycuma", "Devrek", "Gökçebey", "Kilimli", "Kozlu", "Merkez"],
}

export default function YardimToplamaSayfasi() {
  const [selectedIl, setSelectedIl] = useState<string>("tümü")
  const [selectedIlce, setSelectedIlce] = useState<string>("tümü")

  const toplanmaYerleri: ToplanmaYeri[] = [
    {
      id: 1,
      ad: "Bursa Merkez Yardım Koordinasyon Merkezi",
      il: "Bursa",
      ilce: "Osmangazi",
      adres: "Osmangazi Mah. Atatürk Cad. No: 123/A Osmangazi/BURSA",
      telefon: "+90 224 555 0123",
      email: "yardim@bursa.gov.tr",
      koordinatlar: { lat: 40.1826, lng: 29.0665 },
      calismaGunleri: "Pazartesi - Pazar",
      calismaSaatleri: "08:00 - 20:00",
      sorumluKisi: "Ahmet Yılmaz",
      aciklama: "Bursa ili Osmangazi ilçesinde yardım malzemelerinin toplandığı ana koordinasyon merkezidir.",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.4567890123456!2d29.0665!3d40.1826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3e5a7a7a7a7a%3A0x7a7a7a7a7a7a7a7a!2sOsmangazi%2C%20Atat%C3%BCrk%20Cd.%2C%2016040%20Osmangazi%2FBursa!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str",
    },
    {
      id: 2,
      ad: "Nilüfer Yardım Toplama Merkezi",
      il: "Bursa",
      ilce: "Nilüfer",
      adres: "Nilüfer Mah. Cumhuriyet Cad. No: 45/B Nilüfer/BURSA",
      telefon: "+90 224 555 0124",
      email: "nilufer@bursa.gov.tr",
      koordinatlar: { lat: 40.2044, lng: 28.9864 },
      calismaGunleri: "Pazartesi - Cumartesi",
      calismaSaatleri: "09:00 - 18:00",
      sorumluKisi: "Ayşe Demir",
      aciklama: "Nilüfer ilçesi ve çevre bölgelere hizmet veren yardım toplama merkezidir.",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.123456789!2d28.9864!3d40.2044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3e5a7a7a7a7a%3A0x7a7a7a7a7a7a7a7a!2sNil%C3%BCfer%2C%20Cumhuriyet%20Cd.%2C%2016120%20Nil%C3%BCfer%2FBursa!5e0!3m2!1str!2str!4v1234567890124!5m2!1str!2str",
    },
    {
      id: 3,
      ad: "Yıldırım Sosyal Yardım Merkezi",
      il: "Bursa",
      ilce: "Yıldırım",
      adres: "Yıldırım Mah. İnönü Cad. No: 67/C Yıldırım/BURSA",
      telefon: "+90 224 555 0125",
      email: "yildirim@bursa.gov.tr",
      koordinatlar: { lat: 40.1567, lng: 29.1234 },
      calismaGunleri: "Pazartesi - Pazar",
      calismaSaatleri: "08:30 - 19:30",
      sorumluKisi: "Mehmet Kaya",
      aciklama: "Yıldırım ilçesi merkez ve köylerinde yaşayan ihtiyaç sahiplerine yönelik yardım toplama merkezidir.",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.123456789!2d29.1234!3d40.1567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3e5a7a7a7a7a%3A0x7a7a7a7a7a7a7a7a!2sY%C4%B1ld%C4%B1r%C4%B1m%2C%20%C4%B0n%C3%B6n%C3%BC%20Cd.%2C%2016350%20Y%C4%B1ld%C4%B1r%C4%B1m%2FBursa!5e0!3m2!1str!2str!4v1234567890125!5m2!1str!2str",
    },
    {
      id: 4,
      ad: "İstanbul Anadolu Yardım Merkezi",
      il: "İstanbul",
      ilce: "Kadıköy",
      adres: "Kadıköy Mah. Bağdat Cad. No: 89/A Kadıköy/İSTANBUL",
      telefon: "+90 216 555 0126",
      email: "kadikoy@istanbul.gov.tr",
      koordinatlar: { lat: 40.9903, lng: 29.0275 },
      calismaGunleri: "Pazartesi - Pazar",
      calismaSaatleri: "07:00 - 21:00",
      sorumluKisi: "Fatma Özkan",
      aciklama: "İstanbul Anadolu yakası için ana yardım koordinasyon merkezidir.",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.123456789!2d29.0275!3d40.9903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9bd6570f2e1%3A0x4c76cf3d8b2a1234!2sKad%C4%B1k%C3%B6y%2C%20Ba%C4%9Fdat%20Cd.%2C%2034710%20Kad%C4%B1k%C3%B6y%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1234567890126!5m2!1str!2str",
    },
    {
      id: 5,
      ad: "Ankara Çankaya Yardım Merkezi",
      il: "Ankara",
      ilce: "Çankaya",
      adres: "Çankaya Mah. Kızılay Cad. No: 12/D Çankaya/ANKARA",
      telefon: "+90 312 555 0127",
      email: "cankaya@ankara.gov.tr",
      koordinatlar: { lat: 39.9208, lng: 32.8541 },
      calismaGunleri: "Pazartesi - Cumartesi",
      calismaSaatleri: "08:00 - 19:00",
      sorumluKisi: "Ali Veli",
      aciklama: "Ankara ili Çankaya ilçesi ve çevre bölgelere hizmet veren yardım toplama merkezidir.",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.123456789!2d32.8541!3d39.9208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0x4c76cf3d8b2a1234!2s%C3%87ankaya%2C%20K%C4%B1z%C4%B1lay%20Cd.%2C%2006420%20%C3%87ankaya%2FAnkara!5e0!3m2!1str!2str!4v1234567890127!5m2!1str!2str",
    },
    {
      id: 6,
      ad: "İzmir Konak Yardım Merkezi",
      il: "İzmir",
      ilce: "Konak",
      adres: "Konak Mah. Cumhuriyet Bulvarı No: 156/A Konak/İZMİR",
      telefon: "+90 232 555 0128",
      email: "konak@izmir.gov.tr",
      koordinatlar: { lat: 38.4237, lng: 27.1428 },
      calismaGunleri: "Pazartesi - Pazar",
      calismaSaatleri: "08:00 - 20:00",
      sorumluKisi: "Zeynep Kara",
      aciklama: "İzmir ili Konak ilçesi merkez bölgesi için yardım toplama merkezidir.",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.123456789!2d27.1428!3d38.4237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x4c76cf3d8b2a1234!2sKonak%2C%20Cumhuriyet%20Blv.%2C%2035250%20Konak%2F%C4%B0zmir!5e0!3m2!1str!2str!4v1234567890128!5m2!1str!2str",
    },
    {
      id: 7,
      ad: "Antalya Muratpaşa Yardım Merkezi",
      il: "Antalya",
      ilce: "Muratpaşa",
      adres: "Muratpaşa Mah. Atatürk Bulvarı No: 78/B Muratpaşa/ANTALYA",
      telefon: "+90 242 555 0129",
      email: "muratpasa@antalya.gov.tr",
      koordinatlar: { lat: 36.8969, lng: 30.7133 },
      calismaGunleri: "Pazartesi - Cumartesi",
      calismaSaatleri: "09:00 - 18:00",
      sorumluKisi: "Hasan Özdemir",
      aciklama: "Antalya ili Muratpaşa ilçesi ve çevre turizm bölgeleri için yardım toplama merkezidir.",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3188.123456789!2d30.7133!3d36.8969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39aaeddadadad%3A0x4c76cf3d8b2a1234!2sMuratpa%C5%9Fa%2C%20Atat%C3%BCrk%20Blv.%2C%2007050%20Muratpa%C5%9Fa%2FAntalya!5e0!3m2!1str!2str!4v1234567890129!5m2!1str!2str",
    },
  ]

  const kabulEdilenMalzemeler = [
    { kategori: "Gıda", ornekler: ["Konserve", "Makarna", "Pirinç", "Yağ", "Un"] },
    { kategori: "Giyim", ornekler: ["Çorap", "İç çamaşırı", "Mont", "Pantolon", "Tişört"] },
    { kategori: "Hijyen", ornekler: ["Sabun", "Şampuan", "Diş fırçası", "Havlu", "Islak mendil"] },
    { kategori: "Bebek", ornekler: ["Bebek bezi", "Mama", "Biberon", "Bebek kıyafeti"] },
    { kategori: "Battaniye", ornekler: ["Yün battaniye", "Polar battaniye", "Yatak takımı"] },
    { kategori: "İlaç", ornekler: ["Ağrı kesici", "Soğuk algınlığı", "Yara bandı", "Antiseptik"] },
  ]

  // Tüm iller alfabetik sırada
  const iller = Object.keys(ilIlceVerisi).sort()

  // Seçilen ile göre ilçeler
  const ilceler =
    selectedIl === "tümü" || !ilIlceVerisi[selectedIl as keyof typeof ilIlceVerisi]
      ? []
      : ilIlceVerisi[selectedIl as keyof typeof ilIlceVerisi].sort()

  // Filtrelenmiş toplanma yerleri
  const filtrelenmisYerler = toplanmaYerleri.filter((yer) => {
    const ilKoşulu = selectedIl === "tümü" || yer.il === selectedIl
    const ilceKoşulu = selectedIlce === "tümü" || yer.ilce === selectedIlce
    return ilKoşulu && ilceKoşulu
  })

  // İl değiştiğinde ilçeyi sıfırla
  const handleIlChange = (value: string) => {
    setSelectedIl(value)
    setSelectedIlce("tümü")
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4 lg:p-6">
        {/* Başlık Bölümü */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">
            <Heart className="inline-block h-8 w-8 mr-2 text-red-500" />
            Yardım Toplama Merkezleri
          </h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            Türkiye genelinde ihtiyaç sahiplerine ulaştırılmak üzere yardım malzemelerinin toplandığı merkezlerimiz
          </p>
        </div>

        {/* Filtreleme Bölümü */}
        <Card className="border-green-200 mb-8">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Konum Filtresi
            </CardTitle>
            <CardDescription className="text-green-600">
              Size en yakın yardım toplama merkezini bulmak için il ve ilçe seçin
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="il-secimi" className="text-green-700 font-medium">
                  İl Seçimi
                </Label>
                <Select value={selectedIl} onValueChange={handleIlChange}>
                  <SelectTrigger className="border-green-300">
                    <SelectValue placeholder="İl seçin" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="tümü">Tüm İller</SelectItem>
                    {iller.map((il) => (
                      <SelectItem key={il} value={il}>
                        {il}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ilce-secimi" className="text-green-700 font-medium">
                  İlçe Seçimi
                </Label>
                <Select value={selectedIlce} onValueChange={setSelectedIlce} disabled={selectedIl === "tümü"}>
                  <SelectTrigger className="border-green-300">
                    <SelectValue placeholder={selectedIl === "tümü" ? "Önce il seçin" : "İlçe seçin"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="tümü">Tüm İlçeler</SelectItem>
                    {ilceler.map((ilce) => (
                      <SelectItem key={ilce} value={ilce}>
                        {ilce}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-200">
                <strong>{filtrelenmisYerler.length}</strong> merkez bulundu
                {selectedIl !== "tümü" && (
                  <div className="text-xs text-gray-500 mt-1">
                    {selectedIl} {selectedIlce !== "tümü" && `/ ${selectedIlce}`}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Toplanma Yerleri */}
        <div className="space-y-8">
          {filtrelenmisYerler.length > 0 ? (
            filtrelenmisYerler.map((yer) => (
              <div key={yer.id} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Toplanma Yeri Bilgileri */}
                <Card className="border-green-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {yer.ad}
                    </CardTitle>
                    <CardDescription className="text-green-600">
                      <Badge variant="outline" className="mr-2 border-green-300 text-green-700">
                        {yer.il}
                      </Badge>
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        {yer.ilce}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <p className="text-gray-600">{yer.adres}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-green-600" />
                        <div>
                          <span className="font-medium">Telefon: </span>
                          <a href={`tel:${yer.telefon}`} className="text-green-600 hover:underline">
                            {yer.telefon}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-green-600" />
                        <div>
                          <span className="font-medium">E-posta: </span>
                          <a href={`mailto:${yer.email}`} className="text-green-600 hover:underline">
                            {yer.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-green-600" />
                        <div>
                          <span className="font-medium">Çalışma Saatleri: </span>
                          <span className="text-gray-600">
                            {yer.calismaGunleri}, {yer.calismaSaatleri}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-green-600" />
                        <div>
                          <span className="font-medium">Sorumlu Kişi: </span>
                          <span className="text-gray-600">{yer.sorumluKisi}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-green-200">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-green-600 mt-1" />
                        <p className="text-sm text-gray-600">{yer.aciklama}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        <Navigation className="h-4 w-4 mr-2" />
                        Yol Tarifi Al
                      </Button>
                      <Button variant="outline" className="flex-1 border-green-300">
                        <Phone className="h-4 w-4 mr-2" />
                        Ara
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Harita */}
                <Card className="border-green-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Konum Haritası
                    </CardTitle>
                    <CardDescription className="text-green-600">
                      {yer.il} / {yer.ilce} konumunu haritada görüntüleyin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="w-full h-96 rounded-b-lg overflow-hidden">
                      <iframe
                        src={yer.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${yer.ad} Konumu`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <Card className="border-green-200">
              <CardContent className="p-12 text-center">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Merkez Bulunamadı</h3>
                <p className="text-gray-500">
                  Seçtiğiniz {selectedIl !== "tümü" && selectedIl} {selectedIlce !== "tümü" && `/ ${selectedIlce}`}{" "}
                  bölgesinde henüz yardım toplama merkezi bulunmamaktadır.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-green-300"
                  onClick={() => {
                    setSelectedIl("tümü")
                    setSelectedIlce("tümü")
                  }}
                >
                  Tüm Merkezleri Göster
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Kabul Edilen Malzemeler */}
        <Card className="border-green-200 mt-8 mb-8">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Kabul Edilen Yardım Malzemeleri
            </CardTitle>
            <CardDescription className="text-green-600">
              Tüm merkezlerimizde aşağıdaki kategorilerdeki malzemeleri kabul etmekteyiz
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kabulEdilenMalzemeler.map((kategori, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-semibold text-green-800 text-lg">{kategori.kategori}</h3>
                  <div className="flex flex-wrap gap-2">
                    {kategori.ornekler.map((ornek, ornekIndex) => (
                      <Badge key={ornekIndex} variant="secondary" className="bg-green-100 text-green-700">
                        {ornek}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Önemli Notlar */}
        <Card className="border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Info className="h-5 w-5" />
              Önemli Notlar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700">✅ Kabul Edilen Malzemeler</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Temiz ve kullanılabilir durumda olan eşyalar</li>
                  <li>• Son kullanma tarihi geçmemiş gıda maddeleri</li>
                  <li>• Ambalajı açılmamış hijyen malzemeleri</li>
                  <li>• Yıkanmış ve temiz giyim eşyaları</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-red-700">❌ Kabul Edilmeyen Malzemeler</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Bozuk veya kullanılamaz durumda olan eşyalar</li>
                  <li>• Son kullanma tarihi geçmiş gıdalar</li>
                  <li>• Kirli veya yıpranmış giyim eşyaları</li>
                  <li>• Reçeteli ilaçlar</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
