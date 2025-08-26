import { useData } from 'vike-react/useData';
import ListPage from '../../components/ListPage/ListPage';
import type { Data } from './+data';

const Page = () => {
    const { artists } = useData<Data>();

    return <ListPage mode="artist" artists={artists} />;
};

export default Page;