import { useState } from 'react';
import { useData } from 'vike-react/useData';
import { usePageContext } from 'vike-react/usePageContext';
import useFilteredPosts from './hooks/useFilteredPosts';
import useQueryParams from './hooks/useQueryParams';
import Gallery from './components/Gallery';
import GalleryHeader from './components/GalleryHeaders';
import DateSortButton from './components/DateSortButton';
import DateFilter from './components/DateFilter';
import * as styles from './styles';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

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

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const handleDateChange = (field: "startDate" | "endDate", value: string | null) => {
        if (field === "startDate") setStartDate(value);
        else setEndDate(value);
        setCurrentPage(1);
    };


    if (!posts.length) return <Box sx={styles.loaderBoxStyles}><CircularProgress /></Box>;
    return (
        <Container maxWidth="xl" sx={styles.containerStyles}>
            <Stack direction="row" sx={styles.headerWrapperStyles}>
                {characterQueries.map((cid) => {
                    const character = characters.find((c) => c.id === cid);
                    return character ? (<Box key={cid} sx={styles.galleryHeaderBoxStyles}><GalleryHeader entity={character} type="character" /></Box>) : null;
                })}

                {artistQueries.map((aid) => {
                    const artist = artists.find((a) => a.id === aid);
                    return artist ? (<Box key={aid} sx={styles.galleryHeaderBoxStyles}> <GalleryHeader entity={artist} type="artist" /></Box>) : null;
                })}

                <FormControlLabel
                    control={<Switch checked={galleryOnly} onChange={toggleGalleryOnly} color="primary" slotProps={styles.switchSlotProps} />}
                    label={<Typography variant="body1">Gallery Only</Typography>} sx={styles.switchLabelStyles}
                />
                <DateFilter startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />
                <DateSortButton sortOrder={dateSortOrder} onToggleSortOrder={handleToggleDateSort} />
            </Stack>

            <Gallery posts={visiblePosts} />

            {shuffledPosts.length > POSTS_PER_PAGE && (
                <Box sx={styles.paginationWrapperStyles}>
                    <Pagination
                        count={totalPages} page={currentPage} onChange={handlePageChange} siblingCount={1} boundaryCount={1}
                        color="primary" variant="outlined" shape="rounded" sx={styles.paginationStyles}
                    />
                </Box>
            )}
        </Container>
    );
};

export default Page;