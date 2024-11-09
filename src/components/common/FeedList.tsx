import { HeartFilled, StarFilled } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { useAtom } from 'jotai';
import Image from 'next/image';

import { commentsAtom } from '@/lib/jotai/comment';
import { PostDto } from '@type/post/post';

interface Props {
  records: PostDto['Records'];
  ratings: { value: PostDto['Rating']; count: PostDto['comment_count'] };
  selfRating: PostDto['SelfRating'];
  comments: PostDto['Comments'];
}

const FeedList = ({ records, ratings, selfRating, comments }: Props) => {
  const [, setComments] = useAtom(commentsAtom);

  return (
    <>
      <div>
        <Flex gap={12} className='overflow-scroll no-scrollbar'>
          {records.map((record, idx) => (
            <Image key={record._id} className='border-2' src={record.Image} alt='이미지' width={120} height={120} />
          ))}
        </Flex>
        <Flex justify='space-between' align='center' className='text-2xl mt-2 px-2'>
          {ratings.count > 0 && (
            <Flex gap={4} align='center' className='cursor-pointer' onClick={() => setComments(comments)}>
              <StarFilled />
              <Typography.Text>{`${ratings?.value.toFixed(1)} (${ratings?.count})`}</Typography.Text>
            </Flex>
          )}
          {selfRating && (
            <div className='relative'>
              <HeartFilled className='text-3xl' />
              <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2.5 text-white text-xs'>
                {selfRating.toFixed(1)}
              </p>
            </div>
          )}
        </Flex>
      </div>
    </>
  );
};

export default FeedList;
