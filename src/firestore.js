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

const dateTime = moment().format('ddd, D-MM-YYYY | h:mm:ss a');
const zone = moment.tz.guess();
const zName = moment.tz(zone).zoneName();
const dateTimeZone = dateTime + ' | ' + zName;

const data = {
  '0 Entry': 'New Visitor',
  '1 date & time': dateTimeZone,
  '2 coords': isMobile ? 'n/a' : 'yet to be updated.',
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
};

const createDoc = async (data, setId) => {
  await db
    .collection(collectionName)
    .add(data)
    .then((res) => {
      localStorage.setItem('id', res.id);
      localStorage.setItem('timestamp', dateTimeZone);
      setId(res.id);
      console.log('Thank you for visiting my site 😊.');
      console.log(
        '❗If you have any thoughts or qurires or doubts, please go to the "📲 Lets Talk" page & reach me.'
      );
    });
};

const updateEntry = async (id, data) => {
  await db
    .collection(collectionName)
    .doc(id)
    .update({'0 Entry': data})
    .catch((err) => console.log(err));
};

const updateCoords = async (id, coords) => {
  await db
    .collection(collectionName)
    .doc(id)
    .update({'2 coords': coords})
    .then((res) => console.log('coords updated.'))
    .catch((err) => console.log(err));
};

const updatePage = async (id, pageName) => {
  await db
    .collection(collectionName)
    .doc(id)
    .update({'7 screens:': fieldValue.arrayUnion(pageName)})
    .then((res) => console.log('updated - page'))
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
        .then((res) => console.log('updated with time'))
        .catch((err) => console.log(err))
    );
};

const checkedUpdation = async (id, item) => {
  await db
    .collection(collectionName)
    .doc(id)
    .update({'8 checked:': fieldValue.arrayUnion(item)})
    .then((res) => console.log('updated - item'))
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

  storage
    .refFromURL('gs://sridhar-nallasamy.appspot.com/Resume/Sridhar.pdf')
    .getDownloadURL()
    .then(function (url) {
      newPage.location = url;
      checkedUpdation(
        id,
        count + '. Resume (' + moment().format('h:mm:ss a') + ')'
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  collectionName,
  data,
  createDoc,
  updateEntry,
  updateCoords,
  updatePage,
  checkedUpdation,
  updatePageTime,
  getPDF,
};
