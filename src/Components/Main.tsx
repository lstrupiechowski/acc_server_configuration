import {Button, Descriptions, Input, message, Modal, Space, Table} from 'antd';
import { useState} from "react";
import {cars, driverCategories, IDriver, IEntryList, ITeam, loadEntryList} from "./interfaces";
import Column from "antd/lib/table/Column";
import EditDriver from "./EditDriver";
import AddDriver from "./AddDriver";
import AddTeam from "./AddTeam";
import EditTeam from "./EditTeam";
import DriverList from "./DriverList";
const { TextArea } = Input;
const Main = () => {
    const [ entryList, setEntryList ] = useState<IEntryList>({configVersion: 0, entries: []});

    const [isEditDriverModalOpen, setIsEditDriverModalOpen] = useState(false);
    const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);
    const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
    const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
    const [isDriverListModalOpen, setIsDriverListModalOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<IDriver | undefined>();
    const [selectedTeam, setSelectedTeam] = useState<ITeam | undefined>();

    const [messageApi, contextHolder] = message.useMessage();

    const expandedRowRender = (record: ITeam) => {
        return <Table dataSource={record.drivers} pagination={false} >
            <Column
                title={'First name'}
                dataIndex={'firstName'}
            />
            <Column
                title={'Last name'}
                dataIndex={'lastName'}
            />
            <Column
                title={'Short name'}
                dataIndex={'shortName'}
            />
            <Column
                title={'Driver category'}
                dataIndex={'driverCategory'}
                render={(_: any, record: IDriver) => (
                    <span>{driverCategories?.find((x) => x?.value === record?.driverCategory?.toString())?.label}</span>
                )}
            />
            <Column
                title={'Player ID'}
                dataIndex={'playerID'}
            />
            <Column
                key="playerID"
                dataIndex="playerID"
                render={(_: any, record: IDriver) => (
                    <Space size="middle">
                        <Button onClick={() => {
                            setIsEditDriverModalOpen(true);
                            setSelectedDriver(record);
                        }
                        }>Edit</Button>
                        <Button onClick={() => {
                            const team = entryList.entries.find((x) => x.drivers.some((y) => y.playerID === record.playerID))
                            setEntryList({
                                ...entryList,
                                entries: entryList.entries.map((x) => {
                                    if (x.raceNumber === team?.raceNumber){
                                        return {
                                            ...x,
                                            drivers: x.drivers.filter((obj) => { return obj !== record })
                                        }
                                    }

                                    return x;
                                })
                            });
                        }
                        }>Delete</Button>
                    </Space>
                )}
            />
        </Table>;
    };

    return (
        <>
        <h1 style={{ textAlign: "center" }}>ACC driver swap configurator - PS5 server</h1>
        <div className="main">
            <Descriptions title="Load entryList configuration:" />
            {contextHolder}
            <TextArea placeholder={'Paste here entrylist.json content'} style={{width: '300px'}} onChange={(val) => {
                try {
                    setEntryList(loadEntryList(JSON.parse(val.target.value)));
                } catch (error) {
                    messageApi.open({
                        type: 'error',
                        content: 'Not correct entrylist.json pasted',
                    });
                }
            }}  />
            <br/><br/>
            <Button type={'primary'} onClick={() => { setIsAddTeamModalOpen(true) }} >Add team</Button> {'  '}
            <Button type={'primary'} onClick={() => { setIsDriverListModalOpen(true) }} >Load driver list from result file</Button>
            <br/>
            {entryList ? <Table
                expandable={{ expandedRowRender: expandedRowRender }}
                dataSource={entryList.entries}
                pagination={false}
                rowKey={'raceNumber'}
            >
                <Column
                    title={'Car No.'}
                    dataIndex={'raceNumber'}
                />
                <Column
                    title={'Forced car model'}
                    dataIndex={'forcedCarModel'}
                    render={(_: any, record: ITeam) => (
                        <span>{cars?.find((x) => x?.value === record?.forcedCarModel?.toString())?.label}</span>
                    )}
                />
                <Column
                    title={'Override driver info'}
                    dataIndex={'overrideDriverInfo'}
                    render={(_: any, record: ITeam) => (
                        <span>{record.overrideDriverInfo === 1 ? 'Enabled' : 'Disabled'}</span>
                        )}
                />
                <Column
                    key="action"
                    render={(_: any, record: ITeam) => (
                        <Space size="middle">
                            <Button onClick={() => {
                                setIsAddDriverModalOpen(true);
                                setSelectedTeam(record);
                            }
                            }>Add driver</Button>
                            <Button onClick={() => {
                                setIsEditTeamModalOpen(true);
                                setSelectedTeam(record);
                            }
                            }>Edit</Button>
                            <Button  onClick={() => {
                                setEntryList({
                                    ...entryList,
                                    entries: entryList.entries.filter((obj) => { return obj !== record })
                                });
                            }} >Delete</Button>
                        </Space>
                    )}
                />
            </Table> : undefined}
            <br/>
            <br/>
            <Button type={'primary'} onClick={() => { navigator.clipboard.writeText(JSON.stringify(entryList, undefined, 2)) }} >Copy to clipboard</Button>
            <div><pre>{JSON.stringify(entryList, null, 2) }</pre></div>
        </div>
            <Modal title="Edit driver" open={isEditDriverModalOpen} onCancel={() => setIsEditDriverModalOpen(false)} destroyOnClose={true} footer={null}>
                <EditDriver driver={selectedDriver!} entryList={entryList} setEntryList={setEntryList}  closeModal={() => setIsEditDriverModalOpen(false)} />
            </Modal>
            <Modal title="Add driver" open={isAddDriverModalOpen} onCancel={() => setIsAddDriverModalOpen(false)} destroyOnClose={true} footer={null}>
                <AddDriver team={selectedTeam!} entryList={entryList} setEntryList={setEntryList} closeModal={() => setIsAddDriverModalOpen(false)} />
            </Modal>

            <Modal title="Add team" open={isAddTeamModalOpen} onCancel={() => setIsAddTeamModalOpen(false)} destroyOnClose={true} footer={null}>
                <AddTeam entryList={entryList} setEntryList={setEntryList} closeModal={() => setIsAddTeamModalOpen(false)} />
            </Modal>

            <Modal title="Add team" open={isEditTeamModalOpen} onCancel={() => setIsEditTeamModalOpen(false)} destroyOnClose={true} footer={null}>
                <EditTeam team={selectedTeam!} entryList={entryList} setEntryList={setEntryList} closeModal={() => setIsEditTeamModalOpen(false)} />
            </Modal>

            <Modal title="Driver list" open={isDriverListModalOpen} onCancel={() => setIsDriverListModalOpen(false)} destroyOnClose={true} footer={null}>
                <DriverList />
            </Modal>
        </>
    );
}

export default Main