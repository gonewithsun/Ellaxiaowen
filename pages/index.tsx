import React,{ createContext } from "react";
import Pools from '../components/pools-list';

import moxbStore from "./moxbstore"
const newStore = new moxbStore()

export default function Index() {
  
  return (
  <>
  <p>we can add a new one when we click add button. </p>
  <p>we can remove one when we click remove button</p>
  <p> we can update one when we click update button </p>
  <p> we creat a new pool when we click creat New pool</p>
    <Pools moxbStore={newStore}/>
  </>
  );
}
