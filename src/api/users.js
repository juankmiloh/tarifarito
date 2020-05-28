/* jshint esversion: 6 */
import request from '../utils/request'

export function fetchList(query) {
  return request({
    url: `users/${query}`,
    method: 'get',
    params: query
  })
}
