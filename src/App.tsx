import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';


import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from "dayjs/plugin/utc"

import timezone from 'dayjs/plugin/timezone'
import Video from './components/video';

dayjs.extend(customParseFormat)
dayjs.extend(timezone)
dayjs.extend(utc)

const theme = createTheme({
  palette: {
    primary: {
      main: '#740700',
    },
    secondary: {
      main: '#191d21',
    },
  },
});

const App: React.FC = () => {

  const [date, setDate] = useState(dayjs('2023-04-19T15:30:00'))
  const [play, setPlay] = useState(false)

  useEffect(() => {
    let interval: any = null
    if (play) {
      interval = setInterval(() => {
        setDate(date => dayjs(date).add(50, 'milliseconds'))
      }, 50);
    } else {
      if (interval) {
        clearInterval(interval)

      }
    }



    return () => {
      if (interval) {
        clearInterval(interval)

      }
    }
  }, [play]);

  const dateChanged = (e: any) => {
    setDate(e)
    setPlay(true)
  }

  const startStop = () => {

    // if (play) {
    //   vidRef && (vidRef.current as any).pause();
    //   vidRef2 && (vidRef2.current as any).pause();
    // } else {
    //   vidRef && (vidRef.current as any).play();
    //   vidRef2 && (vidRef2.current as any).play();
    // }

    setPlay(!play)
  }

  // console.log('v1', video)
  // console.log('v2', video2)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <ThemeProvider theme={theme}>
        <DemoContainer
          components={[
            'DateTimePicker',
            'MobileDateTimePicker',
            'DesktopDateTimePicker',
            'StaticDateTimePicker',
          ]}
        >
          {/* <DemoItem label="Static variant">
            <StaticDateTimePicker defaultValue={dayjs('2022-04-17T15:30')}
          onChange={dateChanged}

            />
          </DemoItem> */}
          <MobileDateTimePicker
            value={date}
            // onChange={dateChanged}
            onAccept={dateChanged}
          />
        </DemoContainer>
        <div>
          <div>
            <button onClick={startStop}>
              pause/play {dayjs(date).format('DD/MM/YYYYTHH:mm:ss')}
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Video room="bedroom-1" date={date} play={play} />
            <Video room="bedroom-2" date={date} play={play} />
            <Video room="bedroom-4" date={date} play={play} />
            <Video room="upstairs-hallway" date={date} play={play} />
            <Video room="kitchen" date={date} play={play} />
            <Video room="living-room" date={date} play={play} />
            <Video room="downstairs-hallway" date={date} play={play} />
          </div>

          {/*
          <video ref={vidRef} width="640" height="480" controls
            onEnded={getNextVideo1}
          >
            {video && <source src={`/kitchen/${video}`} ></source>}
          </video>
          <video ref={vidRef2} width="640" height="480" controls
            onEnded={getNextVideo2}
          >
            {video2 && <source src={`/living-room/${video2}`} ></source>}
          </video> */}
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App
