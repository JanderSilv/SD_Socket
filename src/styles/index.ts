import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

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
      justifyContent: 'space-between',

      '& > fieldset': {
        marginBottom: theme.spacing(4)
      },
      '& > button': {
        marginTop: theme.spacing(4)
      }
    },

    initialsContainer: {
      height: '100%',
      minHeight: '35vh',
      maxHeight: '38vh',
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

export default useStyles
