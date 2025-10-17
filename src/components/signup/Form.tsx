import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { FormValues } from '@models/signup';
import { css } from '@emotion/react';
import FixedBottomButton from '@shared/FixedBottomButton';
import Flex from '@shared/Flex';
import Spacing from '@shared/Spacing';
import TextField from '@shared/TextLabel';
import validator from 'validator';

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  });

  const [dirty, setDirty] = useState<Partial<FormValues>>({});

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty(prevDirty => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);

  const 제출가능한상태인가 = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="abcdef@gmail.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) && errors.email}
        onBlurCapture={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        value={formValues.password}
        name="password"
        type="password"
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) && errors.password}
        onBlurCapture={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 확인"
        value={formValues.rePassword}
        name="rePassword"
        type="password"
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) && errors.rePassword}
        onBlurCapture={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="아무개"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) && errors.name}
        onBlurCapture={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        disabled={제출가능한상태인가 === false}
        onClick={() => {
          onSubmit(formValues);
        }}
      />
    </Flex>
  );
}

const formContainerStyles = css`
  padding: 24px;
`;

const validate = (formValues: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.';
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요.';
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호를 8글자 이상 입력해주세요.';
  } else if (
    validator.equals(formValues.rePassword, formValues.password) === false
  ) {
    errors.rePassword = '비밀번호가 서로 다릅니다.';
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요.';
  }

  return errors;
};

export default Form;
