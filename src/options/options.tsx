import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Typography, Button, Switch, Grid, TextField, Card, CardContent, CardActions, Box } from '@mui/material';
import { getStoredOptions, setStoredOptions, LocalStorageOptions } from '../utils/storage';
import './options.css';

type FormState = 'ready' | 'saving'

const App: React.FC<{}> = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null)
    const [formState, setFormState] = useState<FormState>('ready')

    useEffect(() => {
       getStoredOptions().then((options) => setOptions(options)) 
    }, [])

    const handleHomeCityChange = (homeCity: string) => {
        setOptions({
            ...options,
            homeCity
        })
    }

    const handleSaveButtonClick = () => {
        setFormState('saving')
        setStoredOptions(options)
        .then(() => {
            setTimeout(() => {
                setFormState('ready')
            }, 1000)       
        })
    }

    const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
        setOptions({
            ...options,
            hasAutoOverlay
        })
    }

    if(!options) {
        return null
    }

    const isFieldsDisabled = formState === 'saving'

    return (
      <Box mx='10%' my='2%'>
        <Card>
            <CardContent>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h4">weather extension options</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Home city name</Typography>
                        <TextField 
                            fullWidth 
                            placeholder='enter a home city name' 
                            value={options.homeCity} 
                            onChange={event => handleHomeCityChange(event.target.value)}
                            disabled={isFieldsDisabled}
                            />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Auto toggle overlay on webpage load</Typography>
                        <Switch 
                            color = "primary"
                            checked = {options.hasAutoOverlay} 
                            onChange = {(event, checked) => handleAutoOverlayChange(checked)}  
                            disabled = {isFieldsDisabled} 
                        />
                    </Grid>
                    <Grid item>
                        <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleSaveButtonClick}
                        disabled={isFieldsDisabled}
                        >
                        {formState === 'ready' ? "save" : "saving..."}
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
      </Box>
    )
}


const root = document.createElement('div');
createRoot(document.body.appendChild(root)).render(
<App />
)
