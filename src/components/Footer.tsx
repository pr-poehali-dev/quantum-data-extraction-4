import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 border-2 border-foreground rounded-sm flex items-center justify-center">
                <span className="text-[10px] font-mono">МП</span>
              </div>
              <span className="font-serif">МаркетМест.</span>
            </Link>
            <p className="text-xs font-mono text-muted-foreground">
              ОНЛАЙН-МАРКЕТПЛЕЙС
              <br />
              ТЫСЯЧИ ТОВАРОВ
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-4">ВСЕ СИСТЕМЫ РАБОТАЮТ</p>
          </div>

          {/* Directory */}
          <div>
            <h4 className="text-xs font-mono text-muted-foreground mb-4">НАВИГАЦИЯ</h4>
            <ul className="space-y-2">
              {["Каталог товаров", "Поставщикам", "Акции", "Блог"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-mono text-muted-foreground mb-4">ДОКУМЕНТЫ</h4>
            <ul className="space-y-2">
              {["Политика конфиденциальности", "Условия использования", "Возврат товара", "Оплата и доставка"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-mono text-muted-foreground mb-4">СТАТУС ПЛАТФОРМЫ</h4>
            <div className="bg-secondary/50 rounded-xl p-4 font-mono text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">ОБНОВЛЕНО СЕГОДНЯ</span>
              </div>
              <div className="space-y-1">
                <p className="text-primary">МАРКЕТПЛЕЙС [РАБОТАЕТ]</p>
                <p className="text-muted-foreground">Все системы работают штатно</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">2026 МАРКЕТМЕСТ. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
          <p className="text-xs text-muted-foreground">СДЕЛАНО С ЗАБОТОЙ О ПОКУПАТЕЛЯХ.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
