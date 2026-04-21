# MMS / VDES Architecture Guide

Interfaccia web interattiva per esplorare l'architettura MMS / VDES, con focus su incapsulamento, routing intelligente, sicurezza e simulazione di scenari operativi.

## Cosa trovi nell'app

- Vista dell'architettura di protocollo con i principali componenti di bordo e di terra.
- Analisi della struttura VDES e delle relative tratte di comunicazione.
- Sezione di sicurezza e trust con focus su integrità, disponibilità e confidenzialità.
- Simulatore di scenari per perdita di segnale satellitare e difesa da spoofing.
- Packet decoder interattivo per ispezionare payload e livelli di protocollo.
- Interfaccia bilingue italiano/inglese.

## Stack

- React 19
- Vite 6
- TypeScript
- Tailwind CSS 4
- Motion per le animazioni
- Lucide React per le icone

## Run Locally

**Prerequisites:** Node.js 20 o superiore

1. Installa le dipendenze:
   `npm install`
2. Avvia l'app in sviluppo:
   `npm run dev`
3. Apri il browser su `http://localhost:3000`

## Script Utili

- `npm run dev` avvia il server Vite in sviluppo.
- `npm run build` genera la build di produzione.
- `npm run preview` serve localmente la build finale.
- `npm run lint` esegue il controllo TypeScript senza emettere file.
- `npm run clean` rimuove la cartella `dist`.

## Struttura Del Progetto

- [src/App.tsx](src/App.tsx) contiene l'interfaccia principale e la logica dei pannelli.
- [src/main.tsx](src/main.tsx) monta l'applicazione React.
- [src/index.css](src/index.css) definisce tema, font e stile globale.
- [vite.config.ts](vite.config.ts) configura Vite, alias `@` e variabili di ambiente.

## Note
- La demo è pensata per scopo tecnico/divulgativo e per ispezionare il flusso MMS / VDES in modo visuale.
