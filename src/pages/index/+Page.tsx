import NoSsr from '@mui/material/NoSsr';
import DailyPost from './DailyPost';
import type { FC } from 'react';

const Page: FC = () => {
    return (
        <NoSsr>
            <DailyPost />
        </NoSsr>
    );
};

export default Page;