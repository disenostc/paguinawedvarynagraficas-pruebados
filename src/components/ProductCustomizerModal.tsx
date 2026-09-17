import React, { useState, useId } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { Product, CartItem, CustomizationData } from '../types';
import { BCV_EXCHANGE_RATE } from '../data/products';

interface ProductCustomizerModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const modalTitleId = useId();
  const modalDescriptionId = useId();

  // State for selections
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    product.options.quantities[0] || product.minQuantity
  );
  const [selectedSizeValue, setSelectedSizeValue] = useState<string>(
    product.options.sizes[0]?.value || ''
  );
  const [selectedCopiesValue, setSelectedCopiesValue] = useState<string>(
    product.options.copies?.[0]?.value || ''
  );
  const [selectedInkValue, setSelectedInkValue] = useState<string>(
    product.options.inkColors?.[0]?.value || 
    product.options.stampInkColors?.[0]?.value || 
    ''
  );
  const [selectedPaperValue, setSelectedPaperValue] = useState<string>(
    product.options.paperTypes?.[0]?.value || ''
  );

  // Customization info
  const [customData, setCustomData] = useState<CustomizationData>({
    companyName: '',
    rif: '',
    phone: '',
    address: '',
    specialtyOrTitle: '',
    startingNumber: '0001',
    logoNotes: '',
    additionalNotes: '',
  });

  // Calculate pricing
  const currentSize = product.options.sizes.find(s => s.value === selectedSizeValue);
  const currentCopy = product.options.copies?.find(c => c.value === selectedCopiesValue);
  const currentInk = (product.options.inkColors || product.options.stampInkColors)?.find(i => i.value === selectedInkValue);
  const currentPaper = product.options.paperTypes?.find(p => p.value === selectedPaperValue);

  const sizeMod = currentSize?.priceModifier || 0;
  const copyMod = currentCopy?.priceModifier || 0;
  const inkMod = currentInk?.priceModifier || 0;
  const paperMod = currentPaper?.priceModifier || 0;

  // Base unit price with selected options
  const unitPrice = product.basePrice + sizeMod + copyMod + inkMod + paperMod;

  // Bulk discount
  let discountPercent = 0;
  if (product.category.includes('talonarios') || product.category === 'recipes-medicos') {
    if (selectedQuantity >= 20) discountPercent = 0.12;
    else if (selectedQuantity >= 10) discountPercent = 0.08;
    else if (selectedQuantity >= 5) discountPercent = 0.04;
  } else if (product.category === 'tarjetas-presentacion') {
    if (selectedQuantity >= 1000) discountPercent = 0.15;
    else if (selectedQuantity >= 500) discountPercent = 0.10;
  } else if (product.category.includes('sellos')) {
    if (selectedQuantity >= 5) discountPercent = 0.10;
    else if (selectedQuantity >= 3) discountPercent = 0.05;
  }

  const rawTotal = unitPrice * selectedQuantity;
  const discountAmount = rawTotal * discountPercent;
  const finalTotalUsd = rawTotal - discountAmount;
  const finalTotalBs = finalTotalUsd * BCV_EXCHANGE_RATE;

  const handleAdd = () => {
    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      category: product.category,
      image: product.image,
      quantity: selectedQuantity,
      selectedSize: currentSize?.label || selectedSizeValue,
      selectedCopies: currentCopy?.label,
      selectedInk: currentInk?.label,
      selectedPaper: currentPaper?.label,
      unitPrice: unitPrice * (1 - discountPercent),
      totalPrice: finalTotalUsd,
      customization: customData,
      requiresFiscalDoc: product.requiresFiscalDoc,
    };

    onAddToCart(cartItem);
    onClose();
  };

  const isStamp = product.category.includes('sellos');
  const isRecipe = product.category === 'recipes-medicos';
  const isBusinessCard = product.category === 'tarjetas-presentacion';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        aria-describedby={modalDescriptionId}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Configuración y Cotización en Vivo
              </span>
              {product.requiresFiscalDoc && (
                <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Requisito SENIAT
                </span>
              )}
            </div>
            <h2 id={modalTitleId} className="text-lg font-bold text-white mt-0.5">
              {product.name}
            </h2>
            <p id={modalDescriptionId} className="text-xs text-slate-300">
              Personaliza el formato, los datos de impresión y revisa la cotización al instante.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split in 2 columns (Interactive Preview & Controls) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Live Visual Mockup Preview */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Muestra Digital en Vivo
              </span>
              <span className="text-[11px] text-slate-400">
                Se actualiza con tus datos
              </span>
            </div>

            {/* LIVE PREVIEW CANVAS */}
            <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 flex flex-col items-center justify-center min-h-[300px] relative shadow-inner">
              
              {/* TALONARIO / INVOICE PREVIEW */}
              {!isStamp && !isRecipe && !isBusinessCard && (
                <div className="w-full bg-white rounded-lg shadow-md border border-slate-300 p-4 text-[10px] text-slate-700 font-mono relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-red-600 font-bold border border-red-300 bg-red-50 px-2 py-0.5 rounded text-[10px]">
                    N° {customData.startingNumber || '0000001'}
                  </div>

                  <div className="pr-20 mb-3">
                    <div className="font-bold text-slate-900 text-xs uppercase tracking-tight">
                      {customData.companyName || 'TU EMPRESA O NEGOCIO, C.A.'}
                    </div>
                    <div className="text-[9px] text-slate-500 font-sans">
                      RIF: {customData.rif || 'J-12345678-9'}
                    </div>
                    <div className="text-[8px] text-slate-400 font-sans truncate">
                      {customData.address || 'Dirección fiscal de tu empresa'}
                    </div>
                    <div className="text-[8px] text-slate-400 font-sans">
                      Telf: {customData.phone || '0414-0000000'}
                    </div>
                  </div>

                  <div className="border-t border-b border-slate-300 py-1.5 my-2 grid grid-cols-4 gap-1 text-[8px] font-sans font-semibold bg-slate-50 px-1">
                    <span className="col-span-2">DESCRIPCIÓN</span>
                    <span className="text-center">CANT.</span>
                    <span className="text-right">TOTAL</span>
                  </div>

                  <div className="space-y-1 py-1 text-[8px] text-slate-400 font-sans">
                    <div className="h-2 bg-slate-100 rounded w-full"></div>
                    <div className="h-2 bg-slate-100 rounded w-3/4"></div>
                    <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-dashed border-slate-300 text-[7px] text-slate-400 font-sans flex justify-between items-center">
                    <span>Imprenta Varyna Gráficas C.A. • RIF J-30882194-0</span>
                    <span className="bg-emerald-100 text-emerald-800 px-1 rounded font-bold">ORIGINAL BLANCA</span>
                  </div>
                </div>
              )}

              {/* MEDICAL RECIPE PREVIEW */}
              {isRecipe && (
                <div className="w-full bg-white rounded-lg shadow-md border border-slate-300 p-4 text-slate-700 font-serif relative">
                  <div className="text-center pb-2 border-b border-sky-100">
                    <div className="font-bold text-slate-900 text-xs">
                      {customData.companyName || 'DR. ALEJANDRO MENDOZA'}
                    </div>
                    <div className="text-[9px] text-sky-800 font-sans font-semibold">
                      {customData.specialtyOrTitle || 'MÉDICO CIRUJANO - PEDIATRA'}
                    </div>
                    <div className="text-[8px] text-slate-500 font-sans">
                      M.P.P.S: 45.892 • C.M.D.F: 12.304
                    </div>
                  </div>

                  <div className="py-4 px-2">
                    <div className="text-2xl font-bold text-sky-700 font-sans mb-2">
                      ℞
                    </div>
                    <div className="space-y-2 text-[8px] text-slate-400 font-sans">
                      <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-4/5"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-3/4"></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 text-[8px] text-slate-500 font-sans flex justify-between items-end">
                    <div>
                      <div>{customData.address || 'Consultorio Médico, Torre Médica Piso 3'}</div>
                      <div>Telf: {customData.phone || '0414-555-0000'}</div>
                    </div>
                    <div className="text-center">
                      <div className="w-20 border-b border-slate-400 mb-0.5"></div>
                      <span className="text-[7px]">Firma & Sello Húmedo</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAMP PREVIEW */}
              {isStamp && (
                <div className="w-full max-w-[280px] bg-[#fbfbf8] rounded-lg shadow-sm border border-amber-200/60 p-6 flex flex-col items-center justify-center text-center relative">
                  <div className="absolute top-2 left-2 text-[9px] text-slate-400 font-sans">
                    Impresión del Sello:
                  </div>

                  {/* Stamp Frame and Text with authentic stamped ink color */}
                  <div 
                    className={`border-2 rounded-lg p-3 w-full transition-colors ${
                      selectedInkValue === 'negro'
                        ? 'border-slate-800 text-slate-900'
                        : selectedInkValue === 'rojo'
                        ? 'border-rose-600 text-rose-700'
                        : selectedInkValue === 'verde'
                        ? 'border-emerald-700 text-emerald-800'
                        : 'border-blue-700 text-blue-800'
                    }`}
                  >
                    <div className="font-extrabold text-xs uppercase tracking-wider">
                      {customData.companyName || 'VARYNA GRÁFICAS C.A.'}
                    </div>
                    <div className="text-[10px] font-bold mt-0.5">
                      RIF: {customData.rif || 'J-30882194-0'}
                    </div>
                    {customData.specialtyOrTitle && (
                      <div className="text-[9px] font-semibold italic">
                        {customData.specialtyOrTitle}
                      </div>
                    )}
                    <div className="text-[9px] mt-0.5">
                      {customData.phone || 'TELF: 0414-555-8279'}
                    </div>
                  </div>

                  <span className="text-[9px] text-slate-400 mt-3 font-sans">
                    Color seleccionado: {currentInk?.label || 'Azul'}
                  </span>
                </div>
              )}

              {/* BUSINESS CARD PREVIEW */}
              {isBusinessCard && (
                <div className="w-[280px] aspect-[9/5] bg-slate-900 text-white rounded-lg shadow-xl p-4 flex flex-col justify-between border border-slate-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"></div>
                  <div>
                    <span className="text-amber-400 text-[10px] font-extrabold tracking-widest uppercase">
                      {customData.companyName || 'ESTUDIO PROFESIONAL'}
                    </span>
                    <div className="text-xs font-bold text-white mt-1">
                      {customData.specialtyOrTitle || 'ASESORÍA & CONSULTORÍA'}
                    </div>
                  </div>

                  <div className="text-[8px] text-slate-300 space-y-0.5">
                    <div>RIF: {customData.rif || 'J-12345678-9'}</div>
                    <div>Telf: {customData.phone || '+58 414-000-0000'}</div>
                    <div className="truncate">{customData.address || 'Av. Principal, Barinas'}</div>
                  </div>
                </div>
              )}

            </div>

            {/* Assistance Notice */}
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">¿Tienes un diseño o logo propio?</strong>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Al completar tu pedido podrás adjuntarnos tu logotipo por WhatsApp. Te enviamos la prueba final antes de mandar a imprimir.
                </p>
              </div>
            </div>

            {product.requiresFiscalDoc && (
              <div className="bg-sky-50 rounded-xl p-3 border border-sky-200 text-xs text-sky-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Requisitos SENIAT</strong>
                  <p className="text-[11px] text-sky-800 mt-0.5">
                    Requiere copia de RIF actualizado, Cédula del titular y última declaración de IVA.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Configurator Controls */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 1. Tiraje / Cantidad */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  Cantidad / Tiraje:
                </label>
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Ahorras {(discountPercent * 100).toFixed(0)}% por volumen
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.options.quantities.map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setSelectedQuantity(qty)}
                    className={`py-2 px-1 text-center rounded-xl font-bold text-xs border transition-all ${
                      selectedQuantity === qty
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>{qty}</div>
                    <div className="text-[10px] font-normal opacity-80">
                      {isBusinessCard ? 'tarjetas' : isStamp ? 'sello' : 'talonarios'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Tamaño / Formato */}
            {product.options.sizes && product.options.sizes.length > 0 && (
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
                  Tamaño / Formato:
                </label>
                <div className="space-y-1.5">
                  {product.options.sizes.map((size) => (
                    <label
                      key={size.value}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedSizeValue === size.value
                          ? 'border-amber-500 bg-amber-50/50 text-slate-900 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="product-size"
                          value={size.value}
                          checked={selectedSizeValue === size.value}
                          onChange={() => setSelectedSizeValue(size.value)}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span>{size.label}</span>
                      </div>
                      {size.priceModifier !== 0 && (
                        <span className="text-[11px] font-bold text-slate-500">
                          {size.priceModifier > 0 ? `+$${size.priceModifier.toFixed(2)}` : `-$${Math.abs(size.priceModifier).toFixed(2)}`}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Número de Copias / Papel Autocopiante (para talonarios) */}
            {product.options.copies && product.options.copies.length > 0 && (
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
                  Copias Químicas Autocopiantes:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.options.copies.map((copy) => (
                    <button
                      key={copy.value}
                      type="button"
                      onClick={() => setSelectedCopiesValue(copy.value)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        selectedCopiesValue === copy.value
                          ? 'border-amber-500 bg-amber-50/60 font-semibold text-slate-900'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{copy.label}</span>
                        {selectedCopiesValue === copy.value && (
                          <Check className="w-3.5 h-3.5 text-amber-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Color de Tinta / Acabado */}
            {(product.options.inkColors || product.options.stampInkColors) && (
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
                  Color de Tinta / Impresión:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(product.options.inkColors || product.options.stampInkColors)!.map((ink) => (
                    <button
                      key={ink.value}
                      type="button"
                      onClick={() => setSelectedInkValue(ink.value)}
                      className={`p-2 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        selectedInkValue === ink.value
                          ? 'border-amber-500 bg-amber-50/60 font-semibold text-slate-900'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span>{ink.label}</span>
                      {selectedInkValue === ink.value && (
                        <Check className="w-3.5 h-3.5 text-amber-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Datos para personalizar la impresión */}
            <div className="pt-3 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-3">
                Datos para la Impresión (Opcional ahora, se confirman por WhatsApp):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    {isRecipe ? 'Nombre del Doctor / Especialista:' : 'Nombre de la Empresa o Razón Social:'}
                  </label>
                  <input
                    type="text"
                    placeholder={isRecipe ? 'Ej. Dra. Carmen Velásquez' : 'Ej. Inversiones Barinas, C.A.'}
                    value={customData.companyName}
                    onChange={(e) => setCustomData({ ...customData, companyName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    RIF o Cédula de Identidad:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. J-12345678-9 o V-18.456.789"
                    value={customData.rif}
                    onChange={(e) => setCustomData({ ...customData, rif: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    {isRecipe ? 'Especialidad / MPPS / Colegio:' : isStamp ? 'Cargo o Título Profesional:' : 'Teléfono de Contacto:'}
                  </label>
                  <input
                    type="text"
                    placeholder={isRecipe ? 'Pediatra - MPPS 12345' : 'Ej. 0414-555-8279'}
                    value={isRecipe || isStamp ? customData.specialtyOrTitle : customData.phone}
                    onChange={(e) => {
                      if (isRecipe || isStamp) {
                        setCustomData({ ...customData, specialtyOrTitle: e.target.value });
                      } else {
                        setCustomData({ ...customData, phone: e.target.value });
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                {!isStamp && !isRecipe && !isBusinessCard && (
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">
                      Número Correlativo Inicial:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 0001 (o continúa tu anterior)"
                      value={customData.startingNumber}
                      onChange={(e) => setCustomData({ ...customData, startingNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer: Live Total & Confirmation CTA */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-medium text-slate-500 block">
              Total Calculado ({selectedQuantity} {selectedQuantity === 1 ? 'unidad' : 'unidades'}):
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                ${finalTotalUsd.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-slate-600">
                / Bs. {finalTotalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {discountPercent > 0 && (
                <span className="text-[11px] font-semibold text-emerald-600">
                  (-${discountAmount.toFixed(2)} desc)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              id="modal-btn-add-to-cart"
              onClick={handleAdd}
              className="py-2.5 px-6 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Agregar a mi Pedido</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
