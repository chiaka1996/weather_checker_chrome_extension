import React, {useEffect, useState} from 'react';
import { Typography, Button, Card, CardContent, CardActions, Box } from '@mui/material';
import './weatherCard.css';
import { fetchOpenWeatherData, getWeatherIconSrc, OpenWeatherData, OpenWeatherTempScale } from '../../utils/api';

const WeatherCardContainer: React.FC<{
    children: React.ReactNode
    onDelete?: () => void
}> = ({children, onDelete}) => {
   return( 
   <Box mx={'4px'} my={'16px'}>
    <Card>
       <CardContent>
            {children}
        </CardContent>
        <CardActions>
           { onDelete && <Button onClick={onDelete} color='error'>Delete</Button> }
        </CardActions>
    </Card>
    </Box>
   )
}

type WeatherCardState = "loading..." | "error" | "ready"

const WeatherCard: React.FC<{
    city: string
    tempScale: OpenWeatherTempScale
    onDelete?: () => void
}> = ({city, tempScale, onDelete}) => {
    const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
    const [cardState, setCardState] = useState<WeatherCardState>("loading...")

    useEffect(() => {
        fetchOpenWeatherData(city, tempScale)
        .then((data) => {
            setWeatherData(data)
            setCardState("ready")
            })
        .catch((err) => setCardState("error"))
    },[city, tempScale])

   

    return (
       <WeatherCardContainer onDelete={onDelete}>
            {
                cardState == "loading..." || cardState =="error" ? <Typography className='weatherCard-title'>
                    {
                        cardState == "loading..." ? "loading..." : "Error: weather data not found"
                    }
                </Typography> : <div className='bodyGrid'>
                <div className='gridItem1'>
                <Typography className='weatherCard-title'>
                {weatherData.name}
                </Typography>
                <Typography className='weatherCard-temp'>{Math.round(weatherData.main.temp)}</Typography>
                <Typography className='weatherCard-body'>feels like: {Math.round(weatherData.main.feels_like)}</Typography>
                </div>
                <div className='gridItem2'>
                {
                    weatherData.weather.length > 0 && (
                    <>
                    <img src={getWeatherIconSrc(weatherData.weather[0].icon)}/>
                    <Typography className='weatherName'>
                    {weatherData.weather[0].main}
                    </Typography>
                    </>
                    )
                }
                </div>
            </div>
            }  
    </WeatherCardContainer>        
     
    )
}

export default WeatherCard;
