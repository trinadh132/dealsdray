import { useState } from "react";
import{useSelector} from 'react-redux'
import styles from './index.module.css'
import Nav from './nav'

function home(){
const name=useSelector(e=>e.objects.items[1])
   if(name!=null){
    return(<>
     <Nav />
     <div className={styles.homehead}>
        <h1>Welcome {name.username}</h1>
     </div>
    </>);
   }
   else{
    <div>Please Login to use this</div>
   }
}
export default home;