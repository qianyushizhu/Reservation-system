const getBaseUrl = (url) => {
  let BASE_URL = '';
  // if (process.env.NODE_ENV === 'development') {
  //   BASE_URL = 'http://183.156.154.217:8081/cloud_job/'

  // } else {
    
  //   BASE_URL = 'http://183.156.154.217:8081/cloud_job/'
  // }
  BASE_URL = 'http://8.140.181.9:8816/reservation'
  return BASE_URL
}

export default getBaseUrl;
