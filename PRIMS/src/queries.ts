import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  // write functions here!

  //   const allUsers = await prisma.user.findMany();
  //   console.log(allUsers);

  //   await prisma.user.create({
  //     data: {
  //       name: "Ashvatth",
  //       email: "ashvatth@example.com",
  //       posts: {
  //         create: {
  //           title: "Example Post",
  //         },
  //       },
  //       profile: {
  //         create: {
  //           bio: "Example Bio",
  //         },
  //       },
  //     },
  //   });

  //   const allUsers = await prisma.user.findMany({
  //     include: {
  //       posts: true,
  //       profile: true,
  //     },
  //   });

  //   console.dir(allUsers, { depth: null });
  // }

  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });
  console.log(post);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    //
    await prisma.$disconnect();
    process.exit(1);
  });
