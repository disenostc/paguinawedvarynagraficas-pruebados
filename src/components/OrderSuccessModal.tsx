import React, { useId } from 'react';
import { 
  CheckCircle2, 
  X, 
  MessageCircle, 
  Printer, 
  Clock, 
  Calendar,
  Building2,
  FileCheck2
} from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const modalTitleId = useId();
  const modalDescriptionId = useId();

  const handlePrint = () => {
    window.print();
  };

  const hasFiscalItems = order.items.some(i => i.requiresFiscalDoc);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        aria-describedby={modalDescriptionId}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 text-center relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar confirmación"
            className="absolute top-4 right-4 text-emerald-100 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-9 h-9 text-white" />
          </div>

          <h2 id={modalTitleId} className="text-xl font-extrabold text-white">
            ¡Pedido Registrado con Éxito!
          </h2>
          <p id={modalDescriptionId} className="text-emerald-100 text-xs mt-1">
            Orden N° <span className="font-mono font-bold text-white tracking-wider">{order.orderNumber}</span>
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center text-slate-500 pb-2 border-b border-slate-200">
              <span>Cliente:</span>
              <span className="font-bold text-slate-900">{order.customer.fullName}</span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>Documento:</span>
              <span className="font-semibold text-slate-800">{order.customer.documentType}-{order.customer.documentNumber}</span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>Entrega:</span>
              <span className="font-semibold text-slate-800 uppercase">{order.customer.deliveryMethod}</span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>Método de Pago:</span>
              <span className="font-semibold text-slate-800 uppercase">{order.customer.paymentMethod.replace('_', ' ')}</span>
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <h4 className="font-bold text-slate-900 mb-2 uppercase text-[11px] tracking-wide">
              Resumen de Productos:
            </h4>
            <div className="space-y-1.5">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs border-b border-slate-100 pb-1.5">
                  <div>
                    <span className="font-bold text-slate-800">{it.quantity}x {it.productName}</span>
                    <div className="text-[10px] text-slate-500">{it.selectedSize}</div>
                  </div>
                  <span className="font-bold text-slate-900">${it.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="pt-2 border-t border-slate-200 space-y-1">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>IVA Fiscal (16%):</span>
              <span>${order.iva.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-1 border-t border-slate-200">
              <span className="font-extrabold text-slate-900 text-sm">Total Oficial:</span>
              <div className="text-right">
                <span className="font-black text-lg text-slate-900">${order.totalUsd.toFixed(2)} USD</span>
                <span className="text-xs text-slate-600 font-bold block">
                  Bs. {order.totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps Reminder */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Siguiente Paso: Confirmación de Artes</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-normal">
              Nuestro equipo de diseño de <strong>Varyna Gráficas C.A.</strong> te contactará por WhatsApp para validar el montaje y enviarte la prueba digital de impresión antes de pasar a prensa.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="py-2 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Resumen</span>
          </button>

          <a
            href="https://wa.me/584145558279"
            target="_blank"
            rel="noreferrer"
            className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Abrir Chat de WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
