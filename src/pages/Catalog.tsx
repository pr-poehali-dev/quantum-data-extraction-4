import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Star, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CATEGORIES = [
  { name: "Все товары", emoji: "🛍️" },
  { name: "Электроника", emoji: "📱" },
  { name: "Одежда", emoji: "👕" },
  { name: "Дом и сад", emoji: "🏡" },
  { name: "Спорт", emoji: "⚽" },
  { name: "Красота", emoji: "💄" },
  { name: "Детские товары", emoji: "🧸" },
  { name: "Автотовары", emoji: "🚗" },
];

const PRODUCTS = [
  { id: 1, name: "Смартфон Pro Max", price: "59 990 ₽", oldPrice: "74 990 ₽", rating: 4.8, reviews: 342, supplier: "ТехноМир", category: "Электроника", badge: "ХИТ" },
  { id: 2, name: "Беспроводные наушники", price: "8 490 ₽", oldPrice: "12 000 ₽", rating: 4.6, reviews: 128, supplier: "ТехноМир", category: "Электроника", badge: "СКИДКА" },
  { id: 3, name: "Кроссовки Urban Run", price: "5 990 ₽", oldPrice: null, rating: 4.7, reviews: 87, supplier: "МодаПро", category: "Одежда", badge: null },
  { id: 4, name: "Куртка зимняя", price: "12 490 ₽", oldPrice: "18 000 ₽", rating: 4.5, reviews: 54, supplier: "МодаПро", category: "Одежда", badge: "СКИДКА" },
  { id: 5, name: "Умная колонка", price: "4 990 ₽", oldPrice: null, rating: 4.9, reviews: 215, supplier: "ТехноМир", category: "Электроника", badge: "НОВИНКА" },
  { id: 6, name: "Йога-мат профи", price: "2 290 ₽", oldPrice: null, rating: 4.8, reviews: 176, supplier: "СпортБаза", category: "Спорт", badge: null },
  { id: 7, name: "Гантели 10 кг (пара)", price: "3 490 ₽", oldPrice: "4 200 ₽", rating: 4.6, reviews: 93, supplier: "СпортБаза", category: "Спорт", badge: "СКИДКА" },
  { id: 8, name: "Настольная лампа LED", price: "1 890 ₽", oldPrice: null, rating: 4.4, reviews: 61, supplier: "ДомКомфорт", category: "Дом и сад", badge: null },
  { id: 9, name: "Набор сковородок", price: "6 990 ₽", oldPrice: "9 500 ₽", rating: 4.7, reviews: 148, supplier: "ДомКомфорт", category: "Дом и сад", badge: "ХИТ" },
  { id: 10, name: "Сыворотка для лица", price: "2 990 ₽", oldPrice: null, rating: 4.9, reviews: 302, supplier: "КрасотаЛюкс", category: "Красота", badge: "ХИТ" },
  { id: 11, name: "Конструктор LEGO 500 дет.", price: "4 490 ₽", oldPrice: "5 900 ₽", rating: 4.8, reviews: 89, supplier: "ДетскийМир+", category: "Детские товары", badge: "СКИДКА" },
  { id: 12, name: "Видеорегистратор 4K", price: "7 990 ₽", oldPrice: null, rating: 4.5, reviews: 47, supplier: "АвтоМакс", category: "Автотовары", badge: "НОВИНКА" },
];

const BADGE_COLORS: Record<string, string> = {
  "ХИТ": "bg-orange-100 text-orange-700",
  "СКИДКА": "bg-red-100 text-red-700",
  "НОВИНКА": "bg-blue-100 text-blue-700",
};

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState("Все товары");
  const [search, setSearch] = useState("");
  const [added, setAdded] = useState<number[]>([]);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "Все товары" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.supplier.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAdd = (id: number) => {
    setAdded((prev) => prev.includes(id) ? prev : [...prev, id]);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page header */}
        <div className="mb-8">
          <span className="text-xs font-mono text-muted-foreground tracking-wider">КАТАЛОГ_ТОВАРОВ</span>
          <h1 className="font-serif text-4xl md:text-5xl mt-2 mb-1">Все товары</h1>
          <p className="text-muted-foreground text-sm">50 000+ товаров от 200+ поставщиков</p>
        </div>

        {/* Search + filter bar */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по товарам и поставщикам..."
              className="w-full border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button className="flex items-center gap-2 border border-border rounded-xl px-4 py-2.5 text-sm hover:bg-secondary transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Фильтры
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.name
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:bg-secondary"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs font-mono text-muted-foreground mb-6">
          ПОКАЗАНО {filtered.length} ТОВАРОВ
        </p>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground">Ничего не найдено. Попробуйте другой запрос.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Product image area */}
                <div className="relative bg-secondary/40 h-44 flex items-center justify-center">
                  <span className="text-5xl">
                    {CATEGORIES.find((c) => c.name === product.category)?.emoji ?? "📦"}
                  </span>
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded-full ${BADGE_COLORS[product.badge]}`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-[10px] font-mono text-muted-foreground mb-1">{product.supplier}</p>
                  <h3 className="font-medium text-sm mb-2 leading-snug">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-semibold text-base">{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through">{product.oldPrice}</span>
                    )}
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={() => handleAdd(product.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-full text-xs font-medium transition-colors ${
                      added.includes(product.id)
                        ? "bg-secondary text-foreground border border-border"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {added.includes(product.id) ? "Добавлено" : "В корзину"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Catalog;
