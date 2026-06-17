 export const getCities = async (search?) => {
    if (!search) return [];
    const { data } = await axios.get(
      "https://petlove-backend-jniu.onrender.com/api/cities/locations",
      {
        params: {
          search: search,
        },
      },
    );
    console.log(data);
    const cityData = data.map((city) => ({
        value: city.city,
        label: city.city,
    }));
    console.log(cityData);
   return data.map((city) => ({
        value: city.city,
        label: city[0].toUpperCase() + city.slice(1),
    }));
  };

  export const cityOptions = await getCities();