interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    id: "ORD-0088",
    quote:
      "Нашёл всё для ремонта в одном месте — от инструментов до отделочных материалов. Разные поставщики, но заказ оформил единый. Очень удобно и сэкономил кучу времени.",
    author: "Алексей Морозов",
    role: "ПОКУПАТЕЛЬ, МОСКВА",
  },
  {
    id: "ORD-2301",
    quote:
      "Как поставщик, разместил свой товар за час. Продажи пошли уже в первую неделю. Аналитика понятная, поддержка отвечает быстро. Рекомендую всем, кто хочет выйти в онлайн.",
    author: "Ирина Соколова",
    role: "ПОСТАВЩИК, ОДЕЖДА",
  },
  {
    id: "ORD-7725",
    quote:
      "Сравнивала цены на смартфон у трёх поставщиков прямо на сайте. Выбрала лучшее предложение, доставка пришла на следующий день. Это настоящий маркетплейс!",
    author: "Мария Кузнецова",
    role: "ПОКУПАТЕЛЬ, КАЗАНЬ",
  },
  {
    id: "ORD-0030",
    quote:
      "Мой магазин спортивных товаров вырос в 3 раза за полгода после выхода на эту платформу. Огромная аудитория и честные условия сотрудничества.",
    author: "Денис Иванов",
    role: "ПОСТАВЩИК, СПОРТИВНЫЕ ТОВАРЫ",
  },
  {
    id: "ORD-2134",
    quote: "Удобный интерфейс, быстрый поиск, честные отзывы. Покупаю здесь уже полгода — ни разу не разочаровался.",
    author: "Сергей Павлов",
    role: "ПОКУПАТЕЛЬ, САНКТ-ПЕТЕРБУРГ",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-16">
          <div>
            <span className="text-xs font-mono text-muted-foreground tracking-wider">ОТЗЫВЫ</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 max-w-md leading-tight">
              Покупатели и поставщики нам доверяют
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs hidden md:block">
            Реальные истории реальных людей.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div key={testimonial.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground">REF</span>
                <span className="text-xs font-mono text-primary">{testimonial.id}</span>
                <div className="w-12 h-12 bg-secondary rounded-lg" />
              </div>
              <p className="text-sm leading-relaxed mb-6">{testimonial.quote}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs font-mono text-muted-foreground">{testimonial.role}</p>
                </div>
                <div className="w-4 h-4 border border-border rounded flex items-center justify-center">
                  <span className="text-[8px]">-&gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {testimonials.slice(3, 4).map((testimonial) => (
            <div key={testimonial.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground">REF</span>
                <span className="text-xs font-mono text-primary">{testimonial.id}</span>
                <div className="w-12 h-12 bg-secondary rounded-lg" />
              </div>
              <p className="text-sm leading-relaxed mb-6">{testimonial.quote}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs font-mono text-muted-foreground">{testimonial.role}</p>
                </div>
                <div className="w-4 h-4 border border-border rounded flex items-center justify-center">
                  <span className="text-[8px]">-&gt;</span>
                </div>
              </div>
            </div>
          ))}

          {/* Join CTA */}
          <div className="bg-secondary/50 border border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center mb-3">
              <span className="text-lg">+</span>
            </div>
            <span className="text-sm font-mono text-muted-foreground">ВАШ ОТЗЫВ ЗДЕСЬ</span>
            <p className="text-sm text-muted-foreground mt-1">Присоединяйтесь к тысячам довольных клиентов.</p>
          </div>

          {testimonials.slice(4).map((testimonial) => (
            <div key={testimonial.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground">REF</span>
                <span className="text-xs font-mono text-primary">{testimonial.id}</span>
                <div className="w-12 h-12 bg-secondary rounded-lg" />
              </div>
              <p className="text-sm leading-relaxed mb-6">{testimonial.quote}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs font-mono text-muted-foreground">{testimonial.role}</p>
                </div>
                <div className="w-4 h-4 border border-border rounded flex items-center justify-center">
                  <span className="text-[8px]">-&gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
