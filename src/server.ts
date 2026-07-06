import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const { port } = config

const main = async () => {
    try {
        await prisma.$disconnect();

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }

    catch {
        await prisma.$disconnect();
        process.exit(1);
    };
}

main()