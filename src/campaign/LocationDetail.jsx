import React from 'react';
import { Modal } from 'antd';
import GoogleMapReact from 'google-map-react';

function LocationDetail({location, visible, viewLocation}) {
    if(!visible) {
        return null;
    }
    return (
        <Modal
        title={location.title}
        visible={visible}
        onOk={() => viewLocation(-1)}
        onCancel={() => viewLocation(-1)}
        width={800}
      >
          <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
            defaultZoom={10}
            defaultCenter={{
                lat: 59.95,
                lng: 30.33
              }}
              bootstrapURLKeys={{ key: 'AIzaSyDdP6gxdank5_KATwvx4eSrnzF9zP8F63g' }}
            // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
          >
            
          </GoogleMapReact>
          </div>
      </Modal>
    )
}

export default LocationDetail;