import React from 'react';
import { useForm } from 'react-hook-form';
import "./PostForm.scss";

interface PostEntryForm {
    date: number; reddit?: string; urls?: string; src?: string; desc?: string; artistId: string; characterIds?: string;
}

const PostForm: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PostEntryForm>();



    const onSubmit = async (data: PostEntryForm) => {
        const entry = {
            date: data.date || '',
            reddit: data.reddit || '',
            url: data.urls?.split(',').map((u) => u.trim()).filter(Boolean) || [],
            src: data.src || '',
            desc: data.desc || '',
            artistId: data.artistId || '',
            characterIds: data.characterIds?.split(',').map((c) => c.trim()).filter(Boolean) || [],
        };

        try {
            const res = await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry), });
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
