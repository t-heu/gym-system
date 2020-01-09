import React from 'react'
import { useSelector } from 'react-redux';
import createRouter from './routes';
import noti from '../Noti'

export default function Routes() {
  const signedIn = useSelector(state => state.auth.signed);
  const Routes = createRouter(signedIn);
  noti()

  return <Routes />
}