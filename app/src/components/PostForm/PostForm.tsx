import React from 'react';
import { useForm } from 'react-hook-form';
import "./PostForm.scss";

interface PostEntryForm {
    date: number;
    reddit?: string;
    urls?: string;
    src?: string;
    desc?: string;
    artistId: string;
    characterIds?: string;
}

const PostForm: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PostEntryForm>();

    const onSubmit = async (data: PostEntryForm) => {
        const entry = {
            date: data.date,
            reddit: data.reddit || '',
            url: data.urls?.split(',').map((u) => u.trim()).filter(Boolean) || [],
            src: data.src || '',
            desc: data.desc || '',
            artistId: data.artistId,
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

    return (
        <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
                UNIX Timestamp:
                <input
                    type="number"
                    {...register('date', { required: 'Date is required', valueAsNumber: true })}
                />
                {errors.date && <span style={{ color: 'red' }}>{errors.date.message}</span>}
            </label>

            <label>
                Reddit URL:
                <input type="text" {...register('reddit')} />
            </label>

            <label>
                Image URLs (comma separated):
                <input type="text" {...register('urls')} />
            </label>

            <label>
                Source URL:
                <input type="text" {...register('src')} />
            </label>

            <label>
                Description:
                <textarea rows={6} {...register('desc')} />
            </label>

            <label>
                Artist ID:
                <input
                    type="text"
                    {...register('artistId', { required: 'Artist ID is required' })}
                />
                {errors.artistId && <span style={{ color: 'red' }}>{errors.artistId.message}</span>}
            </label>

            <label>
                Character IDs (comma separated):
                <input type="text" {...register('characterIds')} />
            </label>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Add Post'}
            </button>
        </form>
    );
};

export default PostForm;
