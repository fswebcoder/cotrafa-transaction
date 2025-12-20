# Cotrafa Transaccional (Frontend)

Aplicación web construida con Angular (standalone) y NgRx para manejo de estado. UI basada en PrimeNG.

## Requisitos

- Node.js + npm (el proyecto fija `packageManager: npm@10.9.0` en `package.json`)
- Backend/API disponible según `src/app/enviromments/environment.ts` (por defecto `http://localhost:8080/api/` en modo dev)

## Comandos (scripts)

Todos los comandos se ejecutan desde la raíz del proyecto.

- Instalar dependencias:

  ```bash
  npm run install
  ```

- Ejecutar en modo desarrollo (levanta servidor en `http://localhost:4200/`):

  ```bash
  npm run start:dev
  ```

- Compilar:

  ```bash
  npm run build
  ```

- Compilar en modo watch (desarrollo):

  ```bash
  npm run watch
  ```

- Ejecutar pruebas:

  ```bash
  npm run test
  ```

- Ejecutar Angular CLI directamente (útil para `version`, `generate`, etc.):

  ```bash
  npm run ng -- version
  ```

## Arquitectura en `src/`

Puntos de entrada y configuración:

- `src/main.ts`: arranca la app con `bootstrapApplication(App, appConfig)`.
- `src/app/app.config.ts`: define el `ApplicationConfig` y el arreglo global de `providers`.
- `src/app/app.routes.ts` y `src/app/feature/dashboard/dashboard.routes.ts`: rutas y lazy-loading de pantallas.

Estructura por capas:

- `src/app/core/`: transversal a toda la app.
  - `interceptors/`: interceptores HTTP (p.ej. `withCredentials` y header de versión).
  - `providers/`: “composition root” (configura DI para repositorios, store, etc.).
  - `services/`: servicios comunes (p.ej. encriptación).
  - `state/`: NgRx (actions/reducers/effects/selectors) por slice.
- `src/app/feature/`: funcionalidades (por feature) siguiendo un estilo tipo “clean architecture”.
  - `domain/`: entidades, DTOs, repositorios (contratos), casos de uso.
  - `infrastructure/`: datasources (HTTP) y repositorios concretos.
  - `ui/`: componentes/páginas (presentación).
- `src/app/shared/`: reutilizables (componentes, directivas, mappers, modelos, services).

Aliases de importación:

- Definidos en `tsconfig.json` para simplificar imports (`@app/*`, `@feature/dashboard/*`, etc.).

## Providers (inyección de dependencias)

El “ensamble” principal ocurre en `src/app/app.config.ts`, donde se registran providers globales como:

- Router: `provideRouter(routes)` (`src/app/app.routes.ts`).
- HTTP: `provideHttpClient(withInterceptors([...]))` con:
  - `credentialsInterceptor` (`src/app/core/interceptors/credentials.interceptor.ts`): fuerza `withCredentials: true`.
  - `versionInterceptor` (`src/app/core/interceptors/version.interceptor.ts`): agrega `X-Frontend-Version`.
- UI: `providePrimeNG(...)` y `MessageService`.
- Config de ambiente: `ENVIRONMENT` token + `environment` (`src/app/enviromments/environment.ts`).
- Core: `provideCore()` (`src/app/core/providers/store/provide.core.ts`).
- Repositorios: `...ALL_REPOSITORIES` (`src/app/core/providers/repositories.provider.ts`).

### Repositorios (contratos → implementaciones)

El patrón es:

1. En `feature/**/domain/repositories/` se define el contrato (por ejemplo `IAuthRepository`).
2. En `feature/**/infrastructure/repositories/` se implementa (por ejemplo `AuthRepositoryImp`).
3. En `core/providers/**` se hace el binding con DI:
   - Auth: `src/app/core/providers/auth/auth.provider.ts`
   - Transactions/Users: `src/app/core/providers/transactions/transactions.provider.ts`
   - History: `src/app/core/providers/history/history.provider.ts`

Esto permite que los casos de uso dependan de contratos y no de clases concretas.

## Store (NgRx): cómo funciona

La app usa NgRx Store + Effects como estado global, configurado a través de providers (standalone):

- Registro del store y effects: `src/app/core/providers/store/provide.store.ts`
  - `provideStore(STORE_REDUCERS, { metaReducers: META_REDUCERS })`
  - `provideEffects(...STORE_EFFECTS)`
- Slices del estado: `src/app/core/state/store.state.ts`
  - `auth`, `transactions`, `history`

Cada slice sigue la estructura:

- `*.actions.ts`: eventos que disparan cambios o procesos async.
- `*.reducer.ts`: cómo evoluciona el estado ante acciones.
- `*.effects.ts`: side-effects (llamadas a API vía casos de uso/repositorios) y dispatch de acciones success/failure.
- `*.selectors.ts`: selectores para consumir datos desde UI.

### Flujo típico (UI → Store → Effects → Usecase → Repository → API → Store)

Ejemplo de login:

1. UI (smart component) dispara acción:
   - `src/app/feature/auth/ui/pages/login-smart/login-smart.ts:18` hace `dispatch(AuthActions.login(...))`.
2. Effect escucha y ejecuta caso de uso:
   - `src/app/core/state/auth/auth.effects.ts:15` ejecuta `authUseCase.login(loginDto)`.
3. Caso de uso depende de contrato:
   - `src/app/feature/auth/domain/usecases/auth.usecase.ts:12` inyecta `IAuthRepository`.
4. Provider resuelve implementación concreta:
   - `src/app/core/providers/auth/auth.provider.ts:6` enlaza `IAuthRepository` → `AuthRepositoryImp`.
5. Reducer actualiza el estado y la UI se actualiza con selectores:
   - `src/app/core/state/auth/auth.reducer.ts` + `src/app/core/state/auth/auth.selectors.ts`.
   - En UI se consume con `selectSignal(...)` (por ejemplo `login-smart.ts:16`).

Inicialización de sesión:

- La app dispara `AuthActions.checkAuth()` al arrancar (`src/app/app.ts:18`).
- El effect revisa `sessionStorage` y restaura usuario si existe (`src/app/core/state/auth/auth.effects.ts:44`).

## Rutas principales

- `/login`: pantalla de autenticación (lazy load component).
- `/dashboard`: layout principal y rutas hijas:
  - `/dashboard/profile`
  - `/dashboard/transactions`
  - `/dashboard/history`
