export type ProductCategory = 
  | 'todos'
  | 'talonarios-fiscales'
  | 'talonarios-administrativos'
  | 'recipes-medicos'
  | 'sellos-automaticos'
  | 'sellos-madera'
  | 'tarjetas-presentacion'
  | 'papeleria-comercial';

export type TargetProfession = 
  | 'todas'
  | 'empresas'
  | 'medicos'
  | 'abogados-contadores'
  | 'emprendedores';

export interface ProductOption {
  label: string;
  value: string;
  priceModifier: number; // in USD
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  targetProfessions: TargetProfession[];
  basePrice: number; // in USD
  unit: string;
  minQuantity: number;
  deliveryTime: string;
  requiresFiscalDoc: boolean;
  image: string;
  badge?: string;
  popular?: boolean;
  options: {
    quantities: number[];
    sizes: ProductOption[];
    copies?: ProductOption[];
    inkColors?: ProductOption[];
    paperTypes?: ProductOption[];
    stampInkColors?: ProductOption[];
  };
  features: string[];
}

export interface CustomizationData {
  companyName: string;
  rif: string;
  phone: string;
  address: string;
  specialtyOrTitle?: string;
  startingNumber?: string;
  logoNotes?: string;
  additionalNotes?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  category: ProductCategory;
  image: string;
  quantity: number;
  selectedSize: string;
  selectedCopies?: string;
  selectedInk?: string;
  selectedPaper?: string;
  unitPrice: number;
  totalPrice: number;
  customization: CustomizationData;
  requiresFiscalDoc: boolean;
}

export interface OrderCustomerInfo {
  fullName: string;
  documentType: 'V' | 'J' | 'E' | 'G';
  documentNumber: string;
  email: string;
  phone: string;
  deliveryMethod: 'tienda' | 'delivery' | 'mrw' | 'zoom' | 'tealca';
  deliveryAddress: string;
  city: string;
  state: string;
  paymentMethod: 'pago_movil' | 'transferencia' | 'zelle' | 'efectivo';
  paymentReference?: string;
  fiscalDocsUploaded?: boolean;
  notes?: string;
}

export interface Order {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  customer: OrderCustomerInfo;
  subtotal: number;
  iva: number;
  totalUsd: number;
  totalBs: number;
  exchangeRateBcv: number;
  status: 'recibido' | 'verificando_pago' | 'en_diseno' | 'en_prensa' | 'listo';
}
