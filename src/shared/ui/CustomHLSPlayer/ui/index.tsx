import React, {useRef, useEffect} from 'react';
import Hls from 'hls.js';
import ReactPlayer from 'react-player';

const CustomHLSPlayer = ({url, ...props}: any) => {
    const playerRef = useRef<any>(null);
    const hlsRef = useRef<any>(null);

    useEffect(() => {
        if (Hls.isSupported() && url.length && url.endsWith('.m3u8')) {
            hlsRef.current = new Hls({
                maxBufferLength: 3,       // Buffer max 10 seconds
                maxBufferSize: 60 * 1000,  // Max buffer size
                maxBufferHole: 0.5,        // Tolerate 0.5 sec gaps
                lowLatencyMode: true,
            });

            if (hlsRef.current && playerRef.current) {
                hlsRef.current.loadSource(url);
                hlsRef.current.attachMedia(playerRef.current.getInternalPlayer());
            }
        }

        return () => {
            if (!url.length && hlsRef.current) {
                console.log("Destroying")
                hlsRef.current.destroy();
                hlsRef.current = null
            }
        };
    }, [url]);

    return (
        <ReactPlayer
            ref={playerRef}
            url={url.length ? url : undefined}
            {...props}
        />
    )
};

export default CustomHLSPlayer;
