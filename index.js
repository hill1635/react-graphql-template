const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('test');
    const user = await prisma.user.create({
        data: {
            email: 'test@test.com',
            name: 'Test User'
        }
    });
    console.log("user:", user);
}

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   });