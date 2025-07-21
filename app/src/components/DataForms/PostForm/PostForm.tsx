import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { extractBaseRedditUrl, fetchRedditData, validateRedditUrl, validateArtistId, submitPostEntry } from './PostForm.utils';
import { containerBoxSx, inputBoxSmallSx, actionButtonSx } from './PostForm.styles';
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
        <Box sx={containerBoxSx}>
            <Typography variant="h5" mb={4} textAlign="center">
                Add New Post (Local Dev Only)
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={4}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Post Details
                        </Typography>
                        <Stack direction="row" spacing={2} flexWrap="wrap">
                            <Box sx={inputBoxSmallSx}>
                                <TextField
                                    label="UNIX Timestamp" type="number" error={!!errors.date} helperText={errors.date?.message}
                                    {...register('date', { required: 'Date is required', valueAsNumber: true })} fullWidth
                                />
                            </Box>

                            <Box sx={inputBoxSmallSx}>
                                <TextField
                                    label="Artist ID" error={!!errors.artistId} helperText={errors.artistId?.message}
                                    {...register('artistId', { required: 'Artist ID is required', validate: validateArtistId })} fullWidth
                                />
                            </Box>

                            <Box sx={inputBoxSmallSx}>
                                <TextField
                                    label="Source URL" error={!!errors.src} helperText={errors.src?.message}
                                    {...register('src', { required: 'Source URL is required' })} fullWidth
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
                                label="Image URLs (comma separated)" error={!!errors.urls} helperText={errors.urls?.message}
                                {...register('urls', { required: 'Image URLs are required' })} fullWidth
                            />
                            <TextField
                                label="Character IDs (comma separated)" error={!!errors.characterIds} helperText={errors.characterIds?.message}
                                {...register('characterIds', { required: 'Character IDs are required' })} fullWidth
                            />
                        </Stack>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Description
                        </Typography>
                        <TextField
                            label="Description" error={!!errors.desc} helperText={errors.desc?.message}
                            {...register('desc', { required: 'Description is required' })} multiline minRows={6} fullWidth
                        />
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Reddit URL
                        </Typography>
                        <TextField
                            label="Reddit URL" error={!!errors.reddit} helperText={errors.reddit?.message}
                            {...register('reddit', { required: 'Reddit URL is required' })} fullWidth
                        />
                    </Box>

                    <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                        <Button variant="contained" onClick={handleFetchRedditData} disabled={loadingRedditData} sx={actionButtonSx} >
                            {loadingRedditData ? 'Loading...' : 'Fetch from Reddit'}
                        </Button>

                        <Button type="submit" variant="contained" disabled={isSubmitting} sx={actionButtonSx} >
                            {isSubmitting ? 'Submitting...' : 'Add Post'}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

export default PostForm;
