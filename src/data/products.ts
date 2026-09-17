import { Product } from '../types';

export const BCV_EXCHANGE_RATE = 78.50; // Tasa referencial Bs./USD

export const PRODUCTS: Product[] = [
  {
    id: 'talonario-factura-seniat',
    name: 'Talonario de Facturas Fiscales SENIAT',
    tagline: 'Cumplimiento legal garantizado con providencia SENIAT',
    description: 'Impresión autorizada de facturas fiscales en papel químico autocopiante de primera calidad. Incluye foliado consecutivo en tinta roja, datos fiscales según normativa vigente y microfilm de seguridad.',
    category: 'talonarios-fiscales',
    targetProfessions: ['empresas', 'abogados-contadores', 'emprendedores'],
    basePrice: 14.00,
    unit: 'talonario (50 juegos)',
    minQuantity: 5,
    deliveryTime: '3 a 4 días hábiles',
    requiresFiscalDoc: true,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    badge: 'Autorizado SENIAT',
    popular: true,
    features: [
      'Papel químico autocopiante blanco/amarillo/rosado',
      'Numeración correlativa mecánica en tinta roja',
      'Puntillado de fácil desprendimiento',
      'Carátula envolvente protectora',
      'Cumple 100% con Providencia Administrativa SENIAT'
    ],
    options: {
      quantities: [5, 10, 20, 50],
      sizes: [
        { label: 'Media Carta (14 x 21.5 cm) - Estándar', value: '1/2_carta', priceModifier: 0 },
        { label: 'Carta Completa (21.5 x 28 cm)', value: 'carta', priceModifier: 5.50 },
        { label: 'Cuarto de Carta (11 x 14 cm)', value: '1/4_carta', priceModifier: -2.00 }
      ],
      copies: [
        { label: 'Original + 1 Copia (Duplicado químico)', value: 'orig_1copia', priceModifier: 0 },
        { label: 'Original + 2 Copias (Triplicado químico)', value: 'orig_2copias', priceModifier: 3.50 }
      ],
      inkColors: [
        { label: 'Tinta Negra / Azul Reflex (Estándar SENIAT)', value: '1_tinta', priceModifier: 0 },
        { label: '2 Tintas (Logotipo a 2 colores)', value: '2_tintas', priceModifier: 2.50 }
      ]
    }
  },
  {
    id: 'recipes-medicos-personalizados',
    name: 'Récipes Médicos y Constancias',
    tagline: 'Elegancia y rigor para doctores, odontólogos y psicólogos',
    description: 'Talonarios para prescripción de medicamentos, órdenes de laboratorio y constancias médicas. Incluye membrete con logo de clínica, número de colegiatura, MPPS y datos de contacto.',
    category: 'recipes-medicos',
    targetProfessions: ['medicos', 'emprendedores'],
    basePrice: 8.50,
    unit: 'talonario (100 hojas)',
    minQuantity: 3,
    deliveryTime: '24 a 48 horas',
    requiresFiscalDoc: false,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    badge: 'Médicos & Clínicas',
    popular: true,
    features: [
      'Papel bond base 20 (75g) blanco brillante de alto calibre',
      'Espacio legal para firma, sello húmedo y código de barra',
      'Encolado al lomo superior libre de residuos',
      'Diseño y diagramación médica sin costo adicional',
      'Disponible en 1 tinta o full color'
    ],
    options: {
      quantities: [3, 5, 10, 20],
      sizes: [
        { label: 'Media Carta (14 x 21.5 cm) - Clásico', value: '1/2_carta', priceModifier: 0 },
        { label: 'Cuarto de Carta (11 x 14 cm) - Bolsillo', value: '1/4_carta', priceModifier: -1.50 },
        { label: 'Carta Completa (21.5 x 28 cm) - Informes', value: 'carta', priceModifier: 4.00 }
      ],
      copies: [
        { label: 'Hojas Sueltas Encoladas (100 hojas simples)', value: 'simple', priceModifier: 0 },
        { label: 'Original + Copia Autocopiante (50 juegos)', value: 'quimico_duplicado', priceModifier: 2.00 }
      ],
      inkColors: [
        { label: 'Full Color (Logo a todo color y detalles)', value: 'full_color', priceModifier: 2.00 },
        { label: 'Monocromático Azul Médico / Gris', value: 'monocromatico', priceModifier: 0 }
      ]
    }
  },
  {
    id: 'sello-automatico-profesional',
    name: 'Sello Automático Autoentintable (Tipo Trodat/Shiny)',
    tagline: 'Impresión limpia y rápida de 1 solo toque',
    description: 'Sello de mecanismo retráctil de alta durabilidad con almohadilla de tinta incorporada para más de 10.000 impresiones nítidas. Ideal para médicos, contadores, abogados, recepción y firmas autorizadas.',
    category: 'sellos-automaticos',
    targetProfessions: ['medicos', 'abogados-contadores', 'empresas', 'emprendedores'],
    basePrice: 12.00,
    unit: 'unidad',
    minQuantity: 1,
    deliveryTime: 'Listo en 24 horas',
    requiresFiscalDoc: false,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    badge: 'Despacho en 24h',
    popular: true,
    features: [
      'Goma grabada en polímero láser de alta resolución',
      'Mecanismo de acción suave y ergonómico',
      'Cartucho de tinta recargable fácil de sustituir',
      'Visor transparente superior con la muestra del texto real',
      'Incluye tinta inicial para uso inmediato'
    ],
    options: {
      quantities: [1, 2, 3, 5, 10],
      sizes: [
        { label: 'Mediano Estándar (38 x 14 mm - 3 a 4 líneas)', value: 'mediano_38x14', priceModifier: 0 },
        { label: 'Grande Ejecutivo (47 x 18 mm - 5 a 6 líneas)', value: 'grande_47x18', priceModifier: 3.50 },
        { label: 'Cuadrado / Redondo (30 x 30 mm)', value: 'redondo_30mm', priceModifier: 4.00 },
        { label: 'Fechador Automático con Texto', value: 'fechador_auto', priceModifier: 7.00 }
      ],
      stampInkColors: [
        { label: 'Tinta Azul Real (Recomendada para documentos)', value: 'azul', priceModifier: 0 },
        { label: 'Tinta Negra Profunda', value: 'negro', priceModifier: 0 },
        { label: 'Tinta Roja (Para Sellos de Cobrado / Pagado / Anulado)', value: 'rojo', priceModifier: 0 },
        { label: 'Tinta Verde', value: 'verde', priceModifier: 0 }
      ]
    }
  },
  {
    id: 'sello-madera-tradicional',
    name: 'Sello de Madera Artesanal con Almohadilla',
    tagline: 'Resistente, económico y de máxima longevidad',
    description: 'Sello fabricado en madera pulida con empuñadura anatómica y goma de caucho vulcanizado o polímero de alto relieve. Perfecto para negocios tradicionales, firmas notariales y empaques kraft.',
    category: 'sellos-madera',
    targetProfessions: ['empresas', 'emprendedores', 'abogados-contadores'],
    basePrice: 5.50,
    unit: 'unidad + almohadilla',
    minQuantity: 1,
    deliveryTime: '24 a 48 horas',
    requiresFiscalDoc: false,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Económico',
    features: [
      'Madera seleccionada con acabado lacado protector',
      'Placa de goma grabada con precisión milimétrica',
      'Incluye almohadilla metálica con tinta azul o negra',
      'Apto para sellar bolsas de papel kraft, cajas y documentos',
      'Vida útil superior a 15 años'
    ],
    options: {
      quantities: [1, 2, 3, 5],
      sizes: [
        { label: 'Pequeño (4 x 1.5 cm) - Nombre y RIF', value: 'pequeno', priceModifier: 0 },
        { label: 'Mediano (5 x 2.5 cm) - Logo y 4 líneas', value: 'mediano', priceModifier: 1.50 },
        { label: 'Grande (7 x 4 cm) - Membrete o Empaques', value: 'grande', priceModifier: 3.50 },
        { label: 'Extra Grande para Bolsas (10 x 8 cm)', value: 'extra_grande', priceModifier: 7.00 }
      ],
      stampInkColors: [
        { label: 'Almohadilla con Tinta Azul', value: 'azul', priceModifier: 0 },
        { label: 'Almohadilla con Tinta Negra', value: 'negro', priceModifier: 0 },
        { label: 'Almohadilla con Tinta Roja', value: 'rojo', priceModifier: 0 }
      ]
    }
  },
  {
    id: 'talonario-recibos-cobro-egreso',
    name: 'Talonarios de Recibos y Comprobantes de Pago',
    tagline: 'Control administrativo infalible para empresas y finanzas',
    description: 'Talonarios administrativos para recibos de caja, recibos de condominio, constancias de egreso y comprobantes de entrega. Mantén tu flujo de fondos y transacciones perfectamente documentadas.',
    category: 'talonarios-administrativos',
    targetProfessions: ['empresas', 'abogados-contadores', 'emprendedores'],
    basePrice: 9.00,
    unit: 'talonario (50 juegos)',
    minQuantity: 3,
    deliveryTime: '48 a 72 horas',
    requiresFiscalDoc: false,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    badge: 'Administrativo',
    popular: false,
    features: [
      'Papel químico autocopiante (blanco y amarillo)',
      'Numeración correlativa impresa para control interno',
      'Personalizado con el nombre de tu empresa o junta de condominio',
      'Tapa de cartulina resistente',
      'Puntillado limpio para arrancar hojas sin roturas'
    ],
    options: {
      quantities: [3, 5, 10, 20],
      sizes: [
        { label: 'Cuarto de Carta (11 x 14 cm) - Recibo Clásico', value: '1/4_carta', priceModifier: 0 },
        { label: 'Media Carta (14 x 21.5 cm) - Detallado', value: '1/2_carta', priceModifier: 2.00 },
        { label: 'Tercio de Carta Horizontal (8 x 21.5 cm)', value: '1/3_carta', priceModifier: 1.00 }
      ],
      copies: [
        { label: 'Original + 1 Copia química', value: 'orig_1copia', priceModifier: 0 },
        { label: 'Original + 2 Copias químicas', value: 'orig_2copias', priceModifier: 2.50 }
      ]
    }
  },
  {
    id: 'tarjetas-de-presentacion-premium',
    name: 'Tarjetas de Presentación Corporativas',
    tagline: 'La primera impresión que abre puertas comerciales',
    description: 'Impresión offset digital de máxima fidelidad en cartulina Glase 300g con laminado mate aterciopelado o brillo total. Ideal para abogados, contadores, médicos, directores y profesionales independientes.',
    category: 'tarjetas-presentacion',
    targetProfessions: ['todas', 'empresas', 'medicos', 'abogados-contadores', 'emprendedores'],
    basePrice: 15.00,
    unit: 'caja de 100 tarjetas',
    minQuantity: 100,
    deliveryTime: '48 a 72 horas',
    requiresFiscalDoc: false,
    image: 'https://images.unsplash.com/photo-1589330694653-dad6d3240a2b?auto=format&fit=crop&w=800&q=80',
    badge: 'Alta Definición',
    popular: true,
    features: [
      'Cartulina Glase importada de 300 gramos extra rígida',
      'Impresión a todo color tiro y retiro (ambas caras)',
      'Laminado térmico protector contra humedad y desgaste',
      'Corte de precisión a 9 x 5 cm (esquinas redondeadas opcionales)',
      'Revisión y pre-vuelo de diseño gratuito'
    ],
    options: {
      quantities: [100, 250, 500, 1000],
      sizes: [
        { label: 'Estándar 9 x 5 cm (Bordes rectos clásicos)', value: 'recto_9x5', priceModifier: 0 },
        { label: 'Estándar 9 x 5 cm con Esquinas Redondeadas', value: 'redondeado_9x5', priceModifier: 3.00 },
        { label: 'Cuadradas 6 x 6 cm Modernas', value: 'cuadrado_6x6', priceModifier: 2.50 }
      ],
      paperTypes: [
        { label: 'Laminado Mate Elegante', value: 'mate', priceModifier: 0 },
        { label: 'Laminado Brillante UV Total', value: 'brillo', priceModifier: 0 },
        { label: 'Laminado Mate con Brillo UV Sectorizado en Logo', value: 'uv_sectorizado', priceModifier: 8.00 }
      ]
    }
  },
  {
    id: 'notas-de-entrega-despacho',
    name: 'Talonarios de Notas de Entrega y Guías de Despacho',
    tagline: 'Respaldo seguro para despachos de mercancía y almacén',
    description: 'Documentos de control logístico indispensables para acompañar mercancías, validar recepciones con firma del cliente y llevar el inventario de almacén.',
    category: 'talonarios-administrativos',
    targetProfessions: ['empresas', 'emprendedores'],
    basePrice: 9.50,
    unit: 'talonario (50 juegos)',
    minQuantity: 3,
    deliveryTime: '48 horas',
    requiresFiscalDoc: false,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    badge: 'Logística',
    features: [
      'Papel autocopiante químico 2 o 3 partes',
      'Tablas formateadas con cantidad, código, descripción y firmas',
      'Numerado secuencial rojo para control de almacén',
      'Encuadernación engrapada con lomo reforzado'
    ],
    options: {
      quantities: [3, 5, 10, 25],
      sizes: [
        { label: 'Media Carta (14 x 21.5 cm) - Más Vendido', value: '1/2_carta', priceModifier: 0 },
        { label: 'Carta Completa (21.5 x 28 cm) - Para muchos ítems', value: 'carta', priceModifier: 4.50 }
      ],
      copies: [
        { label: 'Original + 1 Copia química', value: 'orig_1copia', priceModifier: 0 },
        { label: 'Original + 2 Copias químicas', value: 'orig_2copias', priceModifier: 2.50 }
      ]
    }
  },
  {
    id: 'comandas-para-restaurantes',
    name: 'Talonarios de Comandas para Restaurantes y Cafeterías',
    tagline: 'Sincronización impecable entre mesoneros y cocina',
    description: 'Talonarios compactos para pedidos de mesa, comandas de barra y cocina en papel químico con copias de colores diferenciados para cocina y caja.',
    category: 'papeleria-comercial',
    targetProfessions: ['empresas', 'emprendedores'],
    basePrice: 6.50,
    unit: 'talonario (50 juegos)',
    minQuantity: 5,
    deliveryTime: '48 horas',
    requiresFiscalDoc: false,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    badge: 'Gastronomía',
    features: [
      'Tamaño de bolsillo fácil de manipular por saloneros',
      'Papel químico con copia amarilla para cocina y blanco para mesa',
      'Columnas pre-impresas para mesa, comensales y platos',
      'Cartón separador incorporado para no calcar en el siguiente pedido'
    ],
    options: {
      quantities: [5, 10, 20, 50],
      sizes: [
        { label: 'Comanda Clásica (10 x 16 cm)', value: '10x16', priceModifier: 0 },
        { label: 'Comanda Cuarto de Carta (11 x 14 cm)', value: '1/4_carta', priceModifier: 1.00 }
      ],
      copies: [
        { label: 'Original + 1 Copia', value: 'orig_1copia', priceModifier: 0 },
        { label: 'Original + 2 Copias (Caja + Cocina + Barra)', value: 'orig_2copias', priceModifier: 2.00 }
      ]
    }
  }
];

