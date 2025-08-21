import { useData } from 'vike-react/useData';
import ListPage from '../../components/ListPage/ListPage';
import type { JSX } from 'react';
import type { Data } from '../../types/data';

const Page = (): JSX.Element => {
    const { characters } = useData<Data>();
    return <ListPage mode="character" characters={characters} />;
};

export default Page;