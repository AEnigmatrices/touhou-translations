import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchPosts } from '../../../../utils/fetchData';
import { extractBaseRedditUrl, fetchRedditData, validateRedditUrl, validateArtistId, submitPostEntry } from './PostForm.utils';
import styles from './styles.module.css';
import type { Post, PostEntryForm } from "../../../../types/data";
import artists from '../../../../../data/artists.json';
import characters from '../../../../../data/characters.json';



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
        <div className={styles.containerBox}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={styles.stack}>
                    <fieldset className={styles.fieldset}>
                        <legend>Post Details</legend>
                        <div className={styles.row}>
                            <label className={styles.field}>
                                <span>UNIX Timestamp</span>
                                <input className={styles.input} type="number" aria-invalid={!!errors.date} {...register('date', { required: 'Date is required', valueAsNumber: true })} />
                                {errors.date?.message && <small className={styles.error}>{errors.date.message}</small>}
                            </label>

                            <label className={styles.field}>
                                <span>Artist ID</span>
                                <input
                                    className={styles.input}
                                    list="artist-ids"
                                    value={watch('artistId') || ''}
                                    onChange={(e) => setValue('artistId', e.target.value, { shouldValidate: true, shouldDirty: true })}
                                    aria-invalid={!!errors.artistId}
                                />
                                <datalist id="artist-ids">
                                    {artistIds.map(id => <option key={id} value={id} />)}
                                </datalist>
                                {errors.artistId?.message && <small className={styles.error}>{errors.artistId.message}</small>}
                            </label>

                            <label className={styles.field}>
                                <span>Source URL</span>
                                <input className={styles.input} aria-invalid={!!errors.src} {...register('src', { required: 'Source URL is required' })} />
                                {errors.src?.message && <small className={styles.error}>{errors.src.message}</small>}
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend>URLs</legend>
                        <div className={styles.stack}>
                            <label className={styles.field}>
                                <span>Image URLs (comma separated)</span>
                                <input className={styles.input} aria-invalid={!!errors.urls} {...register('urls', { required: 'Image URLs are required' })} />
                                {errors.urls?.message && <small className={styles.error}>{errors.urls.message}</small>}
                            </label>
                            {watch('urls') && (
                                <div className={styles.imagePreviewContainer}>
                                    {watch('urls')
                                        .split(',')
                                        .map(url => url.trim())
                                        .filter(Boolean)
                                        .map((url, index) => (
                                            <div key={index} className={styles.imageBox}>
                                                <span>Image {index + 1}</span>
                                                <img
                                                    src={url} alt={`Image ${index + 1}`} className={styles.previewImage}
                                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                                />
                                            </div>
                                        ))}
                                </div>
                            )}
                            <label className={styles.field}>
                                <span>Character IDs</span>
                                <select
                                    className={styles.select}
                                    multiple
                                    value={watch('characterIds') || []}
                                    onChange={(event) => {
                                        const ids = Array.from(event.target.selectedOptions).map(option => option.value);
                                        setValue('characterIds', ids, { shouldValidate: true });
                                    }}
                                    aria-invalid={!!errors.characterIds}
                                >
                                    {characterOptions.map(option => (
                                        <option key={option.id} value={option.id}>{option.id}</option>
                                    ))}
                                </select>
                                {errors.characterIds?.message && <small className={styles.error}>{errors.characterIds.message}</small>}
                            </label>
                            {(watch('characterIds') || []).length > 0 && (
                                <div className={styles.chipList}>
                                    {(watch('characterIds') || []).map(id => {
                                        const option = characterOptions.find(item => item.id === id);
                                        return (
                                            <span key={id} className={styles.chip}>
                                                {option && <img src={`${import.meta.env.BASE_URL}${option.portrait}`} alt="" />}
                                                {id}
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend>Description</legend>
                        <label className={styles.field}>
                            <span>Description</span>
                            <textarea className={styles.textarea} rows={6} aria-invalid={!!errors.desc} {...register('desc', { required: 'Description is required' })} />
                            {errors.desc?.message && <small className={styles.error}>{errors.desc.message}</small>}
                        </label>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend>Reddit URL</legend>
                        <label className={styles.field}>
                            <span>Reddit URL</span>
                            <input className={styles.input} aria-invalid={!!errors.reddit} {...register('reddit', { required: 'Reddit URL is required' })} />
                            {errors.reddit?.message && <small className={styles.error}>{errors.reddit.message}</small>}
                        </label>
                    </fieldset>

                    <div className={styles.actions}>
                        <button type="button" onClick={handleFetchRedditData} disabled={loadingRedditData} className={styles.actionButton} >
                            {loadingRedditData ? 'Loading...' : 'Fetch from Reddit'}
                        </button>

                        <button type="submit" disabled={isSubmitting} className={styles.actionButton} >
                            {isSubmitting ? 'Submitting...' : 'Add Post'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
