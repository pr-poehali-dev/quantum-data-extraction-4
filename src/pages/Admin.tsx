import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Package, TrendingUp, Users, Clock } from "lucide-react";
import Icon from "@/components/ui/icon";

interface Order {
  id: number;
  product_name: string;
  supplier: string;
  quantity: number;
  total_price: number;
  customer_name: string;
  customer_phone: string;
  delivery_type: string;
  delivery_address: string;
  payment_type: string;
  status: string;
  created_at: string;
}

const DELIVERY_LABELS: Record<string, string> = {
  courier: "Курьер",
  pickup: "Самовывоз",
  post: "Почта",
};

const PAYMENT_LABELS: Record<string, string> = {
  card: "Карта",
  sbp: "СБП",
  cash: "Наличные",
};

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<string, string> = {
  new: "Новый",
  processing: "В обработке",
  done: "Выполнен",
  cancelled: "Отменён",
};

const API_URL = "/api";

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      // Попытка получить данные из API
      const funcUrl = await getFuncUrl();
      if (!funcUrl) {
        // API ещё не задеплоен — показываем заглушку
        setOrders([]);
        setError("api_not_deployed");
        setLoading(false);
        return;
      }
      const res = await fetch(`${funcUrl}/orders`);
      const data = await res.json();
      setOrders(data.orders || []);
      setLastUpdated(new Date());
    } catch {
      setError("fetch_error");
    } finally {
      setLoading(false);
    }
  };

  const getFuncUrl = async (): Promise<string | null> => {
    try {
      const res = await fetch("/func2url.json");
      const map = await res.json();
      return map["api"] || null;
    } catch {
      return null;
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const filtered = orders.filter((o) =>
    o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    o.product_name.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_phone.includes(search)
  );

  const totalRevenue = orders.reduce((s, o) => s + o.total_price, 0);
  const todayOrders = orders.filter((o) => {
    const d = new Date(o.created_at);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-foreground rounded-sm flex items-center justify-center">
                <span className="text-xs font-mono">МП</span>
              </div>
              <span className="font-serif">МаркетМест</span>
            </Link>
            <span className="text-muted-foreground text-sm">/</span>
            <span className="text-sm font-mono text-muted-foreground">АДМИНКА</span>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs font-mono text-muted-foreground hidden md:block">
                Обновлено: {lastUpdated.toLocaleTimeString("ru")}
              </span>
            )}
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="flex items-center gap-2 border border-border rounded-full px-3 py-1.5 text-sm hover:bg-secondary transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Обновить
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">ВСЕГО ЗАКАЗОВ</span>
            </div>
            <p className="font-serif text-3xl">{orders.length}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">СЕГОДНЯ</span>
            </div>
            <p className="font-serif text-3xl">{todayOrders}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">ВЫРУЧКА</span>
            </div>
            <p className="font-serif text-3xl">{totalRevenue.toLocaleString()} ₽</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">НОВЫХ</span>
            </div>
            <p className="font-serif text-3xl">{orders.filter((o) => o.status === "new").length}</p>
          </div>
        </div>

        {/* Orders table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <span className="text-xs font-mono text-muted-foreground">ЗАКАЗЫ</span>
              <h1 className="font-semibold text-xl mt-0.5">Все заказы</h1>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по имени, товару, телефону..."
              className="border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 w-72 hidden md:block"
            />
          </div>

          {error === "api_not_deployed" ? (
            <div className="text-center py-20 px-6">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="ServerOff" size={28} fallback="AlertCircle" />
              </div>
              <h2 className="font-semibold text-lg mb-2">API ещё не подключён</h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Освободите один слот в разделе <strong>Ядро → Функции</strong>, удалив неиспользуемую функцию. После этого заказы будут сохраняться и отображаться здесь.
              </p>
            </div>
          ) : error === "fetch_error" ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">Ошибка загрузки. Попробуйте обновить.</p>
            </div>
          ) : loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-secondary/40 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">
                {orders.length === 0 ? "Заказов пока нет." : "Ничего не найдено."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["№", "Дата", "Товар", "Покупатель", "Телефон", "Доставка", "Оплата", "Сумма", "Статус"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-mono text-muted-foreground font-normal">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order, i) => (
                    <tr key={order.id} className={`border-b border-border/50 hover:bg-secondary/20 transition-colors ${i % 2 === 0 ? "" : "bg-secondary/10"}`}>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">#{order.id}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(order.created_at).toLocaleString("ru", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="px-4 py-3 max-w-[180px]">
                        <p className="font-medium truncate">{order.product_name}</p>
                        <p className="text-xs text-muted-foreground">{order.supplier} · {order.quantity} шт.</p>
                      </td>
                      <td className="px-4 py-3 font-medium whitespace-nowrap">{order.customer_name}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{order.customer_phone}</td>
                      <td className="px-4 py-3">
                        <p>{DELIVERY_LABELS[order.delivery_type] ?? order.delivery_type}</p>
                        {order.delivery_address && (
                          <p className="text-xs text-muted-foreground truncate max-w-[140px]">{order.delivery_address}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{PAYMENT_LABELS[order.payment_type] ?? order.payment_type}</td>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap">{order.total_price.toLocaleString()} ₽</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${STATUS_STYLES[order.status] ?? "bg-secondary text-foreground"}`}>
                          {STATUS_LABELS[order.status] ?? order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
