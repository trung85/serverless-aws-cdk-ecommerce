import React, { useContext, useRef, useState } from 'react'
import { navigate } from 'gatsby'
import { AppContext } from '@serverless-aws-cdk-ecommerce/react-components'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

export default function Confirm() {
  const classes = useStyles()
  const { Auth } = useContext(AppContext)
  const [message, setMessage] = useState('')
  const emailRef = useRef('')
  const codeRef = useRef('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await Auth.confirmSignUp(emailRef.current.value, codeRef.current.value)
      navigate('/signin')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Benutzerregistrierung bestätigen
        </Typography>

        <Grid item xs={12} className={classes.subtitle}>
          <Typography variant="body2" gutterBottom>
            Bitte geben Sie den Registrierungscode aus Ihrer E-Mail ein.
          </Typography>
        </Grid>

        <form className={classes.form} noValidate onSubmit={e => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="EMail Adresse"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="confirm"
                label="Code"
                name="confirm"
                autoComplete="confirm"
                inputRef={codeRef}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Bestätigen
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {message && <p style={{ color: 'red' }}>{message}</p>}
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  subtitle: {
    marginTop: theme.spacing(2),
  },
}))
