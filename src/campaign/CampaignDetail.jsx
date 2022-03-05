import { Button, Card, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import CampaignHeader from "./CampaignHeader";
import LocationHeader from "./LocationHeader";
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

      {/* <div style={{ position: 'absolute', bottom: '10px', height: '350px', width: '100%', }}>
                <LocationHeader
                    locationType={state.locationType}
                    inputChange={state.handleSearch}
                    onTypeChange={state.locationTypeChange}
                    onCreate={state.onLocationCreated}
                />
                <Carousel slidesToShow={5}>
                    {state.locations.map((location, key) => <div key={key}>
                        {location && <Card hoverable style={{ margin: '15px 15px' }} cover={<img style={{ width: '100%', height: '200px' }} src='/logo192.png' />}>
                            <Meta title={location.title} description={location.address} />
                        </Card>}
                    </div>
                    )}
                </Carousel>
            </div> */}
    </div>
  );
}

export default CampaignDetail;
