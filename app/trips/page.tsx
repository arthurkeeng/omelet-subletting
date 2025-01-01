import { getCurrentUser } from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
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

    const reservations = await getReservations({
        users : currentUser._id
    })

    if(reservations.length === 0){
        return <EmptyState
        title='No Trips Found'
        subtitle='Looks like you havent reserved any trips'
        />
    }
  return (
    <Trips
    reservations = {reservations}
    currentUser = {currentUser}
    >

    </Trips>
  )
}

export default page
