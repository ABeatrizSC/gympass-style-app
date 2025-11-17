import { env } from "@/env";
import { app } from "@/app.js";

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log("HTTP Server Running!")
})