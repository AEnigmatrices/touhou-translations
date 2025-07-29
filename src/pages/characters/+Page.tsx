import ListPage from '../../components/ListPage/ListPage';
import { useData } from '../../renderer/useData';
import type { Data } from './+data';

const Page = () => {
    const { characters } = useData<Data>();
    return <ListPage mode="character" characters={characters} />;
};

export default Page;