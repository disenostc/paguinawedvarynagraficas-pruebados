import React from 'react';
import { 
  Check, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  SlidersHorizontal 
} from 'lucide-react';
import { Product } from '../types';
import { BCV_EXCHANGE_RATE } from '../data/products';

interface ProductCardProps {
  product: Product;
  onCustomize: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onCustomize,
}) => {
  const priceBs = (product.basePrice * BCV_EXCHANGE_RATE).toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="bg-slate-900/90 backdrop-blur-xs text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-amber-500/30">
              {product.badge}
            </span>
          )}
          {product.requiresFiscalDoc && (
            <span className="bg-amber-600/95 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Requisitos SENIAT
            </span>
          )}
        </div>

        {/* Delivery Time Badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-2 py-1 rounded-md shadow-xs border border-slate-200 inline-flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-600" />
          {product.deliveryTime}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs font-medium text-amber-700 mt-1">
            {product.tagline}
          </p>

          <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Quick Specifications */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
            {product.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">
                Precio desde
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900">
                  ${product.basePrice.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  / {product.unit}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">
                Ref. BCV
              </span>
              <span className="text-xs font-bold text-slate-700">
                Bs. {priceBs}
              </span>
            </div>
          </div>

          <button
            type="button"
            id={`btn-customize-${product.id}`}
            onClick={() => onCustomize(product)}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs rounded-xl transition-all duration-150 flex items-center justify-center gap-2 group/btn shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400 group-hover/btn:text-slate-950 transition-colors" />
            <span>Personalizar y Cotizar</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
