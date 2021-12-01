import react from "react";
import {
  List,
  InputItem,
  WhiteSpace,
  Button,
  DatePicker,
  Picker,
  TextareaItem,
  Modal,
  Toast,
} from "antd-mobile";
import { CustomChildren, InputLine, Duty, InvoicePackage } from "./components";
import Select from "./components/select/Select";
import InvoiceRow from "./components/select/InvoiceRow";

import FileRow from "./components/select/FileRow";
import {
  GetInvoiceByPackageIds,
  GetAnnexStorageByPackageIds,
} from "../../../services/Reimbursement";
import com from "../../../utils/common";
import _ from "underscore";
import styles from "./Index.less";
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const district = [{ label: "机构1", value: 2 }];
const Item = List.Item;
const ModalAlert = Modal.alert;
class Index extends react.Component {
  state = {
    isModify: false,
    date: now,
    projectShow: false,
    dutyShow: false,
    orgShow: false,
    billDeptShow: false,
    recDeptShow: false,
    recBankShow: false,
    packageShow: false,
    subjectShow: false,
    formShow: false,
    annexShow: false,
    packageIds: [],
  };
  componentWillMount() {
    this.props.Clear();
  }
  showModal = (key) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };
  onClose = (key) => () => {
    this.setState({
      [key]: false,
    });
  };
  toggleProjectShow = () => {
    let show = this.state.projectShow;
    this.setState({
      projectShow: !show,
    });
  };
  toggleDutyShow = () => {
    let show = this.state.dutyShow;
    this.setState({
      dutyShow: !show,
    });
  };
  toggleShow = () => {
    let show = this.state.orgShow;
    this.setState({
      orgShow: !show,
    });
  };
  toggleBillDeptShow = () => {
    let show = this.state.billDeptShow;
    this.setState({
      billDeptShow: !show,
    });
  };
  toggleRecDeptShow = () => {
    let show = this.state.recDeptShow;
    this.setState({
      recDeptShow: !show,
    });
  };
  toggleRecBankShow = () => {
    let show = this.state.recBankShow;
    this.setState({
      recBankShow: !show,
    });
  };
  togglePackageShow = () => {
    let show = this.state.packageShow;
    this.setState({
      packageShow: !show,
    });
    //  const { dataInfo, packageInfo } = this.props

    //dataInfo.readOnly
    // if (dataInfo.readOnly) {
    //     if (packageInfo.packageId) {
    //         this.props.history.push({
    //             pathname: `/app/TicketPackages/${packageInfo.packageId}`,
    //         })
    //     }
    // }
    // else {
    //     let show = this.state.packageShow
    //     this.setState({
    //         packageShow: !show
    //     });
    // }
  };

  toggleSubjectShow = () => {
    let show = this.state.subjectShow;
    this.setState({
      subjectShow: !show,
    });
  };

  toggleFormShow = () => {
    let show = this.state.formShow;
    this.setState({
      formShow: !show,
    });
  };
  toggleAnnexShow = () => {
    let show = this.state.annexShow;
    this.setState({
      annexShow: !show,
    });
  };

  SetOrgInfo(e) {
    this.props.SetOrgInfo({
      orgID: e.value,
      orgName: e.text,
    });
  }

  SetDutyInfo(e) {
    this.props.SetDutyInfo({
      value: e.value,
      text: e.text,
    });

    if (this.props.dutyInfo.value !== e.value) {
      this.props.SetDefault(e);
      this.props.GetUserAccountList(e.orgID);

      this.props.GetTripBudget(e);
      this.props.GetProject(e);
      this.props.SetFormInfo({
        formId: "",
        formName: "",
      });
      this.props.SetSubjectInfo({
        value: "",
        text: "",
      });
    }
  }
  SetFormInfo(e) {
    this.props.SetFormInfo({
      formId: e.value,
      formName: e.text,
    });
  }
  SetBillDept(e) {
    this.props.SetBillDept({
      billDeptID: e.value,
      billDeptName: e.text,
    });
  }
  SetPorject(e) {
    this.props.SetPorject({
      projectId: e.value,
      projectName: e.text,
    });
  }

  SetSubjectInfo(e) {
    this.props.SetSubjectInfo({
      value: e.value,
      text: e.text,
    });
  }
  //报销部门联动收款方信息
  SetRecDept(e) {
    this.props.SetRecDept({
      recDeptID: e.value,
      recDeptName: e.text,
    });

    if (this.props.recDept.recDeptID !== e.value) {
      this.props.GetUserAccountList(e.value);
    }
  }
  SetRecBankInfo(e) {
    this.props.SetRecBankInfo({
      recBankAccountID: e.value, //收款方信息ID
      recBankAccountName: e.bankAccountName, //收款方户名
      recBankAccountNO: e.bankAccountNO, //收款方账号
      recOPBANKNAME: e.opbankname, //收款方开户行
    });
  }
  SetPackageInfo = (ids, eles) => {
    if (eles.length > 0) {
      let ele = eles[0];
      this.props.SetPackageInfo({
        packageId: ele.id,
        name: ele.name,
      });
    } else {
      this.props.SetPackageInfo({
        packageId: "",
        name: "",
      });
    }
  };

  setCheckInvoiceIds = (params) => {
    let ids = _.pluck(params, "id");
    this.togglePackageShow();
    this.props.setCheckInvoiceIds(ids);
  };
  setCheckAnnexIds = (params) => {
    let ids = _.pluck(params, "id");
    this.toggleAnnexShow();
    this.props.setCheckAnnexIds(ids);
  };
  handleSubmit = (isStage, isModify) => {
    const {
      formInfo,
      dutyInfo,
      userId,
      dataInfo,
      orgInfo,
      billDept,
      recDept,
      recBankInfo,
      packageInfo,
      subjectInfo,
      projectInfo,
    } = this.props;

    let submitInfo = {
      ...{},
      ...orgInfo,
      ...dataInfo,
      ...billDept,
      ...recDept,
      ...recBankInfo,
    };

    if (!formInfo.formId) {
      Toast.fail("请选择表单类型");
      return;
    }

    if (!projectInfo.projectId) {
      Toast.fail("请选择项目");
      return;
    }
    if (!orgInfo.orgID) {
      Toast.fail("请选择机构");
      return;
    }
    if (!dataInfo.bizDate) {
      Toast.fail("请选择单据日期");
      return;
    }
    if (!billDept.billDeptID) {
      Toast.fail("请选择制单部门");
      return;
    }
    if (!recDept.recDeptID) {
      Toast.fail("请选择报销部门");
      return;
    }

    if (!recBankInfo.recBankAccountID) {
      Toast.fail("请选择收款方信息");
      return;
    }
    // if (!packageInfo.packageId) {
    //     Toast.fail('请选择票包')
    //     return
    // }
    if (!subjectInfo.value && window.AppSetting.formItems.includes("subject")) {
      Toast.fail("请选择费用类型");
      return;
    }
    if (
      dataInfo.allowancePrice === "" ||
      dataInfo.allowancePrice === null ||
      dataInfo.allowancePrice === undefined
    ) {
      Toast.fail("请填写差补总额");
      return;
    }
    if (!dataInfo.recReason) {
      Toast.fail("请填写报销事由");
      return;
    }
    submitInfo.userId = userId;
    submitInfo.reimbursementId = dataInfo.id
      ? isModify
        ? com.Guid()
        : dataInfo.id
      : com.Guid();
    submitInfo.billNumber = dataInfo.billNumber;
    submitInfo.interfaceID = formInfo.formId;
    submitInfo.dutyId = dutyInfo.value;
    submitInfo.projectId = projectInfo.projectId;

    const submitFn = () => {
      this.props.ReimbursementSave({
        isStage: isStage,
        isModify,
        data: submitInfo,
        packageInfos: [
          {
            packageId: packageInfo.packageId,
            budgetIndexCode: subjectInfo.value,
          },
        ],
        checkInvoiceIds: this.props.checkInvoiceIds,
        checkAnnexIds: this.props.checkAnnexIds,
      });
    };
    if (!packageInfo.packageId) {
      ModalAlert("提示", "没有选择票包，确定提交报销单吗？", [
        { text: "取消", onPress: () => {} },
        {
          text: "确定",
          onPress: () => submitFn(),
        },
      ]);
    } else {
      submitFn();
    }
  };
  render() {
    const {
      projectData,
      projectInfo,
      formInfo,
      formList,
      dutyInfo,
      dutyData,
      data,
      subject,
      subjectInfo,
      dataInfo,
      billDetpData,
      recDeptData,
      orgInfo,
      billDept,
      recDept,
      recBankInfo,
      bank,
      packageData,
      packageInfo,
      checkInvoiceIds,
      checkAnnexIds,
    } = this.props;
    const {
      dutyShow,
      orgShow,
      billDeptShow,
      recDeptShow,
      recBankShow,
      packageShow,
      formShow,
      annexShow,
    } = this.state;
    console.log(dataInfo);
    var newBizDate = dataInfo.bizDate ? new Date(dataInfo.bizDate) : "";
    return (
      <div className={styles.containerReimbursement}>
        <div className={`inputList ${styles.inputList}`}>
          <WhiteSpace size="lg" />

          {dataInfo.billNumber && (
            <div className={styles.genItem}>
              <div className={styles.itemTitle}>单据编号：</div>
              <div className={styles.genInputs}>
                <CustomChildren extra={dataInfo.billNumber} />
              </div>
            </div>
          )}
          <Duty
            title="职责"
            onOk={(e) => {
              this.SetDutyInfo(e);
            }}
            select={dutyInfo.value}
            onClose={this.toggleDutyShow}
            dutyShow={dutyShow}
            data={dutyData}
          ></Duty>
          <div className={styles.genItem}>
            <div className={styles.itemTitle}>职责：</div>
            <div className={styles.genInputs}>
              <CustomChildren
                disabled={dataInfo.readOnly}
                onClick={this.toggleDutyShow}
                extra={dutyInfo.text}
                type="org"
              />
            </div>
          </div>
          <Duty
            title="表单类型切换"
            onOk={(e) => {
              this.SetFormInfo(e);
            }}
            select={formInfo.formId}
            onClose={this.toggleFormShow}
            dutyShow={formShow}
            data={formList}
          ></Duty>
          <div className={styles.genItem}>
            <div className={styles.itemTitle}>表单类型</div>
            <div className={styles.genInputs}>
              <CustomChildren
                disabled={dataInfo.readOnly}
                onClick={this.toggleFormShow}
                extra={formInfo.formName}
                type="org"
              />
            </div>
          </div>

          <Duty
            title="机构切换"
            onOk={(e) => {
              this.SetOrgInfo(e);
            }}
            select={orgInfo.orgID}
            onClose={this.toggleShow}
            dutyShow={orgShow}
            data={data}
          ></Duty>
          <div className={styles.genItem}>
            <div className={styles.itemTitle}>机构名称：</div>
            <div className={styles.genInputs}>
              {/* <CustomChildren onClick={this.toggleShow} extra={orgInfo.orgName} type='org' /> */}
              <CustomChildren
                disabled={dataInfo.readOnly}
                extra={orgInfo.orgName}
                type="org"
              />
            </div>
          </div>

          <Duty
            title="项目名称切换"
            onOk={(e) => {
              this.SetPorject(e);
            }}
            select={projectInfo.projectId}
            onClose={this.toggleProjectShow}
            dutyShow={this.state.projectShow}
            data={projectData}
          ></Duty>
          <div className={styles.genItem}>
            <div className={styles.itemTitle}>项目名称：</div>
            <div className={styles.genInputs}>
              {/* <CustomChildren onClick={this.toggleBillDeptShow} extra={billDept.billDeptName} type='org' /> */}
              <CustomChildren
                disabled={dataInfo.readOnly}
                onClick={this.toggleProjectShow}
                extra={projectInfo.projectName}
                type="org"
              />
            </div>
          </div>

          <div className={styles.genItem}>
            <div className={styles.itemTitle}>单据日期：</div>
            <div className={styles.genInputs}>
              <DatePicker
                disabled={dataInfo.readOnly}
                extra="请输入单据日期"
                mode="date"
                placeholder="请输入单据日期"
                value={newBizDate}
                onChange={(date) => {
                  this.props.SetDataInfo({
                    bizDate: date.toLocaleDateString(),
                  });
                }}
              >
                <CustomChildren type="date" />
              </DatePicker>
            </div>
          </div>
          <Duty
            title="制单部门切换"
            onOk={(e) => {
              this.SetBillDept(e);
            }}
            select={billDept.billDeptID}
            onClose={this.toggleBillDeptShow}
            dutyShow={billDeptShow}
            data={billDetpData}
          ></Duty>
          <div className={styles.genItem}>
            <div className={styles.itemTitle}>制单部门：</div>
            <div className={styles.genInputs}>
              {/* <CustomChildren onClick={this.toggleBillDeptShow} extra={billDept.billDeptName} type='org' /> */}
              <CustomChildren
                disabled={dataInfo.readOnly}
                extra={billDept.billDeptName}
                type="org"
              />
            </div>
          </div>

          <Duty
            title="报销部门切换"
            onOk={(e) => {
              this.SetRecDept(e);
            }}
            select={recDept.recDeptID}
            onClose={this.toggleRecDeptShow}
            dutyShow={recDeptShow}
            data={recDeptData}
          ></Duty>
          <div className={styles.genItem}>
            <div className={styles.itemTitle}>报销部门：</div>
            <div className={styles.genInputs}>
              {/* <CustomChildren onClick={this.toggleRecDeptShow} extra={recDept.recDeptName} type='org' /> */}
              <CustomChildren
                disabled={dataInfo.readOnly}
                extra={recDept.recDeptName}
                type="org"
              />
            </div>
          </div>

          <Duty
            title="收款方信息切换"
            onOk={(e) => {
              this.SetRecBankInfo(e);
            }}
            select={recBankInfo.recBankAccountID}
            onClose={this.toggleRecBankShow}
            dutyShow={recBankShow}
            data={bank}
          ></Duty>
          <div className={styles.genItem}>
            <div className={styles.itemTitle}>收款方信息：</div>
            <div className={styles.genInputs}>
              <CustomChildren
                disabled={dataInfo.readOnly}
                onClick={this.toggleRecBankShow}
                extra={recBankInfo.recBankAccountNO}
                type="person"
              />
            </div>
          </div>
          {packageInfo.packageId && (
            <Select
              title="发票信息"
              checkValue={com.deepCopy(checkInvoiceIds)}
              tagShow={packageShow}
              onOk={this.setCheckInvoiceIds}
              cancelShow={dataInfo.isModify}
              onCancel={this.togglePackageShow}
              asyncLoadApi={GetInvoiceByPackageIds}
              asyncParams={{
                status: "0",
                packageIds: [packageInfo.packageId],
                isModify: dataInfo.isModify,
              }}
              asyncKey="billHolderList"
              row={(rowdata, onChange) => (
                <InvoiceRow
                  isSelect={dataInfo.isModify}
                  rowData={rowdata}
                  onChange={onChange}
                ></InvoiceRow>
              )}
            ></Select>
          )}
          {/* <InvoicePackage onOk={(ids, eles) => {
                    this.SetPackageInfo(ids, eles)
                  
                }} onClose={this.togglePackageShow} show={packageShow} data={packageData}
                    selectValue={[packageInfo.packageId]} multiple={false}></InvoicePackage> */}
          <div className={styles.genItem}>
            <div className={styles.itemTitle}>发票信息</div>
            <div className={styles.genInputs}>
              <CustomChildren
                onClick={this.togglePackageShow}
                extra={packageInfo.name}
                type="invoice"
              />
            </div>
          </div>
          {packageInfo.packageId && (
            <Select
              title="附件信息"
              checkValue={com.deepCopy(checkAnnexIds)}
              tagShow={annexShow}
              onOk={this.setCheckAnnexIds}
              cancelShow={dataInfo.isModify}
              onCancel={this.toggleAnnexShow}
              asyncLoadApi={GetAnnexStorageByPackageIds}
              asyncParams={{
                status: "0",
                packageIds: [packageInfo.packageId],
                isModify: dataInfo.isModify,
              }}
              asyncKey="annexStorageList"
              row={(rowdata, onChange) => (
                <FileRow
                  isSelect={dataInfo.isModify}
                  rowData={rowdata}
                  onChange={onChange}
                ></FileRow>
              )}
            ></Select>
          )}
          <div className={styles.genItem}>
            <div className={styles.itemTitle}>附件信息</div>
            <div className={styles.genInputs}>
              <CustomChildren
                onClick={this.toggleAnnexShow}
                extra={packageInfo.name}
                type="invoice"
              />
            </div>
          </div>

          {window.AppSetting.formItems.includes("subject") && (
            <>
              <Duty
                title="费用类型切换"
                onOk={(e) => {
                  this.SetSubjectInfo(e);
                }}
                select={subjectInfo.value}
                onClose={this.toggleSubjectShow}
                dutyShow={this.state.subjectShow}
                data={subject}
              ></Duty>
              <div className={styles.genItem}>
                <div className={styles.itemTitle}>费用类型</div>
                <div className={styles.genInputs}>
                  <CustomChildren
                    disabled={dataInfo.readOnly}
                    onClick={this.toggleSubjectShow}
                    extra={subjectInfo.text}
                    type="person"
                  />
                </div>
              </div>
            </>
          )}

          <InputLine
            value={dataInfo.allowancePrice}
            disabled={dataInfo.readOnly}
            onChange={(e) => {
              this.props.SetDataInfo({ allowancePrice: e.target.value });
            }}
            title="差旅费补助"
            type="number"
          ></InputLine>

          <div className={styles.genItem} style={{ height: 200 }}>
            <div className={styles.itemTitle}>报销事由：</div>
            <div className={styles.genInputs} style={{ height: "auto" }}>
              <TextareaItem
                disabled={dataInfo.readOnly}
                value={dataInfo.recReason}
                onChange={(e) => {
                  this.props.SetDataInfo({ recReason: e });
                }}
                rows={5}
                count={100}
              />
            </div>
          </div>
        </div>
        <div className={styles.bottomButton}>
          {/* {
                    !dataInfo.readOnly && !dataInfo.isModify
                    && <Button disabled={dataInfo.status !== 99} onClick={e => { this.handleSubmit(true) }} className={styles.buttonDefuat}>
                        暂存
</Button>
                } */}

          {!dataInfo.readOnly && !dataInfo.isModify && (
            <Button
              onClick={(e) => {
                this.handleSubmit(false);
              }}
              className={styles.buttonStyle}
            >
              提交
            </Button>
          )}

          {dataInfo.isModify && dataInfo.status === 0 && (
            <Button
              onClick={(e) => {
                this.handleSubmit(false, true);
              }}
              className={styles.buttonStyle}
            >
              修改
            </Button>
          )}
        </div>
      </div>
    );
  }
}
export default Index;
