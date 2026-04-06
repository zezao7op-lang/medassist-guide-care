import { useState, useMemo } from "react";
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
  X,
  Droplets,
  Navigation
} from "lucide-react";
import { hospitals, hospitalCities, type Hospital } from "@/data/hospitals";

const Hospitals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [userCity, setUserCity] = useState("");
  const [showNearby, setShowNearby] = useState(false);

  const emergencyNumbers = [
    { name: "الإسعاف", number: "123", icon: Ambulance },
    { name: "الطوارئ العامة", number: "112", icon: AlertCircle },
    { name: "النجدة", number: "122", icon: Phone },
  ];

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const matchesSearch =
        !searchTerm ||
        hospital.name.includes(searchTerm) ||
        hospital.address.includes(searchTerm) ||
        hospital.city.includes(searchTerm);
      const matchesCity = selectedCity === "all" || hospital.city === selectedCity;
      const matchesType = selectedType === "all" || hospital.type === selectedType;
      const matchesNearby = !showNearby || !userCity || hospital.city === userCity;
      return matchesSearch && matchesCity && matchesType && matchesNearby;
    });
  }, [searchTerm, selectedCity, selectedType, showNearby, userCity]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity("all");
    setSelectedType("all");
    setShowNearby(false);
    setUserCity("");
  };

  const handleFindNearby = () => {
    if (userCity) {
      setShowNearby(true);
      setSelectedCity("all");
    }
  };

  const hasActiveFilters = searchTerm || selectedCity !== "all" || selectedType !== "all" || showNearby;

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
              دليل شامل للمستشفيات في طوخ وبنها والقاهرة والمنصورة وباقي محافظات مصر
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

      {/* Location-based Search */}
      <section className="py-6 bg-accent/5 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Navigation className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-foreground">البحث حسب موقعك</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={userCity} onValueChange={setUserCity}>
                <SelectTrigger className="flex-1">
                  <MapPin className="w-4 h-4 ml-2" />
                  <SelectValue placeholder="اختر مدينتك..." />
                </SelectTrigger>
                <SelectContent>
                  {hospitalCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleFindNearby} disabled={!userCity}>
                <Navigation className="w-4 h-4" />
                أقرب المستشفيات
              </Button>
              {showNearby && (
                <Button variant="ghost" size="icon" onClick={() => { setShowNearby(false); setUserCity(""); }}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {showNearby && userCity && (
              <p className="mt-2 text-sm text-accent font-medium">
                عرض المستشفيات القريبة من: {userCity} ({filteredHospitals.length} نتيجة)
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن مستشفى بالاسم أو المدينة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-11"
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <Select value={selectedCity} onValueChange={(v) => { setSelectedCity(v); setShowNearby(false); }}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <MapPin className="w-4 h-4 ml-2" />
                  <SelectValue placeholder="المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل المدن</SelectItem>
                  {hospitalCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="حكومي">حكومي</SelectItem>
                  <SelectItem value="خاص">خاص</SelectItem>
                  <SelectItem value="جامعي">جامعي</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="icon" onClick={clearFilters}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="mt-3 text-sm text-muted-foreground">
            عرض {filteredHospitals.length} مستشفى من أصل {hospitals.length}
          </div>
        </div>
      </section>

      {/* Hospitals Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {filteredHospitals.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground mb-4">جرب تغيير معايير البحث</p>
              <Button variant="outline" onClick={clearFilters}>
                <X className="w-4 h-4" />
                مسح جميع الفلاتر
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital, index) => (
                <HospitalCard key={hospital.id} hospital={hospital} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

const HospitalCard = ({ hospital, index }: { hospital: Hospital; index: number }) => {
  const typeColors = {
    "حكومي": "bg-success/10 text-success",
    "خاص": "bg-accent/10 text-accent",
    "جامعي": "bg-primary/10 text-primary",
  };

  return (
    <div 
      className="medical-card animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-foreground leading-tight">{hospital.name}</h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[hospital.type]}`}>
                {hospital.type}
              </span>
              {hospital.bloodBankAvailable && (
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">
                  <Droplets className="w-3 h-3" />
                  بنك دم
                </span>
              )}
            </div>
          </div>
        </div>
        {hospital.hasEmergency && (
          <span className="emergency-badge text-xs flex-shrink-0">طوارئ 24/7</span>
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>{hospital.city} - {hospital.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span dir="ltr">{hospital.phone}</span>
        </div>
        {hospital.hasEmergency && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-destructive flex-shrink-0" />
            <span className="text-destructive font-medium" dir="ltr">
              طوارئ: {hospital.emergencyPhone}
            </span>
          </div>
        )}
        {hospital.bloodBankAvailable && hospital.availableBloodTypes && (
          <div className="flex items-center gap-2 flex-wrap">
            <Droplets className="w-4 h-4 text-destructive flex-shrink-0" />
            <span className="text-xs text-muted-foreground">فصائل متاحة:</span>
            {hospital.availableBloodTypes.map((type) => (
              <span key={type} className="text-xs bg-destructive/10 text-destructive px-1.5 py-0.5 rounded font-bold">
                {type}
              </span>
            ))}
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
  );
};

export default Hospitals;
