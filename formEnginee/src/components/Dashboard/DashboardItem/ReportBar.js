import React from "react";
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import {DataFilter, MuchdImension} from './DataFilter'
import DataSet from "@antv/data-set";
import BaseItem from './BaseItem'
import DashboardHOC from './DashboardHOC'


@DashboardHOC()
export default class ReportBar extends BaseItem {
    render() {
        const {item, chartConfig, DragSource, DragItem} = this.props;
        const codeData = DragSource.fields;
        // const {Yopt} = this.props.item;

        let Yopt = []
        let Xopt = []
        let FilterData = []
        let dimensionAry = []
        let dimensionXData = []
        if (item.ChartsData && item.ChartsData.length > 0) {
            let DataFil = DataFilter(item.ChartsData, codeData, DragItem)
            FilterData = DataFil.data
            Xopt = DataFil.Xopt
            Yopt = DataFil.Yopt
            dimensionAry = DataFil.dimensionAry
        }
        if (FilterData.length > 0 && dimensionAry.length === 2) {
            let MuchI = MuchdImension(FilterData, DragItem)
            FilterData = MuchI.data
            Xopt = MuchI.Xopt
            Yopt = MuchI.Yopt
            dimensionXData = DragItem.filter(item => {
                return item.ContainerId === 'dimensionX'
            })
        }

        // if (item.DataPermission && item.ShowCount) {
        //     if (item.DataPermission.find(n => n == 1)!==undefined && item.ShowCount > 0) {
        //         FilterData = FilterData.slice(0, item.ShowCount)
        //     }
        // }

        const ds = new DataSet();
        const dv = ds.createView().source(item.ChartsData ? FilterData : data);
        dv.transform({
            type: 'fold',
            fields: Xopt ? Xopt : [], // 展开字段集
            key: 'name', // key字段
            value: 'value', // value字段
        });
        return (
            <div>
                <Chart
                onPlotClick={
                    e => {
                       if(e.data){
                      this.props.DataLinkageEngineeCall(item,e.data._origin)
                      }
                    }
                }
                height={item.height} width={item.width}
                    padding={chartConfig.report.padding}
                       // padding={[20, 'auto', 60, 'auto']}
                       animate={false} data={dv}
                       forceFit>
                    <Legend marker='square' {...chartConfig.legend}/>
                    <Coord transpose/>

                    <Axis
                         name={(dimensionAry.length === 2 ? dimensionXData[0].Name : `${Yopt}`)}

                         line={chartConfig.yLine}
                         label={chartConfig.yLable}
                    />
                    <Axis name='value'

                    line={chartConfig.xLine}
                    label={
                        chartConfig.xLable
                    }

                    />
                    <Tooltip/>
                    <Geom type="interval"
                          position={(dimensionAry.length === 2 ? dimensionXData[0].Name : `${Yopt}`) + '*value'}
                         // color={"name"}
                        //  color={['name', (name)=>{
                        //     return 'l(0) 0:#ff0000 1:#003300';
                        //   }]}
                        color={['name', (name)=>{
                            if(chartConfig.report.geomColorCall){
                                var result= chartConfig.report.geomColorCall(name,chartConfig.report,item)
                                if(result){ return result; }
                            }
                          }]}
                         adjust={[
                              {
                                  type: "dodge",
                                  marginRatio: 3 / 32
                              }
                          ]}>
                        <Label content='value'  {...chartConfig.label}/>
                    </Geom>
                </Chart>
            </div>
        );
    }
}
