# DNATrain

> _Hanarebanare no machi o tsunagu ressha wa itte shimatta ne_

## Table of Contents

- [Description](#description)
- [Tech Stacks](#tech-stacks)
- [Requirements](#requirements)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Developer](#developer)

## Description

DNATrain is a web application for diagnosing sickness on a patient by doing pattern matching on patient's DNA with the pattern on Database.

## Tech Stacks

- Front-End : React
- Back-End : Golang with Echo
- Database : MySQL on [Planetscape](https://planetscape.com)

## Requirements

- Node (Node 16)
- Golang (go 1.18)

## Folder Structure

```
└── src                     // All code directory
    ├── backend             // Backend code directory
    │   ├── libs            // Custom libs used by backend
    │   └── web             // Backend web module
    │       ├── database
    │       ├── handler
    │       ├── model
    │       ├── router
    │       └── server
    └── frontend            // Frontend code directory
        ├── public
        └── src
```

## Usage

How to start server locally

### Backend

1. Change directory to `src/backend`
2. Duplicate `.env.example` and rename it into `.env`, then put the DB_URL using your own url
3. Install golang packages using `go get` command
4. Run server using `go run main.go`
5. Check running server on `localhost:$PORT`

### Frontend

1. Change directory to `src/frontend`
2. Install node packages using `npm i` command
3. Run server using `npm start`
4. Check running server on `localhost:$PORT`

## Developer

- Dzaky Fattan Rizqullah (13520003)
- Yohana Golkaria Nainggolan (13520053)
- Rifqi Naufal Abdjul (13520062)
