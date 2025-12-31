import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  User, 
  MapPin, 
  Mail, 
  Calendar,
  Activity,
  Stethoscope,
  Building2,
  Droplets,
  LogOut,
  Settings,
  Heart
} from "lucide-react";

interface UserData {
  name: string;
  age: string;
  governorate: string;
  email: string;
  createdAt: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("msa_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("msa_user");
    navigate("/");
  };

  const quickLinks = [
    { title: "فحص الأعراض", description: "تحليل ذكي لأعراضك", icon: Activity, path: "/symptoms", color: "bg-primary/10 text-primary" },
    { title: "البحث عن طبيب", description: "دليل الأطباء المتخصصين", icon: Stethoscope, path: "/doctors", color: "bg-accent/10 text-accent" },
    { title: "المستشفيات", description: "المستشفيات وخدمات الطوارئ", icon: Building2, path: "/hospitals", color: "bg-success/10 text-success" },
    { title: "التبرع بالدم", description: "سجل كمتبرع أو اطلب دم", icon: Droplets, path: "/blood", color: "bg-destructive/10 text-destructive" },
  ];

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-bl from-primary/10 via-background to-accent/10 min-h-[calc(100vh-200px)]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">مرحباً، {user.name}</h1>
                  <p className="text-muted-foreground">لوحة التحكم الشخصية</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </Button>
            </div>

            {/* User Info Card */}
            <div className="medical-card mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">معلوماتك الشخصية</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الاسم</p>
                      <p className="font-medium text-foreground">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">العمر</p>
                      <p className="font-medium text-foreground">{user.age} سنة</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المحافظة</p>
                      <p className="font-medium text-foreground">{user.governorate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                      <p className="font-medium text-foreground" dir="ltr">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">الوصول السريع</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="medical-card group cursor-pointer flex items-center gap-4"
                  >
                    <div className={`w-14 h-14 rounded-xl ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <link.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{link.title}</h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Health Tips */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">نصيحة صحية</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                الحفاظ على صحتك يبدأ بالوقاية. تأكد من شرب الماء بكميات كافية، وممارسة الرياضة بانتظام، 
                والحصول على قسط كافٍ من النوم. لا تتردد في استشارة الطبيب عند الشعور بأي أعراض غير طبيعية.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
