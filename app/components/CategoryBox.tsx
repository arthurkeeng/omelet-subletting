'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'
interface CategoryBoxProps {
    icon : IconType , 
    label : string , 
    // description : string, 
    selected ?: boolean
}
const CategoryBox: React.FC<CategoryBoxProps> = ({
    label , icon : Icon , selected
}:CategoryBoxProps) => {
    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(() => {
      let currentQuery = {};
    
      // Parse existing query params if they exist
      if (params) {
        currentQuery = qs.parse(params.toString());
      }
    
      // Add or update the `category` parameter
      const updatedQuery :{category ?: string}= {
        ...currentQuery,
        category: label,
      };
    
      // Remove the `category` if it's the same as the current one
      if (params?.get("category") === label) {
        delete updatedQuery.category;
      }
    
      // Build the updated URL
      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true } // Skip null or undefined values in the query
      );
    
      // Navigate to the updated URL
      router.push(url);
    }, [label, params, router]);
    
  return (
    <div className={`flex flex-col items-center justify-center
        gap-2 p-3 border-b-2 hover:text-neutral-600 transition cursor-pointer
        ${selected ? "border-b-neutral-500" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
    `}
    onClick={handleClick}>
      <Icon size={26}/>
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  )
}

export default CategoryBox
