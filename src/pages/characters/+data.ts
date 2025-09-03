import type { PageContextServer } from 'vike/types';
import { fetchCharactersData } from '../../utils/fetchData';

const data = async (_pageContext: PageContextServer) => await fetchCharactersData();

export { data };
export type Data = Awaited<ReturnType<typeof data>>;