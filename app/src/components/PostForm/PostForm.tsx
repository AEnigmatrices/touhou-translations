import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitPostEntry, validateArtistId } from '../../utils/formUtils';
import { extractBaseRedditUrl, fetchRedditData, validateRedditUrl } from '../../utils/redditUtils';
import { useGetPosts } from '../../context/PostsContext';
import type { PostEntryForm } from "../../types/data";
import "./PostForm.scss";



const PostForm: React.FC = () => {
    const { register, handleSubmit, reset, setValue, getValues, formState: { errors, isSubmitting } } = useForm<PostEntryForm>();
    const [loadingRedditData, setLoadingRedditData] = useState(false);
    const allPosts = useGetPosts();



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
            alert('Please enter a Reddit URL first.');
            return;
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



    return (
        <div className="post-form__container">
            <h3 className="post-form__title">Add New Post (Local Dev Only)</h3>
            <form className="post-form__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="post-form__row">
                    <label className="post-form__label">
                        UNIX Timestamp:
                        <input type="number" className="post-form__input" {...register('date', { required: 'Date is required', valueAsNumber: true })} />
                        {errors.date && <span className="post-form__error">{errors.date.message}</span>}
                    </label>

                    <label className="post-form__label">
                        Artist ID:
                        <input type="text" className="post-form__input" {...register('artistId', { required: 'Artist ID is required', validate: validateArtistId })} />
                        {errors.artistId && <span className="post-form__error">{errors.artistId.message}</span>}
                    </label>

                    <label className="post-form__label">
                        Source URL:
                        <input type="text" className="post-form__input" {...register('src', { required: 'Source URL is required' })} />
                        {errors.src && <span className="post-form__error">{errors.src.message}</span>}
                    </label>
                </div>

                <div className="post-form__row">
                    <label className="post-form__label">
                        Image URLs (comma separated):
                        <input type="text" className="post-form__input" {...register('urls', { required: 'Image URLs are required' })} />
                        {errors.urls && <span className="post-form__error">{errors.urls.message}</span>}
                    </label>
                </div>

                <div className="post-form__row">
                    <label className="post-form__label">
                        Character IDs (comma separated):
                        <input type="text" className="post-form__input" {...register('characterIds', { required: 'Character IDs are required' })} />
                        {errors.characterIds && <span className="post-form__error">{errors.characterIds.message}</span>}
                    </label>
                </div>

                <div className="post-form__row">
                    <label className="post-form__label">
                        Description:
                        <textarea rows={6} className="post-form__input post-form__input--textarea" {...register('desc', { required: 'Description is required' })} />
                        {errors.desc && <span className="post-form__error">{errors.desc.message}</span>}
                    </label>
                </div>

                <div className="post-form__row">
                    <label className="post-form__label">
                        Reddit URL:
                        <input type="text" className="post-form__input"  {...register('reddit', { required: 'Reddit URL is required', validate: (value) => validateRedditUrl(value, allPosts) })} />
                        {errors.reddit && <span className="post-form__error">{errors.reddit.message}</span>}
                    </label>
                </div>

                <div className="post-form__row post-form__row--buttons">
                    <button type="button" className={`post-form__button ${loadingRedditData ? 'post-form__button--disabled' : ''}`} onClick={handleFetchRedditData}>
                        {loadingRedditData ? 'Loading...' : 'Fetch from Reddit'}
                    </button>
                    <button type="submit" className={`post-form__button ${isSubmitting ? 'post-form__button--disabled' : ''}`}>
                        {isSubmitting ? 'Submitting...' : 'Add Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
