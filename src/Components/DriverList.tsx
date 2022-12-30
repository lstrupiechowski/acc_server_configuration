import { useState } from "react";
import {IResult} from "./interfaces";
import { Descriptions, Table} from "antd";
import Column from "antd/lib/table/Column";
import TextArea from "antd/es/input/TextArea";

const DriverList = () => {
    const [ result, setResult ] = useState<IResult>();
    return (<>
        <Descriptions title="Load drivers from result file:" />
    <TextArea style={{width: '300px'}} onChange={(val) => {setResult(JSON.parse(val.target.value))}} />
    <br/><br/>
     <Table
        dataSource={result?.sessionResult.leaderBoardLines.map((x) => {
            return  x.currentDriver;
        })}
        pagination={false}
        rowKey={'playerId'}
    >
        <Column
            title={'Name'}
            dataIndex={'lastName'}
        />
        <Column
            title={'Player Id'}
            dataIndex={'playerId'}
        />
    </Table>
        </>
    );
}

export default DriverList