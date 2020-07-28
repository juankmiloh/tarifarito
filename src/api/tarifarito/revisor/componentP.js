/* jshint esversion: 6 */
/* eslint-disable */
import request from '../../../utils/request';

export function getCptePValues(data, cpte) {
    let url = '';
    if (cpte === 'p015') {
        url = 'r_componentP015';
    } else if (cpte === 'p097') {
        url = 'r_componentP097';
    }
    return request({
        url: `${url}/${data.ano}/${data.mes}/${data.id_empresa}/${data.id_mercado}`,
        method: 'get'
    });
}

export function postMDBCpteP(model, cpte) {
    let url = '';
    if (cpte === 'p015') {
        url = 'r_componentP015';
    } else if (cpte === 'p097') {
        url = 'r_componentP097';
    }
    return request({
        url: url,
        method: 'post',
        params: { 'params': model }
    });
}