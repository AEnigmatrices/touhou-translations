import React from 'react';
import { useForm } from 'react-hook-form';
import { validateNewArtistId } from '../../utils/artistUtils';
import type { Artist } from '../../types/data';
import "./ArtistForm.scss";



const ArtistForm: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Artist>();

    const onSubmit = async (data: Artist) => {
        const cleaned: Artist = {
            id: data.id.trim(), name: data.name.trim(),
            ...(data.linkTwitter?.trim() && { linkTwitter: data.linkTwitter.trim() }),
            ...(data.linkPixiv?.trim() && { linkPixiv: data.linkPixiv.trim() }),
        };

        try {
            const res = await fetch('/api/artists', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cleaned) });
            const result = await res.json();
            if (!res.ok) {
                alert(`Error: ${result.error || 'Failed to add artist'}`); return;
            }
            alert('Artist added successfully!');
            reset();
        } catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <div className="artist-form__container">
            <h3 className="artist-form__title">Add New Artist (Local Dev Only)</h3>
            <form className="artist-form__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="artist-form__row">
                    <label className="artist-form__label">
                        Artist ID:
                        <input type="text" className="artist-form__input"{...register('id', { required: 'ID is required', validate: validateNewArtistId })} />
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
                        <input type="text" className="artist-form__input" {...register('linkTwitter', {
                            pattern: {
                                value: /^(https?:\/\/)?(www\.)?x\.com\/.+$/i,
                                message: 'Invalid Twitter URL',
                            },
                        })} />
                    </label>

                    <label className="artist-form__label">
                        Pixiv Link:
                        <input type="text" className="artist-form__input" {...register('linkPixiv', {
                            pattern: {
                                value: /^https?:\/\/(www\.)?pixiv\.net\/.+$/i,
                                message: 'Invalid Pixiv URL',
                            },
                        })} />
                    </label>
                </div>

                <div className="artist-form__row artist-form__row--buttons">
                    <button type="submit" className={`artist-form__button ${isSubmitting ? 'artist-form__button--disabled' : ''}`}>
                        {isSubmitting ? 'Submitting...' : 'Add Artist'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArtistForm;