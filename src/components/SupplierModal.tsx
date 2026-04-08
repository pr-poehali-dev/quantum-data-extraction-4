import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SupplierModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIES = [
  "Электроника и гаджеты",
  "Одежда и обувь",
  "Дом и интерьер",
  "Спорт и туризм",
  "Красота и здоровье",
  "Детские товары",
  "Продукты питания",
  "Автотовары",
  "Книги и хобби",
  "Другое",
];

const SupplierModal = ({ open, onOpenChange }: SupplierModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.company || !form.email) {
      toast({
        title: "Заполните обязательные поля",
        description: "Имя, компания и email обязательны.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в течение 1-2 рабочих дней.",
    });
    setLoading(false);
    onOpenChange(false);
    setForm({ name: "", company: "", email: "", phone: "", category: "", message: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground">ЗАЯВКА_ПОСТАВЩИКА</span>
          </div>
          <DialogTitle className="font-serif text-2xl">Стать поставщиком</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Заполните форму — мы рассмотрим вашу заявку и свяжемся в течение 1-2 дней.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1 block">ИМЯ *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Иван Иванов"
                className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1 block">КОМПАНИЯ *</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="ООО Ромашка"
                className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1 block">EMAIL *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ivan@company.ru"
                className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1 block">ТЕЛЕФОН</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+7 999 000 00 00"
                className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-muted-foreground mb-1 block">КАТЕГОРИЯ ТОВАРОВ</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Выберите категорию</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-muted-foreground mb-1 block">РАССКАЖИТЕ О ТОВАРАХ</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Что продаёте, сколько позиций, откуда поставляете..."
              className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 border border-border py-2.5 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {loading ? "Отправка..." : "Отправить заявку"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierModal;
