import { colors } from '@/styles/colorPalette';
import styled from '@emotion/styled';

const BaseProgressBar = styled.div<{ progress: number }>(({ progress }) => ({
  height: 5,
  backgroundColor: colors.blue,
  transform: `scaleX(${progress})`,
  transition: 'transform 0.3s',
  transformOrigin: 'left',
}));

const Container = styled.div(() => ({
  width: '100%',
  height: 5,
  backgroundColor: colors.lightgrey,
  overflow: 'hidden',
  borderRadius: 6,
}));

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Container>
      <BaseProgressBar progress={progress} />
    </Container>
  );
};

export default ProgressBar;
