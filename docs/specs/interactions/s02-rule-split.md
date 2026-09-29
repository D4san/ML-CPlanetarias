---
id: s02-rule-split
status: draft
page: /sesiones/s02/
packet_id: S02-ARBOLES-DECISION-RANDOM-FOREST
---

# S02: abrir árboles desde la clasificación planetaria

## Audiencia y promesa

- audiencia: estudiantes que empiezan a estudiar árboles de decisión;
- prerrequisitos: comparar medidas observadas y distinguir una pregunta de clasificación de una de regresión;
- promesa: al recorrer estas diapositivas, el estudiante relacionará una pregunta de clasificación con reglas, umbrales y una medida para comparar divisiones.

## Secuencia de apertura

| Índice | Pregunta | Objeto | Aprendizaje |
| --- | --- | --- | --- |
| `00` | ¿Qué fuentes sostienen la sesión? | Bibliografía enlazada agrupada por tema | Localizar fuentes de catálogo, modelos y contexto planetario. |
| `01.1` | ¿Cómo convierte un árbol las medidas de un planeta en una etiqueta? | Galería de cuatro ejemplos con masa, radio y densidad; el botón «Clasificar» abre el árbol con la ruta de un gigante puffy resaltada | Conocer los datos y etiquetas; después seguir cómo cada nodo pregunta por el radio o la densidad. |
| `01.2` | ¿Qué es un árbol de decisión? | Regla y árbol ilustrados junto a 12 puntos sintéticos; controles para variable, umbral y rama | Seguir preguntas binarias y probar dos reglas en el orden `x₁ → x₂` o `x₂ → x₁`. |
| `01.3` | ¿Cómo establecemos el mejor corte? | Ocho puntos sintéticos; controles para Gini y entropía; «ganancia de información» e «impureza» abren tarjetas conceptuales centradas; la explicación desplegable usa un slider de tres pasos para separar Gini, entropía y comparación, e ilustra la búsqueda de cortes candidatos | Comparar la mezcla antes y después de dividir, y elegir por nodo el corte con mayor ganancia de información o reducción de Gini. |
| `01.4` | ¿Cómo se entrena y se usa el clasificador? | Ejemplo breve con `DecisionTreeClassifier` y sus parámetros | Relacionar `criterion`, `max_depth`, `min_samples_leaf`, `fit` y `predict`. |
| `01.5` | ¿Cómo produce una predicción numérica? | Cuatro pares sintéticos predictor/objetivo, cortes candidatos y regiones con valores por hoja | Seguir la entrada desde `x` hasta la media de los objetivos que contiene su hoja.

Después siguen sobreajuste, bootstrap, Random Forest, catálogo PSCompPars y la práctica central de Colab. El explorador y sus fórmulas se detallan en `s02-regression-leaf-output.md`.

## Clasificar un planeta siguiendo nodos

La subestación `01.1` muestra cuatro casos didácticos con masa, radio y densidad media. Al pulsar «Clasificar», se abre el árbol horizontal con el gigante puffy seleccionado y su ruta resaltada. Los botones de los casos cambian la ruta al instante; «Volver a los ejemplos» regresa a la galería. Las ilustraciones son originales generadas con IA, conceptuales y con marca de agua del curso; no representan observaciones ni están a escala.

Para los ejemplos se calcula la densidad media con `ρ = 5.51 × M / R³`, donde la masa está en masas terrestres y el radio en radios terrestres. Se muestran estos valores redondeados:

| Caso didáctico | Masa (`M⊕`) | Radio (`R⊕`) | Densidad (`g/cm³`) | Etiqueta usada en el ejercicio |
| --- | ---: | ---: | ---: | --- |
| Mundo rocoso | 1 | 1 | 5.51 | Rocoso |
| Mundo con envoltura | 8 | 3 | 1.63 | Sub-Neptuno |
| Gigante gaseoso | 220 | 11 | 0.91 | Gigante gaseoso |
| Gigante de baja densidad | 100 | 14 | 0.20 | Puffy (descriptor) |

La regla del árbol de juguete sigue este orden:

1. `¿R < 2 R⊕?` Sí → rocoso; no → siguiente nodo.
2. `¿R < 4 R⊕?` Sí → sub-Neptuno; no → siguiente nodo.
3. `¿ρ < 0.45 g/cm³?` Sí → gigante de baja densidad («puffy»); no → gigante gaseoso.

