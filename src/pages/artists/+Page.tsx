import { useData } from 'vike-react/useData';
import ListPage from '../../components/ListPage/ListPage';
import type { JSX } from 'react';
import type { Data } from '../../types/data';

const Page = (): JSX.Element => {
    const { artists } = useData<Data>();
    return <ListPage mode="artist" artists={artists} />;
};

export default Page;