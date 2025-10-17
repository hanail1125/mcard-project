import { MouseEvent, useCallback, useState } from 'react';
import Agreement from '@shared/Agreement';

import FixedBottomButton from '../shared/FixedBottomButton';
import { ApplyValues } from '@models/apply';
import { 약관목록 } from '@/constants/apply';

const Terms = ({
  onNext,
}: {
  onNext: (terms: ApplyValues['terms']) => void;
}) => {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    );
  });

  // console.log('termsAgreements', termsAgreements);

  const 모든약관이_동의되었는가 = Object.values(termsAgreements).every(
    동의여부 => 동의여부,
  );

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      // console.log('checked =>', checked);

      setTermsAgreements(prevTerms => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: !checked,
          }),
          {},
        );
      });
    },
    [],
  );

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={모든약관이_동의되었는가}
          onChange={handleAllAgreement}
        >
          약관에 모두 동의
        </Agreement.Title>

        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements(prevTerms => ({
                ...prevTerms,
                [id]: !checked,
              }));
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관 동의"
        disabled={모든약관이_동의되었는가 === false}
        onClick={() => {
          onNext(Object.keys(termsAgreements));
        }}
      />
    </div>
  );
};

export default Terms;
