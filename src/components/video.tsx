import React, { useEffect, useRef, useState } from 'react';
import { files as filesKitchen, filenameDate } from '../videos/kitchen';
import { files as filesLivingRoom } from '../videos/living-room';
import { files as filesBedroomOne } from '../videos/bedroom-one';
import { files as filesBedroomTwo } from '../videos/bedroom-two';
import { files as filesBedroomFour } from '../videos/bedroom-four';
import { files as filesUpstairsHallway } from '../videos/upstairs-hallway';
import { files as filesDownstairsHallway } from '../videos/downstairs-hallway';


interface VideoInterface {
    date: any
    play: boolean
    room: string
}

const filesMap: any = {
    "kitchen": filesKitchen,
    "living-room": filesLivingRoom,
    "bedroom-1": filesBedroomOne,
    "bedroom-2": filesBedroomTwo,
    "bedroom-4": filesBedroomFour,
    "upstairs-hallway": filesUpstairsHallway,
    "downstairs-hallway": filesDownstairsHallway,
}

const Video: React.FC<VideoInterface> = ({ date, play, room }) => {
    const vidRef = useRef(null);

    const [video, setVideo] = useState('')


    useEffect(() => {
        if (play) {
            vidRef && (vidRef.current as any).play();
        } else {
            vidRef && (vidRef.current as any).pause();
        }
    }, [play])


    useEffect(() => {
        const fileIndex = filesMap[room].findIndex((file: any) => {
            const fileDate = filenameDate(file)

            return fileDate.isAfter(date)
        })

        const difference = date.diff(filenameDate(filesMap[room][fileIndex - 1]), 'seconds')

        if (video.split('#')[0] !== filesMap[room][fileIndex - 1]) {

            setVideo(`${filesMap[room][fileIndex - 1]}#t=${difference}`)
            vidRef && (vidRef.current as any).load();
            try {
                vidRef && (vidRef.current as any).play();

            } catch (e) { console.error('cant autoplay video') }
        }

    }, [date])

    // const getNextVideo = () => {
    //     const fileIndex = files.findIndex((file) => {
    //         const fileDate = filenameDate(file)

    //         return fileDate.isAfter(date)
    //     })

    //     console.log('file index was', fileIndex, files.length)
    //     const difference = date.diff(filenameDate(files[fileIndex - 1]), 'seconds')

    //     console.log('diff in seconds', difference)

    //     setVideo(`${files[fileIndex - 1]}#t=${difference}`)


    // }


    return (
        <div>
            <div>
            {video}

            </div>
            <div>
            <video ref={vidRef} width="640" height="360" controls
        //onEnded={getNextVideo}
        >
            {video && <source src={`/${room}/${video}`} ></source>}
        </video>
            </div>

        </div>



    );
}

export default Video
