# Carril de diapositivas reutilizable

El carril de presentación es una pieza transversal del sitio. Las sesiones entregan una
secuencia plana de diapositivas y conservan el estado pedagógico, el contenido y los hashes;
el carril resuelve la presentación común.

## Contrato

- `src/components/react/SlideRail.tsx` contiene el componente React reusable.
- `src/components/react/slide-rail.css` contiene la composición visual, los bordes apilados,
  la adaptación móvil y el movimiento reducido.
- `src/lib/slide-rail.ts` calcula la ventana visible y la distribución de tarjetas ocultas.
- Una sesión puede extender `SlideRailItem` con sus propios IDs, rutas y metadatos.

Cada entrada aporta `id`, `groupLabel`, `title` y `partLabel`. `partLabels` y `partIndex` hacen
visible la subdivisión interna; `tone` usa los tonos semánticos del sistema visual. La sesión
recibe `(slide, index)` mediante `onSelect` y decide cómo actualizar su estado y su URL.
El índice visible usa la posición plana por defecto; una sesión puede proporcionar
`getIndexLabel(slide, index)` para expresar una jerarquía propia. S01 usa `00` para la bibliografía
y `01.1`, `01.2`, `01.3` —hasta `07.3`— para conservar visible la relación estación → subslide.

## Comportamiento compartido

El valor predeterminado mantiene cinco tarjetas desarrolladas alrededor de la activa y apila las
restantes en los bordes. La tarjeta activa gana espacio. Las tarjetas ocultas siguen siendo
controles nativos; las flechas, `Home`, `End`, el foco y el nombre accesible pertenecen al carril.
En móvil todas pasan a un flujo vertical legible.

La secuencia puede contener una diapositiva inicial, partes de una estación o una única entrada
por estación. El carril no conoce sesiones, contenidos científicos ni reglas de hash. Esos datos
permanecen en el adaptador de cada sesión.

## Ejemplo de integración

```tsx
<SlideRail
  slides={sessionSlides}
  activeIndex={activeSlideIndex}
  activeLabel={activeLabel}
  ariaLabel="Diapositivas de S02"
  onSelect={(slide) => openSlide(slide)}
  getAriaLabel={(slide, index) => `${index + 1}. ${slide.title}`}
/>
```

Una nueva sesión debe probar su adaptador y reutilizar las pruebas del carril para la ventana de
cinco, las tarjetas apiladas, los subslides, el teclado, el móvil y `prefers-reduced-motion`.
