"use client";

import useCountries from "@/app/hooks/useCountries";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
 
 const Map =dynamic(() => import("@/app/components/Map"), {
        ssr: false,
    })
interface ListingInfoProps {
  user: any;
  category: any;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: any;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div className="">Hosted by {user?.name}</div>
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>
            No of Guests :
            <span className="font-semibold text-xl">{guestCount}</span>
          </div>
          <div>
            No of Rooms :{" "}
            <span className="font-semibold text-xl">{roomCount}</span>
          </div>
          <div>
            No of Bathrooms :
            <span className="font-semibold text-xl">{bathroomCount}</span>
          </div>
        </div>
      </div>
      <hr/>

      {category && (
        <ListingCategory
        label = {category.label}
        icon = {category.icon}
        description = {category.description}
        />
      )}
      <hr/>
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr/>
      <Map center={coordinates}/>
    </div>
  );
};

export default ListingInfo;
