const axios = require("axios");

/**
  @param string $url
  @param string $type
  @param array $data
  @param array $header
  @return mixed|string
  @throws Exception
*/
async function getCurlResponse(url, method = "get", data = null, headers = {}) {
  try {
    const config = {
      method: method,
      url: url,
      headers: headers,
      data: data
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

module.exports = { getCurlResponse };
