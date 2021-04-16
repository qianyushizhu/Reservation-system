import HTTPREQUEST from "./http"

export const applicantWXLogin_servers = (params) => {
  return HTTPREQUEST.post('jobs/pageInfo', params)
}


export const getServiceType_servers=(params)=>{
  return HTTPREQUEST.get('/serviceType/select',params)
}
export const getServiceDept_servers=(params)=>{
  return HTTPREQUEST.get('/dept/select',params)
}
export const getclassify_servers=(params)=>{
  return HTTPREQUEST.post('/typeChild/mobile/all',params)
}