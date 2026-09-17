import React, { useState, useId } from 'react';
import { 
  X, 
  Check, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Building2, 
  Send, 
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { CartItem, Order, OrderCustomerInfo } from '../types';
import { BCV_EXCHANGE_RATE } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const modalTitleId = useId();
  const modalDescriptionId = useId();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [customer, setCustomer] = useState<OrderCustomerInfo>({
    fullName: '',
    documentType: 'J',
    documentNumber: '',
    email: '',
    phone: '',
    deliveryMethod: 'tienda',
    deliveryAddress: '',
    city: 'Barinas',
    state: 'Barinas',
    paymentMethod: 'pago_movil',
    paymentReference: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotalUsd = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const ivaUsd = subtotalUsd * 0.16;
  const totalUsd = subtotalUsd + ivaUsd;
  const totalBs = totalUsd * BCV_EXCHANGE_RATE;

  const hasFiscalItems = items.some(i => i.requiresFiscalDoc);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!customer.fullName.trim()) errs.fullName = 'Ingresa el nombre o razón social';
    if (!customer.documentNumber.trim()) errs.documentNumber = 'Ingresa el número de RIF o Cédula';
    if (!customer.phone.trim()) errs.phone = 'Ingresa un número de teléfono de contacto';
    if (!customer.email.trim()) errs.email = 'Ingresa un correo electrónico';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (customer.deliveryMethod !== 'tienda' && !customer.deliveryAddress.trim()) {
      errs.deliveryAddress = 'Ingresa la dirección de entrega o agencia de encomienda';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleFinishOrder = () => {
    const orderNumber = `VAR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      orderNumber,
      createdAt: new Date().toISOString(),
      items,
      customer,
      subtotal: subtotalUsd,
      iva: ivaUsd,
      totalUsd,
      totalBs,
      exchangeRateBcv: BCV_EXCHANGE_RATE,
      status: 'recibido',
    };

    // Format WhatsApp message with order details
    const itemsText = items.map((it, idx) => 
      `${idx + 1}. *${it.productName}* (${it.quantity} un.) - $${it.totalPrice.toFixed(2)}\n   • Formato: ${it.selectedSize}${it.selectedCopies ? ` | ${it.selectedCopies}` : ''}\n   • Personalizado: ${it.customization.companyName || 'Sin especificar'}`
    ).join('\n\n');

    const message = encodeURIComponent(
      `🧾 *NUEVO PEDIDO VARYNA GRÁFICAS C.A.*\n` +
      `*Orden:* #${orderNumber}\n` +
      `*Cliente:* ${customer.fullName} (${customer.documentType}-${customer.documentNumber})\n` +
      `*Teléfono:* ${customer.phone}\n` +
      `*Entrega:* ${customer.deliveryMethod.toUpperCase()} (${customer.deliveryAddress || 'Retiro en Taller'})\n` +
      `*Método de Pago:* ${customer.paymentMethod.toUpperCase()}\n\n` +
      `📦 *DETALLE DE PRODUCTOS:*\n${itemsText}\n\n` +
      `💰 *Subtotal:* $${subtotalUsd.toFixed(2)}\n` +
      `📑 *IVA (16%):* $${ivaUsd.toFixed(2)}\n` +
      `💵 *TOTAL USD:* $${totalUsd.toFixed(2)}\n` +
      `🇻🇪 *TOTAL BCV:* Bs. ${totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\n` +
      `Hola equipo de Varyna Gráficas, acabo de registrar mi pedido en la tienda web y quedo atento a sus indicaciones para el envío de artes y comprobante.`
    );

    const whatsappUrl = `https://wa.me/584145558279?text=${message}`;
    
    onOrderComplete(newOrder);
    window.open(whatsappUrl, '_blank');
    onClose();
  };

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
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Finalizar Pedido Oficial
            </span>
            <h2 id={modalTitleId} className="text-base font-bold text-white mt-0.5">
              Varyna Gráficas C.A. • Datos & Despacho
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de pedido"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 font-bold ${step >= 1 ? 'text-amber-600' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-300 text-slate-600'}`}>1</span>
            <span>Identificación</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 font-bold ${step >= 2 ? 'text-amber-600' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-300 text-slate-600'}`}>2</span>
            <span>Entrega</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 font-bold ${step >= 3 ? 'text-amber-600' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-amber-500 text-slate-950' : 'bg-slate-300 text-slate-600'}`}>3</span>
            <span>Pago & WhatsApp</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <p id={modalDescriptionId} className="sr-only">
            Formulario de tres pasos para completar los datos de identificación, despacho y confirmación de pago de tu pedido.
          </p>
          
          {/* STEP 1: CLIENT DATA */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Datos del Cliente o Razón Social</span>
              </div>

              {hasFiscalItems && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold">Para Talonarios Fiscales SENIAT:</span>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      Los datos aquí suministrados deben coincidir con la información de tu RIF vigente para emitir la providencia y factura autorizada.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nombre Completo o Razón Social de la Empresa *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Distribuidora Los Llanos, C.A. / Dr. Carlos Méndez"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                  {errors.fullName && <p className="text-red-500 text-[11px] mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tipo de Documento *
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {(['J', 'V', 'E', 'G'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCustomer({ ...customer, documentType: type })}
                        className={`py-2 text-center rounded-lg font-bold border text-xs ${
                          customer.documentType === type
                            ? 'bg-amber-500 text-slate-950 border-amber-500'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Número de RIF o Cédula *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. 12345678-9 o 18456789"
                    value={customer.documentNumber}
                    onChange={(e) => setCustomer({ ...customer, documentNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                  {errors.documentNumber && <p className="text-red-500 text-[11px] mt-1">{errors.documentNumber}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Teléfono Móvil (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 0414-555-8279"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                  {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    placeholder="contacto@tuempresa.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                  {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERY */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Modalidad de Despacho y Entrega</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'tienda', title: 'Retiro en Taller (Barinas)', desc: 'Gratis. Listo en horario de 8:00 AM a 5:00 PM.' },
                  { id: 'delivery', title: 'Delivery Express Barinas', desc: 'Mensajería local en el casco central y zonas aledañas.' },
                  { id: 'mrw', title: 'Envío Nacional MRW', desc: 'Cobro en destino a cualquier agencia del país.' },
                  { id: 'zoom', title: 'Envío Nacional Grupo ZOOM', desc: 'Cobro en destino con seguro de encomienda.' },
                  { id: 'tealca', title: 'Envío Nacional Tealca', desc: 'Cobro en destino a sucursal o domicilio.' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      customer.deliveryMethod === item.id
                        ? 'border-amber-500 bg-amber-50/70 font-semibold'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{item.title}</span>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={item.id}
                        checked={customer.deliveryMethod === item.id}
                        onChange={() => setCustomer({ ...customer, deliveryMethod: item.id as any })}
                        className="text-amber-600"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 font-normal">{item.desc}</span>
                  </label>
                ))}
              </div>

              {customer.deliveryMethod !== 'tienda' && (
                <div className="space-y-2 text-xs pt-2">
                  <label className="block font-semibold text-slate-700">
                    Dirección de Entrega o Agencia Seleccionada *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej. Agencia MRW Barinas Centro / Av. Sucre frente al banco, Edif. San José, Piso 1"
                    value={customer.deliveryAddress}
                    onChange={(e) => setCustomer({ ...customer, deliveryAddress: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                  {errors.deliveryAddress && <p className="text-red-500 text-[11px]">{errors.deliveryAddress}</p>}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD & WHATSAPP INTEGRATION */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span>Método de Pago Preferido</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'pago_movil', label: 'Pago Móvil (Bs.)', desc: 'Banesco / Mercantil' },
                  { id: 'transferencia', label: 'Transferencia (Bs.)', desc: 'Banesco / Venezuela' },
                  { id: 'zelle', label: 'Zelle (USD)', desc: 'Cuentas autorizadas' },
                  { id: 'efectivo', label: 'Efectivo / Divisas', desc: 'En tienda Barinas' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setCustomer({ ...customer, paymentMethod: pm.id as any })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      customer.paymentMethod === pm.id
                        ? 'border-amber-500 bg-amber-50 text-slate-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div>{pm.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{pm.desc}</div>
                  </button>
                ))}
              </div>

              {/* Payment Details Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                <div className="flex justify-between items-center font-bold text-slate-900 border-b border-slate-200 pb-2">
                  <span>Datos Oficiales de Pago:</span>
                  <span className="text-emerald-700 font-extrabold">
                    Tasa Oficial BCV: Bs. {BCV_EXCHANGE_RATE.toFixed(2)}
                  </span>
                </div>

                {customer.paymentMethod === 'pago_movil' && (
                  <div className="space-y-1 font-mono text-[11px] text-slate-700">
                    <div>• <strong>Banco:</strong> Banesco (0134) / Mercantil (0105)</div>
                    <div>• <strong>Teléfono:</strong> 0414-555-8279</div>
                    <div>• <strong>RIF:</strong> J-30882194-0 (Varyna Gráficas C.A.)</div>
                    <div>• <strong>Monto Exacto:</strong> Bs. {totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                )}

                {customer.paymentMethod === 'transferencia' && (
                  <div className="space-y-1 font-mono text-[11px] text-slate-700">
                    <div>• <strong>Banco:</strong> Banesco Banco Universal</div>
                    <div>• <strong>Cuenta Corriente:</strong> 0134-0372-11-3721098452</div>
                    <div>• <strong>Titular:</strong> Varyna Gráficas C.A. (RIF J-30882194-0)</div>
                    <div>• <strong>Total a Transferir:</strong> Bs. {totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                )}

                {customer.paymentMethod === 'zelle' && (
                  <div className="space-y-1 font-mono text-[11px] text-slate-700">
                    <div>• <strong>Zelle Email:</strong> pagos@varynagraficas.com</div>
                    <div>• <strong>Titular:</strong> Varyna Graphics LLC</div>
                    <div>• <strong>Total a Enviar:</strong> ${totalUsd.toFixed(2)} USD</div>
                  </div>
                )}

                {customer.paymentMethod === 'efectivo' && (
                  <div className="text-[11px] text-slate-600">
                    Puedes cancelar directamente en nuestra sede principal de Barinas al momento de retirar tus talonarios o sellos.
                  </div>
                )}
              </div>

              {/* Summary and WhatsApp Notice */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-950 flex items-start gap-2.5">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-emerald-900">Validación Rápida por WhatsApp:</strong>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    Al presionar <strong>"Enviar y Confirmar por WhatsApp"</strong> se abrirá la conversación oficial de Varyna Gráficas con tu número de orden y detalle completo. Allí podrás adjuntar comprobante de pago y recaudos SENIAT.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Order Totals Summary */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{items.length} productos seleccionados</span>
              <span>Subtotal + IVA: ${totalUsd.toFixed(2)}</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-bold text-slate-800 text-sm">Total Oficial:</span>
              <div className="text-right">
                <span className="font-extrabold text-xl text-slate-900">${totalUsd.toFixed(2)}</span>
                <span className="text-xs text-slate-600 font-bold block">
                  Bs. {totalBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as any)}
              className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            >
              Atrás
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            >
              Cancelar
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              id="checkout-btn-next"
              onClick={handleNext}
              className="py-2.5 px-6 rounded-xl text-xs font-bold bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white transition-all shadow-sm"
            >
              Siguiente Paso
            </button>
          ) : (
            <button
              type="button"
              id="checkout-btn-finish"
              onClick={handleFinishOrder}
              className="py-2.5 px-6 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Enviar y Confirmar por WhatsApp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
