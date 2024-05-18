const axios = require("axios");
const getToken = require("./getToken");

const fetchGames = async () => {
  try {
    const accessToken = await getToken();
    const response = await axios.post("https://api.igdb.com/v4/games", null, {
      headers: {
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
      data: `fields name, involved_companies; search "Mario"; where version_parent = null; limit 10;`,
    });

    console.log("Games:", response.data);
  } catch (error) {
    console.error("Error fetching games:", error.response.data);
  }
};

fetchGames();
