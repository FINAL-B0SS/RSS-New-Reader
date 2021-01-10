import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

type Props = {
	callback: (text: string) => void
}

const SearchField: React.FC<Props> = ({ callback }) => {
	const [searchText, setSearchText] = useState<string>('')

	return (
		<div>
			<Grid container direction='row' justify='center'>
				<Grid item xs={7}>
					<Box mb={1}>
						<Box px={5} py={5}>
							<Grid item xs={7}>
								<Box
									mt={1}
									mb={4}
									minWidth={700}
									display='flex'
									alignItems='center'
								>
									<TextField
										fullWidth
										variant='outlined'
										placeholder='Paste XML link to RSS feed here...'
										onChange={(e) => setSearchText(e.target.value)}
										onSubmit={(e) => callback(searchText)}
									/>
									<Button onClick={(e) => callback(searchText)}>Add</Button>
								</Box>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</div>
	)
}

export default SearchField
