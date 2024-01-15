"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
const roundsOfHashing = 10;
async function main() {
    const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
    const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);
    const user1 = await prisma.user.upsert({
        where: { username: 'sabin@adams.com' },
        update: {
            password: passwordSabin,
        },
        create: {
            username: 'sabin@adams.com',
            password: passwordSabin,
        },
    });
    const user2 = await prisma.user.upsert({
        where: { username: 'alex@ruheni.com' },
        update: {
            password: passwordAlex,
        },
        create: {
            username: 'alex@ruheni.com',
            password: passwordAlex,
        },
    });
    console.log(user1, user2);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map