# 🛒 UPN Frontend 2026 – E-Business

Aplicación web desarrollada con **Angular** para la plataforma de comercio electrónico del curso **E-Business (UPN 2026)**. Consume la API REST del backend (Spring Boot + JPA + MySQL).

## 📌 Tecnologías

| Tecnología | Uso |
|---|---|
| Angular 21 (Angular CLI 21.2.6) | Framework principal |
| TypeScript | Lenguaje |
| Node.js + npm | Entorno y gestor de paquetes |
| Vitest | Pruebas unitarias |
| Prettier / EditorConfig | Formato y estilo de código |

## 🔗 Repositorios

- **Frontend:** https://github.com/jorgejacinto9701/upn_frontend_2026_ebusiness
- **Backend:** https://github.com/jorgejacinto9701/upn_backend_2026_ebusiness

## 👥 Integrantes y funcionalidades

| # | Integrante | Funcionalidad asignada |
|---|---|---|
| 1 | Jimenes Inofuente Anhely Maxima | Comentarios por usuarios |
| 2 | Schwarten Flores Hainz | Agregar descripción completa |
| 3 | Rojas Espinoza Edwin | Agregar al carrito (solo agregar a una grilla) |
| 4 | Valencia Diaz Gian Piero | Búsqueda por categoría |

## ✨ Detalle de funcionalidades

### 1. Comentarios por usuarios — *Jimenes Inofuente Anhely Maxima*
- Formulario para que el usuario escriba un comentario sobre un producto.
- Listado de los comentarios registrados de cada producto.

### 2. Agregar descripción completa — *Schwarten Flores Hainz*
- Formulario para registrar/actualizar la descripción completa de un producto.
- Vista de detalle del producto mostrando su descripción completa.

### 3. Agregar al carrito — *Rojas Espinoza Edwin*
- Botón "Agregar al carrito" en los productos.
- Los productos agregados se muestran en una **grilla** (tabla). El alcance se limita a agregar y listar.

### 4. Búsqueda por categoría — *Valencia Diaz Gian Piero*
- Selector/listado de categorías.
- Grilla de productos filtrada según la categoría elegida.

## 🗂️ Estructura del proyecto

```
├── public/                 # Recursos estáticos
├── src/
│   ├── app/                # Componentes, servicios y rutas
│   ├── index.html
│   └── styles.css
├── angular.json            # Configuración de Angular CLI
├── package.json            # Dependencias y scripts
├── tsconfig*.json          # Configuración de TypeScript
├── .prettierrc             # Reglas de Prettier
└── .editorconfig
```

> Se recomienda organizar `src/app` por funcionalidad (por ejemplo `comentarios/`, `producto/`, `carrito/`, `categoria/`) más una carpeta `services/` para las llamadas HTTP al backend.

## ⚙️ Instalación y ejecución

### Requisitos previos
- [Node.js](https://nodejs.org/) (versión LTS compatible con Angular 21)
- npm
- Angular CLI:

```bash
npm install -g @angular/cli
```

- Backend en ejecución (por defecto `http://localhost:8090`; ajustar si usas otro puerto)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/jorgejacinto9701/upn_frontend_2026_ebusiness.git
cd upn_frontend_2026_ebusiness

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
ng serve
```

Abre `http://localhost:4200/`. La aplicación se recarga automáticamente al modificar los archivos.

## 🔌 Conexión con el backend

Define la URL base de la API en un servicio o archivo de entorno, por ejemplo:

```ts
export const API_URL = 'http://localhost:8090/api';
```

Recuerda habilitar **CORS** en el backend para el origen `http://localhost:4200`.

## 🧰 Comandos útiles

| Comando | Descripción |
|---|---|
| `ng serve` | Servidor de desarrollo en `http://localhost:4200/` |
| `ng generate component nombre` | Genera un nuevo componente |
| `ng generate service nombre` | Genera un nuevo servicio |
| `ng build` | Compila el proyecto en la carpeta `dist/` |
| `ng test` | Ejecuta las pruebas unitarias con Vitest |
| `ng e2e` | Ejecuta pruebas end-to-end (requiere configurar un framework) |

## 🌿 Flujo de trabajo con Git

1. Cada integrante trabaja en su propia rama: `feature/comentarios`, `feature/descripcion`, `feature/carrito`, `feature/busqueda-categoria`.
2. Realizar *commits* con mensajes claros.
3. Abrir un *Pull Request* hacia `master` para integrar los cambios.

## 📚 Recursos adicionales

- [Documentación de Angular](https://angular.dev)
- [Angular CLI – Referencia de comandos](https://angular.dev/tools/cli)

## 📄 Licencia

Proyecto académico – Universidad Privada del Norte (UPN) – 2026.
