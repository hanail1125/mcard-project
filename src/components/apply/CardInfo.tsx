import Button from '@shared/Button';
import Spacing from '../shared/Spacing';
import { ApplyValues } from '@/models/apply';
import { MouseEvent, useCallback, useState } from 'react';
import FixedBottomButton from '../shared/FixedBottomButton';

type CardInfoValues = Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>;

const CardInfo = ({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void;
}) => {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isMaster: false,
    isRf: false,
    isHipass: false,
  });

  const { isMaster, isHipass, isRf } = cardInfoValues;

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement;

    setCardInfoValues(prevValues => ({
      ...prevValues,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }));
  }, []);

  // console.log('cardInfoValues', cardInfoValues);

  return (
    <div style={{ padding: '30px' }}>
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          weak={isMaster === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>
      <Spacing size={40} />

      <Button.Group title="후불교통가능">
        <Button
          name="isRf"
          weak={isRf === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={isRf === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>
      <Spacing size={40} />

      <Button.Group title="후불하이패스카드">
        <Button
          name="isHipass"
          weak={isHipass === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={isHipass === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>
      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValues);
        }}
      />
    </div>
  );
};

export default CardInfo;
