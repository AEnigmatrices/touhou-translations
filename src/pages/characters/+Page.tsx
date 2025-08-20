import { render } from 'vike/abort';
import ListPage from '../../components/ListPage/ListPage';
import { useAppData } from '../layout/useAppData';

const Page = () => {
    const { characters, loading, error } = useAppData();

    if (loading) return <div>Loading...</div>;
    if (error) throw render(500, error.message);
    if (!characters || characters.length === 0) throw render(404, 'No characters found');

    return <ListPage mode="character" characters={characters} />;
};

export default Page;