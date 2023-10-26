import {PermissionsAndroid, Platform} from 'react-native';

import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export const readDir = (pathDir, setBase64) => {
  console.log(
    `======================= readDir ${Platform.OS} =========================`,
  );
  RNFS.readDir(pathDir)
    .then(result => {
      console.log('GOT RESULT', Platform.OS, result);
      const file = result.find(element => element.name === 'sample.pdf');
      console.log('file', file);

      return Promise.all([RNFS.stat(file.path), file.path]);
    })
    .then(statResult => {
      console.log('statResult', statResult);
      if (statResult[0].isFile()) {
        return RNFS.readFile(statResult[1], 'base64');
      }

      return 'no file';
    })
    .then(contents => {
      console.log('CONTENTS', Platform.OS, contents);
      setBase64(contents);
    })
    .catch(error => {
      console.log('ERROR CONTENTS', Platform.OS, error);
    });
};



export const requestReadExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'External Storage Permission',
        message: 'This app needs access to your storage',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('requestReadExternalStorage permission GRANTED');
    } else {
      console.log('requestReadExternalStorage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const sharePdf = (base64, pathOnDevice) => {
  console.log(
    `====================== sharePdf ${Platform.OS} ======================`,
  );
  console.log('base64', base64);
  console.log('pathOnDevice', pathOnDevice);
  // const url = `file://${pathOnDevice}`;
  const url = `data:application/pdf;base64,${base64}`;

  Share.open({
    url,
    filename: 'resultado',
    type: 'pdf',
    title: 'My Application',
    message: 'resultado.pdf',
    subject: 'My Application',
  });
};


export const base64ToBinary = (base64) => {
  const binaryString = atob(base64);
  const binaryLength = binaryString.length;
  const byteArray = new Uint8Array(binaryLength);

  for (let i = 0; i < binaryLength; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  return byteArray;
};
