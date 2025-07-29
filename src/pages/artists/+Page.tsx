import ListPage from '../../components/ListPage/ListPage';
import { useData } from '../../renderer/useData';
import type { Data } from './+data';

const Page = () => {
    const { artists } = useData<Data>();
    return <ListPage mode="artist" artists={artists} />;
};

export default Page;