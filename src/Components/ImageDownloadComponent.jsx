import React from 'react';
import { REACT_APP_API_URL } from '../core/config';
import axios from 'axios';

const ImageDownloadComponent = ({ thumbnailUrl }) => {
  const handleDownloadClick = async () => {
    const serverUrl = REACT_APP_API_URL + '/youtube/video/thumbnail/download';

    try {
      const response = await axios.post(serverUrl, {
        thumbnail: thumbnailUrl,
      });

      const dataUri = await response.data.image;

      // Display the image using an image element
      const imageElement = document.createElement('img');
      imageElement.src = dataUri;
      document.body.appendChild(imageElement);

      // Optional: Create a download link to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUri;
      downloadLink.download = 'imagen.jpg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Remove the temporary image element
      document.body.removeChild(imageElement);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <a>
        <img src={thumbnailUrl} alt="Thumbnail" />
      </a>
      <button onClick={handleDownloadClick} style={{ backgroundColor: '#282c34', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Descargar Imagen</button>
    </div>
  );
};

export default ImageDownloadComponent;