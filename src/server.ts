import { buildApp } from './app';
import { PORT } from './config';

const startServer = async () => {
    const app = buildApp();

    try {
        const address = app.listen({ port: PORT });
        app.log.info(`Server listening on ${address}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

startServer();
