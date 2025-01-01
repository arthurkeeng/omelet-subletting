'use client'

import Container from "../Container"
import Search from "../Search"
import UserMenu from "../UserMenu"
import Categories from "./Categories"
import Logo from "./Logo"


const Navbar = () => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center
          justify-between gap-3 md:gap-0
          ">
            <div className="flex align-middle">

            <Logo/>
            <p className="font-bold text-xl ml-2">Ome - Let </p>
            </div>
            <Search/>
            <UserMenu/>
          </div>
        </Container>
      </div>
      <Categories/>
    </div>
  )
}

export default Navbar
