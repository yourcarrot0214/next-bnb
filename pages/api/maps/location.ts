import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      res.statusCode = 400;
      return res.send("위치 정보가 없습니다.");
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
      const { data } = await axios.get(url);
      const addressComponent = data.results[0].address_components;
      const { lat, lng } = data.results[0].geometry.location;
      const result = {
        latitude: lat,
        longitude: lng,
        country: addressComponent[5].long_name,
        city: addressComponent[3].long_name,
        district: addressComponent[2].long_name,
        streetAddress: `${addressComponent[1].long_name} ${addressComponent[0].long_name}`,
        postcode: addressComponent[6].long_name,
      };
      res.statusCode = 200;
      res.send(result);
    } catch (error) {
      console.log(error);
      res.statusCode = 404;
      return res.end();
    }
  }
  res.statusCode = 405;

  return res.end();
};

/* 
	? Example of reverse geocoding : https://developers.google.com/maps/documentation/geocoding/overview#reverse-example

	example => https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
	위도와 경도값 사이에 공백이 없도록 주의
*/
