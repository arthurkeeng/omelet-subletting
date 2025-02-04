import { getCurrentUser } from '../actions/getCurrentUser'
import getFavorites from '@/app/actions/getFavorites'
import EmptyState from '../components/EmptyState'
import Trips from './Trips';

const page = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return <EmptyState
        title='Unauthorized'
        subtitle='Please Login'
        />
    }

    const favorites = await getFavorites({
        userId : currentUser._id
    })


    if(favorites.length === 0){
        return <EmptyState
        title='No Favorites Found'
        subtitle='Looks like you havent Liked any property'
        />
    }
  return (
    <Trips
    reservations = {favorites}
    currentUser = {currentUser}
    >

    </Trips>
  )
}

export default page
