import Skeleton from '@/components/shared/Skeleton';
import Spacing from '@/components/shared/Spacing';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';

const Review = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise<string[]>(resolve => {
        console.log(resolve);
        setTimeout(() => {
          resolve(['너무 좋아요.', '꼭 신청하세요!']);
        }, 2_000);
      });
    },
    { enabled: inView },
  );

  return (
    <div ref={ref} style={{ marginLeft: '10px' }}>
      {isLoading ? (
        <div>
          <Skeleton width={30} height={10} />
          <Spacing size={3} />
          <Skeleton width={30} height={10} />
        </div>
      ) : (
        data.map((review, idx) => <div key={idx}>{review}</div>)
      )}
    </div>
  );
};

export default Review;
