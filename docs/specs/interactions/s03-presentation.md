# S03 — Presentación, lectura y actividades

- Fecha: 2026-10-19. Estado: implementación interna autorizada por el usuario.
- Origen pedagógico: paquete `S03-DE-UN-TRANSITO-A-LAS-METRICAS`; guion de DASAN identificado en su manifiesto. La secuencia aprobada en conversación reemplaza las propuestas iniciales de siete estaciones.
- Audiencia: tutores y estudiantes con nociones de clasificación y proporciones.
- Promesa: conectar geometría y observaciones de tránsito con representación, clasificación y evaluación matemática.
- Secuencia: portada; nueve estaciones con 3/3/3/3/3/3/7/4/2 unidades; referencias. Total: 33 pantallas.

## Navegación y estados

Se reutilizan `SlideRail`, `SessionOpening`, `SessionNavigationControls` y el footer común. La identidad de la unidad es estable; el índice solo controla su posición. Portada y reinicio usan `#portada`; referencias usan `#bibliografia`. Los demás hashes corresponden a IDs declarados de unidades. Un hash inválido abre portada. Anterior/Siguiente recorren las 33 pantallas y tienen extremos deshabilitados.

En Presentación, el encabezado y `SlideRail` se agrupan dentro de un disclosure nativo cerrado al cargar. Su resumen mantiene visible el título de la sesión y la posición actual (`n / 33`); al desplegarlo aparecen la pregunta, los controles de vista, referencias, modo docente, acceso a sesiones y el carril completo. El resumen usa el teclado y conserva el foco visible. Cambiar de diapositiva actualiza su contador; Anterior/Siguiente siguen disponibles en el pie. Lectura y Actividades mantienen el encabezado desplegado.

Presentación, Lectura y Actividades comparten unidades, fuentes y límites. Cambiar vista conserva la unidad; reiniciar conserva la vista y vuelve al inicio. Lectura desarrolla nueve capítulos autónomos, con ejemplos resueltos y respuestas, en el orden de estaciones; al regresar abre la unidad correspondiente al capítulo. Actividades reúne casos de matriz, umbrales y una justificación final, sin persistencia ni calificación. La alternativa sin JavaScript renderiza el mismo libro.

La configuración reconoce S03 como sesión sin rutas. Está habilitada explícitamente para esta entrega local; no se habilita S02 ni se alteran las rutas S01. Al excluir S03, su página, índice y recursos referenciados por su página no aparecen en la navegación. El contenido de inbox no se importa al build.

## Composición

Marco y tokens comunes. Una idea principal por pantalla, escena ancha o escena/foco. Fórmulas y ejes son exactos y legibles, con rótulos además de colores. Se pausa la animación al desmontar la escena. Móvil apila controles y figura. La prosa esencial y las consecuencias de errores se mantienen visibles con modo docente apagado.

Recursos observados y simulados se distinguen explícitamente. Las imágenes realistas generadas son ilustraciones; los gráficos tienen fuente y unidades. Las Figuras 3, 6, 8, 10 y 11 del artículo se muestran completas con cita visible, enlace a la fuente y ampliación en diálogo.

## Comprobaciones

- Exactamente 33 IDs únicos y nueve estaciones con el recuento acordado.
- Portada, extremos, referencias, reinicio, hashes directos y retorno desde Lectura.
- Disclosure de navegación cerrado/abierto, título y posición actualizados, y controles completos al desplegar.
- Configuración habilitada/excluida y builds raíz/subruta.
- Las escenas compartidas conservan sus fichas y pruebas científicas de tránsito y métricas.
- Teclado, foco, pantallas 1920×1080/1440×900/390×844 e intermedia, sin JS, reduced motion y axe.
- No hay inferencia científica nueva ni entrenamiento de una CNN. La promoción editorial y los derechos se revisan por separado de la entrega técnica.
