import React, { useState, useEffect } from 'react'
import { Cords, Icons, WeatherInfo } from '../../types'
import { fetchWeather } from '../../controllers/fetchWeather'
import { Box, Typography, makeStyles } from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
	box: {
		height: 0,
		display: 'flex',
		alignItems: 'center',
	},
	text: {
		fontWeight: 'bold',
		fontSize: theme.spacing(3),
	},
}))

type Props = {
	cords: Cords
}

const weatherIcons: Icons = {
	Thunderstorm: 'http://openweathermap.org/img/wn/11d@2x.png',
	Drizzle: 'http://openweathermap.org/img/wn/10d@2x.png',
	Rain: 'http://openweathermap.org/img/wn/09d@2x.png',
	Snow: 'http://openweathermap.org/img/wn/13d@2x.png',
	Atmosphere: 'http://openweathermap.org/img/wn/50d@2x.png',
	Clear: 'http://openweathermap.org/img/wn/01d@2x.png',
	Clouds: 'http://openweathermap.org/img/wn/03d@2x.png',
}

const Weather: React.FC<Props> = ({ cords }) => {
	const classes = useStyles()
	const [weather, setWeather] = useState<WeatherInfo | null>(null)

	useEffect(() => {
		fetchWeather(cords).then((data) => {
			if (data.weather) {
				let name = data.name
				let desc = data.weather[0].main
				let icon = weatherIcons[desc]
				let temp = `${Math.floor((data.main.temp - 273) * (9 / 5) + 32)}°F`

				setWeather({
					name,
					temp,
					desc,
					icon,
				})
			}
		})
	}, [cords])

	return (
		<>
			{weather && (
				<Box className={classes.box} flexDirection='column'>
					<img src={weather.icon} alt={weather.desc}></img>
					<Typography className={classes.text}>{weather.desc}</Typography>
					<Typography className={classes.text}>{weather.name}</Typography>
					<Typography className={classes.text}>{weather.temp}</Typography>
				</Box>
			)}
		</>
	)
}

export default Weather
