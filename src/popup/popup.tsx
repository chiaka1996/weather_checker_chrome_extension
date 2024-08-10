import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Paper, InputBase, Box, IconButton, Grid} from '@mui/material';
import { Add as AddIcon, PictureInPicture as PictureInPictureIcon} from '@mui/icons-material';
import './popup.css';
import { setStoredCities, setStoredOptions, getStoredOptions, getStoredCities, LocalStorageOptions } from '../utils/storage';
import WeatherCard  from '../components/weatherCard/weatherCard';
import {Messages} from '../utils/messages'

const App: React.FC<{}> = () => {
    const [cities, setCities] = useState<string[]>([])
    const [cityInput, setCityInput] = useState<string>('');
    const [options, setOptions] = useState<LocalStorageOptions | null>(null)

    useEffect(() => {
        getStoredCities().then(cities => setCities(cities))
        getStoredOptions().then((options) => setOptions(options))
    })

    const handleCityButtonClick = () => {
        if(cityInput === "") {
            return
        }
        const updatedCities = [...cities, cityInput]
        setStoredCities(updatedCities)
        .then(() => {
            setCities([...cities, cityInput])
            setCityInput('')
        })    
    }

    const handleCityDeleteButtonClick = (index: number) => {
        cities.splice(index, 1)
        const updatedCities = [...cities]
        setStoredCities(updatedCities)
        .then(() => {
            setCities(updatedCities)
        })
    }

    const handleTempScaleButtonClick = () => {
        const updateOptions: LocalStorageOptions = {
            ...options,
            tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric'
        }
        setStoredOptions(updateOptions).then(() => {
            setOptions(updateOptions)
        })
    }

    const handleOverlayButtonClick = () => {
        chrome.tabs.query(
            {
                active: true
            },
            (tabs) => {
                if(tabs.length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY)
                }
            }
        )

    }

    if(!options){
        return null
    }

    return (
        <Box mx="4px" my="16px">
           
                <Paper>
                <Box px="15px" py="5px">
                <div className='inputFlex'>
                <InputBase
                 placeholder='add a city'
                 value={cityInput}
                 onChange={(event) => setCityInput(event.target.value)}
                 />
                <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
                </IconButton>
                <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === "metric" ? '\u2103' : '\u2109'}
                </IconButton>
                <IconButton onClick={handleOverlayButtonClick}>
                <PictureInPictureIcon />
                </IconButton>
                </div>
                </Box>        
                </Paper>  
                {
                    options.homeCity != '' && 
                    <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
                }
        {
            cities.map((city, index) => (
                <WeatherCard 
                city={city} 
                tempScale={options.tempScale}
                key={index} 
                onDelete={() => handleCityDeleteButtonClick(index)} 
                />
            ))
        }
        <Box height="16px" />
        </Box>
    )
}


const root = document.createElement('div');
createRoot(document.body.appendChild(root)).render(
<App />
)
