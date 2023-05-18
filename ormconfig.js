"use strict";
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
require("dotenv/config");
const userEvent_subscriber_1 = require("./src/users/userEvent.subscriber");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, NODE_ENV } = process.env;
console.log(`****** application node is ${NODE_ENV}`);
const config = {
    type: 'postgres',
    host: DB_HOST,
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [
        'dist/**/*.entity.js',
    ],
    synchronize: false,
    migrations: ['dist/migration/*.js'],
    migrationsRun: true,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    cli: {
        migrationsDir: 'migration',
    },
    ssl: false,
    subscribers: [
        userEvent_subscriber_1.UserEventSubscriber,
    ],
};
module.exports = config;
//# sourceMappingURL=ormconfig.js.map