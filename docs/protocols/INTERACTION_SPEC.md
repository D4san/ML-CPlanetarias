# Protocolo para páginas e interacciones educativas

La interactividad debe cambiar lo que el lector puede comprender, comparar o diagnosticar. No se usa como decoración.

## Secuencia obligatoria

1. Definir audiencia, prerrequisitos y una promesa de aprendizaje en una oración.
2. Elegir el objeto mínimo que sostiene la explicación.
3. Especificar entre una y cuatro interacciones necesarias.
4. Crear una ficha en `docs/specs/interactions/` antes de implementar la interacción principal.
5. Construir una lectura completa sin interacción y después añadir la manipulación.
6. Verificar estados, teclado, móvil, movimiento reducido, rendimiento y regresión visual.

## Contrato de cada interacción

La ficha debe declarar:

- pregunta del lector y objetivo de aprendizaje;
- estado inicial determinista;
- variables, rangos, unidades y controles;
- codificación visual y significado semántico de cada color;
- comportamiento al cambiar, reiniciar, tocar, usar teclado o reducir movimiento;
- resumen textual del estado actual;
- explicación “qué observar” y fallback estático;
- misconcepción que intenta prevenir;
- límites: qué no demuestra la figura;
- matriz mínima de pruebas.

## Patrones preferidos

- lente de parámetro para relacionar valor y comportamiento;
- representaciones enlazadas para conectar ecuación, dato y geometría;
- predicción antes de revelar para diagnosticar intuiciones;
- explorador de error para mostrar cuándo falla una aproximación;
- checklist diagnóstico para transferir el método a otro problema.

Cada control tiene etiqueta, valor visible, ruta de reinicio y foco perceptible. No se oculta contenido esencial detrás de `hover`. SVG y Canvas necesitan explicación textual equivalente.

## Ritmo editorial

Repetir el ciclo:

```text
pregunta → objeto concreto → visual → manipulación → interpretación
→ puente formal → comprobación
```

Los controles se mantienen cerca de la figura. Las ecuaciones usan los mismos símbolos que el texto, el código y las etiquetas. Los supuestos y límites aparecen junto a la afirmación que califican.
