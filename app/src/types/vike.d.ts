import { PageContextBuiltIn } from 'vike/types';
import type { Post } from './data';

type PageContextCustom = PageContextBuiltIn & {
    post?: Post;
    postId?: string;
};

declare global {
    namespace Vike {
        interface PageContext extends PageContextCustom { }
    }
}