Los tres cortes se eligen para separar estos cuatro ejemplos; no son fronteras físicas universales ni se ajustan a la tabla NASA. En la escena, «puffy» nombra un caso didáctico de baja densidad, no una clase composicional general. La pantalla textual informa las medidas, las preguntas recorridas y la hoja alcanzada para cada caso.

El radio aporta una pista de tamaño y la densidad relaciona masa y radio. En una población científica real habría que definir etiquetas y población con más variables y contexto. Como referencia, Fulton et al. (2017) reportan una brecha de radios de 1.5–2.0 radios terrestres para una muestra de planetas cercanos de Kepler; ese intervalo no se usa como una regla general aquí.

## Qué hace un árbol de decisión

La subestación `01.2` define un árbol de decisión como una secuencia de reglas binarias. Cada nodo pregunta si una variable cumple `xⱼ ≤ t`; según la respuesta, los ejemplos siguen una de dos ramas hasta llegar a una hoja. La figura enlaza el umbral que se mueve en el diagrama de puntos con la pregunta candidata y sus ramas en el árbol.

Los 12 puntos A/B son sintéticos. `x₁` y `x₂` son coordenadas abstractas sin unidad; no representan radio, densidad, planetas ni observaciones. Con `x₁ ≤ 3`, seis puntos quedan a cada lado: 4 A y 2 B en la rama `≤`; 2 A y 4 B en la rama `>`.

El estudiante puede mover `x₁` (corte vertical) o `x₂` (corte horizontal), aplicar la regla a la raíz y elegir una hoja para otra regla. El selector de variable se conserva para cada paso, de modo que se puede probar `x₁ → x₂`, `x₂ → x₁` u otro orden. La variable opuesta se sugiere al abrir la siguiente regla, y puede cambiarse. Se permiten hasta tres reglas, deshacer y reiniciar.

Esta escena deja explorar cortes y secuencias de reglas. La pregunta de cuál umbral conviene se responde en `01.3`: allí se comparan cortes candidatos por la impureza de sus ramas con Gini y entropía, usando ocho puntos sintéticos distintos.

## Establecer el mejor corte

Usar ocho ejemplos sintéticos ordenados por radio. Las etiquetas ya vienen asignadas para la actividad: cuatro casos «compacto» y cuatro «con envoltura». No se interpretan como clasificación científica ni como observaciones planetarias.

| Radio sintético (`R⊕`) | Etiqueta didáctica |
| ---: | --- |
| 0.8 | Compacto |
| 1.0 | Compacto |
| 1.2 | Compacto |
| 1.4 | Compacto |
| 1.6 | Con envoltura |
| 1.8 | Con envoltura |
| 2.0 | Con envoltura |
| 2.2 | Con envoltura |

Queremos que cada rama reúna ejemplos de una misma etiqueta. Para elegir el corte, medimos cuánto disminuye la mezcla: con entropía, es la ganancia de información; con Gini, la reducción de impureza.

El control permite seleccionar uno de los siete puntos medios entre radios consecutivos: `0.9`, `1.1`, `1.3`, `1.5`, `1.7`, `1.9` y `2.1 R⊕`. Para cada candidato se calcula la impureza de cada rama y su promedio ponderado por cantidad de casos; ese valor se resta de la impureza inicial. El árbol elige el candidato con la mayor reducción en ese nodo y vuelve a evaluar cortes dentro de cada rama. Así construye el árbol paso a paso: cada decisión es local al nodo actual. Los botones alternan Gini y entropía; cambian las métricas, el gráfico y el nombre del valor de reducción. El botón de recomendación lleva al corte con mayor reducción. En `1.5 R⊕`, los hijos quedan puros: la impureza Gini pasa de `0.5` a `0`, y la entropía, de `1 bit` a `0`.

La tarjeta desplegable divide la explicación en tres pasos para que quepa en la superficie de presentación:

1. **Impureza Gini:** intuición, fórmula y lectura de sus valores en clasificación binaria.
2. **Entropía de Shannon:** incertidumbre, fórmula y lectura de sus valores en clasificación binaria.
3. **Comparar el corte:** explicación intuitiva de la mezcla antes y después; fórmulas de ganancia de información y reducción de Gini; pesos de los hijos; y la secuencia para probar candidatos, medir la reducción ponderada, elegir el mayor valor local y repetir la búsqueda en las ramas.

Los botones «Anterior» y «Siguiente» y el control deslizante permiten cambiar de paso. La vista activa anuncia su título y número. Sin JavaScript, los tres pasos se muestran juntos dentro de una sección desplegable desplazable.

