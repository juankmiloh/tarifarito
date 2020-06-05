/* jshint esversion: 6 */
/* eslint-disable */
import request from '../../../utils/request';

export function getIComercialList() {
    return request({
        url: 'i_comercial',
        method: 'get'
    });
}

export function getIComercial(query) {
    return request({
        url: `i_comercial/${query}`,
        method: 'get'
    });
}

export function postIComercial(model) {
    return request({
        url: `i_comercial`,
        method: 'post',
        params: { 'params': model }
    });
}

export function putIComercial(anio, empresa, model) {
    return request({
        url: `i_comercial/${anio}`,
        method: 'put',
        params: { 'params': model, 'empresa': empresa }
    });
}

export function deleteIComercial(query) {
    return request({
        url: `i_comercial/${query}`,
        method: 'delete'
    });
}