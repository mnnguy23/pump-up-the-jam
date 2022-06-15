import { Web3Provider } from '@ethersproject/providers';
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { Connector } from "./Connector";

export default function HeaderAppBar() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React<Web3Provider>();

  const connect = async () => {
    try {
      await activate(Connector);
    } catch (ex) {
      console.log(ex);
    }
  } 
  
  const disconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (<>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Pump up the Jam
        </Typography>
        <Typography variant='h6' component={'div'} sx={{ flexGrow: 1 }}>
        {active ? <span>
            Connected with <b>{account}</b></span> : <span>Not Connected </span>}
          </Typography>
        <Button variant="contained" color="primary" onClick={connect}>Connect to MetaMask</Button>
          <Button variant="contained" color="primary" onClick={disconnect}>Disconnect</Button>
      </Toolbar>
    </AppBar>
  </>)
}