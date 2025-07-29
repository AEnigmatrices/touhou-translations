import { render } from 'vike/abort';
import ListPage from '../../components/ListPage/ListPage';
import { usePageContext } from '../../renderer/usePageContext';

const Page = () => {
    const { appData } = usePageContext();
    if (!appData || !appData.artists || appData.artists.length === 0) throw render(404, 'No artists found');
    return <ListPage mode="artist" artists={appData.artists} />;
};

export default Page;