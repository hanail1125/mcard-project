import Text from '@shared/Text';
import Flex from '@shared/Flex';
import { parse } from 'qs';
import FixedBottomButton from '@/components/shared/FixedBottomButton';

function ApplyDone() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string };

  return (
    <Flex>
      <Text style={{ textAlign: 'center', width: '100%', padding: 20 }}>
        {success === 'true'
          ? '카드가 발급 되었습니다.'
          : '카드 발급에 실패 했습니다.'}
      </Text>

      <FixedBottomButton
        label="확인"
        onClick={() => {
          window.history.back();
        }}
      />
    </Flex>
  );
}

export default ApplyDone;
