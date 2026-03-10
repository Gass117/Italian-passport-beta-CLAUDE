import { PlacesData } from '../types';
import { PLACES_NORTH } from './places_north';
import { PLACES_CENTER } from './places_center';
import { PLACES_SOUTH } from './places_south';
import { PLACES_ISLANDS } from './places_islands';

export const PLACES_DATA: PlacesData = {
    "regions": [
        {
            "id": "piemonte",
            "name": "Piemonte",
            "displayName": "Piemonte",
            "capitalCity": "Torino",
            "shapeAssetName": "piemonte_shape",
            "centerLatitude": 45.0703,
            "centerLongitude": 7.6869,
            "themeColorHex": "#E85D04" // Deep Orange
        },
        {
            "id": "valle_aosta",
            "name": "Valle d'Aosta",
            "displayName": "Valle d'Aosta",
            "capitalCity": "Aosta",
            "shapeAssetName": "valle_aosta_shape",
            "centerLatitude": 45.7373,
            "centerLongitude": 7.3201,
            "themeColorHex": "#F4A261" // Sandy Orange
        },
        {
            "id": "lombardia",
            "name": "Lombardia",
            "displayName": "Lombardia",
            "capitalCity": "Milano",
            "shapeAssetName": "lombardia_shape",
            "centerLatitude": 45.4642,
            "centerLongitude": 9.1900,
            "themeColorHex": "#2A9D8F" // Persian Green
        },
        {
            "id": "trentino",
            "name": "Trentino-Alto Adige",
            "displayName": "Trentino-Alto Adige",
            "capitalCity": "Trento",
            "shapeAssetName": "trentino_shape",
            "centerLatitude": 46.0719,
            "centerLongitude": 11.1150,
            "themeColorHex": "#8AB17D" // Muted Green
        },
        {
            "id": "veneto",
            "name": "Veneto",
            "displayName": "Veneto",
            "capitalCity": "Venezia",
            "shapeAssetName": "veneto_shape",
            "centerLatitude": 45.4408,
            "centerLongitude": 12.3155,
            "themeColorHex": "#E9C46A" // Sandy Yellow
        },
        {
            "id": "friuli",
            "name": "Friuli-Venezia Giulia",
            "displayName": "Friuli-Venezia Giulia",
            "capitalCity": "Trieste",
            "shapeAssetName": "friuli_shape",
            "centerLatitude": 45.6495,
            "centerLongitude": 13.7768,
            "themeColorHex": "#FFB703" // Bright Yellow
        },
        {
            "id": "liguria",
            "name": "Liguria",
            "displayName": "Liguria",
            "capitalCity": "Genova",
            "shapeAssetName": "liguria_shape",
            "centerLatitude": 44.4056,
            "centerLongitude": 8.9463,
            "themeColorHex": "#F4E409" // Lemon Yellow
        },
        {
            "id": "emilia",
            "name": "Emilia-Romagna",
            "displayName": "Emilia-Romagna",
            "capitalCity": "Bologna",
            "shapeAssetName": "emilia_shape",
            "centerLatitude": 44.4949,
            "centerLongitude": 11.3426,
            "themeColorHex": "#9D4EDD" // Purple
        },
        {
            "id": "toscana",
            "name": "Toscana",
            "displayName": "Toscana",
            "capitalCity": "Firenze",
            "shapeAssetName": "toscana_shape",
            "centerLatitude": 43.7711,
            "centerLongitude": 11.2486,
            "themeColorHex": "#0096C7" // Light Blue
        },
        {
            "id": "umbria",
            "name": "Umbria",
            "displayName": "Umbria",
            "capitalCity": "Perugia",
            "shapeAssetName": "umbria_shape",
            "centerLatitude": 43.1107,
            "centerLongitude": 12.3908,
            "themeColorHex": "#F9844A" // Orange
        },
        {
            "id": "marche",
            "name": "Marche",
            "displayName": "Marche",
            "capitalCity": "Ancona",
            "shapeAssetName": "marche_shape",
            "centerLatitude": 43.6158,
            "centerLongitude": 13.5189,
            "themeColorHex": "#90BE6D" // Pistachio Green
        },
        {
            "id": "lazio",
            "name": "Lazio",
            "displayName": "Lazio",
            "capitalCity": "Roma",
            "shapeAssetName": "lazio_shape",
            "centerLatitude": 41.9028,
            "centerLongitude": 12.4964,
            "themeColorHex": "#0077B6" // Star Command Blue
        },
        {
            "id": "abruzzo",
            "name": "Abruzzo",
            "displayName": "Abruzzo",
            "capitalCity": "L'Aquila",
            "shapeAssetName": "abruzzo_shape",
            "centerLatitude": 42.3498,
            "centerLongitude": 13.3995,
            "themeColorHex": "#CDDAFD" // Powder Blue
        },
        {
            "id": "molise",
            "name": "Molise",
            "displayName": "Molise",
            "capitalCity": "Campobasso",
            "shapeAssetName": "molise_shape",
            "centerLatitude": 41.5603,
            "centerLongitude": 14.6627,
            "themeColorHex": "#FF006E" // Pink
        },
        {
            "id": "campania",
            "name": "Campania",
            "displayName": "Campania",
            "capitalCity": "Napoli",
            "shapeAssetName": "campania_shape",
            "centerLatitude": 40.8518,
            "centerLongitude": 14.2681,
            "themeColorHex": "#FB5607" // Red-Orange
        },
        {
            "id": "puglia",
            "name": "Puglia",
            "displayName": "Puglia",
            "capitalCity": "Bari",
            "shapeAssetName": "puglia_shape",
            "centerLatitude": 41.1171,
            "centerLongitude": 16.8719,
            "themeColorHex": "#FFBE0B" // Amber
        },
        {
            "id": "basilicata",
            "name": "Basilicata",
            "displayName": "Basilicata",
            "capitalCity": "Potenza",
            "shapeAssetName": "basilicata_shape",
            "centerLatitude": 40.6404,
            "centerLongitude": 15.8056,
            "themeColorHex": "#8338EC" // Violet
        },
        {
            "id": "calabria",
            "name": "Calabria",
            "displayName": "Calabria",
            "capitalCity": "Catanzaro",
            "shapeAssetName": "calabria_shape",
            "centerLatitude": 38.9098,
            "centerLongitude": 16.5877,
            "themeColorHex": "#3A86FF" // Blue
        },
        {
            "id": "sicilia",
            "name": "Sicilia",
            "displayName": "Sicilia",
            "capitalCity": "Palermo",
            "shapeAssetName": "sicilia_shape",
            "centerLatitude": 38.1157,
            "centerLongitude": 13.3615,
            "themeColorHex": "#FB8500" // Orange-Yellow
        },
        {
            "id": "sardegna",
            "name": "Sardegna",
            "displayName": "Sardegna",
            "capitalCity": "Cagliari",
            "shapeAssetName": "sardegna_shape",
            "centerLatitude": 39.2238,
            "centerLongitude": 9.1217,
            "themeColorHex": "#70D6FF" // Sky Blue
        }
    ],
    "places": [
        ...PLACES_NORTH,
        ...PLACES_CENTER,
        ...PLACES_SOUTH,
        ...PLACES_ISLANDS
    ]
};
