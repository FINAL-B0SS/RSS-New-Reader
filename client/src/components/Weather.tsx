import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { fetchWeather } from '../API'
import { Cords } from '../utils'

const useStyles = makeStyles((theme) => ({
	box: {
		width: theme.spacing(85),
		marginBottom: theme.spacing(1),
		display: 'flex',
		alignItems: 'start',
	},
	text: {
		fontWeight: 'bold',
		fontSize: theme.spacing(3),
	},
}))

type WeatherInfo = {
	name: string
	desc: string
	temp: string
	icon: string
}

type Icons = {
	[index: string]: string
	Thunderstorm: string
	Drizzle: string
	Rain: string
	Snow: string
	Atmosphere: string
	Clear: string
	Clouds: string
}

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
		})
	}, [cords])

	return (
		<Box className={classes.box} flexDirection='column'>
			{weather && (
				<>
					<img src={weather.icon} alt={weather.desc}></img>
					<Typography className={classes.text}>{weather.desc}</Typography>
					<Typography className={classes.text}>
						{weather.name} | {weather.temp}
					</Typography>
				</>
			)}
		</Box>
	)
}

export default Weather
