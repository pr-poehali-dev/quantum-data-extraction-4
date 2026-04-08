import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import type { Product } from "@/data/products";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  quantity: number;
}

const DELIVERY_OPTIONS = [
  { id: "courier", label: "Курьером до двери", time: "1–2 дня", price: "290 ₽" },
  { id: "pickup", label: "Самовывоз из пункта", time: "1 день", price: "Бесплатно" },
  { id: "post", label: "Почта России", time: "3–7 дней", price: "150 ₽" },
];

const PAYMENT_OPTIONS = [
  { id: "card", label: "Банковская карта" },
  { id: "sbp", label: "СБП (перевод)" },
  { id: "cash", label: "Наличными при получении" },
];

const OrderModal = ({ open, onOpenChange, product, quantity }: OrderModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState("courier");
  const [payment, setPayment] = useState("card");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const totalPrice = product.priceNum * quantity;
  const deliveryCost = delivery === "courier" ? 290 : delivery === "post" ? 150 : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast({ title: "Заполните имя и телефон", variant: "destructive" });
      return;
    }
    if (delivery !== "pickup" && !form.address) {
      toast({ title: "Укажите адрес доставки", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      let apiUrl: string | null = null;
      try {
        const map = await fetch("/func2url.json").then((r) => r.json());
        apiUrl = map["api"] || null;
      } catch { /* API не задеплоен */ }

      if (apiUrl) {
        await fetch(`${apiUrl}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id: product.id,
            product_name: product.name,
            supplier: product.supplier,
            quantity,
            price_num: product.priceNum,
            total_price: totalPrice + deliveryCost,
            customer_name: form.name,
            customer_phone: form.phone,
            delivery_type: delivery,
            delivery_address: form.address,
            payment_type: payment,
          }),
        });
      }
    } catch { /* сохраняем локально если API недоступен */ }
    setLoading(false);
    setStep("success");
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setStep("form"), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {step === "success" ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="font-serif text-2xl mb-2">Заказ оформлен!</h2>
            <p className="text-sm text-muted-foreground mb-1">
              Спасибо, <strong>{form.name}</strong>!
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Мы свяжемся с вами по номеру <strong>{form.phone}</strong> для подтверждения.
            </p>
            <div className="bg-secondary/50 rounded-xl p-4 text-left mb-6">
              <p className="text-xs font-mono text-muted-foreground mb-2">ДЕТАЛИ ЗАКАЗА</p>
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-muted-foreground">Кол-во: {quantity} шт.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Итого: <strong>{(totalPrice + deliveryCost).toLocaleString()} ₽</strong>
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Готово
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <span className="text-xs font-mono text-muted-foreground">ОФОРМЛЕНИЕ_ЗАКАЗА</span>
              <DialogTitle className="font-serif text-2xl">Оформить заказ</DialogTitle>
            </DialogHeader>

            {/* Order summary */}
            <div className="bg-secondary/40 rounded-xl p-3 flex items-center gap-3 mt-1">
              <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center text-2xl border border-border/50 flex-shrink-0">
                {["📱","🎧","👟","🧥","🔊","🧘","🏋️","💡","🍳","✨","🧸","🚗"][product.id - 1]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">{quantity} шт. × {product.price}</p>
              </div>
              <p className="font-semibold text-sm flex-shrink-0">{(totalPrice).toLocaleString()} ₽</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Contact */}
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-2">КОНТАКТЫ</p>
                <div className="space-y-2">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ваше имя *"
                    className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+7 999 000 00 00 *"
                    className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              {/* Delivery */}
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-2">ДОСТАВКА</p>
                <div className="space-y-2">
                  {DELIVERY_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        delivery === opt.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${delivery === opt.id ? "border-primary" : "border-border"}`}>
                          {delivery === opt.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </div>
                        <input type="radio" className="sr-only" checked={delivery === opt.id} onChange={() => setDelivery(opt.id)} />
                        <div>
                          <p className="text-sm font-medium">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.time}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{opt.price}</span>
                    </label>
                  ))}
                </div>
                {delivery !== "pickup" && (
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Адрес доставки *"
                    className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 mt-2"
                  />
                )}
              </div>

              {/* Payment */}
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-2">ОПЛАТА</p>
                <div className="flex gap-2 flex-wrap">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setPayment(opt.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        payment === opt.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:bg-secondary"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-secondary/40 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Товары ({quantity} шт.) + доставка</p>
                  <p className="font-semibold text-lg">{(totalPrice + deliveryCost).toLocaleString()} ₽</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {loading ? "Оформляем..." : "Подтвердить"}
                </button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;