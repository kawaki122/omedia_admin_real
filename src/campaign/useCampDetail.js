import moment from "moment";
import { useEffect, useState } from "react";
import { addReview, getCampaignComplete } from "../services/campaignService";
import { locationEnum } from "../utils/constants";
import { urlHelper } from "../utils/UrlHelper";
import useLocationFilter from "./useLocationFilter";
import useReviewFilter from "./useReviewFilter";
// import { SET_CAMP_LOADING, SET_INITIAL_CAMP_DATA } from '../store/actions/campActions';
// import campReducer, { initialCampState } from '../store/reducers/campReducer';

const useCampDetail = (camp) => {
  // const [state, dispatch] = useReducer(campReducer, initialCampState)
  const [data, setData] = useState({
    campaign: {
      _id: "",
      title: "",
      brandTitle: "",
      img: "",
      client: "",
      from: null,
      to: null,
      duration: 0,
    },
    locations: [],
    reviews: [],
  });
  const [config, setConfig] = useState({
    locationType: locationEnum.PENDING,
    search: "",
    loading: true,
    activeTab: "1",
    locationIndex: -1,
  });

  const locations = useLocationFilter(
    config.search,
    data.locations,
    config.locationType
  );

  const locationReviews = useReviewFilter(
    data.locations[config.locationIndex],
    data.reviews
  );

  useEffect(() => {
    getCampaignComplete(camp.campaign)
      .then((result) => {
        const { campaign, locations, reviews } = result.data;

        setData((prev) => ({
          ...prev,
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
          reviews: reviews.map((item) => ({
            ...item,
            avatar: urlHelper.fileUrl(item.avatar),
            datetime: moment(result.data.createdAt).fromNow()
          })),
        }));
        setConfig((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        setConfig((prev) => ({ ...prev, loading: false }));
        console.log(error);
      });
  }, [camp]);

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
        setData((prev) => ({
          ...prev,
          reviews: [
            ...prev.reviews,
            { ...result.data, avatar: urlHelper.fileUrl(result.data.avatar), datetime: moment(result.data.createdAt).fromNow() },
          ],
        }));
        return;
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  const locationTypeChange = (type) => {
    setConfig((prev) => ({ ...prev, locationType: type }));
  };
  console.log(data.reviews);
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
    locationReviews,
  };
};

export default useCampDetail;
