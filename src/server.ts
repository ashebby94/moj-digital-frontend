import { createApp } from "./app";

const port = 3000;

(async () => {
    const app = await createApp();
    app
        .listen(port, () => {
            console.info(`Server listening on port ${port}`);
            app.emit("appStarted");
        })
        .on("error", (error: Error) => {
            console.error(`Unable to start server because of ${error.message}`);
        });
})().catch((ex) => {
    console.error(`Server failed to create app ${ex.message}`);
});
