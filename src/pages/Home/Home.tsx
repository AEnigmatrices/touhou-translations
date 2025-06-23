import ImageViewer from '../../components/ImageViewer';
import type { Post } from '../../types/data';

interface HomeProps {
    post: Post;
    currentPostIndex: number;
    setCurrentPostIndex: React.Dispatch<React.SetStateAction<number>>;
    totalPosts: number;
}

const Home = ({ post, currentPostIndex, setCurrentPostIndex, totalPosts }: HomeProps) => {
    return (
        <>
            <div>
                <button
                    disabled={currentPostIndex === 0}
                    onClick={() => setCurrentPostIndex(i => i - 1)}
                >
                    Previous
                </button>
                <button
                    disabled={currentPostIndex === totalPosts - 1}
                    onClick={() => setCurrentPostIndex(i => i + 1)}
                >
                    Next
                </button>
            </div>
            <ImageViewer selectedPost={post} />
        </>
    );
};

export default Home;
