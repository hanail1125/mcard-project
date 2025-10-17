import { useCallback } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Form from '@/components/signin/Form';
import { FormValues } from './../models/signin';
import { auth } from '@remote/firebase';
import { useAlertContext } from '@/contexts/AlertContext';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const { open } = useAlertContext();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      console.log('로그인정보', formValues);
      const { email, password } = formValues;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } catch (err) {
        //Firebase의 에러.
        if (err instanceof FirebaseError) {
          if (err.code === 'auth/invalid-credential') {
            open({
              title: '계정 정보를 확인해주세요',
              onButtonClick: () => {
                //
              },
            });

            return;
          }
        }

        //일반적인 에러.
        open({
          title: '잠시 후 다시 시도해주세요',
          onButtonClick: () => {
            //
          },
        });
      }
    },
    [open, navigate],
  );

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
};

export default SigninPage;
