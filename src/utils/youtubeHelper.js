export const getYoutubeEmbedUrl = (url) => {
  try {
    // Extract video ID from various YouTube URL formats
    let videoId;
    
    if (url.includes('youtube.com/watch')) {
      // Format: https://www.youtube.com/watch?v=VIDEO_ID
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    } else if (url.includes('youtu.be/')) {
      // Format: https://youtu.be/VIDEO_ID
      videoId = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/embed/')) {
      // Format: https://www.youtube.com/embed/VIDEO_ID
      videoId = url.split('youtube.com/embed/')[1];
    } else {
      // If no recognized format, return the original URL
      return url;
    }
    
    // Remove any additional parameters
    if (videoId && videoId.includes('&')) {
      videoId = videoId.split('&')[0];
    }
    
    // Add parameters to help with embedding
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=0` : url;
  } catch (error) {
    console.error('Error converting YouTube URL:', error);
    return url; // Return original URL if there's an error
  }
};