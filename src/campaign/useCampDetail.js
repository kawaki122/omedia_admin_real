import moment from "moment";
import { useEffect, useState } from "react";
import { addReview, getCampaignComplete } from "../services/campaignService";
import { locationEnum } from "../utils/constants";
import { urlHelper } from "../utils/UrlHelper";
import useLocationFilter from "./useLocationFilter";
import useReviewFilter from "./useReviewFilter";

const initialData = {
  campaign: {
    _id: "",
    title: "",
    status: '',
    brandTitle: "",
    img: "",
    client: "",
    from: null,
    to: null,
    duration: 0,
    cities: [],
  },
  locations: [],
  reviews: [],
};

const useCampDetail = (camp) => {
  const [backup, setBackup] = useState(initialData)
  const [data, setData] = useState(initialData);
  const [config, setConfig] = useState({
    locationType: locationEnum.PENDING,
    search: "",
    loading: true,
    activeTab: "1",
    locationIndex: -1,
    edit: false,
    deletables: [],
  });

  const locations = useLocationFilter(
    config.search,
    data.locations,
    config.locationType
  );

  useEffect(() => {
    getCampaignComplete(camp.campaign)
      .then((result) => {
        const { campaign, locations, reviews } = result.data;
        const obj = {
          campaign: {
            _id: campaign._id,
            title: campaign.title,
            status: campaign.status,
            brandTitle: campaign.brand.title,
            img: campaign.brand.img,
            client: campaign.brand.client?.name,
            from: moment(campaign.from).format("MMMM Do YYYY"),
            to: moment(campaign.to).format("MMMM Do YYYY"),
            duration: moment
              .duration(moment(campaign.to).diff(moment(campaign.from)))
              .asDays(),
            cities: campaign.cities.map((city) => city.title).join(", "),
          },
          locations: locations.map((location) =>
            Object.keys(location).reduce((result, name) => {
              const value = location[name];
              result[name] = value ? value : "Not Added";
              return result;
            }, {})
          ),
          reviews,
        };

        setData(obj);
        setBackup(JSON.parse(JSON.stringify(obj)));
        setConfig((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        setConfig((prev) => ({ ...prev, loading: false }));
        console.log(error);
      });
  }, [camp]);

  const changeReviews = (info) => {
    if(info.value==='undo') info.value = backup.reviews.find(item=>item._id===info._id)?.content

    setConfig(prev => {
      let newDeletables = [...prev.deletables];
      if(info.value) {
        newDeletables = newDeletables.filter(item => item !== info._id)
      } else {
        newDeletables.push(info._id)
      }
      return{...prev, deletables: newDeletables}
    })
    setData(prev => {
      const index = prev.reviews.findIndex(item => item._id === info._id);
      const newRevs = [...prev.reviews];
      newRevs[index].content = info.value;
      return { ...prev, reviews: newRevs }
    })
  }

  const locationReviews = useReviewFilter(
    data.locations[config.locationIndex],
    data.reviews,
    backup.reviews,
    {config, changeReviews},
  );

  const toggleEdit = (edit) => {
    setConfig(prev => ({...prev, edit }))
  }

  const submitReview = (review) => {
    const loc = data.locations[config.locationIndex];
    return addReview({
      author: "Omedia",
      avatar: "omedia.png",
      content: review,
      campaign: data.campaign._id,
      location: loc?._id,
    })
      .then((result) => {
        const { avatar, createdAt } = result.data;
        setData((prev) => ({
          ...prev,
          reviews: [
            ...prev.reviews,
            {
              ...result.data,
              avatar: urlHelper.fileUrl(avatar),
              datetime: moment(createdAt).fromNow(),
            },
          ],
        }));
        return;
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  const updateLocation = (locationId) => {

  }

  const onPhotoChange = ({ fileList }) => {
    console.log(fileList);
    setData(async prev => {
      debugger
      const locationsNew = [...prev.locations];
      locationsNew[config.locationIndex].photos = await fileList.map(async file => {
        if(typeof file === 'string') {
          return urlHelper.fileUrl(file);
        }
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      })
      return {...prev, locations: locationsNew}
    })
  };

  const locationTypeChange = (type) => {
    setConfig((prev) => ({ ...prev, locationType: type }));
  };
  
  const onLocationCreated = (location) => {
    setData((prev) => ({ ...prev, locations: [...prev.locations, location] }));
  };

  const handleSearch = (value) => {
    setConfig((prev) => ({ ...prev, search: value }));
  };

  const setActiveTab = (tab) => {
    setConfig((prev) => ({ ...prev, activeTab: tab }));
  };

  const viewLocation = (location) => {
    setConfig((prev) => ({ ...prev, locationIndex: location }));
  };

  return {
    campaign: data.campaign,
    locations,
    ...config,
    handleSearch,
    locationTypeChange,
    onLocationCreated,
    setActiveTab,
    viewLocation,
    submitReview,
    toggleEdit,
    updateLocation,
    onPhotoChange,
    locationReviews,
  };
};

export default useCampDetail;
