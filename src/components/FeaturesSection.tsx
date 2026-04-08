import { Check, Lock, ShoppingBag, Zap } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-16">
          <div>
            <span className="text-xs font-mono text-muted-foreground tracking-wider">ВОЗМОЖНОСТИ_ПЛАТФОРМЫ</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 max-w-lg leading-tight">
              Почему покупатели выбирают нас
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs hidden md:block">
            Лучшие товары от проверенных поставщиков по честным ценам.
          </p>
        </div>

        {/* Top row features */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Categories */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs font-mono text-muted-foreground">ФУНКЦИЯ</span>
              <span className="text-xs font-mono text-muted-foreground">ШИРОКИЙ_ВЫБОР</span>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-card rounded-full px-3 py-1 border border-border">
                  <div className="w-4 h-4 rounded-full bg-foreground" />
                  <div className="w-4 h-4 rounded-full border-2 border-border" />
                </div>
                <div className="flex-1 h-1 bg-border rounded-full">
                  <div className="w-4/5 h-full bg-foreground rounded-full" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">120+</span>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">120+ категорий товаров</h3>
            <p className="text-sm text-muted-foreground">
              Электроника, одежда, дом, спорт, красота и многое другое — всё в одном магазине.
            </p>
          </div>

          {/* Suppliers */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs font-mono text-muted-foreground">ФУНКЦИЯ</span>
              <span className="text-xs font-mono text-muted-foreground">ПОСТАВЩИКИ</span>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-3 gap-2">
                {["ТехноМир", "МодаПро", "СпортБаза", "ДомКомфорт", "КрасотаЛюкс", "Ещё"].map((name, i) => (
                  <div
                    key={name}
                    className={`text-center p-2 rounded-lg ${i < 5 ? "bg-card border border-border" : "border border-dashed border-border"}`}
                  >
                    <div className="w-6 h-6 mx-auto mb-1 rounded bg-secondary flex items-center justify-center">
                      <ShoppingBag className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-2">
                <span className="text-[10px] font-mono text-accent-foreground bg-accent px-2 py-0.5 rounded">
                  + ЕЩЁ 200
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">200+ проверенных поставщиков</h3>
            <p className="text-sm text-muted-foreground">Все поставщики проходят проверку качества перед размещением.</p>
          </div>

          {/* Security */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs font-mono text-muted-foreground">ФУНКЦИЯ</span>
              <span className="text-xs font-mono text-muted-foreground">БЕЗОПАСНОСТЬ</span>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 mb-6 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-accent flex items-center justify-center">
                  <Lock className="w-6 h-6 text-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Безопасная оплата</h3>
            <p className="text-sm text-muted-foreground">
              Защищённые платежи. Гарантия возврата, если товар не соответствует описанию.
            </p>
          </div>
        </div>

        {/* Bottom row features */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Fast delivery */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex gap-6">
              <div className="bg-secondary/50 rounded-xl p-4 flex-shrink-0">
                <div className="relative w-20 h-20 rounded-full border-4 border-accent flex items-center justify-center">
                  <Zap className="w-8 h-8 text-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground">ДОСТАВКА</span>
                </div>
                <h3 className="font-semibold text-2xl mb-1">Доставка от 1 дня</h3>
                <p className="text-sm text-muted-foreground">
                  Быстрая доставка по всей России. Отслеживайте заказ в реальном времени.
                </p>
              </div>
            </div>
          </div>

          {/* Volume */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground">МАСШТАБ</span>
                </div>
                <h3 className="font-semibold text-2xl mb-1">50 000+ товаров</h3>
                <p className="text-sm text-muted-foreground">
                  Огромный ассортимент на любой вкус и бюджет. Новинки добавляются каждый день.
                </p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 flex-shrink-0">
                <div className="flex gap-1">
                  {["5", "0", "K", "+"].map((num, i) => (
                    <div
                      key={i}
                      className="w-8 h-10 bg-card border border-border rounded flex items-center justify-center"
                    >
                      <span className="font-mono text-lg">{num}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