export const FREQUENT_QUESTIONS = [
  {
    q: '¿Cuáles son los requisitos legales para mandar a hacer talonarios de facturas SENIAT?',
    a: 'Por normativa legal del SENIAT, se requiere: 1) Copia del RIF actualizado del titular o empresa, 2) Copia de la Cédula de Identidad del representante legal, y 3) Copia de la última declaración de IVA o Autorización de Imprenta (según aplique). Nuestro equipo valida estos recaudos antes de meter a prensa para garantizar que tus facturas sean 100% legales.'
  },
  {
    q: '¿En cuánto tiempo entregan los sellos y talonarios?',
    a: 'Los sellos automáticos y de madera se entregan en 24 a 48 horas una vez aprobado el arte. Los récipes médicos y tarjetas de presentación tardan 48 a 72 horas. Los talonarios de facturación fiscal SENIAT toman entre 3 a 5 días hábiles debido a la emisión y verificación de la providencia fiscal oficial.'
  },
  {
    q: '¿Cómo hago si no tengo el diseño o logotipo listo?',
    a: '¡No te preocupes! En Varyna Gráficas C.A. nuestro departamento de diseño gráfico te elabora la diagramación técnica del talonario, récipe o sello de manera 100% gratuita al confirmar tu pedido. Te enviamos una muestra digital por WhatsApp para tu aprobación final antes de imprimir.'
  },
  {
    q: '¿Hacen envíos a todo el país y qué agencias utilizan?',
    a: 'Sí, despachamos diariamente desde nuestro taller central a nivel nacional mediante MRW, Zoom, Tealca y Domesa con cobro en destino. Si estás en la ciudad, disponemos de retiro directo en taller y servicio de delivery motorizado express.'
  },
  {
    q: '¿Qué métodos de pago aceptan y a qué tasa cobran?',
    a: 'Aceptamos Pago Móvil, transferencias en Bolívares (Banesco, Mercantil, Provincial, Venezuela) a la tasa oficial del Banco Central de Venezuela (BCV) del día, transferencias Zelle y divisas en efectivo para retiros en tienda.'
  }
];
