import type { PageContextServer } from 'vike/types';
import { fetchArtistsData } from '../../utils/fetchData';

const data = async (_pageContext: PageContextServer) => fetchArtistsData();

export { data };
export type Data = Awaited<ReturnType<typeof data>>;