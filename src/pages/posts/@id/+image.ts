import type { PageContextServer } from 'vike/types';
import type { Data } from './+data';

const image = (pageContext: PageContextServer<Data>) => pageContext.data.post.url[0];

export default image;