import RNFS from 'react-native-fs';
import {Platform} from 'react-native';

export function generateBase64FromPDF(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    RNFS.readFile(filePath, 'base64')
      .then(base64String => {
        if (Platform.OS === 'android') {
          // On Android, the base64 string is not properly formatted for PDFs
          const prefix = 'data:application/pdf;base64,';
          resolve(prefix + base64String);
        } else {
          resolve(base64String);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

//generate pdf file from base64 string

export function generatePDFFile(base64String: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfFilePath = `${RNFS.DocumentDirectoryPath}/test.pdf`;
    RNFS.writeFile(pdfFilePath, base64String, 'base64')
      .then(() => {
        resolve(pdfFilePath);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//POST,DELETE with token method for API call axios
import axios from 'axios';

export const apiCall = async (
  method: string,
  url: string,
  data: any,
  token: string,
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
//post if 401 or 404 error return another method




