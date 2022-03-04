import { useEffect, useState } from 'react';
import { getCampaignComplete } from '../services/campaignService';
import { locationEnum } from '../utils/constants';
import useLocationFilter from './useLocationFilter';
// import { SET_CAMP_LOADING, SET_INITIAL_CAMP_DATA } from '../store/actions/campActions';
// import campReducer, { initialCampState } from '../store/reducers/campReducer';

const useCampDetail = (camp) => {
    // const [state, dispatch] = useReducer(campReducer, initialCampState)
    const [data, setData] = useState({
        campaign: null,
        locations: [],
    })
    const [config, setConfig] = useState({
        locationType: locationEnum.PENDING,
        search: '',
        loading: true,
    })

    const locations = useLocationFilter(config.search, data.locations, config.locationType);

    useEffect(() => {
        getCampaignComplete(camp.campaign).then((result) => {
            console.log(result)
            const { campaign, locations } = result.data;
            setData(prev => ({ ...prev, campaign, locations }))
            setConfig(prev => ({ ...prev, loading: false }))
        }).catch((error) => {
            setConfig(prev => ({ ...prev, loading: false }))
            console.log(error)
        })
    }, [camp])

    const locationTypeChange = (type) => {
        setConfig(prev => ({ ...prev, locationType: type }))
    }

    const onLocationCreated = (location) => {
        setData(prev => ({ ...prev, locations: [...prev.locations, location] }))
    }

    const handleSearch = (event) => {
        const {value} = event.target
        setConfig(prev => ({...prev, search: value}))
    }

    return { campaign: data.campaign, locations, ...config, handleSearch, locationTypeChange, onLocationCreated }
}

export default useCampDetail;