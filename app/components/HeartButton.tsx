'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorites";


interface HeartButtonProps{
    listingId :string ;
    currentUser :any | null
}
const HeartButton:React.FC<HeartButtonProps> = (
    {
        listingId , currentUser
    }
) => {
    const {isFavorited , toggleFavorite} = useFavorite(
      {listingId , currentUser}
    )
     return (
    <div
    onClick={toggleFavorite}
    className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart 
      size={28}
      className="fill-white absolute -top-[2px] -right-[2px] 
      "
      />
      <AiFillHeart
      size={24}
      className={`${
        isFavorited ? "fill-rose-500 ":'fill-neutral-500/70'
      }`}
      />
    </div>
  )
}

export default HeartButton
