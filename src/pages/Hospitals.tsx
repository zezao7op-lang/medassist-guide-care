import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Search,
  Ambulance,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

interface Hospital {
  id: number;
  name: string;
  governorate: string;
  address: string;
  phone: string;
  emergencyPhone: string;
  hasEmergency: boolean;
  type: string;
}

const Hospitals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState("");

  const governorates = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "الدقهلية",
    "الشرقية",
    "المنوفية",
  ];

  const emergencyNumbers = [
    { name: "الإسعاف", number: "123", icon: Ambulance },
    { name: "الطوارئ العامة", number: "112", icon: AlertCircle },
    { name: "النجدة", number: "122", icon: Phone },
  ];

  const hospitals: Hospital[] = [
    {
      id: 1,
      name: "مستشفى القصر العيني",
      governorate: "القاهرة",
      address: "شارع القصر العيني - الخليفة",
      phone: "0227921690",
      emergencyPhone: "0227921691",
      hasEmergency: true,
      type: "حكومي"
    },
    {
      id: 2,
      name: "مستشفى دار الفؤاد",
      governorate: "الجيزة",
      address: "أكتوبر - الحي المتميز",
      phone: "0238355000",
      emergencyPhone: "0238355001",
      hasEmergency: true,
      type: "خاص"
    },
    {
      id: 3,
      name: "مستشفى كليوباترا",
      governorate: "القاهرة",
      address: "مصر الجديدة - شارع كليوباترا",
      phone: "0224148080",
      emergencyPhone: "0224148081",
      hasEmergency: true,
      type: "خاص"
    },
    {
      id: 4,
      name: "مستشفى الإسكندرية الجامعي",
      governorate: "الإسكندرية",
      address: "الشاطبي - شارع الحرية",
      phone: "034862540",
      emergencyPhone: "034862541",
      hasEmergency: true,
      type: "حكومي"
    },
    {
      id: 5,
      name: "مستشفى المنصورة الدولي",
      governorate: "الدقهلية",
      address: "المنصورة - شارع الجلاء",
      phone: "0502200800",
      emergencyPhone: "0502200801",
      hasEmergency: true,
      type: "خاص"
    },
    {
      id: 6,
      name: "مستشفى الزقازيق الجامعي",
      governorate: "الشرقية",
      address: "الزقازيق - شارع الجامعة",
      phone: "0552364991",
      emergencyPhone: "0552364992",
      hasEmergency: true,
      type: "حكومي"
    },
  ];

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name.includes(searchTerm) || hospital.address.includes(searchTerm);
    const matchesGovernorate = !selectedGovernorate || hospital.governorate === selectedGovernorate;
    return matchesSearch && matchesGovernorate;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-to-bl from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">المستشفيات والطوارئ</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              المستشفيات وخدمات الطوارئ
            </h1>
            <p className="text-lg text-muted-foreground">
              دليل المستشفيات وأرقام الطوارئ للوصول السريع للرعاية الطبية
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Numbers */}
      <section className="py-8 bg-destructive/5 border-y border-destructive/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-foreground mb-2">أرقام الطوارئ الهامة</h2>
            <p className="text-muted-foreground text-sm">في حالة الطوارئ، اتصل فوراً</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {emergencyNumbers.map((item) => (
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className="flex items-center justify-center gap-4 p-4 bg-card rounded-xl border-2 border-destructive/30 hover:border-destructive hover:shadow-emergency transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                  <item.icon className="w-6 h-6 text-destructive" />
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-2xl font-bold text-destructive" dir="ltr">{item.number}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن مستشفى..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-11"
              />
            </div>
            
            <Select value={selectedGovernorate} onValueChange={setSelectedGovernorate}>
              <SelectTrigger className="w-full md:w-[180px]">
                <MapPin className="w-4 h-4 ml-2" />
                <SelectValue placeholder="المحافظة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">الكل</SelectItem>
                {governorates.map((gov) => (
                  <SelectItem key={gov} value={gov}>
                    {gov}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Hospitals Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {filteredHospitals.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">جرب تغيير معايير البحث</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital, index) => (
                <div 
                  key={hospital.id}
                  className="medical-card animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{hospital.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          hospital.type === "حكومي" 
                            ? "bg-success/10 text-success" 
                            : "bg-accent/10 text-accent"
                        }`}>
                          {hospital.type}
                        </span>
                      </div>
                    </div>
                    {hospital.hasEmergency && (
                      <span className="emergency-badge text-xs">طوارئ 24/7</span>
                    )}
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{hospital.governorate} - {hospital.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span dir="ltr">{hospital.phone}</span>
                    </div>
                    {hospital.hasEmergency && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-destructive" />
                        <span className="text-destructive font-medium" dir="ltr">
                          طوارئ: {hospital.emergencyPhone}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <a href={`tel:${hospital.phone}`} className="flex-1">
                      <Button className="w-full" size="sm">
                        <Phone className="w-4 h-4" />
                        اتصل
                      </Button>
                    </a>
                    {hospital.hasEmergency && (
                      <a href={`tel:${hospital.emergencyPhone}`}>
                        <Button variant="emergency" size="sm">
                          <Ambulance className="w-4 h-4" />
                          طوارئ
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Hospitals;
