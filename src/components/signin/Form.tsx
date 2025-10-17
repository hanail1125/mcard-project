import { useCallback, useState, ChangeEvent, useMemo } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import Button from '@shared/Button';
import Flex from '@shared/Flex';
import TextField from '@shared/TextLabel';
import Spacing from '@shared/Spacing';
import Text from '@shared/Text';
import { colors } from '@/styles/colorPalette';
import { FormValues } from '@/models/signin';

const Form = ({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
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
        placeholder="abcde@gmail.com"
        onChange={handleFormValues}
        value={formValues.email}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={dirty.email ? errors.email : undefined}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        onChange={handleFormValues}
        value={formValues.password}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={dirty.password ? errors.password : undefined}
        onBlur={handleBlur}
      />
      <Spacing size={32} />
      <Button
        size="medium"
        disabled={제출가능한상태인가 === false}
        onClick={() => {
          onSubmit(formValues);
        }}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to="/signup" css={linkStyles}>
        <Text typography="t6">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  );
};

const formContainerStyles = css`
  padding: 24px;
`;

const linkStyles = css`
  text-align: center;
  font-weight: bold;
  & > span:hover {
    color: ${colors.blue};
  }
`;

const validate = (formValues: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.';
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요.';
  }

  return errors;
};

export default Form;
