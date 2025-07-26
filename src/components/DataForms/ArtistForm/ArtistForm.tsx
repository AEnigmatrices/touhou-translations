import React, { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { PIXIV_URL_PATTERN, TWITTER_URL_PATTERN, submitNewArtist, validateNewArtistId } from './ArtistForm.utils';
import styles from './ArtistForm.styles';
import type { ArtistRaw } from '../../../types/data';



const ArtistForm: React.FC = () => {
    const { register, handleSubmit, reset, watch, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<ArtistRaw>();
    const watchedId = watch('id');
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedValidate = useCallback((value: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            const errorMsg = await validateNewArtistId(value.trim());
            if (typeof errorMsg === 'string' && errorMsg.length > 0) {
                setError('id', { type: 'validate', message: errorMsg });
            } else {
                clearErrors('id');
            }
        }, 500);
    }, [setError, clearErrors]);



    const onSubmit = async (data: ArtistRaw) => {
        const cleaned = {
            id: data.id.trim(), name: data.name.trim(),
            ...(data.linkTwitter?.trim() && { linkTwitter: data.linkTwitter.trim() }),
            ...(data.linkPixiv?.trim() && { linkPixiv: data.linkPixiv.trim() }),
        };
        try {
            await submitNewArtist(cleaned);
            alert('Artist added successfully!');
            reset();
        } catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };



    useEffect(() => {
        if (!watchedId) { clearErrors('id'); return; }
        debouncedValidate(watchedId);

    }, [watchedId, debouncedValidate, clearErrors]);



    return (
        <Box sx={styles.containerBox}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Artist Information
                        </Typography>
                        <Stack direction="row" spacing={2} flexWrap="wrap">
                            <Box sx={styles.artistIdBox}>
                                <TextField
                                    label="Artist ID" error={!!errors.id} helperText={errors.id?.message} fullWidth
                                    {...register('id', { required: 'ID is required' })} slotProps={{ inputLabel: { shrink: !!watch('id') } }}
                                />
                            </Box>

                            <Box sx={styles.nameBox}>
                                <TextField
                                    label="Name" error={!!errors.name} helperText={errors.name?.message} fullWidth
                                    {...register('name', { required: 'Name is required' })} slotProps={{ inputLabel: { shrink: !!watch('name') } }}
                                />
                            </Box>
                        </Stack>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Links
                        </Typography>
                        <Stack direction="row" spacing={2} flexWrap="wrap">
                            <Box sx={styles.twitterBox}>
                                <TextField
                                    label="Twitter Link" error={!!errors.linkTwitter} helperText={errors.linkTwitter?.message} fullWidth
                                    {...register('linkTwitter', { pattern: { value: TWITTER_URL_PATTERN, message: 'Invalid Twitter URL' } })}
                                    slotProps={{ inputLabel: { shrink: !!watch('linkTwitter') } }}
                                />
                            </Box>

                            <Box sx={styles.pixivBox}>
                                <TextField
                                    label="Pixiv Link" error={!!errors.linkPixiv} helperText={errors.linkPixiv?.message} fullWidth
                                    {...register('linkPixiv', { pattern: { value: PIXIV_URL_PATTERN, message: 'Invalid Pixiv URL' } })}
                                    slotProps={{ inputLabel: { shrink: !!watch('linkPixiv') } }}
                                />
                            </Box>
                        </Stack>
                    </Box>

                    <Stack direction="row" justifyContent="center">
                        <Button type="submit" variant="contained" disabled={isSubmitting} sx={styles.submitButton} >
                            {isSubmitting ? 'Submitting...' : 'Add Artist'}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

export default ArtistForm;
