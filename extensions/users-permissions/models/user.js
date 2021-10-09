const axios = require("axios");

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      const body = {
        keyName: `${data.username}-key`,
        permissions: {
          endpoints: {
            data: {
              userPinnedDataTotal: true,
              pinList: true,
            },
            pinning: {
              pinFileToIPFS: true,
              pinJSONToIPFS: true,
            },
          },
        },
      };

      try {
        let response = await axios.post(
          `https://api.pinata.cloud/users/generateApiKey`,
          body,
          {
            headers: {
              pinata_api_key: process.env.PINATA_API_KEY,
              pinata_secret_api_key: process.env.PINATA_API_SECRET,
            },
          }
        );

        data.pinata_api_key = response.data.pinata_api_key;
        data.pinata_secret_key = response.data.pinata_api_secret;
        data.pinata_jwt = response.data.JWT;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
