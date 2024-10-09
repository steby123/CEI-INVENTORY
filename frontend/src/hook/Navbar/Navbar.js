import { useState, useEffect } from "react"

export const NavbarHook = () => {
    const [sticky, setSticky] = useState(false);
    const [menuIcon, setMenuIcon] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 50 ? setSticky(true) : setSticky(false);
        })
    },[])

    const HandleIcon = () => {
        menuIcon ? setMenuIcon(false) : setMenuIcon(true);
        console.log('click')
    }



    return{
        sticky,
        menuIcon,
        HandleIcon
    }
}