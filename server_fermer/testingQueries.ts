// import { city, sport } from './prisma/citysAndSports';
// import { Advert, User } from '@prisma/client';

// const { prisma } = require('./app');

// Получить только уникальные объявления и их города
// async function getUniqueAdverts() {
//   let result: object[];
//
//   try {
//     result = await prisma.advert.findMany({
//       distinct: ['city'],
//     });
//   } catch (error) {
//     console.error(error);
//     return;
//   }
//
//   console.log(result);
// }

// getUniqueAdverts();

// console.log('city.length', city.length);
// console.log('sport.length', sport.length);

// async function main() {
//   const newUser = await prisma.user.create({
//     data: {
//       username: 'Zhopa',
//       email: 'z@zhopa',
//       password: 'sdlfjbnlwkjlkj4lkj35ljk34b5',
//     },
//   });
//
//   console.log('newUser', newUser);
// }
//
// main();
//
// const userId = '1c001804-11a8-40fe-a87c-de2876cf69ba';
// async function bain() {
//   const user = await prisma.user.findUnique({ where: { id: userId } });
//
//   console.log('user', user);
// }
//
// bain();

// async function createComment() {
//   const newComment = await prisma.comment.create({
//     data: {
//       comment: 'Good job!',
//       stars: 5,
//       user_id: '1c001804-11a8-40fe-a87c-de2876cf69ba',
//       advert_id: 'c5d58fe6-af96-4c6d-8eaf-7d7c1b47b6b0',
//     },
//   });
//
//   console.log('newComment', newComment);
// }
//
// createComment();

// async function getAllCommentsByAdvert(advertID: string) {
//   const allComments = await prisma.comment.findMany({
//     where: { advert_id: advertID },
//     include: { user: true, advert: true },
//   });
//
//   console.log('allComments', allComments);
// }
//
// getAllCommentsByAdvert('c5d58fe6-af96-4c6d-8eaf-7d7c1b47b6b0');

// async function getAllCommentsByUser(userID: string) {
//   const allComments = await prisma.comment.findMany({
//     where: { user_id: userID },
//     include: { user: true, advert: true },
//   });
//
//   console.log('allComments', allComments);
// }
//
// getAllCommentsByUser('1c001804-11a8-40fe-a87c-de2876cf69ba');

// ПОЛУЧИТЬ ВСЕ КОММЕНТЫ НА ВСЕ ОБЪЯЫЛЕНИЯ ЮЗЕРА

// async function getCommentsByAdvertsOwner(userID: string) {
//   const userAdvertsComments = await prisma.advert.findMany({
//     where: { user_id: userID },
//     include: { comments: true },
//   });
//
//   console.log('userAdvertsComments', userAdvertsComments);
// }
//
// getCommentsByAdvertsOwner('1c001804-11a8-40fe-a87c-de2876cf69ba');

// // eslint-disable-next-line import/no-extraneous-dependencies
// const { faker } = require('@faker-js/faker');
//
// const randomImg = faker.image.unsplash.imageUrl(); // Rowan Nikolaus
//
// console.log(randomImg);

// async function getAllUsersWithAdverts() {
//   const all = await prisma.user.findMany({
//     select: { id: true, adverts: true },
//   });
//
//   console.log('all[79].adverts[0].id', all[79].adverts[0].id);
// }
//
// getAllUsersWithAdverts();
//
// async function getAllUsersID() {
//   const usersID = await prisma.user.findMany({
//     select: { id: true },
//   });
//
//   console.log('usersID', usersID);
// }
//
// async function getAllAdvertsID() {
//   const advertsID = await prisma.advert.findMany({
//     select: { id: true },
//   });
//
//   console.log('advertsID', advertsID);
// }
//
// getAllAdvertsID();
