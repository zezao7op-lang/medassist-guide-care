import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Droplets, 
  Heart, 
  MapPin, 
  Phone, 
  User,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Building2,
  Search
} from "lucide-react";
import { hospitals, hospitalCities } from "@/data/hospitals";

interface BloodDonor {
  id: number;
  name: string;
  bloodType: string;
  city: string;
  phone: string;
  lastDonation: string;
  available: boolean;
}

interface BloodRequest {
  id: number;
  patientName: string;
  bloodType: string;
  hospital: string;
  city: string;
  phone: string;
  urgent: boolean;
  units: number;
  createdAt: string;
}

const Blood = () => {
  const { toast } = useToast();
  const [searchBloodType, setSearchBloodType] = useState("all");
  const [searchCity, setSearchCity] = useState("all");
  
  // Donor registration form
  const [donorForm, setDonorForm] = useState({
    name: "",
    bloodType: "",
    city: "",
    phone: "",
  });

  // Blood search form for finding hospitals
  const [bloodSearchType, setBloodSearchType] = useState("");
  const [bloodSearchCity, setBloodSearchCity] = useState("");
  const [showHospitalResults, setShowHospitalResults] = useState(false);

  // Request form
  const [requestForm, setRequestForm] = useState({
    patientName: "",
    bloodType: "",
    hospital: "",
    city: "",
    phone: "",
    units: "",
    urgent: false,
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const donors: BloodDonor[] = [
    { id: 1, name: "أحمد محمد", bloodType: "A+", city: "القاهرة", phone: "01012345678", lastDonation: "منذ 3 أشهر", available: true },
    { id: 2, name: "سارة أحمد", bloodType: "O-", city: "بنها", phone: "01123456789", lastDonation: "منذ 4 أشهر", available: true },
    { id: 3, name: "محمود حسن", bloodType: "B+", city: "المنصورة", phone: "01234567890", lastDonation: "منذ شهرين", available: false },
    { id: 4, name: "فاطمة علي", bloodType: "AB+", city: "القاهرة", phone: "01098765432", lastDonation: "منذ 5 أشهر", available: true },
    { id: 5, name: "علي حسين", bloodType: "O+", city: "طوخ", phone: "01055667788", lastDonation: "منذ 6 أشهر", available: true },
    { id: 6, name: "نور الدين", bloodType: "A-", city: "بنها", phone: "01166778899", lastDonation: "منذ 4 أشهر", available: true },
    { id: 7, name: "هدى محمود", bloodType: "B-", city: "المنصورة", phone: "01277889900", lastDonation: "منذ 3 أشهر", available: true },
    { id: 8, name: "كريم عادل", bloodType: "AB-", city: "القاهرة", phone: "01388990011", lastDonation: "منذ 5 أشهر", available: true },
  ];

  const bloodRequests: BloodRequest[] = [
    { id: 1, patientName: "مريض بمستشفى القصر العيني", bloodType: "O-", hospital: "مستشفى القصر العيني", city: "القاهرة", phone: "01012345678", urgent: true, units: 3, createdAt: "منذ ساعتين" },
    { id: 2, patientName: "مريض بمستشفى بنها الجامعي", bloodType: "A+", hospital: "مستشفى بنها الجامعي", city: "بنها", phone: "01123456789", urgent: false, units: 2, createdAt: "منذ 5 ساعات" },
    { id: 3, patientName: "مريض بمستشفى المنصورة", bloodType: "B-", hospital: "مستشفى المنصورة الجامعي", city: "المنصورة", phone: "01234567890", urgent: true, units: 4, createdAt: "منذ ساعة" },
  ];

  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const matchesBloodType = searchBloodType === "all" || donor.bloodType === searchBloodType;
      const matchesCity = searchCity === "all" || donor.city === searchCity;
      return matchesBloodType && matchesCity;
    });
  }, [searchBloodType, searchCity]);

  // Find hospitals that have the requested blood type
  const matchingHospitals = useMemo(() => {
    if (!bloodSearchType) return [];
    return hospitals.filter((h) => {
      const hasBlood = h.bloodBankAvailable && h.availableBloodTypes?.includes(bloodSearchType);
      const matchesCity = !bloodSearchCity || h.city === bloodSearchCity;
      return hasBlood && matchesCity;
    });
  }, [bloodSearchType, bloodSearchCity]);

  const handleDonorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorForm.name || !donorForm.bloodType || !donorForm.city || !donorForm.phone) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول", variant: "destructive" });
      return;
    }
    toast({
      title: "تم تسجيلك كمتبرع بنجاح ✅",
      description: "شكراً لك على مساهمتك في إنقاذ الأرواح",
    });
    setDonorForm({ name: "", bloodType: "", city: "", phone: "" });
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestForm.patientName || !requestForm.bloodType || !requestForm.city || !requestForm.phone) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }
    toast({
      title: "تم تسجيل طلب الدم ✅",
      description: "سيتم إشعار المتبرعين المتاحين في منطقتك",
    });
    setRequestForm({ patientName: "", bloodType: "", hospital: "", city: "", phone: "", units: "", urgent: false });
  };

  const handleBloodSearch = () => {
    if (bloodSearchType) {
      setShowHospitalResults(true);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-to-bl from-destructive/10 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-destructive/10 rounded-full px-4 py-2 mb-6">
              <Droplets className="w-4 h-4 text-destructive" />
              <span className="text-sm text-destructive font-medium">التبرع بالدم</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              أنقذ حياة بقطرة دم
            </h1>
            <p className="text-lg text-muted-foreground">
              سجل كمتبرع بالدم، ابحث عن فصيلة دم، أو اطلب المساعدة
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="search" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="search">البحث عن متبرعين</TabsTrigger>
              <TabsTrigger value="find-blood">ابحث عن فصيلة دم</TabsTrigger>
              <TabsTrigger value="donate">التسجيل كمتبرع</TabsTrigger>
              <TabsTrigger value="request">طلب دم</TabsTrigger>
            </TabsList>

            {/* Search Donors */}
            <TabsContent value="search">
              <div className="space-y-6">
                {/* Urgent Requests */}
                <div className="bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    طلبات دم عاجلة
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bloodRequests.filter(r => r.urgent).map((request) => (
                      <div key={request.id} className="bg-card rounded-xl p-4 border border-destructive/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold text-destructive">{request.bloodType}</span>
                          <span className="emergency-badge text-xs">عاجل</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{request.hospital}</p>
                        <p className="text-sm text-muted-foreground mb-2">{request.city}</p>
                        <p className="text-sm font-medium mb-3">مطلوب: {request.units} وحدات</p>
                        <a href={`tel:${request.phone}`}>
                          <Button variant="emergency" size="sm" className="w-full">
                            <Phone className="w-4 h-4" />
                            اتصل الآن
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Search Filters */}
                <div className="medical-card">
                  <h3 className="text-xl font-bold text-foreground mb-4">البحث عن متبرعين</h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <Select value={searchBloodType} onValueChange={setSearchBloodType}>
                      <SelectTrigger className="flex-1">
                        <Droplets className="w-4 h-4 ml-2" />
                        <SelectValue placeholder="فصيلة الدم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">كل الفصائل</SelectItem>
                        {bloodTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={searchCity} onValueChange={setSearchCity}>
                      <SelectTrigger className="flex-1">
                        <MapPin className="w-4 h-4 ml-2" />
                        <SelectValue placeholder="المدينة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">كل المدن</SelectItem>
                        {hospitalCities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Donors List */}
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredDonors.length === 0 ? (
                    <div className="col-span-2 text-center py-12">
                      <Droplets className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">لا يوجد متبرعين مطابقين لمعايير البحث</p>
                    </div>
                  ) : (
                    filteredDonors.map((donor) => (
                      <div key={donor.id} className="medical-card">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                            <span className="text-lg font-bold text-destructive">{donor.bloodType}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-foreground">{donor.name}</h4>
                              {donor.available ? (
                                <span className="flex items-center gap-1 text-xs text-success">
                                  <CheckCircle2 className="w-3 h-3" />
                                  متاح
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  غير متاح
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{donor.city}</p>
                            <p className="text-sm text-muted-foreground">آخر تبرع: {donor.lastDonation}</p>
                          </div>
                          <a href={`tel:${donor.phone}`}>
                            <Button size="sm" disabled={!donor.available}>
                              <Phone className="w-4 h-4" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Find Blood at Hospitals */}
            <TabsContent value="find-blood">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="medical-card">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">ابحث عن فصيلة دم في المستشفيات</h3>
                    <p className="text-muted-foreground mt-2">اختر فصيلة الدم وموقعك لعرض المستشفيات المتاحة</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>فصيلة الدم المطلوبة *</Label>
                        <Select value={bloodSearchType} onValueChange={setBloodSearchType}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الفصيلة" />
                          </SelectTrigger>
                          <SelectContent>
                            {bloodTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>المدينة (اختياري)</Label>
                        <Select value={bloodSearchCity} onValueChange={setBloodSearchCity}>
                          <SelectTrigger>
                            <SelectValue placeholder="كل المدن" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">كل المدن</SelectItem>
                            {hospitalCities.map((city) => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={handleBloodSearch} className="w-full" size="lg" disabled={!bloodSearchType}>
                      <Search className="w-5 h-5" />
                      بحث عن المستشفيات المتاحة
                    </Button>
                  </div>
                </div>

                {/* Hospital Results */}
                {showHospitalResults && (
                  <div className="space-y-4 animate-fade-in">
                    <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      مستشفيات بها فصيلة {bloodSearchType}
                      <span className="text-sm font-normal text-muted-foreground">
                        ({matchingHospitals.length} مستشفى)
                      </span>
                    </h4>

                    {matchingHospitals.length === 0 ? (
                      <div className="text-center py-8 bg-secondary/30 rounded-2xl">
                        <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">لا توجد مستشفيات متاحة بهذه الفصيلة حالياً</p>
                        <p className="text-sm text-muted-foreground mt-1">حاول البحث في مدن أخرى</p>
                      </div>
                    ) : (
                      matchingHospitals.map((hospital) => (
                        <div key={hospital.id} className="medical-card">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h5 className="font-bold text-foreground">{hospital.name}</h5>
                              <p className="text-sm text-muted-foreground">{hospital.city} - {hospital.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <Droplets className="w-4 h-4 text-destructive" />
                            <span className="text-xs text-muted-foreground">فصائل متاحة:</span>
                            {hospital.availableBloodTypes?.map((type) => (
                              <span
                                key={type}
                                className={`text-xs px-2 py-0.5 rounded font-bold ${
                                  type === bloodSearchType
                                    ? "bg-destructive text-destructive-foreground"
                                    : "bg-destructive/10 text-destructive"
                                }`}
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                          <a href={`tel:${hospital.phone}`}>
                            <Button size="sm" className="w-full">
                              <Phone className="w-4 h-4" />
                              اتصل بالمستشفى - {hospital.phone}
                            </Button>
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Register as Donor */}
            <TabsContent value="donate">
              <div className="max-w-xl mx-auto">
                <div className="medical-card">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-destructive" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">كن بطلاً وأنقذ حياة</h3>
                    <p className="text-muted-foreground mt-2">سجل كمتبرع بالدم وساهم في إنقاذ الأرواح</p>
                  </div>

                  <form onSubmit={handleDonorSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label>الاسم الكامل *</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          placeholder="أدخل اسمك الكامل"
                          value={donorForm.name}
                          onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                          className="pr-11"
                          required
                          maxLength={100}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>فصيلة الدم *</Label>
                        <Select value={donorForm.bloodType} onValueChange={(v) => setDonorForm({ ...donorForm, bloodType: v })}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الفصيلة" />
                          </SelectTrigger>
                          <SelectContent>
                            {bloodTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>المدينة *</Label>
                        <Select value={donorForm.city} onValueChange={(v) => setDonorForm({ ...donorForm, city: v })}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر مدينتك" />
                          </SelectTrigger>
                          <SelectContent>
                            {hospitalCities.map((city) => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>رقم الهاتف *</Label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="01xxxxxxxxx"
                          value={donorForm.phone}
                          onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
                          className="pr-11"
                          dir="ltr"
                          required
                          maxLength={15}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Heart className="w-5 h-5" />
                      سجل كمتبرع
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>

            {/* Request Blood */}
            <TabsContent value="request">
              <div className="max-w-xl mx-auto">
                <div className="medical-card">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Droplets className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">طلب دم</h3>
                    <p className="text-muted-foreground mt-2">سجل طلبك وسنساعدك في الوصول للمتبرعين</p>
                  </div>

                  <form onSubmit={handleRequestSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label>اسم المريض *</Label>
                      <Input
                        placeholder="أدخل اسم المريض"
                        value={requestForm.patientName}
                        onChange={(e) => setRequestForm({ ...requestForm, patientName: e.target.value })}
                        required
                        maxLength={100}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>فصيلة الدم المطلوبة *</Label>
                        <Select value={requestForm.bloodType} onValueChange={(v) => setRequestForm({ ...requestForm, bloodType: v })}>
                          <SelectTrigger>
                            <SelectValue placeholder="الفصيلة" />
                          </SelectTrigger>
                          <SelectContent>
                            {bloodTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>عدد الوحدات</Label>
                        <Input
                          type="number"
                          placeholder="العدد"
                          value={requestForm.units}
                          onChange={(e) => setRequestForm({ ...requestForm, units: e.target.value })}
                          min="1"
                          max="20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>اسم المستشفى</Label>
                      <Input
                        placeholder="اسم المستشفى"
                        value={requestForm.hospital}
                        onChange={(e) => setRequestForm({ ...requestForm, hospital: e.target.value })}
                        maxLength={200}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>المدينة *</Label>
                        <Select value={requestForm.city} onValueChange={(v) => setRequestForm({ ...requestForm, city: v })}>
                          <SelectTrigger>
                            <SelectValue placeholder="المدينة" />
                          </SelectTrigger>
                          <SelectContent>
                            {hospitalCities.map((city) => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>رقم التواصل *</Label>
                        <Input
                          type="tel"
                          placeholder="01xxxxxxxxx"
                          value={requestForm.phone}
                          onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                          dir="ltr"
                          required
                          maxLength={15}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-destructive/5 rounded-xl">
                      <input
                        type="checkbox"
                        id="urgent"
                        checked={requestForm.urgent}
                        onChange={(e) => setRequestForm({ ...requestForm, urgent: e.target.checked })}
                        className="w-5 h-5 rounded border-destructive text-destructive focus:ring-destructive"
                      />
                      <Label htmlFor="urgent" className="text-destructive font-medium cursor-pointer">
                        حالة طوارئ عاجلة
                      </Label>
                    </div>

                    <Button type="submit" variant={requestForm.urgent ? "emergency" : "default"} className="w-full" size="lg">
                      <Droplets className="w-5 h-5" />
                      إرسال الطلب
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Blood;
