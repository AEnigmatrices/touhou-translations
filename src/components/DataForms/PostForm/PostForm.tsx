import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { extractBaseRedditUrl, fetchRedditData, validateRedditUrl, validateArtistId, submitPostEntry } from './PostForm.utils';
import styles from './PostForm.styles';
import { useGetPosts } from '../../../context/PostsContext';
import type { PostEntryForm } from "../../../types/data";



const PostForm: React.FC = () => {
    const { register, handleSubmit, reset, watch, setValue, getValues, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<PostEntryForm>();
    const [loadingRedditData, setLoadingRedditData] = useState(false);
    const allPosts = useGetPosts();

    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const watchedReddit = watch('reddit');

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
        if (!watchedReddit) {
            clearErrors('reddit'); return;
        }
        debouncedValidateReddit(watchedReddit);
    }, [watchedReddit, debouncedValidateReddit, clearErrors]);



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
                                <TextField
                                    label="Artist ID" error={!!errors.artistId} helperText={errors.artistId?.message} fullWidth
                                    {...register('artistId', { required: 'Artist ID is required', validate: validateArtistId })} slotProps={{ inputLabel: { shrink: !!watch('artistId') } }}
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
                            <TextField
                                label="Character IDs (comma separated)" error={!!errors.characterIds} helperText={errors.characterIds?.message} fullWidth
                                {...register('characterIds', { required: 'Character IDs are required' })} slotProps={{ inputLabel: { shrink: !!watch('characterIds') } }}
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
