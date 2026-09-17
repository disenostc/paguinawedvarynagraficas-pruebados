import React, { useState, useEffect, useMemo } from 'react';
import { 
  Printer, 
  Search, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  FileText, 
  Filter, 
  Layers, 
  ChevronRight,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { 
  Product, 
  ProductCategory, 
  TargetProfession, 
  CartItem, 
  Order 
} from './types';
import { PRODUCTS, BCV_EXCHANGE_RATE } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductCustomizerModal } from './components/ProductCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LiveQuoteCalculator } from './components/LiveQuoteCalculator';
import { SeniatRequirementsModal } from './components/SeniatRequirementsModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Filter States
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [selectedProfession, setSelectedProfession] = useState<TargetProfession>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('varyna_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal States
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isRequirementsOpen, setIsRequirementsOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('varyna_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart Handlers
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
    showToast(`✓ Agregado "${item.productName}" al pedido`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    setCartItems(prev => 
      prev.map(it => {
        if (it.id === itemId) {
          const unitPrice = it.unitPrice;
          return {
            ...it,
            quantity: newQty,
            totalPrice: unitPrice * newQty,
          };
        }
        return it;
      })
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(it => it.id !== itemId));
    showToast('Producto eliminado del pedido');
  };

  const handleStartCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (order: Order) => {
    setCartItems([]);
    setCompletedOrder(order);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      // Category match
      if (selectedCategory !== 'todos' && prod.category !== selectedCategory) {
        return false;
      }
      // Profession match
      if (selectedProfession !== 'todas' && !prod.targetProfessions.includes(selectedProfession) && !prod.targetProfessions.includes('todas')) {
        return false;
      }
      // Search text match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = prod.name.toLowerCase().includes(query);
        const matchTag = prod.tagline.toLowerCase().includes(query);
        const matchDesc = prod.description.toLowerCase().includes(query);
        const matchBadge = prod.badge?.toLowerCase().includes(query);
        return matchName || matchTag || matchDesc || matchBadge;
      }
      return true;
    });
  }, [selectedCategory, selectedProfession, searchQuery]);

  const totalCartUsd = cartItems.reduce((acc, it) => acc + it.totalPrice, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        cartCount={cartItems.length}
        cartTotalUsd={totalCartUsd}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenRequirements={() => setIsRequirementsOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Main Hero & Navigation Filter */}
      <Hero
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedProfession={selectedProfession}
        onSelectProfession={setSelectedProfession}
        onOpenRequirements={() => setIsRequirementsOpen(true)}
      />

      {/* Main Content: Products Catalog */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Results Header and Quick Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Catálogo de Productos & Talonarios
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Mostrando {filteredProducts.length} de {PRODUCTS.length} productos disponibles con precios actualizados al día.
            </p>
          </div>

          {(selectedCategory !== 'todos' || selectedProfession !== 'todas' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedProfession('todas');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto"
            >
              Limpiar filtros aplicados
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCustomize={(prod) => setCustomizingProduct(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No encontramos resultados</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              No hay productos con los filtros o el término "{searchQuery}". Intenta con otra categoría o restablece los filtros.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedProfession('todas');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        )}

        {/* Informative Banner SENIAT Providencia */}
        <div className="mt-14 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Imprenta Autorizada SENIAT • Providencia Oficial Nº 0048
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              ¿Requieres talonarios con especificaciones fiscales especiales?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Trabajamos con facturas fiscales, notas de crédito, notas de débito, guías de despacho y formas libres autorizadas con numeración correlativa en tinta roja de seguridad y papel químico autocopiante de primera calidad.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setIsRequirementsOpen(true)}
              className="py-3 px-5 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs rounded-xl border border-slate-200 shadow-xs transition-colors text-center"
            >
              Consultar Recaudos
            </button>
            <a
              href="https://wa.me/584145558279?text=Hola%20Varyna%20Gr%C3%A1ficas,%20quisiera%20asesor%C3%ADa%20para%20un%20tiraje%20especial%20de%20facturas"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contactar Asesor</span>
            </a>
          </div>
        </div>

      </main>

      {/* Floating Action Button for WhatsApp */}
      <a
        href="https://wa.me/584145558279?text=Hola%20Varyna%20Gr%C3%A1ficas,%20deseo%20hacer%20una%20consulta"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group"
        aria-label="Atención por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-bold whitespace-nowrap">
          ¿Dudas? Chatea con nosotros
        </span>
      </a>

      {/* Modals and Drawers */}
      <ProductCustomizerModal
        product={customizingProduct}
        onClose={() => setCustomizingProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleStartCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={handleOrderComplete}
      />

      <LiveQuoteCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onSelectAndCustomize={(product) => {
          setCustomizingProduct(product);
        }}
      />

      <SeniatRequirementsModal
        isOpen={isRequirementsOpen}
        onClose={() => setIsRequirementsOpen(false)}
      />

      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Footer */}
      <Footer
        onOpenRequirements={() => setIsRequirementsOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

    </div>
  );
}
