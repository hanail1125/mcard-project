import { useState } from 'react';
import Apply from '@/components/apply';
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation';
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus';
import { updataApplyCard } from '@/remote/apply';
import { APPLY_STATUS } from '@/models/apply';
import useUser from '@/hooks/auth/useUser';
import { useNavigate, useParams } from 'react-router-dom';
import useAppliedCard from '@/components/apply/hooks/useAppliedCard';
import { useAlertContext } from '@/contexts/AlertContext';
import FullPageLoader from '@/components/shared/FullPageLoader';

const STATUS_MESSAGE = {
  [APPLY_STATUS.READY]: '카드 심사를 준비하고있습니다.',
  [APPLY_STATUS.PROGRESS]: '카드를 심사중입니다. 잠시만 기다려주세요.',
  [APPLY_STATUS.COMPLETE]: '카드 신청이 완료되었습니다.',
};

const ApplyPage = () => {
  const [readyToPoll, setReadyToPoll] = useState(false);
  const user = useUser();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const { open } = useAlertContext();

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: applied => {
        if (applied == null) {
          return;
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back();
            },
          });

          return;
        }

        setReadyToPoll(true);
      },
      onError: () => {
        return null;
      },
      suspense: true,
    },
  });

  const { data: status } = usePollApplyStatus({
    enabled: readyToPoll,
    onSuccess: async () => {
      await updataApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      });
      navigate('/apply/done?success=true', {
        replace: true,
      });
    },
    onError: async () => {
      await updataApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      });
      navigate('/apply/done?success=false', {
        replace: false,
      });
    },
  });

  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true);
    },
    onError: () => {
      window.history.back();
    },
  });

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null;
  }

  if (readyToPoll || 카드를신청중인가) {
    return <FullPageLoader message={STATUS_MESSAGE[status ?? '준비중']} />;
  }

  return <Apply onSubmit={mutate} />;
};

export default ApplyPage;
