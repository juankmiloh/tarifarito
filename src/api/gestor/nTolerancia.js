/* jshint esversion: 6 */
/* eslint-disable */
import request from '../../utils/request';

export function getNToleranciaList() {
    return request({
        url: 'n_tolerancia',
        method: 'get'
    });
}

export function getNTolerancia(query) {
    return request({
        url: `n_tolerancia/${query}`,
        method: 'get'
    });
}

export function postNTolerancia(model) {
    return request({
        url: `n_tolerancia`,
        method: 'post',
        params: { 'params': model }
    });
}

export function putNTolerancia(anio, mes, model) {
    return request({
        url: `n_tolerancia/${anio}`,
        method: 'put',
        params: { 'params': model, 'mes': mes }
    });
}

export function deleteNTolerancia(query) {
    return request({
        url: `n_tolerancia/${query}`,
        method: 'delete'
    });
}