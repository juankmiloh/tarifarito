/* jshint esversion: 6 */
/* eslint-disable */
import request from '../../utils/request';

export function getIDaneList() {
    return request({
        url: 'i_dane',
        method: 'get'
    });
}

export function getIDane(query) {
    return request({
        url: `i_dane/${query}`,
        method: 'get'
    });
}

export function postIDane(model) {
    return request({
        url: `i_dane`,
        method: 'post',
        params: { 'params': model }
    });
}

export function putIDane(anio, mes, model) {
    return request({
        url: `i_dane/${anio}`,
        method: 'put',
        params: { 'params': model, 'mes': mes }
    });
}

export function deleteIDane(query) {
    return request({
        url: `i_dane/${query}`,
        method: 'delete'
    });
}