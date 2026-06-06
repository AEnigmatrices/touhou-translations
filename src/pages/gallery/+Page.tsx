import { useState } from 'react';
import { useData } from 'vike-react/useData';
import { usePageContext } from 'vike-react/usePageContext';
import useFilteredPosts from './hooks/useFilteredPosts';
import useQueryParams from './hooks/useQueryParams';
import Gallery from './components/Gallery';
import GalleryHeader from './components/GalleryHeaders';
import DateSortButton from './components/DateSortButton';
import DateFilter from './components/DateFilter';
import styles from './styles.module.css';

import type { SortOrder } from '../../types/data';
import type { Data } from './+data';

const POSTS_PER_PAGE = 12;


const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dateSortOrder, setDateSortOrder] = useState<SortOrder>('none');
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const { posts, artists, characters } = useData<Data>();

    const pageContext = usePageContext();
    const { urlParsed } = pageContext;
    const { characterQueries, artistQueries, mode, galleryOnly, toggleGalleryOnly } = useQueryParams(urlParsed);

    const { shuffledPosts } = useFilteredPosts({ posts, characterQueries, artistQueries, mode, galleryOnly, dateSortOrder, startDate, endDate });

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const visiblePosts = shuffledPosts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(shuffledPosts.length / POSTS_PER_PAGE);


    const handleToggleDateSort = () => {
        setDateSortOrder((prev) => {
            const orders: SortOrder[] = ['none', 'desc', 'asc'];
            const nextIndex = (orders.indexOf(prev) + 1) % orders.length;
            return orders[nextIndex];
        });
    };

    const handlePageChange = (value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const handleDateChange = (field: "startDate" | "endDate", value: string | null) => {
        if (field === "startDate") setStartDate(value);
        else setEndDate(value);
        setCurrentPage(1);
    };


    if (!posts.length) return <div className={styles.loader} aria-label="Loading posts" />;
    return (
        <section className={styles.container}>
            <div className={styles.headerWrapper}>
                {characterQueries.map((cid) => {
                    const character = characters.find((c) => c.id === cid);
                    return character ? (<div key={cid} className={styles.galleryHeaderBox}><GalleryHeader entity={character} type="character" /></div>) : null;
                })}

                {artistQueries.map((aid) => {
                    const artist = artists.find((a) => a.id === aid);
                    return artist ? (<div key={aid} className={styles.galleryHeaderBox}> <GalleryHeader entity={artist} type="artist" /></div>) : null;
                })}

                <label className={styles.switchLabel}>
                    <input className={styles.switchInput} type="checkbox" checked={galleryOnly} onChange={toggleGalleryOnly} />
                    <span className={styles.switchTrack} aria-hidden="true" />
                    <span>Gallery Only</span>
                </label>
                <DateFilter startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />
                <DateSortButton sortOrder={dateSortOrder} onToggleSortOrder={handleToggleDateSort} />
            </div>

            <Gallery posts={visiblePosts} />

            {shuffledPosts.length > POSTS_PER_PAGE && (
                <nav className={styles.paginationWrapper} aria-label="Gallery pagination">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                        <button
                            key={page}
                            type="button"
                            className={`${styles.pageButton} ${page === currentPage ? styles.pageButtonActive : ''}`}
                            onClick={() => handlePageChange(page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    ))}
                </nav>
            )}
        </section>
    );
};

export default Page;
