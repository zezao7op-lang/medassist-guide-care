import { useState } from "react";
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
  Heart,
  Brain,
  Eye,
  Bone,
  Baby
} from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  specialtyIcon: any;
  governorate: string;
  address: string;
  phone: string;
  rating: number;
  experience: string;
}

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState("");

  const specialties = [
    { id: "general", name: "طب عام", icon: Stethoscope },
    { id: "cardiology", name: "قلب وأوعية دموية", icon: Heart },
    { id: "neurology", name: "مخ وأعصاب", icon: Brain },
    { id: "ophthalmology", name: "عيون", icon: Eye },
    { id: "orthopedics", name: "عظام", icon: Bone },
    { id: "pediatrics", name: "أطفال", icon: Baby },
  ];

  const governorates = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "الدقهلية",
    "الشرقية",
    "المنوفية",
  ];

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "د. أحمد محمد علي",
      specialty: "قلب وأوعية دموية",
      specialtyIcon: Heart,
      governorate: "القاهرة",
      address: "المعادي - شارع 9",
      phone: "01012345678",
      rating: 4.8,
      experience: "15 سنة خبرة"
    },
    {
      id: 2,
      name: "د. سارة أحمد",
      specialty: "مخ وأعصاب",
      specialtyIcon: Brain,
      governorate: "الجيزة",
      address: "المهندسين - شارع لبنان",
      phone: "01123456789",
      rating: 4.9,
      experience: "12 سنة خبرة"
    },
    {
      id: 3,
      name: "د. محمود حسن",
      specialty: "عظام",
      specialtyIcon: Bone,
      governorate: "الإسكندرية",
      address: "سموحة - شارع فوزي معاذ",
      phone: "01234567890",
      rating: 4.7,
      experience: "20 سنة خبرة"
    },
    {
      id: 4,
      name: "د. فاطمة عبدالله",
      specialty: "أطفال",
      specialtyIcon: Baby,
      governorate: "القاهرة",
      address: "مصر الجديدة - شارع بغداد",
      phone: "01098765432",
      rating: 4.9,
      experience: "10 سنوات خبرة"
    },
    {
      id: 5,
      name: "د. عمر السيد",
      specialty: "عيون",
      specialtyIcon: Eye,
      governorate: "الجيزة",
      address: "الدقي - شارع التحرير",
      phone: "01111222333",
      rating: 4.6,
      experience: "18 سنة خبرة"
    },
    {
      id: 6,
      name: "د. نورا محمد",
      specialty: "طب عام",
      specialtyIcon: Stethoscope,
      governorate: "الدقهلية",
      address: "المنصورة - شارع الجمهورية",
      phone: "01555666777",
      rating: 4.5,
      experience: "8 سنوات خبرة"
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.includes(searchTerm) || doctor.specialty.includes(searchTerm);
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesGovernorate = !selectedGovernorate || doctor.governorate === selectedGovernorate;
    return matchesSearch && matchesSpecialty && matchesGovernorate;
  });

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
              دليل شامل للأطباء في جميع التخصصات والمحافظات
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن طبيب أو تخصص..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-11"
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 ml-2" />
                  <SelectValue placeholder="التخصص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">الكل</SelectItem>
                  {specialties.map((spec) => (
                    <SelectItem key={spec.id} value={spec.name}>
                      {spec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <Stethoscope className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">جرب تغيير معايير البحث</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <div 
                  key={doctor.id}
                  className="medical-card animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <doctor.specialtyIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground">{doctor.name}</h3>
                      <p className="text-primary font-medium text-sm">{doctor.specialty}</p>
                      <p className="text-muted-foreground text-sm">{doctor.experience}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.governorate} - {doctor.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span dir="ltr">{doctor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Phone className="w-4 h-4" />
                      اتصل الآن
                    </Button>
                    <Button variant="outline" size="sm">
                      التفاصيل
                    </Button>
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

export default Doctors;
