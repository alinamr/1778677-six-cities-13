import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { useMap } from '../../hooks/use-map';
import { CityOffer, FullOffer, OffersList } from '../../types/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: CityOffer | undefined ;
  offers: OffersList[] | FullOffer[];
  selectedOffer: OffersList | FullOffer | undefined;
  block: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({block, city, offers, selectedOffer }: MapProps) {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return (
    <section
      className={`${block}__map map`}
      ref={mapRef}
      style={{
        height: '100%',
        minHeight: '500px',
        width: '100%',
        maxWidth: '1144px',
        margin: '0 auto',
      }}
    />
  );

}

export { Map };