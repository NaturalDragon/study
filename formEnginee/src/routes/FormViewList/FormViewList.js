import React, { Component } from "react";
import { connect } from "dva";
import { Input, Icon, Button, Modal, message } from "antd";
import styles from "./FormViewList.less";
import com from "../../utils/com";
import {
    deleteFormVersion,
    publishForm,
    unpublishForm,
    deleteFormTemplate
} from "../../services/FormViewList/FormViewList";
import procedure from "../../assets/procedure.png";
import genForm from "../../assets/templateFormSel.png";

import InterfaceConfig from "../../components/FormViewList/InterfaceConfig";
import DatapushConfig from "../../components/FormViewList/DatapushConfig";
import UserFuncs from "../../components/FormViewList/UserFuncs";
import SearchName from "../../components/DataManage/SearchName";
import TableCom from "../../components/DataManage/TableCom";
// import TableFooter from "../../components/BookAddress/MemberCom/TableFooter"
import TableFooter from "../../components/FormControl/common/TableFooter";

const Search = Input.Search;
const confirm = Modal.confirm;

class FormViewList extends Component {
    constructor(props) {
        super(props);
        let {
            formViewConfig: { pageIndex, pageSize }
        } = props.formViewList;
        this.state = {
            pageIndex,
            pageSize,
            //keyWord: '',
            interfaceConfigVisible: false,
            formDatapush: {},
            id: "",
            key: "",
            type: null
        };
        this.getPageTableData = this.getPageTableData.bind(this);
        this.getFormListData = this.getFormListData.bind(this);
        this.expandedRowRender = this.expandedRowRender.bind(this);
        this.deleteForm = this.deleteForm.bind(this);
        this.search = this.search.bind(this);
        this.publishAndUnpublish = this.publishAndUnpublish.bind(this);
        this.deleteTemplate = this.deleteTemplate.bind(this);
        this.changeInterfaceVisible = this.changeInterfaceVisible.bind(this);
        this.showDatapushModal = this.showDatapushModal.bind(this);
    }
    
    componentDidMount() {
        let {
            formViewConfig: { list, pageIndex, pageSize }
        } = this.props.formViewList;
        if (list === null)
            this.props.dispatch({
                type: "formViewList/getFormList",
                payload: {
                    pageIndex,
                    pageSize
                }
            });
    }
    
