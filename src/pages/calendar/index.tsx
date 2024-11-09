import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Calendar, Divider, Flex, Select, Typography } from 'antd';
import { useAtom } from 'jotai';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

import WithAuth from '@/lib/hoc/WithAuth';
import { userAtom } from '@/lib/jotai/user';
import FeedList from '@component/common/FeedList';
import { useQuery } from '@hook/react-query/useQuery';
import { PostDto } from '@type/post/post';

const MyCalendarPage: NextPage = () => {
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);

  const { data } = useQuery<PostDto[], { user_id: string }>({
    queryKey: ['/api/post', { user_id: user.uid ?? '' }],
    options: { enabled: false },
  });

  return (
    <Flex className='h-[calc(100vh-100px)] overflow-y-auto' vertical>
      <div className='relative min-h-[40px]'>
        {isCalendarVisible ? (
          <>
            <Calendar
              onSelect={(date, info) => {
                if (info.source !== 'date') return;
                window.scrollTo(0, 0);
                router.replace({ hash: date.format('YYYY-MM-DD') }, undefined, { scroll: true });
              }}
              fullscreen={false}
              headerRender={({ value, onChange }) => {
                const start = 0;
                const end = 12;
                const monthOptions = [];

                let current = value.clone();
                const months = [];
                for (let i = start; i < end; i++) {
                  current = current.month(i);
                  months.push(`${current.month() + 1}월`);
                }

                for (let i = start; i < end; i++) {
                  monthOptions.push(
                    <Select.Option key={i} value={i} className='month-item'>
                      {months[i]}
                    </Select.Option>,
                  );
                }

                const year = value.year();
                const month = value.month();
                const options = [];
                for (let i = year - 10; i < year + 10; i += 1) {
                  options.push(
                    <Select.Option key={i} value={i} className='year-item'>
                      {i}
                    </Select.Option>,
                  );
                }

                return (
                  <Flex justify='space-between' align='center' className='px-6 text-lg mb-2'>
                    <UpOutlined onClick={() => setIsCalendarVisible(false)} />
                    <Flex gap={4}>
                      <Select
                        size='small'
                        popupMatchSelectWidth={false}
                        className='my-year-select'
                        value={year}
                        onChange={(newYear) => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}>
                        {options}
                      </Select>
                      <Select
                        size='small'
                        popupMatchSelectWidth={false}
                        value={month}
                        onChange={(newMonth) => {
                          const now = value.clone().month(newMonth);
                          onChange(now);
                        }}>
                        {monthOptions}
                      </Select>
                    </Flex>
                  </Flex>
                );
              }}
            />
          </>
        ) : (
          <DownOutlined className='text-lg px-6' onClick={() => setIsCalendarVisible(true)} />
        )}
      </div>
      <Flex gap={12} vertical className='flex-1 overflow-y-auto scroll-smooth no-scrollbar'>
        {data?.map((item) => (
          <Fragment key={item._id}>
            <Divider />
            <Flex gap={8} className='px-1' id={item.Date} vertical>
              <Typography.Title level={5}>{item.Date}</Typography.Title>
              <FeedList
                records={item.Records}
                ratings={{ value: item.Rating, count: item.CommentsNum }}
                selfRating={2.1}
                comments={item.Comments}
              />
            </Flex>
          </Fragment>
        ))}
      </Flex>
    </Flex>
  );
};

export default WithAuth(MyCalendarPage);
