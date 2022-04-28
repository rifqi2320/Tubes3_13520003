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
  - [Local Database Setup](#local-database-setup)
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
    └── frontend_next       // Frontend code directory
        ├── components
        ├── pages
        ├── public
        └── styles
```

## Usage

How to start server locally

### Backend

1. Change directory to `src/backend`
2. Duplicate `.env.example` and rename it into `.env`, then put the DB_URL using your own url, example: `root@tcp(localhost:1234)/dnatrain?parseTime=true`. `dnatrain` is the name of the database. make sure the last argument `?parseTime=true` is used;
3. Install golang packages using `go get` command
4. Run server using `go run main.go`
5. Check running server on `localhost:$PORT`

### Frontend

1. Change directory to `src/frontend_next`
2. Install node packages using `npm i` command
3. Open `axios.js` in `src/frontend_next/lib`, locate variable `baseURL`, change the string to `http://localhost:$PORT` and replacing `$PORT` with the actualy port number on the `.env` file (check Backend section)
4. Run server using `npm run dev`
5. Check running server on `localhost:$PORT`

### Local Database setup

Adjust to the existing local DBMS if necessary

1. Create new database named `dnatrain` - make sure the name of the database is the same as written on DB_URL (Refer to backend section).
2. Create table named `penyakit` with attribute `name` with type `varchar(255)` (string) and attribute `dna` with type `varchar(255)`.
3. Create table named `test` with attribute `tanggal` with type `datetime`, attribute `name` with type `varchar(255)`, attribute `nama_penyakit` with type `varchar(255)`, `kecocokan` with type `double`, and attribute `cocok` with type `boolean`

### Additional notes

The `Tambah Test` requires the list of `penyakit` (diseases) to not be empty, therefore, add any `penyakit` in `Tambah Penyakit` page before proceeding to do `Tambah Test`

## Developer

- Dzaky Fattan Rizqullah (13520003)
- Yohana Golkaria Nainggolan (13520053)
- Rifqi Naufal Abdjul (13520062)
