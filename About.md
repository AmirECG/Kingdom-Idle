# ABOUT - Kingdom Idle (Juego Incremental)

## Sobre el proyecto

Este proyecto es un juego incremental tipo idle que empecé para mejorar mis habilidades en desarrollo web. Quería hacer algo parecido a Melvor Idle pero hecho por mí mismo, sin librerías, solo HTML, CSS y JavaScript puro. Por el momento el juego permite talar madera, minar piedra, subir de nivel herramientas (hacha y pico), guardar la partida y cambiar entre trabajos. Añadiré más características más adelante.


## Problemas que tuve y cómo los resolví


### 1. El XP no subía de nivel correctamente

**Problema:** La experiencia aumentaba pero al llegar a 20 no subía de nivel, o subía pero los números se descontrolaban.

**Por qué pasaba:** No estaba reiniciando el XP después de subir de nivel. Solo aumentaba el nivel pero el XP seguía acumulándose. También usaba números con decimales porque multiplicaba por 1.5 sin redondear.

**Cómo lo resolví:** Cuando `xp >= xpNecesaria`, resto `xpNecesaria` de `xp` (el sobrante pasa al siguiente nivel). Uso `Math.floor()` para redondear hacia abajo y evitar decimales.

### 2. Las tarjetas de piedra se veían al iniciar el juego

**Problema:** Al recargar la página, se veían las tarjetas de piedra junto con las de madera.

**Por qué pasaba:** No había una función que ocultara las tarjetas de piedra al cargar la página. El HTML las mostraba todas por defecto.

**Cómo lo resolví:** Creé una función `inicializarPantalla()` que se ejecuta cuando carga la página. Dentro de esa función, agrego la clase `oculto` a las tarjetas de piedra y la quito de las de madera. También oculto la información del pico y muestro la del hacha.

### 4. El código se volvía muy repetitivo al agregar nuevos recursos

**Problema:** Cada vez que quería agregar un nuevo recurso o trabajo, tenía que copiar y pegar bloques enteros de código.

**Por qué pasaba:** Estaba escribiendo código específico para cada caso (un `if` para Talar, otro para Minar, otro para Pescar). Eso no escala.

**Cómo lo resolví:** Usé estructuras de datos. Creé un objeto `trabajos` que contiene toda la información de cada trabajo (clase de tarjeta, id de herramienta, id de experiencia, lista de recursos). También creé un objeto `herramientas` para guardar nivel, XP y XP necesaria. Luego escribí funciones genéricas que trabajan con esos datos. Ahora para agregar un nuevo trabajo solo agrego una entrada en el objeto `trabajos` y una en `herramientas`, y el HTML correspondiente.


## Tecnologías usadas

- HTML5
- CSS3 (Flexbox, gradientes, transiciones)
- JavaScript (ES6+)
- localStorage para guardado

## Estado actual

- [x] Talar madera (Roble y Pino)
- [x] Minar piedra (Cobre y Hierro)
- [x] Sistema de XP y niveles para hacha y pico
- [x] Cambio entre trabajos (Talar / Minar)
- [x] Guardado y carga con localStorage
- [x] Interfaz visual con estilos de fantasía
- [ ] Producción pasiva (pendiente)
- [ ] Mejoras comprables (pendiente)
- [ ] Trabajo Pescar (pendiente)

---