import { useState } from "react";
import{useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import styles from './index.module.css'

function Nav(){
const name=useSelector(e=>e.objects.items[1])
let navigate = useNavigate();
let dispatch = useDispatch();

const handlelogout =()=>{
     dispatch({type:"remove objects",payload:1})
     navigate('/')
}

   if(name!=null){
    return(<><div className={styles.nav}>
        <div className={styles.leftlink}>
            <Link to='/home' className={styles.link}>Home</Link>
           <Link to='/dashboard' className={styles.link} >Dashboard</Link>
        </div>
        <div className={styles.rightlink}>
         <h3 className={styles.name}>{name.username}</h3>
         <p className={styles.logout} onClick={handlelogout}>logout</p>
        </div>
        </div></>);
   }
   else{
    <div>Please Login to use this</div>
   }
}
export default Nav;