import Layout from "@/components/layout/Layout";
import { 
  Heart, 
  Target, 
  Eye, 
  Shield, 
  Users, 
  Award,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "الرعاية الصحية للجميع",
      description: "نؤمن بحق كل فرد في الحصول على المعلومات الصحية الموثوقة والإرشاد المناسب"
    },
    {
      icon: Shield,
      title: "الموثوقية والأمان",
      description: "نلتزم بتقديم معلومات طبية دقيقة مع حماية خصوصية المستخدمين"
    },
    {
      icon: Users,
      title: "المجتمع أولاً",
      description: "نعمل على بناء مجتمع صحي متكامل يدعم بعضه البعض"
    },
    {
      icon: Award,
      title: "التميز والجودة",
      description: "نسعى دائماً لتقديم أفضل تجربة مستخدم ممكنة"
    }
  ];

  const features = [
    "فحص ذكي للأعراض مع توجيهات للتخصص المناسب",
    "دليل شامل للأطباء والمستشفيات في جميع المحافظات",
    "خدمة التبرع بالدم وطلب الدم في حالات الطوارئ",
    "معلومات الطوارئ وأرقام الاتصال السريع",
    "واجهة سهلة الاستخدام باللغة العربية",
    "حماية كاملة لخصوصية البيانات الصحية"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-bl from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">تعرف علينا</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              عن منصة <span className="gradient-text">MSA</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              المساعد الطبي الذكي - منصة متكاملة للتوعية الصحية والإرشاد الطبي، 
              تهدف لتمكين الأفراد من اتخاذ قرارات صحية أفضل
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="medical-card">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">رسالتنا</h2>
              <p className="text-muted-foreground leading-relaxed">
                تقديم منصة رقمية موثوقة تساعد الأفراد في فهم حالتهم الصحية والحصول على 
                التوجيه المناسب للوصول إلى الرعاية الطبية المتخصصة. نسعى لجعل المعلومات 
                الصحية في متناول الجميع بطريقة سهلة وآمنة.
              </p>
            </div>

            <div className="medical-card">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">رؤيتنا</h2>
              <p className="text-muted-foreground leading-relaxed">
                أن نكون المرجع الأول للإرشاد الصحي الرقمي في العالم العربي، حيث يمكن 
                لكل فرد الوصول بسهولة إلى المعلومات والخدمات الصحية التي يحتاجها، 
                مع الحفاظ على أعلى معايير الجودة والموثوقية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-12 bg-destructive/5">
        <div className="container mx-auto px-4">
          <div className="bg-card border-2 border-destructive/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">تنبيه هام</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p className="leading-relaxed">
                    <strong className="text-foreground">منصة MSA للتوعية والإرشاد الصحي فقط ولا تُغني عن استشارة الطبيب المختص.</strong>
                  </p>
                  <p className="leading-relaxed">
                    المعلومات المقدمة على هذه المنصة هي لأغراض تعليمية وتوعوية فقط، ولا يجب اعتبارها بديلاً 
                    عن التشخيص الطبي المتخصص أو العلاج الطبي. دائماً استشر طبيباً مختصاً للحصول على 
                    التشخيص والعلاج المناسب لحالتك الصحية.
                  </p>
                  <p className="leading-relaxed font-medium text-destructive">
                    ⚠️ في حالات الطوارئ الطبية، اتصل فوراً برقم الطوارئ أو توجه لأقرب مستشفى.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">قيمنا</h2>
            <p className="section-subtitle mx-auto">
              المبادئ التي توجهنا في كل ما نقدمه
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="text-center p-6 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">ماذا نقدم؟</h2>
              <p className="section-subtitle mx-auto">
                مجموعة متكاملة من الخدمات الصحية الرقمية
              </p>
            </div>

            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <p className="font-medium text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">فريق العمل</h2>
          <p className="section-subtitle mx-auto mb-12">
            فريق متخصص يعمل على تقديم أفضل تجربة صحية رقمية
          </p>
          
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              نعمل معاً من أجل صحتكم
            </h3>
            <p className="text-muted-foreground">
              يضم فريقنا مطورين ومتخصصين في الرعاية الصحية يعملون جنباً إلى جنب 
              لتقديم منصة موثوقة وسهلة الاستخدام
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
