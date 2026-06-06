import React, { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { PIXIV_URL_PATTERN, TWITTER_URL_PATTERN, submitNewArtist, validateNewArtistId, getRandomPlaceholder } from './ArtistForm.utils';
import styles from './styles.module.css';
import type { ArtistRaw } from '../../../../types/data';



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
            id: data.id.trim(),
            name: data.name.trim(),
            ...(data.linkTwitter?.trim() && { linkTwitter: data.linkTwitter.trim() }),
            ...(data.linkPixiv?.trim() && { linkPixiv: data.linkPixiv.trim() }),
            portrait: getRandomPlaceholder(),
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
        <div className={styles.containerBox}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={styles.stack}>
                    <fieldset className={styles.fieldset}>
                        <legend>Artist Information</legend>
                        <div className={styles.row}>
                            <label className={styles.field}>
                                <span>Artist ID</span>
                                <input className={styles.input} aria-invalid={!!errors.id} {...register('id', { required: 'ID is required' })} />
                                {errors.id?.message && <small className={styles.error}>{errors.id.message}</small>}
                            </label>

                            <label className={styles.field}>
                                <span>Name</span>
                                <input className={styles.input} aria-invalid={!!errors.name} {...register('name', { required: 'Name is required' })} />
                                {errors.name?.message && <small className={styles.error}>{errors.name.message}</small>}
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend>Links</legend>
                        <div className={styles.row}>
                            <label className={styles.field}>
                                <span>Twitter Link</span>
                                <input className={styles.input} aria-invalid={!!errors.linkTwitter} {...register('linkTwitter', { pattern: { value: TWITTER_URL_PATTERN, message: 'Invalid Twitter URL' } })} />
                                {errors.linkTwitter?.message && <small className={styles.error}>{errors.linkTwitter.message}</small>}
                            </label>

                            <label className={styles.field}>
                                <span>Pixiv Link</span>
                                <input className={styles.input} aria-invalid={!!errors.linkPixiv} {...register('linkPixiv', { pattern: { value: PIXIV_URL_PATTERN, message: 'Invalid Pixiv URL' } })} />
                                {errors.linkPixiv?.message && <small className={styles.error}>{errors.linkPixiv.message}</small>}
                            </label>
                        </div>
                    </fieldset>

                    <div className={styles.actions}>
                        <button type="submit" disabled={isSubmitting} className={styles.submitButton} >
                            {isSubmitting ? 'Submitting...' : 'Add Artist'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ArtistForm;
