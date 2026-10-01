# Pitch

Pitch turns a rough idea into a clearer argument.

The MVP takes an idea through five stages:

1. **Idea** — start with the rough version.
2. **Diagnosis** — identify the audience, problem, promise, differentiation, proof, outcome, timing, and ask already present.
3. **Argument map** — see how the pieces connect and where the weak links are.
4. **Draft** — turn the available material into a structured pitch without inventing missing evidence.
5. **Challenge** — surface questions the current argument does not answer yet.

## Current MVP

Pitch runs entirely in the browser. There is no account, backend, database, or remote AI call.

The analysis engine is deliberately simple and local. It uses sentence and keyword patterns to demonstrate the product flow. A future model or API can replace the engine without changing the main workflow.

The current idea is saved in `localStorage` so it survives a refresh. Use **New** in the app header to clear it.

## Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Oxlint

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```
