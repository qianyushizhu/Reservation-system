import HTTPREQUEST from "./http"

export const applicantWXLogin_servers = (params) => {
  return HTTPREQUEST.post('jobs/pageInfo', params)
}

export const getJobFairList_servers = (params) => {
  return HTTPREQUEST.get('h5/fair/jobFair/list', params)
}
export const getUserInfo_servers=(params)=>{
    return HTTPREQUEST.get('/sysUser/personal/center',params)
}
export const getprocedureStatus=(params)=>{
  return HTTPREQUEST.get('/procedureStatus/detail',params)
}