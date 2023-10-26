import { Share } from 'react-native';
import { useCallback } from 'react';

const useShare = () => {
  const shareContent = useCallback(async (message, url, title) => {
    try {
      const result = await Share.share({
        message: message,
        url: url,
        title: title,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
            console.log(`Shared with specific app: ${result.activityType}`);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error:any) {
      console.error('Error sharing content: ', error.message);
    }
  }, []);

  return shareContent;
};

export default useShare;
