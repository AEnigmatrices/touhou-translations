import { useData } from 'vike-react/useData';
import ListPage from '../../components/ListPage/ListPage';
import type { Data } from './+data';

const Page = () => {
    const { characters } = useData<Data>();

    return <ListPage mode="character" characters={characters} />;
};

export default Page;