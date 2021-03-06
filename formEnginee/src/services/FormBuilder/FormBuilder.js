import request from '../../utils/request';
import qs from 'qs';
// import { serverOpenApiIp } from '../../utils/config'

export async function save(params, act) {
    params.Platform = 'NPF';
    return request(`${config.serverOpenApiIp}/FormTemplate/` + act, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
        // headers: {
        //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        //     // 'Content-Type': 'application/json',
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        // }
    })
}

export async function CreateTableView(params) {
    return request(`/FormTemplate/CreateTableView?${qs.stringify(params)}`, {//formTemplateId=0514f22b-b779-eb25-694f-3d8a4ed83fc3&companyId=6EBBCF53-EC99-4380-B237-994D73E4F592`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        // body: JSON.stringify(params),
    })
}

export async function detail(params) {
    params.Platform = 'NPF';
    let { hideProgress, ...other } = params;
    return request(`${config.serverOpenApiIp}/FormTemplate/GetForModify`, {//formTemplateId=0514f22b-b779-eb25-694f-3d8a4ed83fc3&companyId=6EBBCF53-EC99-4380-B237-994D73E4F592`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(other),
        hideProgress
    })
}


export async function saveInst(params) {
    return request(`${config.serverOpenApiIp}/FormInstance/BatchSave`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify({ ...params, Platform: 'NPF' }),
        // headers: {
        //'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded'
        // }
    })
}

// export async function saveInst(params) {
//     return request('/FormInstance/Save', {
//         method: 'post',
//         mode: 'cors',
//         traditional: true,
//         body: JSON.stringify(params),
//         // headers: {
//         //'Content-Type': 'application/json'
//         //'Content-Type': 'application/x-www-form-urlencoded'
//         // }
//     })
// }

export async function loadInst(params) {
    return request(`/FormTemplate/GetFormTemplateInstance?${qs.stringify(params)}`, {
        method: 'get',
        mode: 'cors',
        traditional: true,
        // headers: {
        //'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded'
        // }
    })
}

export async function getAllFormTemplate(params) {//????????????
    return request(`/FormTemplate/GetAllFormTemplateWithField`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
    })
}
export async function getAllFormTemplatePaged(params) {//????????????
    return request(`/FormTemplate/GetFormTemplateWithFieldPaged`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
    })
}

export async function getAllFormLinkData(params) {//????????????
    return request(`/FormTemplate/GetFormTemplateWithFieldByIds`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
    })
}

export async function getAllThirdParty(params) { // ????????????????????????????????????
    return request(`/SourceTypeConfig/GetAll`, {
        method: 'post',
        mode: 'cors',
        ///traditional: true,
        body: JSON.stringify(params),
    })
}

export async function getAllWithValide(params) { // ????????????????????????????????????
    return request(`/SourceTypeConfig/GetAllWithValide`, {
        method: 'post',
        mode: 'cors',
        ///traditional: true,
        body: JSON.stringify(params),
    })
}

// ???????????????????????????
export async function getModifyDataSource(params) {
    return request('/SourceTypeConfig/GetForModify', {
        method: "post",
        body: JSON.stringify(params)
    });
}

//?????????????????????
export async function requestData(url, method, search, body, headers) {
    // let isForm = JSON.stringify(form) === "{}";
    // let isbody = JSON.stringify(body) === "{}";
    return request(`${url}?${qs.stringify(search || '{}')}`, {
        method,
        mode: 'cros',
        body: method.toLowerCase() === 'get' ? undefined : JSON.stringify(body || '{}'),
        headers,
        hideProgress: true
    });
}

export async function LinkFormDetail(params) {//?????????????????????---????????????
    return request(`/FormTemplate/GetFieldByTemplateId`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
    })
}

export async function GetListPaged(params) {//??????????????????
    return request(`/FormTemplateVersion/GetListPaged`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
    })
}

export async function TestInt(params) {
    return request(`/Report/TestInt`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
    })
}

//?????????????????? ?????????
export async function getPermission(params) {
    return request(`/Report/TestInt`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
    })
}

export async function FromulacalSystemDate(params) {
    return request(`/FormTemplate/FromulacalSystemDate`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
    })
}

export async function FormulaCal(params) {
    return request(`/FormTemplate/FormulaCal`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
    })
}

// ?????? ????????? ??????
export async function GetSerialNumSeed(params) {
    return request(`/SerialNumSeed/GetSerialNumSeed`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
    })
}

export async function getValues(params) {
    let { hideProgress, ...other } = params;
    return request(`/FormInstance/GetValues`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(other),
        hideProgress
    })
}

//???????????????API??????
export async function verifyThirdPartyAPI(params) {
    return request(`${config.serverOpenApiIp}/SourceTypeConfig/Fetch`, {
        method: 'post',
        mode: 'cors',
        traditional: true,
        body: JSON.stringify(params),
    })
}