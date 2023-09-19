import TopBar from "./TopBar"
import NavDrawer from "./NavDrawer"
import { useState } from "react"

export default function NavHeader({options}: any) {
    const [showNav, setShowNav] = useState(false)
    return (
        <>
            <TopBar options={options} setShowNav={setShowNav}/>
            <NavDrawer options={options} showNav={showNav} setShowNav={setShowNav}/>
        </>
    )
}