La explicación conserva estas definiciones completas:

- **Gini:** `G(S) = 1 − Σₖ₌₁ᴷ pₖ²`. `pₖ` es la proporción de casos de la clase `k` en el conjunto o nodo `S`; `K` es el número de clases. Gini equivale a la probabilidad de que dos etiquetas tomadas independientemente según esas proporciones sean distintas: vale cero en un grupo puro y crece cuando las clases se mezclan.
- **Entropía de Shannon:** `H(S) = −Σₖ pₖ log₂(pₖ)`. Mide cuánta incertidumbre queda al adivinar la etiqueta de un caso al azar; vale cero si el grupo es puro y alcanza su máximo cuando las clases están equilibradas. Se expresa en bits.
- **Ganancia de información:** `IG = H(S) − [wₗ H(Sₗ) + wᵣ H(Sᵣ)]`. Compara la entropía de la raíz con el promedio ponderado de sus ramas.
- **Reducción de Gini:** `ΔG = G(S) − [wₗ G(Sₗ) + wᵣ G(Sᵣ)]`. Para ambos criterios, `wₗ = nₗ/n` y `wᵣ = nᵣ/n` son las fracciones de los casos que llegan a cada hijo; `n` es el total de casos y `nₗ`, `nᵣ`, sus cantidades en cada rama.

Las ecuaciones de la presentación usan el componente compartido `S02Math`, que renderiza TeX con KaTeX. El mismo estilo se aplica a la densidad media en `01.1`, la regla `xⱼ ≤ t` en `01.2`, estas definiciones en `01.3`, las ecuaciones de predicción por hoja en `01.5` y la expresión de varianza del ensamble en `03.2`. Las expresiones largas conservan desplazamiento horizontal y las tarjetas de definición apilan las fórmulas en pantallas estrechas.

### Tarjetas centrales para los conceptos

Los términos «impureza» y «ganancia de información» aparecen como botones dentro de la explicación breve. Cada botón abre un diálogo centrado en el viewport que define el concepto seleccionado y muestra su fórmula. La tarjeta de impureza explica que Gini y entropía resumen cuán mezcladas están las etiquetas, y presenta ambas expresiones. La tarjeta de ganancia explica que se resta a la entropía del nodo el promedio ponderado de las entropías de sus hijos; identifica `wₗ` y `wᵣ` como las fracciones de ejemplos que llegaron a cada rama.

El diálogo inicia cerrado. Incluye un botón «Cerrar»; `Escape` y un clic en el fondo también lo cierran, y el foco regresa al término que lo abrió. El foco queda contenido mientras está abierto. En pantallas estrechas la tarjeta ocupa el ancho disponible con margen y puede desplazarse verticalmente; las definiciones mantienen tamaño legible y no dependen del color. Sin JavaScript, la sección desplegable bajo los resultados sigue ofreciendo las definiciones completas.

En `DecisionTreeClassifier`, `entropy` y `log_loss` usan entropía de Shannon, mientras `gini` mide la impureza Gini. El criterio escoge un corte local a cada nodo; no certifica que el árbol completo sea óptimo.

La escena muestra una comparación local de divisiones. No garantiza que el árbol completo sea óptimo ni que una partición perfecta de ocho ejemplos generalice.

## Comportamiento y accesibilidad

- La apertura inicia en la diapositiva `00`; el carril y sus pilas mantienen la navegación común de S01/S02.
- La escena planetaria inicia con los cuatro ejemplos. «Clasificar» abre el árbol con el gigante puffy seleccionado y su ruta resaltada; elegir otro caso actualiza inmediatamente nodos, ramas, hoja y resumen textual. «Volver a los ejemplos» regresa a la galería.
- Las cuatro tarjetas conservan masa, radio, densidad calculada y etiqueta didáctica. La ilustración decorativa lleva marca de agua HTML del curso y caption que declara su origen sintético/conceptual y que no está a escala.
- El explorador de reglas inicia con `x₁ ≤ 3` como candidata. La ilustración muestra ese nodo y las dos ramas previstas; mover la variable o el umbral actualiza las regiones y conteos.
- Al aplicar el corte, el árbol lo conserva como regla y permite elegir una hoja. Cada regla tiene su propio selector para probar `x₁ → x₂` y `x₂ → x₁`; la segunda diapositiva aclara que este explorador no puntúa automáticamente los candidatos.
- La comparación de criterios inicia en `1.5 R⊕` y entropía. El eje horizontal lleva la etiqueta `Radio (R⊕)`. El deslizador cambia el umbral; los botones nativos alternan Gini/entropía y recalculan la escala, los valores y el mejor corte.
- La tarjeta plegable expone las definiciones en un slider de tres pasos: Gini, entropía y comparación del corte. Los botones anterior/siguiente y el control deslizante funcionan con teclado; solo el paso activo se presenta y se anuncia. Sin JavaScript, los tres pasos permanecen en una sección desplazable.
- `Tab`, flechas del `input type="range"`, `Enter` y `Espacio` permiten recorrer y operar los controles; el foco permanece visible.
- Una región textual anuncia criterio, umbral, conteos y reducción de impureza. Las marcas de clase se distinguen por color y forma.
- En móvil las escenas se apilan; en modo presentación conservan una relación principal comprensible dentro del primer cuadro 16:9 desde 1280 px.
- `prefers-reduced-motion` deja el estado final inmediato.
- Texto y tabla de los ejemplos acompañan las visualizaciones como alternativa textual.

