/* jshint esversion: 6 */
/* eslint-disable */
import request from '../../../utils/request';

export function getD097ErrorList() {
    return request({
        url: 'g_error',
        method: 'get'
    });
}

export function getD097Error(query) {
    return request({
        url: `g_error/${query}`,
        method: 'get'
    });
}

export function postD097Error(model) {
    return request({
        url: `g_error`,
        method: 'post',
        params: { 'params': model }
    });
}

export function putD097Error(anio, empresa, model) {
    return request({
        url: `g_error/${anio}`,
        method: 'put',
        params: { 'params': model, 'empresa': empresa }
    });
}

export function deleteD097Error(query) {
    return request({
        url: `g_error/${query}`,
        method: 'delete'
    });
}