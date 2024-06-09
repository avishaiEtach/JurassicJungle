import { useJsApiLoader } from "@react-google-maps/api";

export const useGoogleMap = () => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 32.0853,
    lng: 34.7818,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
    // googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAP_API}`,
    language: "en",
  });

  const mapStyle = [
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
        {
          saturation: -100,
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
        {
          saturation: -100,
        },
        {
          lightness: 40,
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
        {
          saturation: -10,
        },
        {
          lightness: 30,
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
        {
          saturation: -60,
        },
        {
          lightness: 10,
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
        {
          saturation: -60,
        },
        {
          lightness: 60,
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
        {
          saturation: -100,
        },
        {
          lightness: 60,
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
        {
          saturation: -100,
        },
        {
          lightness: 60,
        },
      ],
    },
  ];

  return { containerStyle, center, isLoaded, mapStyle };
};
