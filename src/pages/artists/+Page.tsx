import { render } from 'vike/abort';
import ListPage from '../../components/ListPage/ListPage';
import { useAppData } from '../../renderer/useAppData';

const Page = () => {
    const { artists, loading, error } = useAppData();

    if (loading) return <div>Loading...</div>;
    if (error) throw render(500, error.message);
    if (!artists || artists.length === 0) throw render(404, 'No artists found');

    return <ListPage mode="artist" artists={artists} />;
};

export default Page;