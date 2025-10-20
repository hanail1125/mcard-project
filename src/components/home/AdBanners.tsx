import { colors } from '@styles/colorPalette';
import styled from '@emotion/styled';
import Flex from '@shared/Flex';
import Text from '@shared/Text';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAdBanners } from '@/remote/adBanner';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);

const AdBanners = () => {
  const { data, isLoading } = useQuery(['ADBANNER'], () => getAdBanners());

  if (data == null || isLoading) {
    return (
      <Container>
        <StyledFlex direction="column">
          <Text bold={true}>&nbsp;</Text>
          <Text typography="t7">&nbsp;</Text>
        </StyledFlex>
      </Container>
    );
  }

  return (
    <Container>
      <Swiper
        spaceBetween={8}
        autoplay={{ delay: 6000 }}
        loop={true}
        slidesPerView={1}
      >
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <StyledFlex direction="column">
                  <Text bold={true}>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </StyledFlex>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
`;

const StyledFlex = styled(Flex)`
  padding: 15px;
  background-color: ${colors.lightgrey};
  border-radius: 4px;
`;

export default AdBanners;
