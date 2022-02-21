import { PrismaClient, Prisma } from '@prisma/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import path from 'path';
import fs from 'fs';
import { city, sport } from './citysAndSports';

const allCities = city.map((el) => el.city.trim());
const allSports = sport.map((el) => el.trim());

const prisma = new PrismaClient();

function random(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const userData: Prisma.UserCreateInput[] = [];

const photosBase: string[] = fs
  .readFileSync(path.resolve(process.cwd(), 'prisma', 'photos.txt'), 'utf8')
  .trim()
  .split('\n');

for (let i = 0; i < 200; i++) {
  userData.push({
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '12345678',
    about: faker.hacker.phrase(),
    photo: photosBase[random(0, 1069)],
    is_instructor: false,
  });
}

for (let i = 0; i < 200; i++) {
  const cost = Math.floor(Math.random() * 45 + 1) * 100;

  userData.push({
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '12345678',
    about: faker.hacker.phrase(),
    photo: photosBase[random(0, 1069)],
    is_instructor: true,
    adverts: {
      create: [
        {
          title: faker.random.words(4),
          content: faker.lorem.sentences(),
          sport_type: allSports[random(0, 66)],
          city: allCities[random(0, 209)],
          price: cost,
          duration_min: random(6, 12) * 10,
          picture: photosBase[random(0, 1069)],
        },
      ],
    },
  });
}

for (let i = 0; i < 100; i++) {
  const cost = Math.floor(Math.random() * 45 + 1) * 100;

  userData.push({
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '12345678',
    about: faker.hacker.phrase(),
    photo: photosBase[random(0, 1069)],
    is_instructor: true,
    adverts: {
      create: [
        {
          title: faker.random.words(4),
          content: faker.lorem.sentences(),
          sport_type: allSports[random(0, 66)],
          city: allCities[random(0, 209)],
          price: cost,
          duration_min: random(6, 12) * 10,
          picture: photosBase[random(0, 1069)],
        },
        {
          title: faker.random.words(4),
          content: faker.lorem.sentences(),
          sport_type: allSports[random(0, 66)],
          city: allCities[random(0, 209)],
          price: cost,
          duration_min: random(6, 12) * 10,
          picture: photosBase[random(0, 1069)],
        },
      ],
    },
  });
}

for (let i = 0; i < 100; i++) {
  const cost = Math.floor(Math.random() * 45 + 1) * 100;

  userData.push({
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '12345678',
    about: faker.hacker.phrase(),
    photo: photosBase[random(0, 1069)],
    is_instructor: true,
    adverts: {
      create: [
        {
          title: faker.random.words(4),
          content: faker.lorem.sentences(),
          sport_type: allSports[random(0, 66)],
          city: allCities[random(0, 209)],
          price: cost,
          duration_min: random(6, 12) * 10,
          picture: photosBase[random(0, 1069)],
        },
        {
          title: faker.random.words(4),
          content: faker.lorem.sentences(),
          sport_type: allSports[random(0, 66)],
          city: allCities[random(0, 209)],
          price: cost,
          duration_min: random(6, 12) * 10,
          picture: photosBase[random(0, 1069)],
        },
        {
          title: faker.random.words(4),
          content: faker.lorem.sentences(),
          sport_type: allSports[random(0, 66)],
          city: allCities[random(0, 209)],
          price: cost,
          duration_min: random(6, 12) * 10,
          picture: photosBase[random(0, 1069)],
        },
      ],
    },
  });
}

async function getAllUsersID() {
  const usersID = await prisma.user.findMany({
    select: { id: true },
  });

  return usersID;
}

async function getAllAdvertsID() {
  const advertsID = await prisma.advert.findMany({
    select: { id: true },
  });

  return advertsID;
}

async function main() {
  console.log(`Засеиваем...`);

  // eslint-disable-next-line no-restricted-syntax
  for (const u of userData) {
    // eslint-disable-next-line no-await-in-loop
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Пользователь с id ${user.id} успешно создан`);
  }
  console.log(`Засеили юзеров и адвертсы`);

  const usersID = await getAllUsersID();
  const advertsID = await getAllAdvertsID();

  for (let i = 0; i < 3000; i++) {
    const userId = usersID[random(0, 399)].id;
    const advertId = advertsID[random(0, 599)].id;
    // eslint-disable-next-line no-await-in-loop
    try {
      const comment = await prisma.comment.create({
        data: {
          comment: faker.lorem.sentence(),
          stars: random(1, 5),
          user_id: userId,
          advert_id: advertId,
        },
      });
      console.log(`Коммент с id ${comment.id} успешно создан`);
    } catch (error) {
      console.error(error);
    }

    try {
      const rating = await prisma.comment.aggregate({
        where: {
          advert_id: advertId,
        },
        _avg: {
          stars: true,
        },
      });
      await prisma.advert.update({
        where: {
          id: advertId,
        },
        data: {
          rating: rating._avg.stars ? rating._avg.stars : 0,
        },
      });
    } catch (e) {
      console.log(e);
      return;
    }
  }

  console.log('Засеили комменты');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
