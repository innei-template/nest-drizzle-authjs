# Nest Drizzle + Auth.js

A Simple Nest.js Template Using Drizzle + Postgres, Auth.js.

## Demo


## Getting Started

Clone this project. Install the dependencies using pnpm. Copy the example environment variables.

```sh
git clone https://github.com/innei-template/nest-drizzle.git
cp .env.template .env
pnpm i
```

## Configure Auth.js

The configuration is located at `/apps/core/src/modules/auth/auth.config.ts` Please change your desired Provider here, GitHub OAuth is used by default.

`AUTH_SECRET` is a 64bit hash string, you can generate by this command.

```
openssl rand -hex 32
```

### License

2024 © Innei, Released under the MIT License.

> [Personal Website](https://innei.in/) · GitHub [@Innei](https://github.com/innei/)
