import React, { useState, useId } from 'react';
import { 
  Calculator, 
  X, 
  Check, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { PRODUCTS, BCV_EXCHANGE_RATE } from '../data/products';
import { Product, CartItem } from '../types';

interface LiveQuoteCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAndCustomize: (product: Product) => void;
}

export const LiveQuoteCalculator: React.FC<LiveQuoteCalculatorProps> = ({
  isOpen,
  onClose,
  onSelectAndCustomize,
}) => {
  if (!isOpen) return null;

  const modalTitleId = useId();
  const modalDescriptionId = useId();

  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
  const [quantity, setQuantity] = useState<number>(10);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [selectedCopiesIndex, setSelectedCopiesIndex] = useState<number>(0);

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const sizeOption = selectedProduct.options.sizes[selectedSizeIndex] || selectedProduct.options.sizes[0];
  const copiesOption = selectedProduct.options.copies ? selectedProduct.options.copies[selectedCopiesIndex] : undefined;

  // Pricing calculation
  const basePrice = selectedProduct.basePrice;
  const sizeMod = sizeOption?.priceModifier || 0;
  const copiesMod = copiesOption?.priceModifier || 0;
  const unitPrice = basePrice + sizeMod + copiesMod;

  let discountRate = 0;
  if (quantity >= 20) discountRate = 0.12;
  else if (quantity >= 10) discountRate = 0.08;
  else if (quantity >= 5) discountRate = 0.04;

  const rawSubtotal = unitPrice * quantity;
  const discountTotal = rawSubtotal * discountRate;
  const subtotalAfterDiscount = rawSubtotal - discountTotal;
  const iva = subtotalAfterDiscount * 0.16;
  const finalTotalUsd = subtotalAfterDiscount + iva;
  const finalTotalBs = finalTotalUsd * BCV_EXCHANGE_RATE;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        aria-describedby={modalDescriptionId}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 id={modalTitleId} className="text-base font-bold text-white">
                Calculadora de Presupuestos al Instante
              </h2>
              <p id={modalDescriptionId} className="text-[11px] text-slate-400">
                Calcula al instante costos por volumen y precios oficiales en USD y Bolívares BCV
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar calculadora"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Calculator Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Select Product */}
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
              1. Selecciona el Tipo de Trabajo:
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                setSelectedSizeIndex(0);
                setSelectedCopiesIndex(0);
              }}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {PRODUCTS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} (desde ${p.basePrice.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                2. Cantidad / Tiraje:
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900 bg-amber-100 text-amber-900 px-3 py-0.5 rounded-lg">
                  {quantity} {selectedProduct.category.includes('tarjetas') ? 'tarjetas' : selectedProduct.category.includes('sellos') ? 'sellos' : 'talonarios'}
                </span>
                {discountRate > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    {(discountRate * 100).toFixed(0)}% OFF
                  </span>
                )}
              </div>
            </div>

            <input
              type="range"
              min={selectedProduct.category.includes('tarjetas') ? 100 : selectedProduct.category.includes('sellos') ? 1 : 3}
              max={selectedProduct.category.includes('tarjetas') ? 2000 : selectedProduct.category.includes('sellos') ? 20 : 50}
              step={selectedProduct.category.includes('tarjetas') ? 100 : 1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Format / Sizes */}
          {selectedProduct.options.sizes.length > 0 && (
            <div>
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
                3. Tamaño / Formato:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedProduct.options.sizes.map((sz, idx) => (
                  <button
                    key={sz.value}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedSizeIndex === idx
                        ? 'border-amber-500 bg-amber-50 text-slate-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span>{sz.label}</span>
                    {selectedSizeIndex === idx && <Check className="w-4 h-4 text-amber-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Copies if applicable */}
          {selectedProduct.options.copies && selectedProduct.options.copies.length > 0 && (
            <div>
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
                4. Número de Copias Químicas:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedProduct.options.copies.map((cp, idx) => (
                  <button
                    key={cp.value}
                    type="button"
                    onClick={() => setSelectedCopiesIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedCopiesIndex === idx
                        ? 'border-amber-500 bg-amber-50 text-slate-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span>{cp.label}</span>
                    {selectedCopiesIndex === idx && <Check className="w-4 h-4 text-amber-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live Quote Breakdown Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
              <span className="text-slate-400">Precio Unitario Estimado:</span>
              <span className="font-semibold text-slate-200">${(unitPrice * (1 - discountRate)).toFixed(2)} c/u</span>
            </div>

            {discountTotal > 0 && (
              <div className="flex justify-between items-center text-xs text-emerald-400 font-semibold">
                <span>Descuento por Volumen ({(discountRate * 100).toFixed(0)}%):</span>
                <span>-${discountTotal.toFixed(2)} USD</span>
              </div>
            )}

            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>IVA Legal (16%):</span>
              <span>${iva.toFixed(2)} USD</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-amber-400 uppercase tracking-wider font-bold block">
                  Presupuesto Total:
                </span>
                <span className="text-3xl font-black text-white">
                  ${finalTotalUsd.toFixed(2)} <span className="text-sm font-normal text-slate-400">USD</span>
                </span>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">
                  Equivalente Oficial BCV:
                </span>
                <span className="text-base font-bold text-amber-400">
                  Bs. {finalTotalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            Cerrar
          </button>

          <button
            type="button"
            id="quote-btn-customize"
            onClick={() => {
              onClose();
              onSelectAndCustomize(selectedProduct);
            }}
            className="py-2.5 px-6 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all flex items-center gap-2"
          >
            <span>Personalizar este Pedido</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
