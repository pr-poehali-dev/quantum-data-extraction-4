import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "ПОКУПАТЕЛЬ",
    price: "Бесплатно",
    description: "Для обычных покупок без ограничений.",
    features: [
      "Доступ ко всему каталогу",
      "Безопасная оплата",
      "Отслеживание заказов",
      "Стандартная доставка",
      "Поддержка 24/7",
    ],
  },
  {
    name: "PREMIUM",
    price: "990 ₽",
    description: "Для активных покупателей с привилегиями.",
    features: [
      "Всё из базового",
      "Приоритетная доставка",
      "Эксклюзивные скидки до 20%",
      "Ранний доступ к акциям",
      "Личный менеджер",
    ],
    popular: true,
  },
  {
    name: "ПОСТАВЩИК",
    price: "4 990 ₽",
    description: "Для бизнеса: размещайте и продавайте товары.",
    features: [
      "Размещение до 10 000 товаров",
      "Аналитика продаж",
      "Инструменты продвижения",
      "API-интеграция",
      "Персональный менеджер",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-muted-foreground tracking-wider">ТАРИФЫ</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-4">
            Для покупателей
            <br />
            и поставщиков
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="bg-[#fffef0] px-3 py-1 rounded shadow-sm rotate-[-2deg] border border-amber-100">
              <span className="text-xs font-mono">СТАРТ_БЕСПЛАТНО</span>
            </div>
            <p className="text-muted-foreground text-sm">Без скрытых комиссий. Прозрачные условия</p>
            <div className="bg-[#fffef0] px-3 py-1 rounded shadow-sm rotate-[2deg] border border-amber-100">
              <span className="text-xs font-mono">ПРОВЕРЕНО</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-card border rounded-2xl p-6 relative flex flex-col ${
                tier.popular ? "border-primary shadow-lg" : "border-border"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-mono px-3 py-1 rounded-full">
                  ПОПУЛЯРНЫЙ
                </div>
              )}

              <div className="mb-6">
                <span className="text-xs font-mono text-muted-foreground">{tier.name}</span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-serif">{tier.price}</span>
                  {tier.price !== "Бесплатно" && <span className="text-muted-foreground text-sm">/мес</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
              </div>

              <div className="space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-accent-foreground" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 rounded-full text-sm font-medium transition-colors mt-6 ${
                  tier.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border hover:bg-secondary"
                }`}
              >
                ВЫБРАТЬ
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
