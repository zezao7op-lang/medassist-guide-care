import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold">MSA</h3>
                <p className="text-xs text-background/60">المساعد الطبي الذكي</p>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              منصة ذكية للتوعية الصحية والإرشاد الطبي. نساعدك في فهم أعراضك والعثور على الرعاية الصحية المناسبة.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {[
                { path: "/", label: "الرئيسية" },
                { path: "/about", label: "عن المنصة" },
                { path: "/symptoms", label: "فحص الأعراض" },
                { path: "/doctors", label: "الأطباء" },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">خدماتنا</h4>
            <ul className="space-y-2">
              {[
                { path: "/hospitals", label: "المستشفيات والطوارئ" },
                { path: "/blood", label: "التبرع بالدم" },
                { path: "/symptoms", label: "تحليل الأعراض" },
                { path: "/doctors", label: "البحث عن طبيب" },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="w-4 h-4 text-primary" />
                <span dir="ltr">+20 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@msa-health.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <MapPin className="w-4 h-4 text-primary" />
                <span>القاهرة، مصر</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-background/10 mt-8 pt-8">
          <div className="bg-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-center text-background/80">
              ⚠️ <strong>تنبيه هام:</strong> هذه المنصة للتوعية الصحية فقط ولا تغني عن استشارة الطبيب المختص. في حالات الطوارئ، اتصل بالإسعاف فوراً.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              © 2024 MSA - المساعد الطبي الذكي. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">
                شروط الاستخدام
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
