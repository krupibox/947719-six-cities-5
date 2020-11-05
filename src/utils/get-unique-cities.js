import MAX_CITIES from "../consts/max-cities";

export const getUniqueCities = (offers) => [...new Set(offers.map((offer) => offer.city.name))].slice(0, MAX_CITIES);
