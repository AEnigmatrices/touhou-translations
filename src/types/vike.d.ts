import { PageContextBuiltIn } from 'vike/types';
import type { Post } from './data';

type PageContextCustom = PageContextBuiltIn & {
    post?: Post;
    postId?: string;
    today?: string;
};

declare global {
    namespace Vike {
        interface PageContext extends PageContextCustom { }
    }
}