## Fuentes y límites

- NASA Exoplanet Archive define masa, radio, densidad y flujo incidente; advierte que los parámetros compuestos pueden provenir de referencias distintas y no ser internamente consistentes.
- Fulton et al. (2017) documentan la brecha de radios para una población de Kepler bajo su selección.
- Lopez & Fortney (2014) discuten el radio como proxy de composición para sub-Neptunos.
- Sestovic et al. (2018) estudian la inflación de radios de Júpiteres calientes en relación con masa y flujo incidente.
- Los ejemplos visuales son esquemas originales y los ocho registros de la interacción son sintéticos. No se consulta ni se filtra el NASA Exoplanet Archive en estas diapositivas.

## Matriz mínima de revisión

- [ ] El carril abre en la bibliografía `00` y conserva números estación.subestación a continuación.
- [ ] La galería presenta los cuatro ejemplos, sus medidas y sus etiquetas; «Clasificar» abre el árbol con la ruta puffy resaltada y elegir cada caso actualiza su ruta sin un botón adicional.
- [ ] Cada caso termina en su hoja didáctica esperada y el texto explica la ruta; se recuerda que los umbrales son de juguete y «puffy» es un descriptor contextual.
- [ ] El acceso general a Colab aparece en una diapositiva final de la práctica; la cabecera queda despejada.
- [ ] La regla candidata y el árbol se ven al mismo tiempo; los cortes vertical (`x₁`) y horizontal (`x₂`) actualizan las dos ramas.
- [ ] Se pueden aplicar dos reglas en el orden `x₁ → x₂` o `x₂ → x₁`, seleccionar la hoja y deshacer o reiniciar.
- [ ] La explicación distingue explorar cortes en `01.2` de escoger por Gini o entropía en `01.3`; ambas figuras declaran que usan puntos sintéticos.
- [ ] Cada umbral actualiza ramas, impureza ponderada, ganancia de información o reducción de Gini según el criterio, y el resumen identifica el corte de mayor reducción.
- [x] `01.3` explica que ganancia de información compara la incertidumbre o mezcla antes y después de dividir; presenta los cortes candidatos, la reducción ponderada y la elección local del valor mayor, que se repite en cada rama.
- [x] La página tres del slider explica la diferencia entre impureza inicial y promedio ponderado de las ramas, junto a las fórmulas de ganancia de información y reducción de Gini.
- [ ] El slider cambia entre Gini, entropía y evaluación del corte con botones, teclado, valor visible y fallback desplazable sin JavaScript; el contenido no queda recortado.
- [x] Los términos «impureza» y «ganancia de información» abren definiciones centradas con fórmulas; el diálogo cierra con botón, `Escape` o clic en el fondo y devuelve el foco al término activado.
- [ ] El gráfico etiqueta el eje horizontal como `Radio (R⊕)` y no añade una nota de advertencia al pie de la diapositiva.
- [ ] `1.5 R⊕` separa ambos grupos sintéticos; la reducción es `0.5` con Gini y `1 bit` con entropía.
- [ ] La ficha de hiperparámetros enlaza los nombres del código con el explorador y aclara que este usa un CART didáctico.
- [ ] Las etiquetas, unidades, límites y alternativas textuales siguen visibles con teclado y móvil.
- [ ] La página interna mantiene su procedencia y estado; no promueve el paquete desde `inbox/`.
