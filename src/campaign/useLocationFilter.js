import { useMemo } from "react";


function useLocationFilter(search, locations, locType) {
    return useMemo(() => {
        const locsTemp = locations.filter(item =>
            (item.address.toUpperCase().includes(search.toUpperCase()) && item.status === locType)
        )
        if (locsTemp.length < 5) {
            const locsOrig = []
            for (let i = 0; i < 5; i++) {
                const element = locsTemp[i];
                locsOrig.push(element ? element : null);
            }
            return locsOrig;
        }
        return locsTemp;
    }, [search, locations, locType])
}

export default useLocationFilter;