import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Truck, Shield, RotateCcw, Check, ChevronDown, ChevronUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import { PRODUCTS, CATEGORIES, BADGE_COLORS } from "@/data/products";

const Product = () => {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [orderOpen, setOrderOpen] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(true);

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="text-muted-foreground mb-4">Товар не найден.</p>
          <Link to="/catalog" className="text-primary hover:underline text-sm">Вернуться в каталог</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const emoji = CATEGORIES.find((c) => c.name === product.category)?.emoji ?? "📦";
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">ГЛАВНАЯ</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-foreground transition-colors">КАТАЛОГ</Link>
          <span>/</span>
          <span className="text-foreground">{product.name.toUpperCase()}</span>
        </div>

        {/* Back button */}
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад в каталог
        </Link>

        {/* Main product section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left — image */}
          <div className="space-y-4">
            <div className="relative bg-secondary/40 rounded-3xl flex items-center justify-center h-80 md:h-96 border border-border/50">
              <span className="text-9xl">{emoji}</span>
              {product.badge && (
                <span className={`absolute top-5 left-5 text-xs font-mono px-3 py-1 rounded-full ${BADGE_COLORS[product.badge]}`}>
                  {product.badge}
                </span>
              )}
            </div>
            {/* Thumbnails (decorative) */}
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-20 h-20 rounded-xl bg-secondary/40 border flex items-center justify-center cursor-pointer transition-colors ${i === 1 ? "border-primary" : "border-border hover:border-primary/50"}`}
                >
                  <span className="text-2xl">{emoji}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-muted-foreground">{product.supplier.toUpperCase()}</span>
                <span className="text-xs font-mono text-muted-foreground">·</span>
                <span className="text-xs font-mono text-muted-foreground">{product.category.toUpperCase()}</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} отзывов)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-serif text-4xl">{product.price}</span>
                {product.oldPrice && (
                  <span className="text-lg text-muted-foreground line-through">{product.oldPrice}</span>
                )}
              </div>
              {product.oldPrice && (
                <p className="text-sm text-green-600 font-medium mb-4">
                  Вы экономите {(product.priceNum - parseInt(product.oldPrice.replace(/\D/g, "")) * -1).toLocaleString()} — скидка активна
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">В наличии: <span className="font-medium">{product.inStock} шт.</span></span>
            </div>

            {/* Quantity + buy */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2.5 text-lg hover:bg-secondary transition-colors"
                >
                  −
                </button>
                <span className="px-5 py-2.5 font-medium text-sm border-x border-border min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.inStock, q + 1))}
                  className="px-4 py-2.5 text-lg hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => setOrderOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Оформить заказ
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex flex-col items-center gap-1.5 text-center bg-secondary/40 rounded-xl p-3">
                <Truck className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Доставка от 1 дня</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center bg-secondary/40 rounded-xl p-3">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Гарантия качества</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center bg-secondary/40 rounded-xl p-3">
                <RotateCcw className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Возврат 14 дней</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specs + Reviews */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Specs */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
              onClick={() => setSpecsOpen((v) => !v)}
              className="w-full flex items-center justify-between p-6 hover:bg-secondary/30 transition-colors"
            >
              <div>
                <span className="text-xs font-mono text-muted-foreground">ХАРАКТЕРИСТИКИ</span>
                <h2 className="font-semibold text-lg mt-0.5">Технические параметры</h2>
              </div>
              {specsOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
            </button>
            {specsOpen && (
              <div className="px-6 pb-6 space-y-0">
                {product.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex items-center justify-between py-3 text-sm ${i < product.specs.length - 1 ? "border-b border-border/60" : ""}`}
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium text-right max-w-[55%]">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <span className="text-xs font-mono text-muted-foreground">ОТЗЫВЫ</span>
            <h2 className="font-semibold text-lg mt-0.5 mb-5">Что говорят покупатели</h2>
            <div className="space-y-4">
              {product.reviewsList.map((rev, i) => (
                <div key={i} className={`${i < product.reviewsList.length - 1 ? "border-b border-border/60 pb-4" : ""}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                        {rev.author[0]}
                      </div>
                      <span className="text-sm font-medium">{rev.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-1 ml-9">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3 h-3 ${s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground ml-9">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono text-muted-foreground">ПОХОЖИЕ ТОВАРЫ</span>
              <h2 className="font-serif text-2xl mt-1">Из той же категории</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p) => {
                const pEmoji = CATEGORIES.find((c) => c.name === p.category)?.emoji ?? "📦";
                return (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative bg-secondary/40 h-36 flex items-center justify-center">
                      <span className="text-4xl">{pEmoji}</span>
                      {p.badge && (
                        <span className={`absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-full ${BADGE_COLORS[p.badge]}`}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-mono text-muted-foreground mb-1">{p.supplier}</p>
                      <p className="text-sm font-medium mb-2 leading-snug">{p.name}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs">{p.rating}</span>
                      </div>
                      <span className="font-semibold text-sm">{p.price}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />

      <OrderModal
        open={orderOpen}
        onOpenChange={setOrderOpen}
        product={product}
        quantity={quantity}
      />
    </main>
  );
};

export default Product;
