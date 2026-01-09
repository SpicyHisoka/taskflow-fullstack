# TaskFlow App

TaskFlow è una semplice applicazione Web Full-Stack per la gestione dei task.
Il progetto utilizza un'architettura moderna basata su **Spring Boot 3** e **Angular 18+**.

## Stack Tecnologico

### Backend
- **Java 17+** & **Spring Boot 3.4.1**
- **JPA**: Standard Java per salvare dati.  
- **Hibernate**: Motore ORM per mappare classi e tabelle.  
- **Spring Data JPA**: Gestione semplice di repository e query.
- **MySQL 8**: Database ospitato su container Docker.
- **Architettura Layered**: Controller → Service → Repository → Model.

### Frontend
- **Angular 18+**: Utilizzo di **Standalone Components**.
- **Angular Signals**: Gestione dello stato reattiva per aggiornamenti dell'interfaccia.
- **Bootstrap 5**: Stili e layout base per l’interfaccia.

### Infrastruttura & Strumenti
- **Docker & Docker Compose**: Per la containerizzazione del database e di phpMyAdmin.
- **Maven**: Gestione delle dipendenze Java.
- **Git**: Versionamento con gestione monorepo.

---

## API Endpoints (REST)

| Metodo | Endpoint | Descrizione |
| :--- | :--- | :--- |
| **GET** | `/api/tasks` | Recupero tutti i task |
| **GET** | `/api/tasks?page=0&size=20` | Recupero task con paginazione lato server |
| **GET** | `/api/tasks/{id}` | Recupero dettaglio singola task |
| **POST** | `/api/tasks` | Creazione di una nuova task |
| **PATCH** | `/api/tasks/{id}` | Modifica completa dei campi di una task |
| **PATCH** | `/api/tasks/{id}/status` | Update rapido dello status (TODO/DONE) |
| **DELETE** | `/api/tasks/{id}` | Eliminazione definitiva di una task |

---

## Installazione e avvio

### 1. Prerequisiti

* Java 17+, Maven
* Node.js 20+, Angular CLI
* Docker Desktop

### 2. Database (Docker)
Dalla cartella root del progetto, avvia i container per MySQL e phpMyAdmin:
```bash
docker compose up -d
```
- phpMyAdmin (UI database) disponibile su:: http://localhost:8081/

### 3. Avvio Backend
```bash
cd taskflow-backend
mvn spring-boot:run
```
- API REST disponibile su: http://localhost:8080/api/tasks

### 4. Avvio Frontend
```bash
cd taskflow-frontend-web
npm install
ng serve
```
- App disponibile su: http://localhost:4200

---

## Funzionalità 

### Backend (API REST)
- CRUD completo dei task
- Recupero task singolo per ID
- Aggiornamento rapido dello status (TODO/DONE)
- Aggiornamento completo dei campi
- Paginazione lato server

### Frontend (Angular)
- Visualizzazione task in tabella
- Creazione, modifica ed eliminazione task
- Toggle rapido dello status
- Aggiornamento automatico della UI
- Gestione loading e lista vuota
- Paginazione

---

## Screenshot

### Lista Task
![Task List](screenshots/task-list.png)

### Dettaglio Task
![Task Detail](screenshots/task.png)

### Creazione Task
![Create Task](screenshots/task-create.png)

### Modifica Task
![Edit Task](screenshots/task-edit.png)