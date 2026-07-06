import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const main = async () => {
    try {
        await prisma.$disconnect();

        const { port } = config

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