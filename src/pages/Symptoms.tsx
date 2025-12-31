import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft,
  RefreshCw,
  Stethoscope,
  Brain,
  Heart,
  Bone,
  Eye,
  Baby
} from "lucide-react";

interface Symptom {
  id: string;
  name: string;
  category: string;
}

interface SymptomCategory {
  id: string;
  name: string;
  icon: any;
  symptoms: Symptom[];
}

const Symptoms = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const symptomCategories: SymptomCategory[] = [
    {
      id: "general",
      name: "أعراض عامة",
      icon: Activity,
      symptoms: [
        { id: "fever", name: "حمى أو ارتفاع درجة الحرارة", category: "general" },
        { id: "fatigue", name: "إرهاق وتعب عام", category: "general" },
        { id: "weight_loss", name: "فقدان الوزن غير المبرر", category: "general" },
        { id: "appetite_loss", name: "فقدان الشهية", category: "general" },
      ]
    },
    {
      id: "head",
      name: "الرأس والعصبية",
      icon: Brain,
      symptoms: [
        { id: "headache", name: "صداع", category: "head" },
        { id: "dizziness", name: "دوخة أو دوار", category: "head" },
        { id: "vision_problems", name: "مشاكل في الرؤية", category: "head" },
        { id: "memory_issues", name: "مشاكل في الذاكرة أو التركيز", category: "head" },
      ]
    },
    {
      id: "chest",
      name: "الصدر والقلب",
      icon: Heart,
      symptoms: [
        { id: "chest_pain", name: "ألم في الصدر", category: "chest" },
        { id: "breathing_difficulty", name: "صعوبة في التنفس", category: "chest" },
        { id: "heart_palpitations", name: "خفقان القلب", category: "chest" },
        { id: "cough", name: "سعال مستمر", category: "chest" },
      ]
    },
    {
      id: "stomach",
      name: "الجهاز الهضمي",
      icon: Activity,
      symptoms: [
        { id: "stomach_pain", name: "ألم في البطن", category: "stomach" },
        { id: "nausea", name: "غثيان أو قيء", category: "stomach" },
        { id: "diarrhea", name: "إسهال", category: "stomach" },
        { id: "constipation", name: "إمساك", category: "stomach" },
      ]
    },
    {
      id: "bones",
      name: "العظام والمفاصل",
      icon: Bone,
      symptoms: [
        { id: "joint_pain", name: "ألم في المفاصل", category: "bones" },
        { id: "back_pain", name: "ألم في الظهر", category: "bones" },
        { id: "muscle_pain", name: "ألم في العضلات", category: "bones" },
        { id: "swelling", name: "تورم في المفاصل", category: "bones" },
      ]
    },
    {
      id: "skin",
      name: "الجلد",
      icon: Eye,
      symptoms: [
        { id: "rash", name: "طفح جلدي", category: "skin" },
        { id: "itching", name: "حكة", category: "skin" },
        { id: "skin_color", name: "تغير لون الجلد", category: "skin" },
        { id: "hair_loss", name: "تساقط الشعر", category: "skin" },
      ]
    },
  ];

  const getSpecialtyRecommendation = () => {
    const recommendations: { specialty: string; reason: string }[] = [];
    
    const hasSymptom = (id: string) => selectedSymptoms.includes(id);
    
    if (hasSymptom("headache") || hasSymptom("dizziness") || hasSymptom("memory_issues")) {
      recommendations.push({ specialty: "طبيب أعصاب", reason: "بناءً على أعراض الرأس والجهاز العصبي" });
    }
    if (hasSymptom("chest_pain") || hasSymptom("heart_palpitations")) {
      recommendations.push({ specialty: "طبيب قلب", reason: "بناءً على أعراض القلب والصدر" });
    }
    if (hasSymptom("stomach_pain") || hasSymptom("nausea") || hasSymptom("diarrhea") || hasSymptom("constipation")) {
      recommendations.push({ specialty: "طبيب جهاز هضمي", reason: "بناءً على أعراض الجهاز الهضمي" });
    }
    if (hasSymptom("joint_pain") || hasSymptom("back_pain") || hasSymptom("muscle_pain") || hasSymptom("swelling")) {
      recommendations.push({ specialty: "طبيب عظام أو روماتيزم", reason: "بناءً على أعراض العظام والمفاصل" });
    }
    if (hasSymptom("rash") || hasSymptom("itching") || hasSymptom("skin_color")) {
      recommendations.push({ specialty: "طبيب جلدية", reason: "بناءً على الأعراض الجلدية" });
    }
    if (hasSymptom("breathing_difficulty") || hasSymptom("cough")) {
      recommendations.push({ specialty: "طبيب صدر وجهاز تنفسي", reason: "بناءً على أعراض الجهاز التنفسي" });
    }
    if (hasSymptom("vision_problems")) {
      recommendations.push({ specialty: "طبيب عيون", reason: "بناءً على مشاكل الرؤية" });
    }
    
    if (recommendations.length === 0 && selectedSymptoms.length > 0) {
      recommendations.push({ specialty: "طبيب عام أو باطنة", reason: "للتقييم الشامل وتوجيهك للتخصص المناسب" });
    }
    
    return recommendations;
  };

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
    setShowResults(false);
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length > 0) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setShowResults(false);
  };

  const recommendations = getSpecialtyRecommendation();

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-to-bl from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">فحص الأعراض</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              تحليل الأعراض الذكي
            </h1>
            <p className="text-lg text-muted-foreground">
              اختر الأعراض التي تعاني منها وسنساعدك في معرفة التخصص الطبي المناسب
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-warning/10 border-y border-warning/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
            <p className="text-sm text-warning-foreground">
              <strong>تنبيه:</strong> هذا الفحص للتوجيه فقط ولا يُغني عن استشارة الطبيب. في حالات الطوارئ، توجه فوراً للمستشفى.
            </p>
          </div>
        </div>
      </section>

      {/* Symptoms Selection */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Categories */}
            <div className="space-y-8">
              {symptomCategories.map((category) => (
                <div key={category.id} className="medical-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{category.name}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.symptoms.map((symptom) => (
                      <button
                        key={symptom.id}
                        onClick={() => toggleSymptom(symptom.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-right ${
                          selectedSymptoms.includes(symptom.id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-secondary/50"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedSymptoms.includes(symptom.id)
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/30"
                        }`}>
                          {selectedSymptoms.includes(symptom.id) && (
                            <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                          )}
                        </div>
                        <span className={`font-medium ${
                          selectedSymptoms.includes(symptom.id) ? "text-primary" : "text-foreground"
                        }`}>
                          {symptom.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Count & Actions */}
            <div className="mt-8 p-6 bg-secondary/50 rounded-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-right">
                  <p className="text-muted-foreground">الأعراض المحددة:</p>
                  <p className="text-2xl font-bold text-foreground">{selectedSymptoms.length} عرض</p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    disabled={selectedSymptoms.length === 0}
                  >
                    <RefreshCw className="w-4 h-4" />
                    إعادة تعيين
                  </Button>
                  <Button 
                    onClick={handleAnalyze}
                    disabled={selectedSymptoms.length === 0}
                  >
                    تحليل الأعراض
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {showResults && recommendations.length > 0 && (
              <div className="mt-8 animate-fade-in">
                <div className="medical-card border-2 border-primary/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">نتيجة التحليل</h3>
                      <p className="text-sm text-muted-foreground">بناءً على الأعراض المحددة</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h4 className="font-bold text-foreground">التخصصات الطبية المقترحة:</h4>
                    {recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-success/5 rounded-xl border border-success/20">
                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                        <div>
                          <p className="font-bold text-foreground">{rec.specialty}</p>
                          <p className="text-sm text-muted-foreground">{rec.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-destructive/5 rounded-xl border border-destructive/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-bold text-foreground mb-1">ملاحظة هامة</p>
                        <p className="text-sm text-muted-foreground">
                          هذه التوصيات هي للإرشاد فقط ولا تُعتبر تشخيصاً طبياً. يُرجى استشارة 
                          الطبيب المختص للحصول على التشخيص والعلاج المناسب.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Symptoms;
