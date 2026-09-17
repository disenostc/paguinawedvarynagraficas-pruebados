import React from 'react';
import { 
  FileCheck2, 
  Sparkles, 
  Clock3, 
  Truck, 
  Briefcase, 
  Stethoscope, 
  Scale, 
  Store 
} from 'lucide-react';
import { ProductCategory, TargetProfession } from '../types';

interface HeroProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedProfession: TargetProfession;
  onSelectProfession: (prof: TargetProfession) => void;
  onOpenRequirements: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedProfession,
  onSelectProfession,
  onOpenRequirements,
}) => {
  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'todos', label: 'Todos los Productos' },
    { id: 'talonarios-fiscales', label: 'Talonarios Fiscales SENIAT' },
    { id: 'recipes-medicos', label: 'Récipes Médicos' },
    { id: 'sellos-automaticos', label: 'Sellos Automáticos' },
    { id: 'sellos-madera', label: 'Sellos de Madera' },
    { id: 'talonarios-administrativos', label: 'Recibos & Entregas' },
    { id: 'tarjetas-presentacion', label: 'Tarjetas de Presentación' },
    { id: 'papeleria-comercial', label: 'Comandas & Papelería' },
  ];

  const professions: { id: TargetProfession; label: string; icon: React.ReactNode }[] = [
    { id: 'todas', label: 'Ver Todo', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: 'empresas', label: 'Empresas & Pymes', icon: <Briefcase className="w-4 h-4 text-blue-500" /> },
    { id: 'medicos', label: 'Médicos & Clínicas', icon: <Stethoscope className="w-4 h-4 text-emerald-500" /> },
    { id: 'abogados-contadores', label: 'Abogados & Contadores', icon: <Scale className="w-4 h-4 text-purple-500" /> },
    { id: 'emprendedores', label: 'Emprendedores & Comercios', icon: <Store className="w-4 h-4 text-amber-600" /> },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Imprenta Gráfica Comercial • Experiencia & Rigor Legal
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Talonarios Fiscales, Sellos e Impresiones <span className="text-amber-400 underline decoration-amber-500/60 underline-offset-8">100% Legales</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              En <strong className="text-white">Varyna Gráficas C.A.</strong> imprimimos tus talonarios de facturación autorizados por el SENIAT, recibos de caja, récipes médicos con membrete y elaboramos tus sellos automáticos con despacho exprés en 24 horas.
            </p>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
                <FileCheck2 className="w-5 h-5 text-amber-400 mb-1" />
                <div className="text-xs font-bold text-white">Autorizados SENIAT</div>
                <div className="text-[11px] text-slate-400">Providencias en regla</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
                <Clock3 className="w-5 h-5 text-emerald-400 mb-1" />
                <div className="text-xs font-bold text-white">Sellos en 24h</div>
                <div className="text-[11px] text-slate-400">Autoentintables listos</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
                <Sparkles className="w-5 h-5 text-sky-400 mb-1" />
                <div className="text-xs font-bold text-white">Diseño Gratis</div>
                <div className="text-[11px] text-slate-400">Diagramación y pruebas</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
                <Truck className="w-5 h-5 text-indigo-400 mb-1" />
                <div className="text-xs font-bold text-white">Envío Nacional</div>
                <div className="text-[11px] text-slate-400">MRW, Zoom, Tealca</div>
              </div>
            </div>
          </div>

          {/* Quick Consultation & Assistance Card */}
          <div className="lg:col-span-4 bg-slate-800/90 border border-amber-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Atención Inmediata
              </h3>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-normal">
              ¿Vas a solicitar facturas por primera vez o renovar tu talonario? Nuestro equipo fiscal te guía paso a paso con los recaudos exigidos por el SENIAT.
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                id="hero-btn-seniat-guide"
                onClick={onOpenRequirements}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" />
                Ver Requisitos de Facturación SENIAT
              </button>

              <a
                href="https://wa.me/584145558279?text=Hola%20Varyna%20Gr%C3%A1ficas,%20necesito%20asesor%C3%ADa%20para%20mandar%20a%20hacer%20mis%20talonarios"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-slate-700/90 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs rounded-xl transition-colors border border-slate-600 flex items-center justify-center gap-2"
              >
                Chatear con un Asesor por WhatsApp
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/70 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Horario: Lun - Vie: 8:00 AM - 5:00 PM</span>
              <span className="text-emerald-400 font-semibold">Taller Abierto</span>
            </div>
          </div>

        </div>

        {/* Filter by Target Profession (Persona Segmenting) */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Encuentra soluciones diseñadas para tu profesión:
            </span>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {professions.map((prof) => {
              const active = selectedProfession === prof.id;
              return (
                <button
                  key={prof.id}
                  type="button"
                  id={`prof-filter-${prof.id}`}
                  onClick={() => onSelectProfession(prof.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700'
                  }`}
                >
                  {prof.icon}
                  {prof.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                id={`cat-filter-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  active
                    ? 'bg-white text-slate-900 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
