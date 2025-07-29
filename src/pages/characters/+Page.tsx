import { render } from 'vike/abort';
import ListPage from '../../components/ListPage/ListPage';
import { usePageContext } from '../../renderer/usePageContext';

const Page = () => {
    const { appData } = usePageContext();
    if (!appData || !appData.characters || appData.characters.length === 0) throw render(404, 'No characters found');
    return <ListPage mode="character" characters={appData.characters} />;
};

export default Page;