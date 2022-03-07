import React from "react";
import { useHistory } from "react-router-dom";
import CampaignHeader from "./CampaignHeader";
import Competition from "./Competition";
import LocationDetail from "./LocationDetail";
import Locations from "./Locations";
import useCampDetail from "./useCampDetail";

function CampaignDetail() {
  const history = useHistory();
  const state = useCampDetail(history.location.state);

  return (
    <div style={{ height: "100%", position: "relative" }}>
      <CampaignHeader
        activeTab={state.activeTab}
        setActiveTab={state.setActiveTab}
        campaign={state.campaign}
      />

      {state.activeTab === "1" && (
        <Locations
          locationType={state.locationType}
          inputChange={state.handleSearch}
          onTypeChange={state.locationTypeChange}
          onCreate={state.onLocationCreated}
          locations={state.locations}
          viewLocation={state.viewLocation}
        />
      )}
      {state.activeTab === "2" && <Competition />}
      {state.activeTab === "3" && <Competition />}
      <LocationDetail
        location={state.locations[state.locationIndex]}
        reviews={state.locationReviews}
        visible={state.locationIndex > -1}
        viewLocation={state.viewLocation}
        submitReview={state.submitReview}
      />
    </div>
  );
}

export default CampaignDetail;
