import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Stethoscope, 
  Building2, 
  Droplets, 
  Shield, 
  Clock,
  Users,
  Heart,
  ArrowLeft,
  Phone,
  CheckCircle2
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Activity,
      title: "فحص الأعراض",
      description: "تحليل ذكي لأعراضك مع توجيهات للتخصص المناسب",
      link: "/symptoms",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Stethoscope,
      title: "ابحث عن طبيب",
      description: "دليل شامل للأطباء حسب التخصص والموقع",
      link: "/doctors",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Building2,
      title: "المستشفيات والطوارئ",
      description: "معلومات المستشفيات وأرقام الطوارئ",
      link: "/hospitals",
      color: "bg-success/10 text-success",
    },
    {
      icon: Droplets,
      title: "التبرع بالدم",
      description: "سجل كمتبرع أو اطلب دم في حالات الطوارئ",
      link: "/blood",
      color: "bg-destructive/10 text-destructive",
    },
  ];

  const stats = [
    { value: "١٠٠٠+", label: "طبيب مسجل", icon: Stethoscope },
    { value: "٥٠٠+", label: "مستشفى ومركز طبي", icon: Building2 },
    { value: "٢٠٠٠+", label: "متبرع بالدم", icon: Droplets },
    { value: "٥٠٠٠٠+", label: "مستخدم نشط", icon: Users },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-primary via-accent to-primary py-20 md:py-32">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-background rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-background rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Shield className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm text-primary-foreground/90">منصة موثوقة للإرشاد الصحي</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up">
              صحتك أولاً مع
              <span className="block mt-2">المساعد الطبي الذكي</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up delay-100">
              نساعدك في فهم أعراضك، والعثور على الأطباء والمستشفيات، والتبرع بالدم لإنقاذ الأرواح. كل ذلك في منصة واحدة سهلة الاستخدام.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200">
              <Link to="/symptoms">
                <Button variant="hero" size="xl">
                  ابدأ فحص الأعراض
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="heroOutline" size="xl">
                  تعرف على المنصة
                </Button>
              </Link>
            </div>

            {/* Emergency Banner */}
            <div className="mt-12 inline-flex items-center gap-3 bg-destructive/20 backdrop-blur-sm rounded-full px-6 py-3 animate-slide-up delay-300">
              <Phone className="w-5 h-5 text-primary-foreground animate-pulse" />
              <span className="text-primary-foreground font-medium">
                في حالة الطوارئ اتصل بـ: <span dir="ltr" className="font-bold">123</span>
              </span>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">خدماتنا الرئيسية</h2>
            <p className="section-subtitle mx-auto">
              نوفر لك مجموعة متكاملة من الخدمات الصحية لمساعدتك في الحصول على الرعاية المناسبة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="medical-card group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>اكتشف المزيد</span>
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center p-6 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">لماذا تختار MSA؟</h2>
              <p className="section-subtitle mb-8">
                نسعى لتقديم أفضل تجربة صحية رقمية تجمع بين السهولة والموثوقية
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "معلومات طبية موثوقة", desc: "محتوى طبي مراجع من متخصصين" },
                  { title: "سهولة الوصول", desc: "واجهة بسيطة وسريعة الاستخدام" },
                  { title: "خدمة على مدار الساعة", desc: "متاح دائماً في أي وقت تحتاجه" },
                  { title: "خصوصية تامة", desc: "بياناتك الصحية محمية بالكامل" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 md:p-12">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-glow animate-float">
                    <Heart className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    صحتك في أيدٍ أمينة
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    انضم إلى آلاف المستخدمين الذين يثقون في MSA للحصول على الإرشاد الصحي
                  </p>
                  <Link to="/register">
                    <Button size="lg">
                      سجل الآن مجاناً
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            هل تحتاج مساعدة طبية الآن؟
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            لا تتردد في استخدام خدماتنا للحصول على التوجيه الصحي المناسب
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/symptoms">
              <Button variant="heroOutline" size="lg">
                <Activity className="w-5 h-5" />
                فحص الأعراض
              </Button>
            </Link>
            <Link to="/hospitals">
              <Button variant="emergency" size="lg">
                <Phone className="w-5 h-5" />
                أرقام الطوارئ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
