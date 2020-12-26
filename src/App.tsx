import React, {useEffect, useRef} from 'react'
import { Grid} from "@material-ui/core"
import {PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from "@speechly/react-ui"
import {  SpeechState, useSpeechContext} from "@speechly/react-client"

import Details from './components/Details/Details'
import useStyles from "./styles"
import Main from './components/Main/Main'

const App:React.FC = () => {
  const classes = useStyles()
  const  {speechState} = useSpeechContext()
  const main = useRef<null | HTMLDivElement>(null);

  const executeScroll = () => main?.current?.scrollIntoView();

  useEffect(() => {
    if(speechState === SpeechState.Recording) {
      executeScroll();
    }
    
  },[speechState])
  return (
    <div>
      <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{height:"100vh"}}>
          <Grid item xs={12} sm={3} className={classes.mobile}>
              <Details title="Income"/>
          </Grid>
          <Grid item xs={12} sm={5}  className={classes.main} ref={main}>
              <Main ></Main>
          </Grid>
          <Grid item xs={12} sm={3} className={classes.desktop}>
              <Details title="Income"/>
          </Grid>
          <Grid item xs={12} sm={3} className={classes.last}>
              <Details title="Expense"/>
          </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton/>
        <ErrorPanel/>
      </PushToTalkButtonContainer>
    </div>
  )
}

export default App
