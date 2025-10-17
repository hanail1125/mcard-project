import { COLLECTIONS } from '@constants';
import { adBanners } from '@/mock/data';
import { store } from '@remote/firebase';
import Button from '@shared/Button';
import { collection, doc, writeBatch } from 'firebase/firestore';

const AdBannerListAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store);

    adBanners.forEach(banner => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER));

      batch.set(docRef, banner);
    });

    await batch.commit();

    alert('배너 리스트 추가완료!');
  };

  return (
    <Button color="success" onClick={handleButtonClick}>
      배너 리스트 추가하기
    </Button>
  );
};

export default AdBannerListAddButton;
