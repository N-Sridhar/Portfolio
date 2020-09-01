/* eslint-disable no-unused-vars */
import {db, storage, collectionName, fieldValue} from './firebase';
import moment from 'moment';
import 'moment-timezone';
import {
  isMobile,
  deviceType,
  mobileVendor,
  mobileModel,
  osName,
  osVersion,
  browserName,
  browserVersion,
  engineName,
  engineVersion,
} from 'react-device-detect';
import axios from 'axios';

const dateTime = moment().format('ddd, D-MM-YYYY | h:mm:ss a');
const zone = moment.tz.guess();
const zName = moment.tz(zone).zoneName();
const dateTimeZone = dateTime + ' | ' + zName;

const data = {
  '0 Entry': 'New Visitor',
  '1 date & time': dateTimeZone,
  '2 ip info': 'yet to be updated.',
  '3 device': deviceType,
  '4 model': !isMobile ? 'PC / Laptop' : mobileVendor + ' - ' + mobileModel,
  '5 os': osName + ' - ' + osVersion,
  '6 browser':
    browserName +
    ' - ' +
    browserVersion +
    ' | ' +
    engineName +
    ' - ' +
    engineVersion,
  '9 created': fieldValue.serverTimestamp(),
};

const createDoc = async (data, setId) => {
  await db
    .collection(collectionName)
    .add(data)
    .then((res) => {
      localStorage.setItem('id', res.id);
      localStorage.setItem('timestamp', dateTimeZone);
      setId(res.id);
    });
};

const updateEntry = async (id, data) => {
  await db
    .collection(collectionName)
    .doc(id)
    .update({'0 Entry': data})
    .catch((err) => console.log(err));
};

const ipInfo = async (id) => {
  axios
    .get(
      'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation?apikey=873dbe322aea47f89dcf729dcc8f60e8',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host':
            'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com',
          'x-rapidapi-key':
            '9b3ea1da7amsh91fa11ce6b1b667p180c01jsn9353680b637f',
        },
      }
    )
    .then((res) => {
      db.collection(collectionName)
        .doc(id)
        .update({
          '2 ip info': fieldValue.arrayUnion(res.data.ip),
        });

      axios
        .get(
          `https://apility-io-ip-geolocation-v1.p.rapidapi.com/${res.data.ip}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'apility-io-ip-geolocation-v1.p.rapidapi.com',
              'x-rapidapi-key':
                '9b3ea1da7amsh91fa11ce6b1b667p180c01jsn9353680b637f',
              accept: 'application/json',
            },
          }
        )
        .then((res) => {
          const addr = res.data.ip.address;
          const merchant = res.data.ip.as.name;
          const city = res.data.ip.city_names.en;
          const region = res.data.ip.region_names.en;
          const country = res.data.ip.country_names.en;

          const ipdata = {
            ip: addr + ' - ' + merchant.split('.')[0],
            loc: city + ' - ' + region + ' - ' + country,
          };

          db.collection(collectionName)
            .doc(id)
            .update({
              // '2 ip info': fieldValue.arrayUnion(ipdata['ip'], ipdata['loc']),
              '2 ip info': fieldValue.arrayRemove(addr),
            })
            .then(
              db
                .collection(collectionName)
                .doc(id)
                .update({
                  '2 ip info': fieldValue.arrayUnion(
                    ipdata['ip'],
                    ipdata['loc']
                  ),
                })
            )
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updatePage = async (id, pageName) => {
  await db
    .collection(collectionName)
    .doc(id)
    .update({'7 screens:': fieldValue.arrayUnion(pageName)})
    // .then((res) => console.log('updated - page'))
    .catch((err) => console.log(err));
};

const updatePageTime = async (startTime, endTime, id, pageName) => {
  var sec = endTime.diff(startTime, 'seconds');
  const time =
    sec <= 60 ? sec + 's' : (sec - (sec %= 60)) / 60 + 'm ' + sec + 's';

  await db
    .collection(collectionName)
    .doc(id)
    .update({'7 screens:': fieldValue.arrayRemove(pageName)})
    .then(
      await db
        .collection(collectionName)
        .doc(id)
        .update({'7 screens:': fieldValue.arrayUnion(pageName + ' - ' + time)})
        // .then((res) => console.log('updated with time'))
        .catch((err) => console.log(err))
    );
};

const checkedUpdation = async (id, item) => {
  await db
    .collection(collectionName)
    .doc(id)
    .update({'8 checked:': fieldValue.arrayUnion(item)})
    // .then((res) => console.log('updated - item'))
    .catch((err) => console.log(err));
};

const getPDF = (id, count) => {
  const newPage = window.open();
  newPage.document.title = 'Sridhar Nallasamy 😊 • Resume';
  newPage.document.body.style.backgroundColor = '#282c34';
  newPage.document.body.style.display = 'flex';
  newPage.document.body.style.alignItems = 'center';
  newPage.document.body.style.justifyContent = 'center';
  const h1 = newPage.document.createElement('h1');
  h1.innerText = '⏳ Loading... Please wait';
  h1.style.color = 'white';
  newPage.document.body.appendChild(h1);

  db.collection('resume')
    .doc('drive')
    .onSnapshot((snap) => {
      checkedUpdation(
        id,
        count + '. Resume (' + moment().format('h:mm:ss a') + ')'
      );
      newPage.location = snap.data().link;
    });

  // storage
  //   .refFromURL('gs://sridhar-nallasamy.appspot.com/Resume/Sridhar.pdf')
  //   .getDownloadURL()
  //   .then(function (url) {
  //     newPage.location = url;
  //     checkedUpdation(
  //       id,
  //       count + '. Resume (' + moment().format('h:mm:ss a') + ')'
  //     );
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // newPage.location =
  //   'https://drive.google.com/file/d/139Q-LFK-rh_HtQyuWSN_X7yTsMi53CRE/view?usp=sharing';
};

export {
  collectionName,
  data,
  createDoc,
  updateEntry,
  ipInfo,
  updatePage,
  checkedUpdation,
  updatePageTime,
  getPDF,
};
