import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { extractBaseRedditUrl, buildPostEntry, fetchRedditData } from '../../utils/redditUtils';
import type { PostEntryForm } from "../../types/data";
import "./PostForm.scss";



const PostForm: React.FC = () => {
    const { register, handleSubmit, reset, setValue, getValues, formState: { errors, isSubmitting } } = useForm<PostEntryForm>();
    const [loadingRedditData, setLoadingRedditData] = useState(false);



    const onSubmit = async (data: PostEntryForm) => {
        try {
            const res = await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(buildPostEntry(data)) });
            const result = await res.json();
            if (!res.ok) {
                alert(`Error: ${result.error || 'Failed to add post'}`); return;
            }
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
        <div className="post-form-container">
            <h3>Add New Post (Local Dev Only)</h3>
            <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <label>
                        UNIX Timestamp:
                        <input type="number" {...register('date', { required: 'Date is required', valueAsNumber: true })} />
                        {errors.date && <span>{errors.date.message}</span>}
                    </label>

                    <label>
                        Artist ID:
                        <input type="text" {...register('artistId', { required: 'Artist ID is required' })} />
                        {errors.artistId && <span>{errors.artistId.message}</span>}
                    </label>

                    <label>
                        Source URL:
                        <input type="text" {...register('src', { required: 'Source URL is required' })} />
                        {errors.src && <span>{errors.src.message}</span>}
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Image URLs (comma separated):
                        <input type="text" {...register('urls', { required: 'Image URLs are required' })} />
                        {errors.urls && <span>{errors.urls.message}</span>}
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Character IDs (comma separated):
                        <input type="text" {...register('characterIds', { required: 'Character IDs are required' })} />
                        {errors.characterIds && <span>{errors.characterIds.message}</span>}
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Description:
                        <textarea rows={6} {...register('desc', { required: 'Description is required' })} />
                        {errors.desc && <span>{errors.desc.message}</span>}
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Reddit URL:
                        <input type="text" {...register('reddit', { required: 'Reddit URL is required' })} />
                        {errors.reddit && <span>{errors.reddit.message}</span>}
                    </label>
                </div>

                <div className="form-row buttons-row">
                    <button type="button" onClick={handleFetchRedditData} disabled={loadingRedditData}>
                        {loadingRedditData ? 'Loading...' : 'Fetch from Reddit'}
                    </button>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Add Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
