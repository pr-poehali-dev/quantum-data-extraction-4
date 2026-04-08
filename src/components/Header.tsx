import { useState } from "react";
import { Link } from "react-router-dom";
import SupplierModal from "@/components/SupplierModal";

const Header = () => {
  const [supplierOpen, setSupplierOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-foreground rounded-sm flex items-center justify-center">
            <span className="text-xs font-mono">МП</span>
          </div>
          <span className="font-serif text-lg tracking-tight">МаркетМест</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/catalog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Каталог
          </Link>
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Возможности
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Тарифы
          </a>
          <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Отзывы
          </a>
        </nav>

        <button
          onClick={() => setSupplierOpen(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Стать поставщиком
        </button>
      </div>

      <SupplierModal open={supplierOpen} onOpenChange={setSupplierOpen} />
    </header>
  );
};

export default Header;