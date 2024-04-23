import React from 'react'
import Navnolog from './Navnolog'
import NavbarJournalist from './NavbarJournalist'
import NavbarMediaAdmin from './NavbarMediaAdmin'
import NavbarAdmin from './NavbarAdmin'
import NavPublic from './NavbarPublic'

function Navbar({auth}) {
    if(auth==0){
        return <Navnolog/>
    }
    else if(auth==1){
        return <NavbarJournalist/>
    }
    else if(auth==2){
        return <NavbarMediaAdmin/>
    }
    else if(auth==3){
        return <NavPublic/>
    }
    else if(auth==4){
        return( <NavbarAdmin/>)
    }
}

export default Navbar