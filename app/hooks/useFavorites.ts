import axios from "axios";
import { useRouter } from "next/navigation";
import useLogin from "./useLogin";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

interface IUseFavorites {
  listingId: string;
  currentUser: any | null;
}

const useFavorite = ( {listingId, currentUser} : IUseFavorites) => {
  const router = useRouter();
  const loginModal = useLogin();

  const isFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if(!currentUser){
        loginModal.onOpen()
      }

      try {
        let request;

        if(isFavorited){
            request = () =>  axios.delete(`/api/favorites/${listingId}`)
        }
        else{

            request = () =>  axios.post(`/api/favorites/${listingId}`)
        }

        await request()
        router.refresh()
        toast.success("Success")
    } catch (error) {
        toast.error("Something went wrong")
      }
    },
    [currentUser , isFavorited , listingId , loginModal , router]
  );

  return {
    isFavorited , toggleFavorite
  }
};

export default useFavorite