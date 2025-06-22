interface PlaceholderProps {
    title: string;
}

const Placeholder = ({ title }: PlaceholderProps) => {
    return <h2>{title} Page (Coming Soon)</h2>;
};

export default Placeholder;
