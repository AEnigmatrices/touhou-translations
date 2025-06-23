import ImageViewer from '../../components/ImageViewer/ImageViewer';
import type { Post } from '../../types/data';

interface GalleryProps {
    post: Post;
    currentPostIndex: number;
    setCurrentPostIndex: React.Dispatch<React.SetStateAction<number>>;
    totalPosts: number;
}

const Gallery = ({ post, currentPostIndex, setCurrentPostIndex, totalPosts }: GalleryProps) => {
    return (
        <>
            <div>
                <button disabled={currentPostIndex === 0} onClick={() => setCurrentPostIndex(i => i - 1)}>
                    Previous
                </button>
                <button disabled={currentPostIndex === totalPosts - 1} onClick={() => setCurrentPostIndex(i => i + 1)}>
                    Next
                </button>
            </div>
            <ImageViewer selectedPost={post} />
        </>
    );
};

export default Gallery;
