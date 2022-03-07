import { useMemo } from "react";

const useReviewFilter = (location, reviews) => {
    return useMemo(() => {
        if(location) {
            return reviews.filter(item => item.location === location._id)
        }
        return []
    }, [location, reviews])
}

export default useReviewFilter;