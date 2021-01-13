import React from 'react'
import { Item } from '../../types'
import { Link, makeStyles } from '@material-ui/core/'
import {
	Typography,
	DialogTitle,
	Box,
	Dialog,
	DialogContent,
	DialogContentText,
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
	title: {
		backgroundColor: '#FBFDFF',
		borderBottom: '2px solid #E6EBF5',
		color: '#1E1F21',
	},
	closeButton: {
		color: '#2974FF',
		cursor: 'pointer',
		fontWeight: 'bold',
	},
}))

type Props = {
	dialogToggle: boolean
	item: Item
	callback: () => void
}

const stringToHTML = (html: string) => {
	return { __html: html }
}

const ItemDialog: React.FC<Props> = ({ dialogToggle, callback, item }) => {
	const classes = useStyles()

	return (
		<Dialog
			open={dialogToggle}
			onClose={callback}
			maxWidth='lg'
			fullWidth={true}
		>
			<DialogTitle className={classes.title} disableTypography={true}>
				<Box display='flex' alignItems='center'>
					<Box flexGrow={1}>
						<Typography variant='h4'>{item.title}</Typography>
					</Box>
					<Box>
						<Link>
							<Typography className={classes.closeButton} onClick={callback}>
								CLOSE
							</Typography>
						</Link>
					</Box>
				</Box>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<div
						dangerouslySetInnerHTML={stringToHTML(
							item.content ? item.content : item.description
						)}
					/>
				</DialogContentText>
			</DialogContent>
		</Dialog>
	)
}

export default ItemDialog
