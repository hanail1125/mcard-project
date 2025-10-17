import FixedBottomButton from '@/components/shared/FixedBottomButton';
import Flex from '@/components/shared/Flex';
import ListRow from '@/components/shared/ListRow';
import Text from '@/components/shared/Text';
import Top from '@/components/shared/Top';
import { getCard } from '@/remote/card';
import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useUser from '@/hooks/auth/useUser';
import { useCallback } from 'react';
import { useAlertContext } from '@/contexts/AlertContext';
import Review from '@/components/card/Review';
import Spacing from '@/components/shared/Spacing';

const CardPage = () => {
  const { id = '' } = useParams();
  const user = useUser();
  const { open } = useAlertContext();

  const navigate = useNavigate();

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  });

  const moveToApply = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요합니다.',
        onButtonClick: () => {
          navigate('/signin');
        },
      });

      return;
    }
    navigate(`/apply/${id}`);
  }, [user, id, open, navigate]);

  if (data == null) {
    return null;
  }

  const { name, corpName, promotion, tags, benefit } = data;

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ');

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              key={index}
              initial={{ opacity: 0, translateX: -90 }}
              animate={{ opacity: 1, translateX: 0 }}
              // whileInView={{ opacity: 1, translateX: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
            >
              <ListRow
                as="div"
                key={index}
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          );
        })}
      </ul>
      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true} css={textStyles}>
            [ 유의사항 ]
          </Text>
          <Text
            typography="t7"
            dangerouslySetInnerHTML={{ __html: promotion.terms }}
            css={termsMultilineStyle}
          />
        </Flex>
      ) : null}
      
      <Spacing size={1000} />
      <Review />
      <Spacing size={100} />

      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={moveToApply}
      />
    </div>
  );
};

const IconCheck = () => {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
};

const removeHtmlTags = (text: string) => {
  let output = '';

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '>') {
          i = j;
          break;
        }
      }
    } else {
      output += text[i];
    }
  }

  return output;
};

const termsContainerStyles = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 60px;
  padding: 5px 10px 0px 10px;
  background-color: #fff;
`;

const textStyles = css`
  margin-bottom: 10px;
`;

const termsMultilineStyle = css`
  overflow-y: auto;
  text-overflow: ellipsis;
  max-height: 200px;
  border: 1px solid #ccc;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #ddd;
  }
  .pop_box {
    margin: -5px 0;
    background-color: #fff;
    padding: 0 15px 15px;
  }
  .banner > h3 {
    background-color: #ccc !important;
    padding: 5px 10px;
    margin-bottom: 5px;
  }
  .title {
    font-weight: bold;
    margin-top: 5px;
  }
`;

export default CardPage;
