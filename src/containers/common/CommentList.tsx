import { Drawer, Typography } from 'antd';
import { useAtom } from 'jotai';

import { commentsAtom } from '@/lib/jotai/comment';
import CommentItem from '@component/comments/CommentItem';

const CommentList = () => {
  const [comments, setComments] = useAtom(commentsAtom);

  return (
    <Drawer
      open={!!comments}
      onClose={() => setComments(null)}
      placement='bottom'
      closeIcon={null}
      height={'70%'}
      destroyOnClose
      styles={{
        header: { borderBottomWidth: 2 },
        body: { padding: 0 },
      }}
      title=<Typography.Title level={4}>평가 목록</Typography.Title>>
      {comments &&
        (comments.length === 0 ? (
          <Typography.Text strong className='w-full mt-10 text-center'>
            평가가 없습니다.
          </Typography.Text>
        ) : (
          <>
            {comments.map((item, idx) => (
              <CommentItem key={idx} comment={item} />
            ))}
          </>
        ))}
    </Drawer>
  );
};

export default CommentList;
