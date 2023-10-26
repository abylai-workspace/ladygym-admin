import * as RNFS from 'react-native-fs';
export function getFilePath(filename: string) {
    if (filename.includes('/')) {
      return `${RNFS.DocumentDirectoryPath}/${filename.split('/').pop()}`;
    }
    return `${RNFS.DocumentDirectoryPath}/${filename}`;
  }
  
  export function getBase64(path: string): Promise<string> {
    return RNFS.readFile(
      path,
      "base64"
    );
  }
  