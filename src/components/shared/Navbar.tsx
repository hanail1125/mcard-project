import MyImage from '@/components/my/MyImage';
import useUser from '@/hooks/auth/useUser';
import { colors } from '@/styles/colorPalette';
import { css } from '@emotion/react';
import { useCallback } from 'react';
import Button from './Button';
import Flex from './Flex';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false;

  const user = useUser();

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to="/my">
          <MyImage size={40} />
        </Link>
      );
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      );
    }

    return null;
  }, [user, showSignButton]);

  return (
    <Flex css={navbarContaninerStyle}>
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  );
};

const navbarContaninerStyle = css`
  padding: 10px 24px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.lightgrey};
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
`;

export default Navbar;
