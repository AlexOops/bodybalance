import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';

export const MapYandex = () => {
    const mapState = {center: [55.829804, 37.492662], zoom: 16.5};

    return (
        <>
                <Map
                    width="100%"
                    height="640px"
                    defaultState={mapState}
                    defaultOptions={{
                        vector: true,
                        layerVectorRevealThreshold: 0,
                        layerVectorCustomization: [
                            {
                                tags: {
                                    all: ["road"]
                                },
                                elements: "geometry",
                                stylers: {
                                    color: "fff"
                                }
                            },
                            {
                                tags: {
                                    all: ["road"]
                                },
                                elements: "label.text.fill",
                                stylers: {
                                    color: "888"
                                }
                            },
                            {
                                tags: {
                                    all: ["road"]
                                },
                                elements: "label.icon",
                                stylers: {
                                    visibility: "off"
                                }
                            },
                            {
                                tags: {
                                    all: ["water"]
                                },
                                stylers: {
                                    color: "d2dae0"
                                }
                            },
                            {
                                tags: {
                                    all: ["landscape"]
                                },
                                stylers: {
                                    // color: "f6f6f6"
                                    color: "FAF5FA"
                                }
                            },
                            {
                                tags: {
                                    all: ["structure"]
                                },
                                elements: "geometry",
                                stylers: {
                                    // color: "f0f0f0"
                                    // color: "FAF5FA"
                                    color: "ECE6EF"
                                }
                            },
                            {
                                tags: {
                                    all: ["admin"]
                                },
                                elements: "geometry",
                                stylers: {
                                    visibility: "off"
                                }
                            },
                            {
                                tags: {
                                    all: ["admin"]
                                },
                                elements: "label",
                                stylers: {
                                    zoom: [1, 15],
                                    visibility: "off"
                                }
                            },
                            {
                                tags: {
                                    all: ["poi"]
                                },
                                types: "point",
                                stylers: {
                                    visibility: "off"
                                }
                            },
                            {
                                tags: {
                                    all: ["poi"]
                                },
                                stylers: {
                                    // color: "f6f6f6"
                                    color: "FAF5FA"
                                }
                            },
                            {
                                tags: {
                                    all: ["park"]
                                },
                                stylers: {
                                    // color: "eef2ed"
                                    color: "ECE6EF"
                                }
                            },
                            {
                                tags: {
                                    all: ["transit"]
                                },
                                elements: "label.text.fill",
                                stylers: {
                                    color: "444"
                                }
                            },
                            {
                                tags: {
                                    all: ["transit"]
                                },
                                elements: "geometry",
                                stylers: {
                                    opacity: "0"
                                }
                            },
                            {
                                tags: {
                                    all: ["transit_stop"]
                                },
                                stylers: {
                                    visibility: "off"
                                }
                            },
                            {
                                tags: {
                                    all: ["is_unclassified_transit"]
                                },
                                elements: "label",
                                stylers: {
                                    visibility: "off"
                                }
                            },
                            {
                                tags: {
                                    all: ["transit", "transit_location"]
                                },
                                elements: "label",
                                stylers: {
                                    zoom: [1, 13],
                                    visibility: "off"
                                }
                            },
                            {
                                tags: {
                                    all: ["transit"],
                                    none: ["transit_location"]
                                },
                                elements: "label",
                                stylers: {
                                    visibility: "off"
                                }
                            },
                            {
                                tags: {
                                    any: ["road_construction", "path", "road_limited"]
                                },
                                stylers: {
                                    visibility: "off"
                                }
                            },
                            {
                                tags: {
                                    any: ["building", "entrance"]
                                },
                                elements: "label",
                                stylers: {
                                    visibility: "off"
                                }
                            },
                            {
                                tags: {
                                    any: ["road_5", "road_6", "road_7"]
                                },
                                elements: "label",
                                stylers: {
                                    zoom: [1, 14],
                                    visibility: "off"
                                }
                            },
                            {
                                tags: {
                                    any: ["road_6", "road_7"]
                                },
                                elements: "label",
                                stylers: {
                                    zoom: [14, 15],
                                    visibility: "off"
                                }
                            }
                        ]
                    }}
                    modules={["vectorEngine.preload"]}
                >
                    <Placemark
                        defaultGeometry={[55.830097, 37.492661]}

                        properties={{
                            balloonContentHeader: "BODYBALANCE",
                            balloonContentBody: "Москва, ул. Адмирала Макарова д.17 к.2"
                        }}

                        options={{
                            iconLayout: "default#image",
                            iconImageHref:
                                "https://i.ibb.co/qdkq7xp/logo.png",
                            iconImageSize: [110, 105],
                            hideIconOnBalloonOpen: true,
                        }}

                        modules={['geoObject.addon.balloon']}
                    />
                </Map>
        </>
    );
};
