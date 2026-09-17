import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldAlert, 
  MessageCircle,
  Truck
} from 'lucide-react';
import { CartItem } from '../types';
import { BCV_EXCHANGE_RATE } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotalUsd = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const ivaUsd = subtotalUsd * 0.16;
  const totalUsd = subtotalUsd + ivaUsd;
  const totalBs = totalUsd * BCV_EXCHANGE_RATE;

  const hasFiscalItems = items.some(item => item.requiresFiscalDoc);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 id="cart-drawer-title" className="font-bold text-base text-white">
              Tu Pedido ({items.length} {items.length === 1 ? 'producto' : 'productos'})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar pedido"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fiscal Notice Alert */}
        {hasFiscalItems && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Incluye talonarios fiscales SENIAT:</span>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Al confirmar el pedido podrás adjuntar digitalmente tu RIF y recaudos para tramitar la providencia oficial.
              </p>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <ShoppingBag className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="font-bold text-slate-700 text-base">Tu pedido está vacío</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Explora nuestro catálogo de talonarios fiscales, sellos y papelería para configurar tu pedido.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-amber-500 hover:text-slate-950 transition-colors"
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex flex-col gap-2 relative group"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">
                      {item.productName}
                    </h4>
                    
                    <div className="text-[11px] text-slate-500 space-y-0.5 mt-0.5">
                      <div>Formato: <span className="font-medium text-slate-700">{item.selectedSize}</span></div>
                      {item.selectedCopies && (
                        <div>Copias: <span className="font-medium text-slate-700">{item.selectedCopies}</span></div>
                      )}
                      {item.selectedInk && (
                        <div>Tinta: <span className="font-medium text-slate-700">{item.selectedInk}</span></div>
                      )}
                    </div>

                    {item.customization.companyName && (
                      <div className="mt-1 text-[10px] text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded font-mono truncate">
                        Personalizado: {item.customization.companyName}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Eliminar ${item.productName}`}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Quantity and Price row */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 mt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Cantidad:</span>
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        aria-label={`Disminuir cantidad de ${item.productName}`}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Aumentar cantidad de ${item.productName}`}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-sm text-slate-900">
                      ${item.totalPrice.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Bs. {(item.totalPrice * BCV_EXCHANGE_RATE).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary / Checkout */}
        {items.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">${subtotalUsd.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA Fiscal (16%):</span>
                <span className="font-semibold text-slate-900">${ivaUsd.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
                <span className="font-bold text-slate-900">Total a Pagar (USD):</span>
                <span className="font-extrabold text-slate-900 text-base">${totalUsd.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-amber-800 font-semibold bg-amber-50 px-2 py-1 rounded">
                <span>Total Ref. BCV (Bs.):</span>
                <span>Bs. {totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                id="cart-btn-checkout"
                onClick={onCheckout}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Procesar Pedido / Facturación</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/584145558279?text=Hola%20Varyna%20Gr%C3%A1ficas,%20tengo%20un%20pedido%20de%20${items.length}%20items%20por%20$${totalUsd.toFixed(2)}%20y%20quisiera%20asesor%C3%ADa`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Consultar Dudas por WhatsApp</span>
              </a>
            </div>

            <div className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
              <Truck className="w-3 h-3 text-slate-400" />
              <span>Despachos a nivel nacional por MRW, Zoom, Tealca o retiro en Barinas</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
