import MyImage from '@/components/my/MyImage';
import Button from '@/components/shared/Button';
import Flex from '@/components/shared/Flex';
import Spacing from '@/components/shared/Spacing';
import Text from '@/components/shared/Text';
import useUser from '@/hooks/auth/useUser';
import { auth } from '@/remote/firebase';
import { signOut } from 'firebase/auth';
import { useCallback } from 'react';

const MyPage = () => {
  const user = useUser();

  const handleLogOut = useCallback(() => {
    signOut(auth);
  }, []);

  return (
    <Flex direction="column" align="center">
      <Spacing size={80} />
      <MyImage size={100} mode="upload" />
      <Spacing size={20} />
      <Text bold={true}>{user?.displayName}</Text>
      <Spacing size={10} />
      <Button onClick={handleLogOut}>로그아웃</Button>
    </Flex>
  );
};

export default MyPage;
