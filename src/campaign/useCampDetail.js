import moment from 'moment';
import { useEffect, useState } from 'react';
import { getCampaignComplete } from '../services/campaignService';
import { locationEnum } from '../utils/constants';
import useLocationFilter from './useLocationFilter';
// import { SET_CAMP_LOADING, SET_INITIAL_CAMP_DATA } from '../store/actions/campActions';
// import campReducer, { initialCampState } from '../store/reducers/campReducer';

const useCampDetail = (camp) => {
    // const [state, dispatch] = useReducer(campReducer, initialCampState)
    const [data, setData] = useState({
        campaign: {
            title: '',
            brandTitle: '',
            img: '',
        },
        locations: [],
    })
    const [config, setConfig] = useState({
        locationType: locationEnum.PENDING,
        search: '',
        loading: true,
        activeTab: "1",
    })

    const locations = useLocationFilter(config.search, data.locations, config.locationType);

    useEffect(() => {
        getCampaignComplete(camp.campaign).then((result) => {
            console.log(result)
            const { campaign, locations } = result.data;
            
            setData(prev => ({ ...prev, campaign: {
                title: campaign.title,
                status: campaign.status,
                brandTitle: campaign.brand.title,
                img: campaign.brand.img,
                client: campaign.brand.client?.name,
                from: moment(campaign.from).format('MMMM Do YYYY'),
                to: moment(campaign.to).format('MMMM Do YYYY'),
                duration: moment.duration(moment(campaign.to).diff(moment(campaign.from))).asDays()
            }, locations }))
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

    const setActiveTab = (tab) => {
        setConfig(prev => ({...prev, activeTab: tab}))
    }

    return { campaign: data.campaign, locations, ...config, handleSearch, locationTypeChange, onLocationCreated, setActiveTab }
}

export default useCampDetail;