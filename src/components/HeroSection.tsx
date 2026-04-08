import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1">
              <span>МАРКЕТПЛЕЙС — ТЫСЯЧИ ТОВАРОВ</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-balance">
              Всё, что нужно,
              <br />
              в одном месте.
            </h1>

            <p className="text-muted-foreground text-lg max-w-md">
              Сотни поставщиков, тысячи товаров. Покупайте напрямую — быстро, удобно, выгодно.
            </p>

            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              Перейти в каталог
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="relative bg-secondary/50 rounded-3xl p-8 border border-border/50">
              {/* Top labels */}
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-4">
                <span>№01 — КАТАЛОГ_ТОВАРОВ</span>
                <span>БЕЗОПАСНАЯ_ОПЛАТА</span>
              </div>

              {/* Sticky note */}
              <div className="absolute -left-4 top-20 bg-[#fffef0] p-3 rounded shadow-sm rotate-[-3deg] border border-amber-100 w-36">
                <p className="text-xs font-mono text-foreground/80">АКЦИЯ</p>
                <p className="text-sm font-serif italic mt-1">«Скидка до 40% сегодня!»</p>
              </div>

              {/* Product grid mockup */}
              <div className="bg-[#4a5d52] rounded-2xl p-6 my-6 mx-auto max-w-sm">
                <div className="flex justify-between text-[8px] text-white/70 font-mono mb-2 px-2">
                  <span>ПОПУЛЯРНЫЕ ТОВАРЫ</span>
                  <span>ВСЕ_КАТЕГОРИИ</span>
                </div>
                <div className="grid grid-cols-2 gap-2 px-2">
                  {[
                    { name: "Электроника", emoji: "📱" },
                    { name: "Одежда", emoji: "👕" },
                    { name: "Дом и сад", emoji: "🏡" },
                    { name: "Спорт", emoji: "⚽" },
                  ].map((cat) => (
                    <div
                      key={cat.name}
                      className="bg-[#3a4a42] rounded-lg p-2 flex items-center gap-2"
                    >
                      <span className="text-base">{cat.emoji}</span>
                      <span className="text-[9px] text-white/70 font-mono">{cat.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 px-2">
                  <div className="bg-[#3a4a42] rounded-lg p-2 text-center">
                    <span className="text-[9px] text-white/70 font-mono">+ 120 КАТЕГОРИЙ</span>
                  </div>
                </div>
              </div>

              {/* Chat bubbles */}
              <div className="absolute -right-2 top-32 space-y-2">
                <div className="bg-card border border-border rounded-xl p-3 shadow-sm max-w-[180px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="Store" size={12} fallback="ShoppingBag" />
                    </div>
                    <span className="text-xs font-medium">ТехноМир</span>
                    <span className="text-[10px] text-muted-foreground">ПОСТАВЩИК</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Новинки в наличии!</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-3 shadow-sm max-w-[200px]">
                  <p className="text-xs text-muted-foreground">
                    Заказ оформлен. Доставка 1-2 дня. Спасибо за покупку!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
