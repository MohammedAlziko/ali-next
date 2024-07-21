import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import "./header.css"
import { faBagShopping} from '@fortawesome/free-solid-svg-icons';
import NavLinks from './NavLinks';
import Link from 'next/link';

const Header = ({isSignedIn=false,isRegistered=false ,isAdmin=false}) => {
  return (
    
    <header id="headerElement" className="flex">
     
     <Link href="/" >
      <div className="logo">
               <FontAwesomeIcon width="1.5rem" style={{marginRight:".3rem"}}  icon={faBagShopping} />
        <span style={{ fontWeight: "bold" }}>AWU</span>
        <p style={{ letterSpacing: "0.5px" }}>Shopping</p>
      </div>
     </Link>
     
     
    



    <NavLinks  isSignedIn={isSignedIn} isRegistered={isRegistered} isAdmin={isAdmin} />
    </header>
  
  
  
  )
}

export default Header