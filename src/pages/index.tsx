import React, {
  useCallback,
  useState,
  FormEvent,
  useEffect,
  useRef
} from 'react'
import Head from 'next/head'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import io from 'socket.io-client'
import AlwaysScrollToBottom from '../components/AlwaysScrollToBottom'
import useStyles from '../styles'

const socket = io('https://sd-socket.herokuapp.com/')
// const socket = io('http://localhost:3333')
socket.on('connect', () => console.log('Connected'))

type TypeOptions = 'rpc_s_lib' | 'rpc_c_lib' | 'webSocket'
type TypeInitials = {
  initials: string
  protocol: string
}

const makeOptions = () => ({
  rpc_s_lib: 'RPC (s/ lib)',
  rpc_c_lib: 'RPC (c/ lib)',
  webSocket: 'WebSockets'
})

const Sockets: React.FC = () => {
  const classes = useStyles()
  const [options] = useState(makeOptions())
  const [selectedOption, setSelectedOption] = useState<TypeOptions>('rpc_s_lib')
  const [name, setName] = useState('')
  const [initials, setInitials] = useState<TypeInitials[]>([])

  const initialsListRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const handleInitials = (newInitials: TypeInitials) => {
      setInitials(prevInitials => [...prevInitials, newInitials])
    }
    socket.on('initials', handleInitials)
    socket.on('initials_rpc', handleInitials)
    return () => {
      socket.off('initials', handleInitials)
      socket.off('initials_rpc', handleInitials)
    }
  }, [selectedOption])

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      switch (selectedOption) {
        case 'rpc_s_lib':
          socket.emit('initials_rpc', name)
          break
        case 'rpc_c_lib':
          console.log(selectedOption, name)
          break
        case 'webSocket':
          socket.emit('initials', name)
          break
        default:
      }
    },
    [name, selectedOption]
  )

  return (
    <Container component="main" className={classes.wrapper}>
      <Head>
        <title>Sockets</title>
      </Head>
      <Grid container spacing={3} component="section">
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            className={classes.container}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">Protocolos</FormLabel>
              <RadioGroup
                color="primary"
                aria-label="protocols"
                name="protocols1"
                value={selectedOption}
                onChange={event =>
                  setSelectedOption(event.target.value as TypeOptions)
                }
                row
              >
                {Object.entries(options).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio color="primary" />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <TextField
              variant="outlined"
              label="Seu nome"
              value={name}
              onChange={event => setName(event.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!name}
            >
              Enviar
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Iniciais:</Typography>
          <div ref={initialsListRef} className={classes.initialsContainer}>
            <Grid component={List} container>
              {initials.map((initial, index) => (
                <Grid key={`${initial.initials}-${index}`} item xs>
                  <ListItem>
                    <ListItemText
                      primary={initial.initials}
                      secondary={initial.protocol}
                    />
                  </ListItem>
                </Grid>
              ))}
            </Grid>
            <AlwaysScrollToBottom forwardRef={initialsListRef} />
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Sockets
