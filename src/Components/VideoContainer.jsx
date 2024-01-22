import React, { useEffect, useState } from 'react';

// import "../styles/VideoContainer.css";

import { H2Title } from './H2';
import axios from 'axios';
import YoutubeAudioPlayer from './YoutubeAudioPlayer';
import TextToSpeechButton from './TextToSpeechButton';
import ImageDownloadComponent from './ImageDownloadComponent';

const VideoContainer = () => {
    const [id, setId] = useState(null)
    const [video, setVideo] = useState(null)
    const [translation, setTranslation] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdating, setIsUpdating] = useState(false)
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [fetch, setFetch] = useState(false);
    const [error, setError] = useState(null);
    const [errorUpdate, setErrorUpdate] = useState(null);

    const extractVideoId = (url) => {
        const match = url.match(/[?&]v=([^&]+)/);
        return match && match[1];
    }

    const handleInputChange = (event) => {
        if (extractVideoId(event.target.value) !== id) {
            setYoutubeUrl(event.target.value);
            setId(extractVideoId(event.target.value))
            setFetch(true)
        } else {
            setFetch(false)
        }
    };

    const handleUploadClick = async () => {
        if (fetch) {
            setIsLoading(true);
            setError(null);
    
            try {
                let translationData = null
                const response = await axios.get(process.env.REACT_APP_API_URL + `/youtube/video/${id}/info`);
                console.log(response.data, response.data.translation)
                if (response.data.translation) {
                    translationData = response.data.translation
                } else {
                    await axios.post(process.env.REACT_APP_API_URL + `/youtube/video/${id}/transcript/audio`);
                    const responseTranslate = await axios.get(process.env.REACT_APP_API_URL + `/youtube/video/${id}/translation`);
                    translationData = responseTranslate.data.translation
                    await axios.patch(process.env.REACT_APP_API_URL + `/youtube/video/${id}/translation`, {translation});
                }
                setVideo(response.data)
                setTranslation(translationData)
            } catch (error) {
                setError('Error uploading YouTube URL. Please try again.');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleUpdateClick = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL+`/youtube/video/${extractVideoId(youtubeUrl)}/info`);
            console.log(response.data);
            const newVideo = { ...video }
            newVideo.view_count = response.data.view_count
            newVideo.latest_comment = response.data.latest_comment
            setVideo(newVideo)
            setIsUpdating(true)
        } catch (error) {
            setErrorUpdate('Error updating');
            console.error(error);
        } finally {
            setIsUpdating(false)
        }
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/youtube/video/last/info')
            .then(response => {
                setVideo({ last: true, ...response.data})
        }).catch (err => {
            if (err.response.status === 404) {
                setVideo({ last: true })
            } 
        }).finally(() => setIsLoading(false))
    }, [])

	return (

        <div className='video-container'>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>
                    Paste The YouTube Video URL:
                </h2>
                <input type="text" value={youtubeUrl} onChange={handleInputChange} style={{
                    width: '50%',
                    flex: 1,
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginRight: '5px',
                    outline: 'none',
                    backgroundColor: '#282c34',
                    color: 'white',
                }} />
                <button onClick={handleUploadClick} disabled={isLoading} style={{
                    backgroundColor: '#282c34', // YouTube red color
                    color: 'white',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            {
                video ?
                    video.last ?
                        !isLoading && <>
                            <H2Title
                                content="Last searched video"
                            />
                            <h1>
                                {(video.title || "There is not a latest video searched")}
                            </h1>
                        </>
                        : <>
                            {/* Grupo: Título del video */}
                            <div className="video-title-container" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff', marginBottom: '20px' }}>
                                <h1 style={{ color: '#282c34', marginBottom: '20px' }}>{video.title}</h1>
                                <ImageDownloadComponent thumbnailUrl={video.thumbnail}/>
                            </div>

                            {/* Grupo: Audio Sample y Text to Speech */}
                            <div className="audio-group-container" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff', marginBottom: '20px' }}>
                                    <h3 style={{ marginBottom: '10px' }}>Audio Sample</h3>
                                    <YoutubeAudioPlayer url={youtubeUrl}/>
                                    <h3 style={{ marginBottom: '10px' }}>Spanish Translation</h3>
                                    <h4>"{translation}"</h4>
                                    <TextToSpeechButton text={translation} />
                            </div>

                            {/* Grupo: Views y Último comentario */}
                            <div className="stats-group-container" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff', marginBottom: '20px' }}>
                                <h3 style={{ marginBottom: '10px' }}>{`Views: ${video.view_count}`}</h3>
                                <h3>{`Last comment: ${video.latest_comment || "Not available"}`}</h3>
                                <button onClick={handleUpdateClick} disabled={isUpdating} style={{ backgroundColor: '#282c34', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    {isUpdating ? 'Updating...' : 'Update comment and views'}
                                </button>
                                {errorUpdate && <p style={{ color: 'red', marginTop: '10px' }}>{errorUpdate}</p>}
                            </div>
                        </>
                : isLoading ? "" : "Video not found"
            }
		</div>
	);
}

export default VideoContainer;