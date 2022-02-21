// eslint-disable-next-line import/no-extraneous-dependencies
// const { faker } = require('@faker-js/faker');
// const axios = require('axios');
// const fs = require('fs').promises;
// const path = require('path');
//
// const img = faker.image.unsplash.imageUrl();
//
// async function getImgUrl() {
//   const response = await axios.get(img);
//   return response.request.res.responseUrl;
// }
//
// const photosBase = [];
//
// async function loco() {
//   console.log('start');
//
//   for (let i = 0; i < 539; i++) {
//     const currentUrl = await getImgUrl();
//     photosBase.push(currentUrl);
//     console.log(photosBase[i]);
//
//     fs.appendFile(path.resolve('photos.txt'), `${photosBase[i]}\n`, (err) => {
//       if (err) {
//         console.error(err);
//       }
//     });
//   }
//   console.log('end');
// }
//
// loco();
