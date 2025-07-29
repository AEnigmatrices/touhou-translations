import { useData } from '../../../renderer/useData'
import ImageViewer from '../../../components/ImageViewer/ImageViewer'
import type { JSX } from 'react';
import type { Data } from './+data'


const Page = (): JSX.Element => {
    const { post } = useData<Data>();
    return <ImageViewer post={post} />;
};

export default Page;