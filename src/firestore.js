// eslint-disable-next-line no-unused-vars
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
  // await db
  //   .collection(collectionName)
  //   .add(data)
  //   .then((res) => {
  //     console.log('doc id: ' + res.id);
  //     setId(res.id);
  //   });
};

const updateCoords = async (id, coords) => {
  // await db
  //   .collection(collectionName)
  //   .doc(id)
  //   .update({'2 coords': coords})
  //   .then((res) => console.log('coords updated.'))
  //   .catch((err) => console.log(err));
};

const updatePage = async (id, pageName) => {
  // await db
  //   .collection(collectionName)
  //   .doc(id)
  //   .update({'7 screens:': fieldValue.arrayUnion(pageName)})
  //   .then((res) => console.log('updated - page'))
  //   .catch((err) => console.log(err));
};

const updatePageTime = async (startTime, endTime, id, pageName) => {
  var sec = endTime.diff(startTime, 'seconds');
  // eslint-disable-next-line no-unused-vars
  const time =
    sec <= 60 ? sec + 's' : (sec - (sec %= 60)) / 60 + 'm ' + sec + 's';

  // await db
  //   .collection(collectionName)
  //   .doc(id)
  //   .update({'7 screens:': fieldValue.arrayRemove(pageName)})
  //   .then(
  //     await db
  //       .collection(collectionName)
  //       .doc(id)
  //       .update({'7 screens:': fieldValue.arrayUnion(pageName + ' - ' + time)})
  //       .then((res) => console.log('updated with time'))
  //       .catch((err) => console.log(err))
  //   );
};

const contactVisited = async (id, iconName) => {
  // await db
  //   .collection(collectionName)
  //   .doc(id)
  //   .update({'8 checked:': fieldValue.arrayUnion(iconName)})
  //   .then((res) => console.log('updated - contact'))
  //   .catch((err) => console.log(err));
};

const getPDF = (id) => {
  // const time = moment().format('h:mm:ss a');
  const newPage = window.open();
  storage
    .refFromURL('gs://sridhar-nallasamy.appspot.com/Resume/Sridhar.pdf')
    .getDownloadURL()
    .then(function (url) {
      newPage.location = url;
      // resumeViewed(id, 'viewed - ' + time);
    })
    .catch((err) => {
      console.log(err);
    });

  // const resumeViewed = async (id, status) => {
  //   await db.collection(collectionName).doc(id).update({'9 resume': status});
  // };
};

export {
  collectionName,
  data,
  createDoc,
  updateCoords,
  updatePage,
  contactVisited,
  updatePageTime,
  getPDF,
};
