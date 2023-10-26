import RNFS from 'react-native-fs';

const base64ToPDF = async (base64Data, fileName) => {
  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`;

  try {
    await RNFS.writeFile(filePath, base64Data, 'base64');
    return filePath;
  } catch (error) {
    console.error('Error writing PDF file:', error);
    throw error;
  }
};
export default base64ToPDF;
