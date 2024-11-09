## Description
- Proyecto con nestjs sobre una api de tareas, esta api
- tiene auntenticacion de api_key y jwt
- se necesita enviar un api_key valido para poder usar todas las rutas
- asi como tener una session valida para usar las api de task y user

## Project setup

```bash
$ npm install
```

## .env Example
```bash
API_KEY=PALABRASECRETAAPIKEY
JWTSECRETE=PALABRASECRETAJWT
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_NAME=taskNest
DATABASE_SYNC=true
```

## Inicializacion con docker
```bash
docker-compose build
docker-compose up

docker build -t api_task_nestjs .


#para verificar que la network en la que esta la base de datos
docker network ls

#con el network que tiene mysql se hace algo asi
docker run --rm -it --network api_task_nestjs_app_network -p 3000:3000  -e API_KEY=PALABRASECRETAAPIKEY -e JWTSECRET=PALABRASECRETAJWT -e PORT=3000 -e DATABASE_HOST=mysql -e DATABASE_PORT=3306 -e DATABASE_USER=user_tasks -e DATABASE_PASSWORD=root -e DATABASE_NAME=taskNest -e DATABASE_SYNC=true api_task_nestjs
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Ejemplos de uso de cada endpoint
http://localhost:3000/api/
## Estructura del proyecto
- La estructura del proyecto es modular

src/
├── auth/                           # Módulo de autenticación
│   ├── constants/                  # Constantes para autenticación
│   │   └── jwtConstants.secrets    # Archivo con claves secretas de JWT
│   ├── dto/                        # DTOs para login y registro
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guard/                      # Guardias de autenticación y autorización
│   │   ├── auth.guard.ts
│   │   └── user.guard.ts
│   ├── strategy/                   # Estrategias para autenticación
│   │   └── api-key-strategy.ts     # Estrategia para validación de API Key
│   ├── auth.controller.ts          # Controlador de autenticación
│   ├── auth.middleware.ts          # Middleware de autenticación
│   ├── auth.module.ts              # Módulo de autenticación
│   └── auth.service.ts             # Servicio de autenticación
│
├── database/                       # Módulo de base de datos
│   └── database.module.ts          # Módulo para la conexión a la base de datos
│
├── config/                         # Módulo de configuración
│   ├── config-loader.ts            # Cargador de configuración
│   ├── config.module.ts            # Módulo de configuración
│   └── env-schema.ts               # Esquema de validación de variables de entorno
│
├── modules/                        # Módulos principales de la aplicación
│   ├── task/                       # Módulo de tareas
│   │   ├── dto/                    # DTOs de tareas
│   │   │   ├── create-task.dto.ts
│   │   │   └── update-task.dto.ts
│   │   ├── entities/               # Entidades de tareas
│   │   │   └── task.entity.ts
│   │   ├── enums/                  # Enumeraciones de estado de tareas
│   │   │   └── status.enum.ts
│   │   ├── task.controller.ts      # Controlador de tareas
│   │   ├── task.module.ts          # Módulo de tareas
│   │   └── task.service.ts         # Servicio de tareas
│   │
│   └── user/                       # Módulo de usuarios
│       ├── dto/                    # DTOs de usuarios
│       │   ├── create-user.dto.ts
│       │   └── update-user.dto.ts
│       ├── entities/               # Entidades de usuarios
│       │   └── user.entity.ts
│       ├── user.controller.ts      # Controlador de usuarios
│       ├── user.module.ts          # Módulo de usuarios
│       └── user.service.ts         # Servicio de usuarios
│
├── app.controller.ts               # Controlador principal de la aplicación
├── app.module.ts                   # Módulo principal de la aplicación
├── app.service.ts                  # Servicio principal de la aplicación
└── main.ts                         # Punto de entrada de la aplicación

## Resources

Check out a few resources that may come in handy when working with NestJS:
- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
