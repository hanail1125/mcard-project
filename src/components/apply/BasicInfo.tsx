import { 결제일옵션, 신용점수옵션, 연소득옵션 } from '@/constants/apply';
import { ApplyValues } from '@/models/apply';
import Select from '@shared/Select';
import { ChangeEvent, useCallback, useState } from 'react';
import FixedBottomButton from '../shared/FixedBottomButton';
import Spacing from '../shared/Spacing';

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>;

const BasicInfo = ({
  onNext,
}: {
  onNext: (infoValues: InfoValues) => void;
}) => {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  });

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const 모든정보가선택되었는가 = Object.values(infoValues).every(
    value => value,
  );

  // console.log('모든정보가선택되었는가 : ', 모든정보가선택되었는가);

  return (
    <div style={{ padding: 20 }}>
      <Select
        name="salary"
        title="연소득"
        options={연소득옵션}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Spacing size={10} />
      <Select
        name="creditScore"
        title="신용점수"
        options={신용점수옵션}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Spacing size={10} />
      <Select
        name="payDate"
        title="결제일"
        options={결제일옵션}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues);
        }}
        disabled={!모든정보가선택되었는가}
      />
    </div>
  );
};

export default BasicInfo;
