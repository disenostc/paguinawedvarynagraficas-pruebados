import React from 'react';
import { 
  Printer, 
  ShoppingBag, 
  Search, 
  PhoneCall, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Truck
} from 'lucide-react';
import { BCV_EXCHANGE_RATE } from '../data/products';

interface HeaderProps {
  cartCount: number;
  cartTotalUsd: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenRequirements: () => void;
  onOpenCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotalUsd,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onOpenRequirements,
  onOpenCalculator,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner with Official Exchange Rate and Trust Indicators */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Tasa Oficial BCV: Bs. {BCV_EXCHANGE_RATE.toFixed(2)} / USD
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              Imprenta Autorizada SENIAT
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Sellos en 24h
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs ml-auto">
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              Envíos Nacionales MRW / Zoom / Tealca
            </span>
            <a 
              href="https://wa.me/584145558279?text=Hola%20Varyna%20Gr%C3%A1ficas,%20quisiera%20consultar%20sobre%20un%20pedido"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              WhatsApp: +58 414-555-8279
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
                  Varyna <span className="text-amber-600">Gráficas</span>
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                  C.A.
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Talonarios Fiscales • Sellos • Récipes • Impresión Comercial
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                id="header-search-input"
                placeholder="Buscar talonarios, facturas, sellos, récipes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 text-slate-800 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              id="header-btn-requirements"
              onClick={onOpenRequirements}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors border border-slate-200"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              Requisitos SENIAT
            </button>

            <button
              type="button"
              id="header-btn-calculator"
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-lg transition-colors border border-amber-200"
            >
              <span>⚡</span>
              <span className="hidden sm:inline">Cotizador</span> Rápido
            </button>

            {/* Shopping Cart Button */}
            <button
              type="button"
              id="header-btn-cart"
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Pedido</span>
              {cartCount > 0 ? (
                <>
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                  <span className="text-amber-300 font-bold ml-1 hidden md:inline">
                    ${cartTotalUsd.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-slate-400 text-xs">(0)</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              id="header-mobile-search-input"
              placeholder="Buscar talonarios, sellos, tarjetas..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 text-slate-800 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>
    </header>
  );
};
