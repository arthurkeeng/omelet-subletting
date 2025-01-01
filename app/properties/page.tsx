import { getCurrentUser } from '../actions/getCurrentUser'
import getProperties from '@/app/actions/getProperties'
import EmptyState from '../components/EmptyState'
import Properties from './Properties';

const page = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return <EmptyState
        title='Unauthorized'
        subtitle='Please Login'
        />
    }

    const favorites = await getProperties({
        userId : currentUser._id
    })


    if(favorites.length === 0){
        return <EmptyState
        title='No Property Found'
        subtitle='Looks like you havent Listed any property'
        />
    }
  return (
    <Properties
    reservations = {favorites}
    currentUser = {currentUser}
    >

    </Properties>
  )
}

export default page
