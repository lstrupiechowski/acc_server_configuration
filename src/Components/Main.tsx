import {Button, Descriptions, Input, Modal, Space, Table, TableColumnsType} from 'antd';
import {useState} from "react";
import {IDriver, IEntryList, ITeam} from "./interfaces";
import Column from "antd/lib/table/Column";
import EditDriver from "./EditDriver";
const { TextArea } = Input;
const Main = () => {
    const [ entryList, setEntryList ] = useState<IEntryList>({configVersion: 0, entries: []});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<IDriver | undefined>();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const expandedRowRender = (record: ITeam) => {
        return <Table dataSource={record.drivers} pagination={false} >
            <Column
                title={'First name'}
                dataIndex={'firstName'}
                key={'firstName'}
            />
            <Column
                title={'Last name'}
                dataIndex={'lastName'}
                key={'lastName'}
            />
            <Column
                title={'Short name'}
                dataIndex={'shortName'}
                key={'shortName'}
            />
            <Column
                title={'Player ID'}
                dataIndex={'playerID'}
                key={'playerID'}
            />
            <Column
                key="playerID"
                dataIndex="playerID"
                render={(_: any, record: IDriver) => (
                    <Space size="middle">
                        <Button onClick={() => {
                            showModal();
                            setSelectedDriver(record);
                        }
                        }>Edit</Button>
                        <Button>Delete</Button>
                    </Space>
                )}
            />
        </Table>;
    };

    return (
        <>
        <div className="main">
            <Descriptions title="Paste entryList config" />
            <TextArea onChange={(val) => setEntryList(JSON.parse(val.target.value))}  />
            <br/>
            <Descriptions title="Loaded config" />
            <Table
                expandable={{ expandedRowRender: expandedRowRender }}
                dataSource={entryList.entries}
                pagination={false}
            >
                <Column
                    title={'Car No.'}
                    dataIndex={'raceNumber'}
                    key={'raceNumber'}
                />
                <Column
                    title={'Custom car.'}
                    dataIndex={'customCar'}
                    key={'customCar'}
                />
                <Column
                    title={'Forced car model'}
                    dataIndex={'forcedCarModel'}
                    key={'forcedCarModel'}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(_: any) => (
                        <Space size="middle">
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                        </Space>
                    )}
                />
            </Table>
            <br/>
            <Button type={'primary'} onClick={() => { navigator.clipboard.writeText(JSON.stringify(entryList)) }} >Copy new config to clipboard</Button>
        </div>
            <Modal title="Player" open={isModalOpen} onCancel={handleCancel} destroyOnClose={true}>
                <EditDriver driver={selectedDriver!} entryList={entryList} setEntryList={setEntryList} />
            </Modal>
        </>
    );
}

export default Main