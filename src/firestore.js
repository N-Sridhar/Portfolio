import {db, collectionName, fieldValue} from './firebase';
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
  await db
    .collection(collectionName)
    .add(data)
    .then((res) => {
      console.log('doc id: ' + res.id);
      setId(res.id);
    });
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

const contactVisited = async (id, iconName) => {
  await db
    .collection(collectionName)
    .doc(id)
    .update({'8 checked:': fieldValue.arrayUnion(iconName)})
    .then((res) => console.log('updated - contact'))
    .catch((err) => console.log(err));
};

export {
  collectionName,
  data,
  createDoc,
  updateCoords,
  updatePage,
  contactVisited,
};
