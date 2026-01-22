# TaskFlow App AI

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=D04A37)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google%20Gemini-AI--Powered-8E75FF?style=for-the-badge&logo=googlegemini&logoColor=white)

![Status](https://img.shields.io/badge/Status-In_Progress-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

**TaskFlow** è una semplice applicazione Web Full-Stack per la gestione dei task, con la possibilità di generazione dei task tramite AI.<br>
Il progetto si basa su un Backend condiviso tra Frontend Web e Frontend Mobile.

- Web → **Angular 18+** (standalone components + signals)
- Mobile → **React Native + Expo** (SDK 50+)
- Backend → **Spring Boot 3**

## Stack Tecnologico

### AI
- **Google AI**: Per la creazione automatizzata dei task

### Backend
- **Java 17+** & **Spring Boot 3.4.1**
- **Spring AI**: Integrazione nativa per l'orchestrazione di modelli LLM
- **Google Gemini AI**: Utilizzato per la generazione automatica dei task
- **JPA**: Standard Java per salvare dati
- **Hibernate**: Motore ORM per mappare classi e tabelle
- **Spring Data JPA**: Gestione semplice di repository e query
- **MySQL 8**: Database ospitato su container Docker
- **Architettura Layered**: Controller → Service → Repository → Entity


### Frontend Web
- **Angular 18+**: Utilizzo di **Standalone Components**
- **Angular Signals**: Gestione dello stato reattiva per aggiornamenti dell'interfaccia
- **Bootstrap 5**: Stili e layout base per l’interfaccia

### Frontend Mobile
- **React Native** + **Expo SDK 50+**
- **TypeScript** / JavaScript
- **React Navigation** (Stack Navigator)
- **Axios** per le chiamate HTTP
- **StyleSheet** per UI mobile-native
- Indirizzo backend dall'emulatore: `http://10.0.2.2:8080/api`

### Infrastruttura
- **Docker & Docker Compose**: Per la containerizzazione del database e di phpMyAdmin
- **Maven**: Gestione delle dipendenze Java
- **npm**: Dipendenze ambienti di sviluppo e build del Frontend
- **Git**: Versionamento con gestione monorepo

### Architettura
```mermaid
flowchart TB
    style A fill:#4DB6AC,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#FFB74D,stroke:#333,stroke-width:2px,color:#333
    style C fill:#64B5F6,stroke:#333,stroke-width:2px,color:#fff
    style Gemini fill:#2196F3,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#F48FB1,stroke:#333,stroke-width:2px,color:#333
    style E fill:#AED581,stroke:#333,stroke-width:2px,color:#333
    style F fill:#BA68C8,stroke:#333,stroke-width:2px,color:#fff
    style Docker_Environment fill:#f0f0f0,stroke:#666,stroke-dasharray:5 5,color:#333

    A[Angular Web<br>Port 4200] -->|REST API| C[Java Spring Backend<br>Port 8080]
    B[React Native App<br>Port 8082] -->|REST API| C

    C -->|Generazione task| Gemini[Google Gemini AI]

    subgraph Docker_Environment [Ambiente Docker]
        D[Docker Network]
        E[MySQL<br>Port 3306]
        F[phpMyAdmin<br>Port 8081]

        D --- E
        D --- F
    end

    C --> D
```
---

## API Endpoints (REST)

### Task Management
| Metodo | Endpoint | Descrizione |
| :--- | :--- | :--- |
| **GET** | `/api/tasks` | Recupero tutti i task |
| **GET** | `/api/tasks?page=0&size=20` | Recupero task con paginazione lato server |
| **GET** | `/api/tasks/{id}` | Recupero dettaglio singolo task |
| **POST** | `/api/tasks` | Creazione di una nuova task |
| **PATCH** | `/api/tasks/{id}` | Modifica completa dei campi di una task |
| **PATCH** | `/api/tasks/{id}/status` | Aggiornamento rapido dello status (TODO/DONE) |
| **DELETE** | `/api/tasks/{id}` | Eliminazione definitiva di una task |

### AI Generation
| Metodo | Endpoint | Descrizione |
| :--- | :--- | :--- |
| **POST** | `/api/tasks/ai/generate` | Generazione automatica di task multipli tramite prompt |

---

## Sicurezza e Comunicazione (CORS)
Per permettere al Frontend Web (Angular) e Mobile (React Native) di comunicare correttamente con il Backend, è stata implementata una policy CORS dinamica che abilita:

- **Web**: Abilitato l'accesso per `http://localhost:4200`
- **Mobile**: Accesso configurato per l'IP locale della workstation (necessario per il debug su dispositivi fisici tramite Expo Go) e per l'indirizzo standard dell'emulatore Android `10.0.2.2`
- **Metodi**: Supporto completo per `GET`, `POST`, `PATCH`, `DELETE` e `OPTIONS`

---

## Installazione e avvio

### Prerequisiti

- Java 17+, Maven
- Node.js 20+, npm
- Angular CLI (per web)
- Expo CLI (`npm install -g expo-cli`) o `npx expo`
- Docker Desktop
- Android Studio (emulatore) o dispositivo fisico per il mobile

### 1. Database (Docker)
Dalla cartella root del progetto, avvia i container per MySQL e phpMyAdmin:
```bash
docker compose up -d
```
- phpMyAdmin (UI database) disponibile su: http://localhost:8081/

### 2. Configurazione AI
Per utilizzare la funzione AI è necessario ottenere una **API Key** su [Google AI Studio](https://aistudio.google.com/api-keys)

Per configurare la API Key ci sono due opzioni:
- **Variabile d'ambiente (Consigliato)**: imposta una variabile d'ambiente sul tuo sistema operativo chiamata **GEMINI_API_KEY**

```bash
# Windows (PowerShell)
setx GEMINI_API_KEY "tua_chiave_qui"

# Linux / Mac
export GEMINI_API_KEY="tua_chiave_qui"
```

- **File di configurazione**: Inserisci la chiave direttamente nel file `taskflow-backend/src/main/resources/application.properties`

```properties
spring.ai.google.genai.api-key=INSERIRE_QUI_LA_CHIAVE
```

### 3. Avvio Backend
```bash
cd taskflow-backend
mvn spring-boot:run
```
- API REST disponibile su: http://localhost:8080/api/tasks

### 4. Avvio Frontend Web
```bash
cd taskflow-frontend-web
npm install
ng serve
```
- App disponibile su: http://localhost:4200

### 5. Avvio Frontend Mobile
```bash
cd taskflow-frontend-mobile
npm install
npx expo start
```
- Emulatori: Premi `a` per Android o `i` per iOS (solo macOS).
- Dispositivo Fisico: Inquadra il QR code con l'app Expo Go (disponibile su Play Store/App Store).

---

## Funzionalità 

### Backend (API REST)
- CRUD completo dei task
- Recupero task singolo per ID
- Aggiornamento rapido dello status (TODO/DONE)
- Aggiornamento completo dei campi
- Paginazione lato server
- AI Task Generation

### Frontend Web (Angular)
- Visualizzazione task in tabella
- Creazione, modifica ed eliminazione task
- Creazione task tramite AI
- Toggle rapido dello status
- Aggiornamento automatico della UI
- Gestione loading e lista vuota
- Paginazione

### Frontend Mobile (React Native)
- Visualizzazione task
- Creazione task
- Creazione task tramite AI
- Visualizzazione singolo task con modifica e cancellazione
- Toggle rapido dello status tramite checkbox
- Aggiornamento automatico della UI
- Filtro task Todo e Done
- Swipe per cancellazione task

---

## Screenshot
### Web
---
#### Lista Task
![Task List](screenshots/task-list.png)

#### Dettaglio Task
![Task Detail](screenshots/task.png)

#### Creazione Task
![Create Task](screenshots/task-create.png)

#### Genera Task con AI
![Generate Task](screenshots/generate-task.png)

#### Modifica Task
![Edit Task](screenshots/task-edit.png)

### Mobile
---
#### Lista Task Mobile
![Task List Mobile](screenshots/task-list-mobile.png)

#### Dettaglio Task Mobile
![Task Detail Mobile](screenshots/task-mobile.png)

### Filtro Task Todo/Done

| Task Todo | Task Done |
| :---: | :---: |
| ![Task Todo Mobile](screenshots/task-todo-mobile.png) | ![Task Done Mobile](screenshots/task-done-mobile.png) |

#### Modifica Task
![Edit Task Mobile](screenshots/task-edit-mobile.png)

#### Genera Task con AI
![Generate Task Mobile](screenshots/generate-task-mobile.png)

