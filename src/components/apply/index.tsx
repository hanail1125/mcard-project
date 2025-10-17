import { useEffect, useState } from 'react';
import BasicInfo from '@/components/apply/BasicInfo';
import CardInfo from '@/components/apply/CardInfo';
import Terms from '@/components/apply/Terms';
import { APPLY_STATUS, ApplyValues } from '@/models/apply';
import useUser from '@/hooks/auth/useUser';
import { useParams } from 'react-router-dom';
import ProgressBar from '@/components/shared/ProgressBar';

const LAST_STEP = 3;

const Apply = ({
  onSubmit,
}: {
  onSubmit: (applyvalues: ApplyValues) => void;
}) => {
  const user = useUser();
  const { id } = useParams() as { id: string };
  const storageKey = `applied-${user?.uid}-${id}`;

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey);
    if (applied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      };
    }

    return JSON.parse(applied);
  });

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey);
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(applyValues));
    }
  }, [applyValues, onSubmit, storageKey]);

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prevValues: Partial<ApplyValues>) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }));
  };

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    setApplyValues((prevValues: Partial<ApplyValues>) => ({
      ...prevValues,
      ...infoValues,
      step: (prevValues.step as number) + 1,
    }));
  };

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>,
  ) => {
    setApplyValues((prevValues: Partial<ApplyValues>) => ({
      ...prevValues,
      ...cardInfoValues,
      step: (prevValues.step as number) + 1,
    }));
  };

  return (
    <div>
      <ProgressBar progress={(applyValues.step as number) / LAST_STEP} />
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  );
};

export default Apply;