    generateMainTable(list) {
        let tableData = [];
        list &&
        list.forEach(item => {
            tableData.push({
                key: item.id,
                name: (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            wordBreak: "break-word"
                        }}
                    >
                        <img
                            src={Number(item.formTemplateType) === 0 ? genForm : procedure}
                            style={{
                                width: "1em",
                                marginRight: ".2em"
                            }}
                        />
                        {item.name}
                    </div>
                ),
                date: item["formTemplateVersionList"][0] ? item["formTemplateVersionList"][0]["createdTime"] : "",
                operation: item.id
            });
        });
        return tableData;
    }
    
    toOtherLink({ title, id, formTemplateId, moduleId, formTemplateType }) {
        const { history, dispatch } = this.props;
        if (history.location.pathname.toLocaleLowerCase() === "/formviewlist" || history.location.pathname === "/") {
            if (id)
                history.push(
                    `/formbuilder/large?tabId=${id}&formTemplateId=${formTemplateId}&type=modify&moduleId=${moduleId}&formTemplateType=${formTemplateType}`
                );
            else history.push(`/formbuilder/large?tabId=${com.Guid()}&type=add&formTemplateType=${formTemplateType}`);
        } else {
            //let key = `dic/large`;
            let key = `dic`;
            if (id) {
                dispatch({
                    type: "appMain/toOtherLink",
                    payload: {
                        key,
                        id,
                        title,
                        history,
                        formTemplateId,
                        moduleId,
                        formTemplateType,
                        param: { type: "modify" }
                    }
                });
            } else {
                dispatch({
                    type: "appMain/toOtherLink",
                    payload: {
                        key,
                        id: com.Guid(),
                        title,
                        history,
                        formTemplateType,
                        param: { type: "add" }
                    }
                });
            }
        }
    }
    
    // ????????????
    deleteTemplate(id, callback) {
        let me = this;
        const { pageSize } = me.state;
        const {
            formViewConfig: { pageCount, list, totalCount }
        } = me.props.formViewList;
        deleteFormTemplate({ EntityIdList: [id] })
            .then(res => {
                if (res.data.isValid) {
                    message.success("??????????????????");
                    me.changeFormViewConfig({ loading: false });
                    callback.call(me);
                    pageCount !== 1 && list <= pageSize / 2
                        ? me.getFormListData(pageSize)
                        : me.changeFormViewConfig({
                            totalCount: totalCount - 1
                        });
                    return;
                }
                message.error("??????????????????");
            })
            .catch(err => {
                me.changeFormViewConfig({ loading: false });
                message.error("??????????????????");
            });
    }
    
    generateColumns() {
        let me = this;
        let {
            formViewConfig: { list }
        } = this.props.formViewList;
        const columns = [
            {
                title: "????????????",
                dataIndex: "name",
                key: "name",
                parentId: null,
                isData: true /* , width: 200 */
            },
            {
                title: "????????????",
                dataIndex: "date",
                key: "date",
                parentId: null,
                isData: true,
                width: 300
            },
            {
                title: "??????",
                dataIndex: "operation",
                key: "operation",
                parentId: null,
                width: 240,
                isData: true,
                render: (value, record) => (
                    <div className={styles.operationContainer}>
                        {/* <div className={styles.operationItem} onClick={() => {
                        }}>
                            <Icon type="eye"/>???????????????
                        </div> */}
                        <div className={styles.operationItem}>
                            <span onClick={() => {
                                confirm({
                                    title: "????????????????",
                                    onOk() {
                                        me.changeFormViewConfig({ loading: true });
                                        let callback = () => {
                                            list.forEach((item, i) => {
                                                if (item.id === value) {
                                                    list.splice(i, 1);
                                                }
                                            });
                                            me.changeFormViewConfig({ list });
                                        };
                                        me.deleteTemplate(value, callback);
                                    },
                                    onCancel() {
                                        me.changeFormViewConfig({ loading: false });
                                    }
                                });
                            }}>
                                <Icon type="delete"/>
                                ??????
                            </span>
                        </div>
                    </div>
                ) /* <a onClick={() => {  }}><Icon type="eye" />???????????????</a> */
            }
        ];
        return columns;
    }
    
    publish(id, key, type, api, funcId) {
        // let api = type === 0 && funcID !== "" ? publishForm : unpublishForm;
        // let api = unpublishForm;
        let {
            formViewConfig: { list }
        } = this.props.formViewList;
        let params = { EntityId: id };
        if (type === 0) params.ParentFuncId = funcId;
        api(params).then(
            res => {
                this.changeFormViewConfig({ loading: false });
                if (res.data.isValid) {
                    list.forEach(item => {
                        if (item.id === key) {
                            item.formTemplateVersionList.forEach((v, i) => {
                                if (v.id === id) {
                                    // ?????? ?????? ????????? ????????????
                                    v.publishStatus = type === 0 ? 1 : 0;
                                }
                            });
                        }
                    });
                    this.changeFormViewConfig({ list }, () => {
                    });
                }
            },
            err => {
                this.changeFormViewConfig({ loading: false });
            }
        );
    }
    
    // ?????? ???????????????
    publishAndUnpublish(id, key, type, name) {
        if ((type === 0 && name === "unpub") || (type === 1 && name === "pub")) return;
        this.changeFormViewConfig({ loading: true });
        if (type === 0) {
            this.props.dispatch({
                type: "formViewList/getUserFuncs"
            });
            this.setState({ id, key, type });
        } else {
            this.publish(id, key, type, unpublishForm);
        }
    }
    
    // ?????? table ??? ??????
    getFormListData(pageSize, extraObj) {
        if (pageSize) {
            this.setState(
                {
                    pageSize,
                    pageIndex: 1
                },
                () => {
                    const { pageIndex } = this.state;
                    this.props.dispatch({
                        type: "formViewList/getFormList",
                        payload: {
                            pageIndex,
                            pageSize: pageSize ? pageSize : this.state.pageSize,
                            ...extraObj
                        }
                    });
                }
            );
            return;
        }
        const { pageIndex } = this.state;
        this.props.dispatch({
            type: "formViewList/getFormList",
            payload: {
                pageIndex,
                pageSize: pageSize ? pageSize : this.state.pageSize
            }
        });
    }
    
    changeFormViewConfig(data) {
        this.props.dispatch({
            type: "formViewList/changeFormViewConfig",
            payload: data
        });
    }
    
    setSearchKey = (searchKey) => {
        this.props.dispatch({
            type: "formViewList/setSearchKey",
            searchKey
        });
    };
    
    // ?????? ??????
    /* getPageTableData({ type, value }) {
        this.changeFormViewConfig({ loading: true });
        if (value) {
            this.setState({
                pageIndex: value
            }, () => {
                this.getFormListData();
            });
        } else {
            let page = this.state.pageIndex;
            page = type === "next" ? page - 0 + 1 : page - 0 - 1;
            this.setState({
                pageIndex: page
            }, () => {
                this.getFormListData();
            });
        }
    } */
    getPageTableData(page) {
        this.changeFormViewConfig({ loading: true });
        this.setState(
            {
                pageIndex: page
            },
            () => {
                this.getFormListData();
            }
        );
    }
    
    // ?????? ????????????
    deleteForm(id, key, state) {
        let me = this;
        if (state === 1) {
            Modal.info({
                title: "?????????????????????"
            });
            return;
        }
        me.changeFormViewConfig({ loading: true });
        let {
            formViewConfig: { list }
        } = this.props.formViewList;
        confirm({
            title: "????????????????",
            onOk() {
                let index = -1;
                let existList = list.filter((item, i) => {
                    if (item.id === key) {
                        index = i;
                        return item;
                    }
                });
                if (existList.length) {
                    let judgeDeleteStyle = existList[0]["formTemplateVersionList"].length;
                    if (judgeDeleteStyle === 1) {
                        // ?????? ??????
                        let callback = () => {
                            list.splice(index, 1);
                            me.changeFormViewConfig({ list });
                        };
                        me.deleteTemplate(key, callback);
                    } else {
                        deleteFormVersion({ EntityIdList: [id] }).then(
                            res => {
                                me.changeFormViewConfig({ loading: false });
                                if (res.data.isValid) {
                                    message.success("????????????????????????");
                                    list.forEach((item, index) => {
                                        if (item.id === key) {
                                            item.formTemplateVersionList.forEach((v, i) => {
                                                if (v.id === id) {
                                                    item.formTemplateVersionList.splice(i, 1);
                                                }
                                            });
                                        }
                                    });
                                    me.changeFormViewConfig({ list });
                                    return;
                                }
                                message.error("????????????????????????");
                            },
                            err => {
                                me.changeFormViewConfig({ loading: false });
                                message.error("????????????????????????");
                            }
                        );
                    }
                }
            },
            onCancel() {
                me.changeFormViewConfig({ loading: false });
            }
        });
    }
    
    showDatapushModal(formTemplateId, formvVersionId) {
        let me = this;
        me.changeFormViewConfig({ loading: true });
        this.props.dispatch({
            type: "formViewList/dataSourceGetAll"
        });
        this.props.dispatch({
            type: "formViewList/getForModify",
            payload: formvVersionId
        });
        this.setState({ formDatapush: { formTemplateId, formvVersionId } });
        
    };
    
    cancelDatapushModal() {
        let me = this;
        me.changeFormViewConfig({ loading: false });
        this.props.dispatch({
            type: "formViewList/cancelSourceAcquisition"
        });
    };
    
    // ?????? ??????
    search(keyWord) {
        let { pageSize } = this.state;
        this.changeFormViewConfig({ loading: true });
        this.getFormListData(pageSize, { formName: keyWord });
    }
    
    // ?????????
    expandedRowRender(record, index, indent, expanded) {
        let { key } = record;
        const {
            formViewConfig: { list }
        } = this.props.formViewList;
        const columns = [
            {
                title: "?????????",
                dataIndex: "version",
                key: "version",
                width: 150,
                parentId: null,
                isData: true
            },
            {
                title: "????????????",
                dataIndex: "date",
                key: "date",
                width: 150,
                parentId: null,
                isData: true
            },
            {
                title: "??????",
                dataIndex: "state",
                key: "state",
                width: 150,
                parentId: null,
                isData: true,
                render: value => (
                    <span>
                        {Number(value) === 1 ? (
                            <span>
                                <Icon className={styles.publish} type="check-circle"/>
                                ?????????
                            </span>
                        ) : (
                            <span>
                                    <Icon className={styles.unpublish} type="exclamation-circle"/>
                                    ?????????
                            </span>
                        )}
                    </span>
                )
            },
            {
                title: "??????",
                dataIndex: "operation",
                key: "operation",
                width: 200,
                parentId: null,
                isData: true,
                render: (value, record) => (
                    <div className={styles.operationContainer}>
                        {/* <div className={styles.operationItem}>
                                <Icon type="plus"/>??????????????????????????????
                            </div> */}
                        {/* <div className={styles.operationItem}>
                                <Icon type="plus" />??????
                            </div> */}
                        <div className={styles.operationItem}>
                            <span onClick={() => {
                                this.toOtherLink({
                                    title: record.formTemplateName,
                                    id: value,
                                    formTemplateId: key,
                                    moduleId: record.moduleId,
                                    formTemplateType: record.formTemplateType
                                });
                            }}>
                                <Icon type="edit"/>
                                ??????
                            </span>
                        </div>
                        <div className={`${styles.operationItem} ${record.state === 1 ? styles.published : ""}`}>
                            <span onClick={() => {
                                this.publishAndUnpublish(value, key, record.state, "pub");
                            }}>
                                <Icon type="eye"/>
                                ??????
                            </span>
                        </div>
                        <div className={`${styles.operationItem} ${record.state === 0 ? styles.published : ""}`}>
                            <span onClick={() => {
                                this.publishAndUnpublish(value, key, record.state, "unpub");
                            }}>
                                <Icon type="eye"/>
                                ????????????
                            </span>
                        </div>
                        <div className={styles.operationItem}>
                            <span onClick={() => {
                                this.showDatapushModal(key, value);
                            }}>
                                <Icon type="container"/>????????????
                            </span>
                        </div>
                        <div className={styles.operationItem}>
                            <span onClick={() => {
                                this.deleteForm(value, key, record.state);
                            }}>
                                <Icon type="delete"/>
                                ??????
                            </span>
                        </div>
                    </div>
                )
            }
        ];
        const data = [];
        const exsitTemplate = list.filter(l => l.id === key);
        if (exsitTemplate.length) {
            exsitTemplate[0]["formTemplateVersionList"].forEach(item => {
                data.push({
                    key: item.id,
                    version: item.version,
                    date: item.createdTime,
                    state: item.publishStatus,
                    operation: item.id,
                    moduleId: item.moduleId,
                    formTemplateType: exsitTemplate[0].formTemplateType
                });
            });
        }
        const tableComProps = {
            columns,
            tableData: data,
            loading: false
        };
        return <TableCom {...tableComProps} />;
    }
    
    /* ???????????? ?????? */
    changeInterfaceVisible(bool) {
        this.setState({ interfaceConfigVisible: bool });
    }
    
    getDataSource = () => {
        let { history } = this.props;
        if (history.location.pathname.toLocaleLowerCase() === "/formviewlist") {
            history.push("/formViewList/dataSource");
        } else {
            history.push("/main/formViewList/dataSource");
        }
    };
    
    newSourceAcquisitionConfig(params, type) {
        this.props.dispatch({
            type: "formViewList/newSourceAcquisitionConfig",
            payload: { params, type }
        });
    }
    
    sourceAcquisitionConfigTrigger(formvVersionId) {
        this.props.dispatch({
            type: "formViewList/sourceAcquisitionConfigTrigger",
            payload: formvVersionId
        });
    }
    
    userFuncsCancel = () => {
        this.changeFormViewConfig({ loading: false });
        this.props.dispatch({
            type: "formViewList/userFuncsCancel"
        });
    };
    userFuncSubmit = (funcId) => {
        if (funcId) {
            let { id, key, type } = this.state;
            this.publish(id, key, type, publishForm, funcId);
            this.props.dispatch({
                type: "formViewList/userFuncsCancel"
            });
        }
        else {
            Modal.warning({
                title: "??????",
                content: "???????????????????????????",
                okText: "??????"
            });
        }
    };
    
    render() {
        const {
            formViewConfig: { list, pageCount, totalCount, loading },
            dataSource, formData, isDatapushVisible, acquisitionConfigData, confirmLoading, searchKey, userFuncsVisible, userFuncsData
        } = this.props.formViewList;
        const { pageIndex, pageSize, interfaceConfigVisible, formDatapush } = this.state;
        const tableData = this.generateMainTable(list);
        const columns = this.generateColumns();
        const fieldNameArr = columns.map(v => {
            return {
                id: v.key,
                name: v.title
            };
        });
        const searchNameProps = {
            columns,
            fieldNameArr,
            backNewfieldArr: () => {
            }
        };
        const tableComProps = {
            columns,
            tableData,
            expandedRowRender: this.expandedRowRender,
            loading,
            removeHeight: "96px",
            expandChange: () => {
            }
        };
        /* const tableFooterPorps = {
            pageIndex,
            totalPage: pageCount,
            pageSize,
            totalCount,
            showSelect: true,
            getPageTableData: this.getPageTableData,
            selecChange: (value) => {
                this.changeFormViewConfig({ loading: true });
                this.getFormListData(value);
            }
        } */
        const tableFooterPorps = {
            // columns: columns.filter(item => item.isData),
            isSet: false,
            designPreview: false,
            pageIndex,
            totalPage: pageCount,
            pageSize: pageSize,
            getPageTableData: this.getPageTableData,
            totalCount,
            selecChange: value => {
                this.changeFormViewConfig({ loading: true });
                this.getFormListData(value);
            },
            refresh: () => {
                this.changeFormViewConfig({ loading: true });
                this.getFormListData();
            }
        };
        return (
            <div className={styles.container}>
                {interfaceConfigVisible && (
                    <InterfaceConfig
                        changeInterfaceVisible={this.changeInterfaceVisible}
                        interfaceConfigVisible={interfaceConfigVisible}
                    />
                )}
                <div className={styles.cooperate}>
                    <div className={styles.cooperateLeft}>
                        <div
                            className={`${styles.cooperateItem} ${styles.cooperateSpecial}`}
                            onClick={() => {
                                this.changeInterfaceVisible(true);
                            }}
                        >
                            <Icon type="setting"/>
                            <span className={styles.cooperateText}>????????????</span>
                        </div>
                        <div
                            className={`${styles.cooperateItem} ${styles.cooperateSpecial}`}
                            onClick={this.getDataSource}
                        >
                            <Icon type="database"/>
                            <span className={styles.cooperateText}>API??????</span>
                        </div>
                        <a
                            className={`${styles.cooperateItem} ${styles.cooperateSpecial}`}
                            href="http://cd.sysdsoft.cn:4000/"
                            target='_blank'
                        >
                            <Icon type="file-word"/>
                            <span className={styles.cooperateText}>??????????????????</span>
                        </a>
                    </div>
                    <div className={styles.cooperateRight}>
                        <div className={styles.cooperateItem}>
                            <Button
                                type="primary"
                                icon="plus"
                                /*  size="small" */ onClick={() => {
                                this.toOtherLink({
                                    title: "?????????",
                                    formTemplateType: "1"
                                });
                            }}
                            >
                                ??????????????????
                            </Button>
                        </div>
                        <div className={styles.cooperateItem}>
                            <Button
                                type="primary"
                                icon="plus"
                                /*  size="small" */ onClick={() => {
                                this.toOtherLink({
                                    title: "?????????",
                                    formTemplateType: "0"
                                });
                            }}
                            >
                                ????????????
                            </Button>
                        </div>
                        {/*<div className={styles.cooperateItem}>*/}
                        {/*<Button*/}
                        {/*type="primary"*/}
                        {/*icon="search"*/}
                        {/*onClick={() => {*/}
                        {/*this.search(keyWord);*/}
                        {/*}}*/}
                        {/*>*/}
                        {/*??????*/}
                        {/*</Button>*/}
                        {/*</div>*/}
                        <div className={styles.cooperateItem}>
                            <Search
                                /* size="small" */ placeholder="???????????????????????????"
                                                   value={searchKey}
                                                   onChange={e => {
                                                       this.setSearchKey(e.target.value);
                                                       //this.setState({ keyWord: e.target.value });
                                                   }}
                                                   onSearch={this.search}
                                                   style={{ width: 200 }}
                            />
                        </div>
                        {/* <div className={styles.cooperateItem}>
                            <Checkbox>
                                ????????????????????????
                            </Checkbox>
                        </div>
                        <div className={styles.cooperateItem} style={{ position: "relative" }} onClick={() => { }}>
                            <Dropdown trigger={["click"]} overlay={<SearchName {...searchNameProps} />} placement="bottomRight" onVisibleChange={(visible) => {

                            }}>
                                <Button type="primary" icon="bars" size="small">?????????</Button>
                            </Dropdown>
                        </div> */}
                    </div>
                </div>
                <TableCom {...tableComProps} />
                
                <TableFooter {...tableFooterPorps} />
                {isDatapushVisible ? <DatapushConfig
                    isDatapushVisible={isDatapushVisible}
                    dataSource={dataSource}
                    formDatapush={formDatapush}
                    formData={formData}
                    acquisitionConfigData={acquisitionConfigData}
                    confirmLoading={confirmLoading}
                    newSourceAcquisitionConfig={this.newSourceAcquisitionConfig.bind(this)}
                    sourceAcquisitionConfigTrigger={this.sourceAcquisitionConfigTrigger.bind(this)}
                    cancelDatapushModal={this.cancelDatapushModal.bind(this)}/> : null}
                {userFuncsVisible ? <UserFuncs
                    visible={userFuncsVisible}
                    userFuncsCancel={this.userFuncsCancel.bind(this)}
                    userFuncsData={userFuncsData}
                    funcSubmit={this.userFuncSubmit.bind(this)}
                /> : null}
            </div>
        );
    }
}

function mapStateToProps({ formViewList }) {
    return { formViewList };
}

export default connect(mapStateToProps)(FormViewList);
