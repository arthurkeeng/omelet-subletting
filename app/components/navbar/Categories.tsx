'use client'
import { TbBeach, TbHomeRibbon, TbMountain, TbPool } from "react-icons/tb"
import Container from "../Container"
import { GiBoatFishing, GiCastle, GiFarmer, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi"
import { MdLandscape, MdOutlineVilla } from "react-icons/md"
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"
import { FaHouseCrack } from "react-icons/fa6"
import { SiHiltonhotelsandresorts } from "react-icons/si"
import { Suspense } from "react"

export const categories =[
    {
        label : "Beach", 
        icon : TbBeach , 
        description : "This property is close to the beach"
    },
    {
        label : "Windmills", 
        icon : GiWindmill , 
        description : "This property has got windmills"
    },
    {
        label : "Modern", 
        icon : MdOutlineVilla , 
        description : "Has all the features of civil"
    },{
      label : "CountrySide", 
      icon : TbMountain , 
      description : "This property is close to the beach"
  },
  {
      label : "Pools", 
      icon : TbPool , 
      description : "This property has got windmills"
  },
  {
      label : "Islands", 
      icon : GiIsland , 
      description : "Has all the features of civil"
  },
  {
      label : "Lake", 
      icon : GiBoatFishing , 
      description : "Has all the features of civil"
  },
  {
      label : "Land", 
      icon : MdLandscape , 
      description : "Has all the features of civil"
  },
  {
      label : "Sublet", 
      icon : FaHouseCrack , 
      description : "Has all the features of civil"
  },
  {
      label : "Casle", 
      icon : GiCastle , 
      description : "Has all the features of civil"
  },
  {
      label : "Camping", 
      icon : GiForestCamp , 
      description : "Has all the features of civil"
  },
  {
      label : "Rental", 
      icon : TbHomeRibbon , 
      description : "Has all the features of civil"
  },
  {
      label : "Resort", 
      icon : SiHiltonhotelsandresorts , 
      description : "Has all the features of civil"
  },
  {
      label : "Farm", 
      icon : GiFarmer , 
      description : "This property is a farm"
  },
  

]
const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()

  const isMainPage = pathname === '/'
  if(!isMainPage)return null
  return (
    <Suspense fallback={<div>Loading...</div>}>


    <Container>

    <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">

      {categories.map(item=> (
        <CategoryBox
        key={item.label}
        label={item.label}
        selected ={category === item.label}
        icon={item.icon}
        />
      ))}
    </div>

    </Container>
    </Suspense>
  )
}

export default Categories
