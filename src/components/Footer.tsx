import React from 'react';
import { 
  Printer, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  MessageCircle,
  FileText
} from 'lucide-react';
import { FREQUENT_QUESTIONS } from '../data/products';

interface FooterProps {
  onOpenRequirements: () => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRequirements,
  onOpenCalculator,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Frequently Asked Questions Section */}
        <div className="border-b border-slate-800 pb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              Resolvemos tus Inquietudes
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Preguntas Frecuentes sobre Impresión y Facturación
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FREQUENT_QUESTIONS.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-4.5 hover:border-slate-700 transition-colors"
              >
                <h3 className="font-bold text-white text-xs sm:text-sm flex items-start gap-2 mb-2">
                  <span className="text-amber-500 font-extrabold shrink-0">P.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-slate-400 pl-5 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand, Info & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Presentation */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Printer className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Varyna <span className="text-amber-500">Gráficas</span> C.A.
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Empresa líder en diseño, diagramación y manufactura gráfica autorizada. Especialistas en talonarios de facturación fiscal, recibos, récipes médicos y sellos profesionales con cobertura nacional.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Imprenta Autorizada SENIAT</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Servicios & Productos
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>• Facturas y Notas de Débito/Crédito SENIAT</li>
              <li>• Talonarios de Recibos y Comprobantes</li>
              <li>• Récipes Médicos y Órdenes Clínicas</li>
              <li>• Sellos Automáticos Autoentintables</li>
              <li>• Sellos de Madera Tradicionales</li>
              <li>• Tarjetas de Presentación en Glase 300g</li>
              <li>• Comandas para Restaurantes</li>
            </ul>
          </div>

          {/* Tools & Assistance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Herramientas & Asistencia
            </h4>
            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={onOpenRequirements}
                className="w-full text-left text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>Requisitos Legales SENIAT</span>
              </button>

              <button
                type="button"
                onClick={onOpenCalculator}
                className="w-full text-left text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <span>⚡</span>
                <span>Calculadora de Cotizaciones</span>
              </button>

              <a
                href="https://wa.me/584145558279?text=Hola%20Varyna%20Gr%C3%A1ficas,%20quisiera%20asesor%C3%ADa%20personalizada"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5 pt-1"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Asesoría por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Sede & Atención al Cliente
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Barinas, Estado Barinas, Venezuela. Despachos diarios a todo el territorio nacional.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+58 (414) 555-8279 / (0273) 500-1122</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>pedidos@varynagraficas.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lunes a Viernes: 8:00 AM a 5:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Tax Identification */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Varyna Gráficas C.A. • RIF: J-30882194-0. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Privacidad Fiscal</span>
            <span>•</span>
            <span>Términos de Impresión</span>
            <span>•</span>
            <span>Envíos Asegurados</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
