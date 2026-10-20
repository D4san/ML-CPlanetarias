---
id: s02-impurity-guided
status: implemented
page: /sesiones/s02/
packet_id: S02
---

# Impureza: de los conteos a la comparación

Audiencia: estudiantes de introducción a ML con fracciones y sumas. Pregunta: ¿cómo puntuar un corte por la mezcla que queda?

Estado inicial determinista: Gini, ocho ejemplos sintéticos ordenados por radio (cuatro compactos y cuatro con envoltura), corte 1,3 R⊕, paso Contar. Pasos: Contar → Dividir → Calcular y ponderar → Explorar. Reset recupera ese estado. Pasos anteriores recuperan el ejemplo guiado; cambiar Gini/entropía en exploración conserva el umbral.

El nodo padre S define p_k(S); cada hijo usa su propio total. En el corte 3/5, izquierda (3,0), derecha (1,4), G(S)=0,5, G(S_L)=0, G(S_R)=0,32, G posterior=0,2, reducción=0,3. Con entropía: H(S)=1 bit, H(S_R)=0,721928 bits y ganancia=0,548795 bits. En 1,5 R⊕ ambos hijos son puros. Los cálculos viven en una sola lógica compartida con pruebas.

Control → umbral visible → puntos y grupos → proporciones y operaciones por nodo → salida ponderada debajo del deslizador → interpretación del corte local. Círculo/cian indica Compacto; cuadrado/ocre indica Con envoltura. Color acompañado de forma y texto. Teclado nativo, foco visible, navegación local con Paso anterior/siguiente; la global conserva la sesión. En móvil se apilan; sin JS, details ofrece la cuenta completa. Sin animación necesaria; movimiento reducido conserva todo.

Límite: clases y datos sintéticos, sin evidencia física de composición ni garantía de generalización. 0 log 0 se define 0. Casos de prueba: puro/equilibrado, corte imperfecto/perfecto, conservación de casos, criterio, umbral, reset, teclado, móvil y alternativa textual.
