import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { extractBaseRedditUrl, fetchRedditData } from '../../utils/redditUtils';
import "./PostForm.scss";

interface PostEntryForm {
    date: number; reddit?: string; urls?: string; src?: string; desc?: string; artistId: string; characterIds?: string;
}

const PostForm: React.FC = () => {
    const { register, handleSubmit, reset, setValue, getValues, formState: { errors, isSubmitting } } = useForm<PostEntryForm>();
    const [loadingRedditData, setLoadingRedditData] = useState(false);



    const onSubmit = async (data: PostEntryForm) => {
        const entry = {
            date: data.date,
            reddit: extractBaseRedditUrl(data.reddit),
            url: data.urls?.split(',').map((u) => u.trim()).filter(Boolean) || [],
            src: data.src || '',
            desc: data.desc || '',
            artistId: data.artistId || '',
            characterIds: data.characterIds?.split(',').map((c) => c.trim()).filter(Boolean) || [],
        };
        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry),
            });
            const result = await res.json();
            if (res.ok) {
                alert('Post added successfully!');
                reset();
            } else {
                alert(`Error: ${result.error || 'Failed to add post'}`);
            }
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
        setLoadingRedditData(true);
        const data = await fetchRedditData(extractBaseRedditUrl(redditUrl));
        setLoadingRedditData(false);

        if (data) {
            if (data.createdDate) setValue('date', data.createdDate, { shouldValidate: true });
            if (data.description) setValue('desc', data.description);
            if (data.imageUrls.length > 0) setValue('urls', data.imageUrls.join(', '));
        } else {
            alert('Failed to load Reddit data');
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
                </div>

                <div className="form-row">
                    <label>
                        Reddit URL:
                        <input type="text" {...register('reddit')} />
                        <button type="button" onClick={handleFetchRedditData} disabled={loadingRedditData}>
                            {loadingRedditData ? 'Loading...' : 'Fetch from Reddit'}
                        </button>
                    </label>

                    <label>
                        Source URL:
                        <input type="text" {...register('src')} />
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Image URLs (comma separated):
                        <input type="text" {...register('urls')} />
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Character IDs (comma separated):
                        <input type="text" {...register('characterIds')} />
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        Description:
                        <textarea rows={6} {...register('desc')} />
                    </label>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Add Post'}
                </button>
            </form>
        </div>
    );
};

export default PostForm;
