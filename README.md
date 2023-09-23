
# PERN STORE

A full-stack e-commerce project built with Postgres, Express, React and Node.

## Swagger API Documentation

[Documentation](https://pern-store.onrender.com/api/docs/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/dhatguy/PERN-Store.git
```

Go to the project directory

```bash
  cd PERN-Store
```

Install dependencies

```bash
  npm install
```

Go to server directory and install dependencies

```bash
  npm install
```

Go to client directory and install dependencies

```bash
  npm install
```

Go to server directory and start the server

```bash
  npm run dev
```

Go to client directory and start the client

```bash
  npm run client
```

Start both client and server concurrently from the root directory

```bash
  npm run dev
```

## Running with docker

Make sure you have Docker installed

### Run the development environment

```bash
docker-compose -f docker-compose.dev.yml up
```

### Run the production environment

```bash
docker-compose up
```

Go to http://localhost:3000 to view the app running on your browser.

## Deployment

To deploy this project run

```bash
  npm run deploy
```

## Tech

- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Postgres](https://www.postgresql.org/)
- [node-postgres](https://node-postgres.com/)
- [Windmill React UI](https://windmillui.com/react-ui)
- [Tailwind-CSS](https://tailwindcss.com/)
- [react-hot-toast](https://react-hot-toast.com/docs)
- [react-Spinners](https://www.npmjs.com/package/react-spinners)
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env files in both client and server directory

#### client/.env

`VITE_GOOGLE_CLIENT_ID`

`VITE_GOOGLE_CLIENT_SECRET`

`VITE_API_URL`

`VITE_STRIPE_PUB_KEY`

### server/.env

`POSTGRES_USER`

`POSTGRES_HOST`

`POSTGRES_PASSWORD`

`POSTGRES_DATABASE`

`POSTGRES_DATABASE_TEST`

`POSTGRES_PORT`

`PORT`

`SECRET`

`REFRESH_SECRET`

`SMTP_FROM`

`STRIPE_SECRET_KEY`
