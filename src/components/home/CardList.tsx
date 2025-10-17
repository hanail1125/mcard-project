import { getCards } from '@/remote/card';
import ListRow from '../shared/ListRow';
import { useInfiniteQuery } from 'react-query';
import flatten from 'lodash.flatten';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCallback } from 'react';
import Badge from '../shared/Badge';
import { useNavigate } from 'react-router-dom';

const CardList = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam);
    },
    {
      getNextPageParam: snapshot => {
        return snapshot.lastVisible;
      },
      suspense: true,
    },
  );

  const navigate = useNavigate();

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  }, [hasNextPage, isFetching, fetchNextPage]);

  if (data === null) {
    return null;
  }

  const cards = flatten(data?.pages.map(({ items }) => items));

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={
                  card.payback != null ? <Badge label={card.payback} /> : null
                }
                withArrow={true}
                onClick={() => {
                  navigate(`/card/${card.id}`);
                }}
              />
            );
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default CardList;
