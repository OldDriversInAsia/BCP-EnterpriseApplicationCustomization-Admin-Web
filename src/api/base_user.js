import request from '@/utils/request'

export function getList(pageNum, pageSize) {
  return request({
    url: '/user/list',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}
