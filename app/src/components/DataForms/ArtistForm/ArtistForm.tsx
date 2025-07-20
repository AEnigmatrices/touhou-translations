import React, { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { PIXIV_URL_PATTERN, TWITTER_URL_PATTERN, submitNewArtist, validateNewArtistId } from './ArtistForm.utils';
import type { Artist } from '../../../types/data';
import "./ArtistForm.scss";



const ArtistForm: React.FC = () => {
    const { register, handleSubmit, reset, watch, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<Artist>();
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



    const onSubmit = async (data: Artist) => {
        const cleaned: Artist = {
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
        <div className="artist-form__container">
            <h3 className="artist-form__title">Add New Artist (Local Dev Only)</h3>
            <form className="artist-form__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="artist-form__row">
                    <label className="artist-form__label">
                        Artist ID:
                        <input type="text" className="artist-form__input" {...register('id', { required: 'ID is required' })} />
                        {errors.id && <span className="artist-form__error">{errors.id.message}</span>}
                    </label>

                    <label className="artist-form__label">
                        Name:
                        <input type="text" className="artist-form__input" {...register('name', { required: 'Name is required' })} />
                        {errors.name && <span className="artist-form__error">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="artist-form__row">
                    <label className="artist-form__label">
                        Twitter Link:
                        <input
                            type="text" className="artist-form__input"
                            {...register('linkTwitter', { pattern: { value: TWITTER_URL_PATTERN, message: 'Invalid Twitter URL' } })}
                        />
                        {errors.linkTwitter && <span className="artist-form__error">{errors.linkTwitter.message}</span>}
                    </label>

                    <label className="artist-form__label">
                        Pixiv Link:
                        <input
                            type="text" className="artist-form__input"
                            {...register('linkPixiv', { pattern: { value: PIXIV_URL_PATTERN, message: 'Invalid Pixiv URL' } })}
                        />
                        {errors.linkPixiv && <span className="artist-form__error">{errors.linkPixiv.message}</span>}
                    </label>
                </div>

                <div className="artist-form__row artist-form__row--buttons">
                    <button
                        type="submit" disabled={isSubmitting}
                        className={`artist-form__button ${isSubmitting ? 'artist-form__button--disabled' : ''}`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Add Artist'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArtistForm;