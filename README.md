# Copia del proyecto realizado para la practica HTML-CSS del bootcamp WEB17 de KeepCoding

Copio el protfolio creado para la practica, pero en vez de usando _vanilla_ **HTML** y **CSS**, usando **React**

## Link a la [web](https://codesthenos.github.io/practica-2-usando-react/)

## Links del proyecto original

- [repo](https://github.com/codesthenos/KC-WEB17-HTML-CSS-codesthenos)

- [web](https://codesthenos.github.io/KC-WEB17-HTML-CSS-codesthenos/)

## Paquetes `npm` usados:

- [`npm create vite@latest`](https://www.npmjs.com/package/create-vite)

- [`npm i codesthenos-midu-router`](https://www.npmjs.com/package/codesthenos-07-midu-router)
- [`npm i -D vite-plugin-static-copy`](https://www.npmjs.com/package/vite-plugin-static-copy)
- [`npm i -D gh-pages`](https://www.npmjs.com/package/gh-pages)

## Descripcion

Inicio proyecto usando un [template original](https://github.com/codesthenos/codesthenos-vite-react-typescript-eslint-custom) proviniente de usar `npm create vite@latest` seleccionando:

- [**vite**](https://vite.dev/)

- [**React**](https://es.react.dev/)
- [**Typescript**](https://www.typescriptlang.org/)
- [**SWC**](https://vite.dev/plugins/#vitejs-plugin-react-swc)

## Objetivos del proyecto:

- ### Replicar el proyecto original, pero convirtiendo la web en una _SPA_

  Uso el paquete de npm **codesthenos-midu-router** subido a **npm** creado por mi, siguiendo el [**tutorial**](https://www.youtube.com/watch?v=K2NcGYajvY4&t=1s) de [@midudev](https://github.com/midudev), el cual me provee de los componentes:

  - **`Router`**, un _wrapper_ de las `Route`, que tiene un _atributo_ `defaultComponent` el cual carga un _componente_ si la url no matchea con ningun `path` de las `Route`

  - **`Route`**, _componente_ que tiene _atributos_ `path` y `Componente` path de la _url_ y _componente_ a cargar respectivamente
  - **`Link`**, _componente_ que tiene _atributo_ `to` donde indicamos el path al que nos lleva
  - **Disclaimer 1**, este paquete tiene 2 `high severy vulnerabilities` relacionadas con el `path-to-regexp`, como esta web no se relaciona con un _backend_, y solo tiene propositos educativos, no le doy importancia
  - **Disclaimer 2**, este paquete no tiene tipos, por lo que cuando lo importo uso `// @ts-expect-error the following dependency has no types` para ignorar el arning de _eslint_

- ### Routing SPA

  - En **App.tsx** cambiar `defaultComponent={Index}` por `defaultComponent={Error404}` y el primer `Component={Error404}` por `Component={Index}`

  - En **Banner.tsx** descomentar `linea 1`, `linea 14` y borrar la `linea 13`, para quitar el `<a>` y usar el `<Link>`

  Al hacer esto usando `npm run dev`, veamos el proyecto funcionando correctamente como una **SPA**

- ### Routing actual

  Realizando esta replica, me di cuenta de que por la forma en la que hace la **build** del proyecto **gh-pages**, replicar el comportamiento de una **SPA** sin modificar los _componentes_ `Router`, `Route` y `Link` o no era posible, o al menos no para mis objetivos del proyecto.

  Ademas, descubri que existe el **vite-plugin-static-copy**, el cual me permite cargar mas recursos estaticos en la build ademas del index.html , el cual **vite** usa por defecto, por lo que decidi, dejar montado todo lo que tenia para que pudiese funcionar como una **SPA**, y ademas, crear una forma de que al hacer el deployment en **gh-pages**, aunque no veamos una **SPA**, al menos vemos una replica exacta del **proyecto original**

- ### Descripcion del routing actual

  Uso el **vite-plugin-static-copy** en el `vite.config.ts`, en el que hago referencia al nombre del _archivo estatico_ en el `src` y en el `dest` donde quiero que lo coloque en la **build** y en el _root_ del proyecto creo los _archivos estaticos_ `.html`:

  - **`projects.html`**, es una copia del `projects.html` original, con los estilos en una etiqueta `<style>` dentro del `<head>`, y los paths de las imagenes actualizados

  - **`404.html`**, copia del `404.html` original, con los estilos en una etiqueta `<style>` dentro del `<head>`, y los paths de las imagenes actualizados. Como **gh-pages** reconoce el `404.html`, funciona correctamente cuando obtenemos un **Error 404**
  - **`500.html`**, copia del `500.html` original, con los estilos en una etiqueta `<style>` dentro del `<head>`, y los paths de las imagenes actualizados. La unica forma de acceder a esta web, como en el original es introduciendo el `path` en la **url**

  Segun esta configurado ahora el **App.tsx** y el **Banner.tsx**, ya que _gh-pages_ no reconoce lo que es el `path` que tengo en los _componentes_ `Route`, ninguno de ellos funciona, por lo que en la [url principal](https://codesthenos.github.io/practica-2-usando-react/), se ve el `defaultComponent={Index}` cargado en el componente `Router` del **App.tsx**, y en el **Banner.tsx** en vez de el `<Link>` usamos un `<a>`

  Incluyo un `button` en el **Header.tsx** de la `page` **Index.tsx**, que cambia entre **_dark theme_** y **_light theme_**

- ### Componetizar, ordenar y reducir estilos

  En vez de cargar toda la web en un solo componente, he componetizado todas las webs, cargado los estilos en los componentes que los usan, y de forma generica, los que usan todos

## Resumen

La [web](https://codesthenos.github.io/practica-2-usando-react/) funciona igual que la **original**, pero realizando los cambios indicados y viendo la web usando el script `npm run dev`, obtenemos el comportamiento de **SPA**
