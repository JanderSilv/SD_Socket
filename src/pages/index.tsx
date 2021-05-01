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
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import io from 'socket.io-client'

const socket = io('http://localhost:3333')
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

  const [scrollPosition, setScrollPosition] = useState(0)
  const [options] = useState(makeOptions())
  const [selectedOption, setSelectedOption] = useState<TypeOptions>('rpc_s_lib')
  const [name, setName] = useState('')
  const [initials, setInitials] = useState<TypeInitials[]>([
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    },
    {
      initials: 'JAS',
      protocol: 'Socket'
    }
  ])

  const initialsListRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const handleInitials = (newInitials: TypeInitials) => {
      setInitials(prevInitials => [...prevInitials, newInitials])
    }
    if (selectedOption === 'webSocket') socket.on('initials', handleInitials)
    return () => {
      socket.off('initials', handleInitials)
    }
  }, [selectedOption])

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>()
    useEffect(() => {
      if (!checkScrolledUp()) elementRef.current.scrollIntoView()
    })
    return <div id="always-scroll-bottom-div" ref={elementRef} />
  }

  const checkScrolledUp = useCallback(() => {
    const actualPosition = initialsListRef.current.scrollTop
    // console.log(actualPosition, scrollPosition)
    if (actualPosition < scrollPosition) return true
    else {
      setScrollPosition(initialsListRef.current.scrollTop)
      return false
    }
  }, [scrollPosition])

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      switch (selectedOption) {
        case 'rpc_s_lib':
          console.log(selectedOption, name)
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
            <AlwaysScrollToBottom />
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Sockets

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    container: {
      minHeight: '40vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },

    initialsContainer: {
      height: '100%',
      maxHeight: 265,
      border: '1px solid gray',
      borderRadius: 5,
      overflow: 'auto',
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        width: '8px',
        marginLeft: '12px'
      },
      '&::-webkit-scrollbar-track': {
        WebkitBorderRadius: '10px',
        borderRadius: '10px'
      },
      '&::-webkit-scrollbar-thumb': {
        WebkitBorderRadius: '10px',
        borderRadius: '10px',
        background: 'rgba(170,170,170,0.5)'
      }
    }
  })
)
