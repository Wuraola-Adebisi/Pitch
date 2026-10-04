# Pitch Arena

Pitch Arena helps turn a rough idea into a clearer, more defensible argument.

The MVP takes an idea through five stages:

1. **Idea** — start with the rough version.
2. **Diagnosis** — identify the audience, problem, promise, differentiation, proof, outcome, timing, and ask already present.
3. **Argument map** — see how the pieces connect and where the weak links are.
4. **Draft** — turn the available material into a structured pitch without inventing missing evidence.
5. **Challenge** — surface questions the current argument does not answer yet.

## Current MVP

Pitch Arena processes the idea in the browser and stores the current workspace locally so it can survive a refresh.

The analysis is designed around the argument structure: audience, problem, promise, differentiation, proof, outcome, timing, and ask. The workflow is built so that missing support remains visible rather than being invented.

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
