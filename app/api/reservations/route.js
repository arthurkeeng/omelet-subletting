import Reservation from "@/app/models/Reservation.Model";
import Listing from "@/app/models/Listing.Model";
import User from "@/app/models/User.Model";

import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request, { params }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.error();
    }
    let updatedListing;
    const reservation = await Reservation.create({
      startDate,
      endDate,
      totalPrice,
      listing: listingId,
      users: [currentUser._id],
    });

    if (reservation) {
      updatedListing = await Listing.findByIdAndUpdate(
        listingId,
        { $push: { reservations: reservation._id } }, // Add the reservation ID to the array
        { new: true }
      );

      await User.findByIdAndUpdate(
        currentUser._id,
        { $push: { reservations: reservation._id } }, // Add the reservation ID to the array
        { new: true }
      );
    }
    return NextResponse.json(updatedListing);
  } catch (error) {
    console.log(error)
  }
}
