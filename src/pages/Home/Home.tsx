interface HomeProps {
    title: string;
}

const Home = ({ title }: HomeProps) => {
    return <h2>{title} Page (Coming Soon)</h2>;
};

export default Home;
