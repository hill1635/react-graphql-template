const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

var main = async () => {
    const newUser = await prisma.user.create({
        data: {
            email: 'test@test.com',
            name: 'Test User'
        }
    });
    console.log(newUser);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });