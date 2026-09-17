import React, { useId } from 'react';
import { 
  ShieldCheck, 
  X, 
  FileCheck2, 
  AlertTriangle, 
  PhoneCall, 
  HelpCircle,
  Clock,
  CheckCircle2 
} from 'lucide-react';

interface SeniatRequirementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeniatRequirementsModal: React.FC<SeniatRequirementsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const modalTitleId = useId();
  const modalDescriptionId = useId();

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
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id={modalTitleId} className="text-base font-bold text-white">
                Guía de Requisitos Legales SENIAT
              </h2>
              <p id={modalDescriptionId} className="text-[11px] text-slate-400">
                Imprenta Digital Autorizada • Providencias y Facturación Fiscal Vigente
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar guía de requisitos"
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-amber-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-amber-900">¿Por qué se solicitan estos recaudos?</strong>
              <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                De acuerdo con la Providencia Administrativa del SENIAT (Reglamento de Facturación Fiscal), las imprentas autorizadas deben registrar formalmente ante el sistema tributario cada lote de facturas impresas con su respectivo rango de numeración correlativa.
              </p>
            </div>
          </div>

          {/* Recaudos Obligatorios */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              Documentos Requeridos para Facturas Fiscales:
            </h3>

            <div className="space-y-2.5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold">1. Copia del RIF Digital Vigente</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Debe ser el RIF actualizado con dirección fiscal vigente (Persona Natural o Jurídica).
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold">2. Cédula del Titular o Representante Legal</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Copia legible o foto nítida de la Cédula de Identidad venezolana vigente.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold">3. Última Declaración de IVA / ISLR o Factura Anterior</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Para verificar el último número correlativo emitido y asegurar la continuidad legal exacta sin saltos de numeración.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              ¿Cómo es el proceso de elaboración en Varyna Gráficas?
            </h3>

            <ol className="relative border-l border-slate-200 ml-3 space-y-4 py-2">
              <li className="ml-4">
                <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-amber-500 border border-white"></span>
                <strong className="text-slate-900">Paso 1: Solicitud del Pedido</strong>
                <p className="text-[11px] text-slate-500">Seleccionas tu cantidad y características en la tienda web.</p>
              </li>
              <li className="ml-4">
                <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-amber-500 border border-white"></span>
                <strong className="text-slate-900">Paso 2: Validación de Recaudos por WhatsApp</strong>
                <p className="text-[11px] text-slate-500">Nos envías tus fotos o PDF del RIF y cédula al WhatsApp de atención al cliente.</p>
              </li>
              <li className="ml-4">
                <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-amber-500 border border-white"></span>
                <strong className="text-slate-900">Paso 3: Aprobación del Arte Digital</strong>
                <p className="text-[11px] text-slate-500">Nuestros diseñadores te envían la muestra digital con tu logo y datos para tu visto bueno.</p>
              </li>
              <li className="ml-4">
                <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
                <strong className="text-slate-900">Paso 4: Impresión y Despacho</strong>
                <p className="text-[11px] text-slate-500">Imprimimos, numeramos, encuadernamos y despachamos a tu dirección o agencia MRW/Zoom/Tealca.</p>
              </li>
            </ol>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <a
            href="https://wa.me/584145558279?text=Hola%20tengo%20dudas%20sobre%20los%20requisitos%20SENIAT%20para%20mis%20facturas"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Consultar dudas con un asesor fiscal</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
