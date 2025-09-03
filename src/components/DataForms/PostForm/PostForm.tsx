import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Autocomplete, Avatar, Box, Chip, Button, Stack, TextField, Typography } from '@mui/material';
import { fetchPosts } from '../../../utils/fetchData';
import { extractBaseRedditUrl, fetchRedditData, validateRedditUrl, validateArtistId, submitPostEntry } from './PostForm.utils';
import styles from './PostForm.styles';
import type { Post, PostEntryForm } from "../../../types/data";
import artists from '../../../../data/artists.json';
import characters from '../../../../data/characters.json';



const PostForm: React.FC = () => {
    const { register, handleSubmit, reset, watch, setValue, getValues, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<PostEntryForm>();
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [loadingRedditData, setLoadingRedditData] = useState(false);

    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const watchedReddit = watch('reddit');

    const artistIds = artists.map(artist => artist.id);
    const characterOptions = characters.map(c => ({
        id: c.id,
        portrait: c.portrait,
    }));

    const debouncedValidateReddit = useCallback((value: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const validationResult = validateRedditUrl(value.trim(), allPosts);
            if (validationResult !== true) {
                setError('reddit', { type: 'validate', message: validationResult });
            } else {
                clearErrors('reddit');
            }
        }, 500);
    }, [setError, clearErrors, allPosts]);



    const onSubmit = async (data: PostEntryForm) => {
        try {
            await submitPostEntry(data);
            alert('Post added successfully!');
            reset();
        } catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleFetchRedditData = async () => {
        const redditUrl = getValues('reddit');
        if (!redditUrl) {
            alert('Please enter a Reddit URL first.'); return;
        }
        const validationResult = validateRedditUrl(redditUrl, allPosts);
        if (validationResult !== true) {
            alert(validationResult); return;
        }
        setLoadingRedditData(true);
        try {
            const data = await fetchRedditData(extractBaseRedditUrl(redditUrl));
            if (!data) {
                alert('Failed to load Reddit data'); return;
            }
            if (data.createdDate) setValue('date', data.createdDate, { shouldValidate: true });
            if (data.description) setValue('desc', data.description, { shouldValidate: true });
            if (data.imageUrls?.length) setValue('urls', data.imageUrls.join(', '), { shouldValidate: true });
        } finally {
            setLoadingRedditData(false);
        }
    };



    useEffect(() => {
        let mounted = true;
        fetchPosts().then(posts => { if (mounted) setAllPosts(posts); });
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        if (!watchedReddit) {
            clearErrors('reddit'); return;
        }
        debouncedValidateReddit(watchedReddit);
    }, [watchedReddit, debouncedValidateReddit, clearErrors]);

    useEffect(() => {
        register('artistId', { required: 'Artist ID is required', validate: validateArtistId });
    }, [register, artistIds]);



    return (
        <Box sx={styles.containerBox}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={4}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Post Details
                        </Typography>
                        <Stack direction="row" spacing={2} flexWrap="wrap">
                            <Box sx={styles.inputBoxSmall}>
                                <TextField
                                    label="UNIX Timestamp" type="number" error={!!errors.date} helperText={errors.date?.message} fullWidth
                                    {...register('date', { required: 'Date is required', valueAsNumber: true })} slotProps={{ inputLabel: { shrink: !!watch('date') } }}
                                />
                            </Box>

                            <Box sx={styles.inputBoxSmall}>
                                <Autocomplete
                                    options={artistIds} freeSolo value={watch('artistId') || ''}
                                    onInputChange={(_, value) => setValue('artistId', value, { shouldValidate: true, shouldDirty: true })}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params} label="Artist ID" error={!!errors.artistId} helperText={errors.artistId?.message}
                                            slotProps={{ inputLabel: { shrink: !!watch('artistId') } }}
                                        />
                                    )}
                                />
                            </Box>

                            <Box sx={styles.inputBoxSmall}>
                                <TextField
                                    label="Source URL" error={!!errors.src} helperText={errors.src?.message} fullWidth
                                    {...register('src', { required: 'Source URL is required' })} slotProps={{ inputLabel: { shrink: !!watch('src') } }}
                                />
                            </Box>
                        </Stack>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            URLs
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                label="Image URLs (comma separated)" error={!!errors.urls} helperText={errors.urls?.message} fullWidth
                                {...register('urls', { required: 'Image URLs are required' })} slotProps={{ inputLabel: { shrink: !!watch('urls') } }}
                            />
                            {watch('urls') && (
                                <Box sx={styles.imagePreviewContainer}>
                                    {watch('urls')
                                        .split(',')
                                        .map(url => url.trim())
                                        .filter(Boolean)
                                        .map((url, index) => (
                                            <Box key={index} sx={styles.imageBox}>
                                                <Typography variant="caption">Image {index + 1}</Typography>
                                                <Box
                                                    component="img" src={url} alt={`Image ${index + 1}`} sx={styles.previewImage}
                                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                                />
                                            </Box>
                                        ))}
                                </Box>
                            )}
                            <Autocomplete
                                multiple options={characterOptions} getOptionLabel={(option) => option.id}
                                value={characterOptions.filter(opt => (watch('characterIds') || []).includes(opt.id))}
                                onChange={(_, selected) => {
                                    const ids = selected.map(opt => opt.id);
                                    setValue('characterIds', ids, { shouldValidate: true });
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {selected.map((option) => (
                                            <Chip
                                                key={option.id} label={option.id}
                                                avatar={<Avatar src={`${import.meta.env.BASE_URL}${option.portrait}`} />}
                                            />
                                        ))}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField  {...params} label="Character IDs"
                                        error={!!errors.characterIds} helperText={errors.characterIds?.message}
                                    />
                                )}
                            />
                        </Stack>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Description
                        </Typography>
                        <TextField
                            label="Description" error={!!errors.desc} helperText={errors.desc?.message} multiline minRows={6} fullWidth
                            {...register('desc', { required: 'Description is required' })} slotProps={{ inputLabel: { shrink: !!watch('desc') } }}
                        />
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Reddit URL
                        </Typography>
                        <TextField
                            label="Reddit URL" error={!!errors.reddit} helperText={errors.reddit?.message} fullWidth
                            {...register('reddit', { required: 'Reddit URL is required' })} slotProps={{ inputLabel: { shrink: !!watch('reddit') } }}
                        />
                    </Box>

                    <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                        <Button variant="contained" onClick={handleFetchRedditData} disabled={loadingRedditData} sx={styles.actionButton} >
                            {loadingRedditData ? 'Loading...' : 'Fetch from Reddit'}
                        </Button>

                        <Button type="submit" variant="contained" disabled={isSubmitting} sx={styles.actionButton} >
                            {isSubmitting ? 'Submitting...' : 'Add Post'}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

export default PostForm;