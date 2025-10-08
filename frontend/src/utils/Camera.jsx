import { useRef, useState } from 'react';
import Timer from '../components/Timer';
import { Button, Box, Typography } from '../../node_modules/@mui/material';

const Camera = () => {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);

    const startCameraAndRecord = async () => {
        setRecording(true);
        setVideoUrl(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
            mediaRecorderRef.current = new MediaRecorder(stream);
            const chunks = [];
            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                setVideoUrl(URL.createObjectURL(blob));
                stream.getTracks().forEach(track => track.stop());
                setRecording(false);
            };
            mediaRecorderRef.current.start();
            setTimeout(() => {
                mediaRecorderRef.current.stop();
            }, 1000); // 1 second in production, change to 10000 for 10 seconds
        } catch (err) {
            alert('Camera access denied or not available.');
            setRecording(false);
        }
    };

    return (
        <Box>
            <Button 
                variant="contained" 
                sx={{ mt: 2, mb: 2, bgcolor: 'purple', color: 'black', '&:hover': { bgcolor: '#FFD700' } }}
                onClick={startCameraAndRecord} 
                disabled={recording}
            >
                {recording ? <Timer /> : <Typography >Open Camera & Record 10s</Typography>}
            </Button>
            <Box>
                {recording ? (
                    <>
                        <video 
                            ref={videoRef} 
                            width={320} 
                            height={240} 
                            autoPlay 
                            muted 
                            style={{ display: 'block' }} 
                        />
                    </>
                ) : (
                    <Box 
                        width={320} 
                        height={240} 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        bgcolor="#eee"
                        borderRadius={2}
                    >
                        <Typography color="textSecondary">Camera Preview</Typography>
                    </Box>
                )}
            </Box>
            {videoUrl && (
                <Box>
                    <Box mt={2}>
                        <Typography variant="h6">Recorded Video:</Typography>
                        <video src={videoUrl} controls width={320} height={240} />
                    </Box>
                    <Box mt={2}>
                        {/* <Button 
                            variant="contained" 
                            sx={{ bgcolor: 'gold', color: 'black', '&:hover': { bgcolor: '#FFD700' }, mt: 2 }}
                            href={videoUrl} 
                            download="recorded_video.webm"
                        >
                            Download Video
                        </Button> */}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Camera;