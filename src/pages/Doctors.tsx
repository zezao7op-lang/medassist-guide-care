import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Stethoscope, 
  MapPin, 
  Phone, 
  Star, 
  Search,
  Filter,
  UserCheck,
  X
} from "lucide-react";
import { doctors, specialties, cities, type Doctor } from "@/data/doctors";

const SPECIALTY_ICONS: Record<string, string> = {
  "طب عام": "🩺",
  "قلب وأوعية دموية": "❤️",
  "مخ وأعصاب": "🧠",
  "عيون": "👁️",
  "عظام": "🦴",
  "أطفال": "👶",
  "أسنان": "🦷",
  "جلدية": "🧴",
  "أنف وأذن وحنجرة": "👂",
  "باطنة": "🫁",
  "جراحة عامة": "🔪",
  "نساء وتوليد": "🤰",
  "مسالك بولية": "🏥",
  "صدر وجهاز تنفسي": "🫁",
  "طب نفسي": "🧠",
};

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        !searchTerm ||
        doctor.name.includes(searchTerm) ||
        doctor.specialty.includes(searchTerm) ||
        doctor.city.includes(searchTerm) ||
        doctor.address.includes(searchTerm);
      const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
      const matchesCity = selectedCity === "all" || doctor.city === selectedCity;
      return matchesSearch && matchesSpecialty && matchesCity;
    });
  }, [searchTerm, selectedSpecialty, selectedCity]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("all");
    setSelectedCity("all");
  };

  const hasActiveFilters = searchTerm || selectedSpecialty !== "all" || selectedCity !== "all";

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-to-bl from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Stethoscope className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">دليل الأطباء</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              ابحث عن طبيبك
            </h1>
            <p className="text-lg text-muted-foreground">
              دليل شامل لأشهر الأطباء في طوخ وبنها والقاهرة والمنصورة وغيرها
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-background border-b border-border sticky top-16 md:top-20 z-40 backdrop-blur-md bg-background/95">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ابحث بالاسم أو التخصص أو المدينة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-11"
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue placeholder="التخصص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل التخصصات</SelectItem>
                  {specialties.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {SPECIALTY_ICONS[spec] || "🩺"} {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <MapPin className="w-4 h-4 ml-2" />
                  <SelectValue placeholder="المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل المدن</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="icon" onClick={clearFilters} title="مسح الفلاتر">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <UserCheck className="w-4 h-4" />
            <span>عرض {filteredDoctors.length} طبيب من أصل {doctors.length}</span>
          </div>
        </div>
      </section>

      {/* Specialty Quick Filters */}
      <section className="py-4 bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSpecialty("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedSpecialty === "all"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              الكل
            </button>
            {specialties.slice(0, 8).map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSpecialty === spec
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {SPECIALTY_ICONS[spec]} {spec}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-16">
              <Stethoscope className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground mb-4">جرب تغيير معايير البحث أو التصفية</p>
              <Button variant="outline" onClick={clearFilters}>
                <X className="w-4 h-4" />
                مسح جميع الفلاتر
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <DoctorCard key={doctor.id} doctor={doctor} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

const DoctorCard = ({ doctor, index }: { doctor: Doctor; index: number }) => {
  return (
    <div 
      className="medical-card animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl">
          {SPECIALTY_ICONS[doctor.specialty] || "🩺"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-foreground truncate">{doctor.name}</h3>
          <p className="text-primary font-medium text-sm">{doctor.specialty}</p>
          <p className="text-muted-foreground text-xs">{doctor.experience}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{doctor.city} - {doctor.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span dir="ltr">{doctor.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-warning fill-warning" />
          <span className="text-sm font-medium">{doctor.rating}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <a href={`tel:${doctor.phone}`} className="flex-1">
          <Button className="w-full" size="sm">
            <Phone className="w-4 h-4" />
            اتصل الآن
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Doctors;
