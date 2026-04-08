import { ArrowRight, Package, ShoppingCart, Star, Truck, Users, Zap } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-card border border-border rounded-3xl p-12 md:p-16 overflow-hidden">
          {/* Decorative corner icons */}
          <div className="absolute top-8 left-8 w-10 h-10 border border-border rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="absolute top-8 right-8 w-10 h-10 border border-border rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="absolute bottom-8 left-8 w-10 h-10 border border-border rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="absolute bottom-8 right-8 w-10 h-10 border border-border rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="absolute top-1/2 right-16 -translate-y-1/2 w-10 h-10 border border-border rounded-lg hidden md:flex items-center justify-center">
            <Truck className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="absolute bottom-1/3 left-16 w-10 h-10 border border-border rounded-lg hidden md:flex items-center justify-center">
            <Star className="w-4 h-4 text-muted-foreground" />
          </div>

          {/* Main content */}
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
              Тысячи товаров
              <br />
              ждут вас прямо сейчас.
            </h2>
            <p className="text-muted-foreground mb-8">
              Присоединяйтесь к 15 000+ покупателям и 200+ поставщикам — найдите всё, что нужно, в одном месте.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                Перейти в каталог
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors">
                Стать поставщиком
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
