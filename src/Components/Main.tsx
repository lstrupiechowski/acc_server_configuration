import {Button, Descriptions, Input, Modal, Space, Table} from 'antd';
import {useState} from "react";
import {cars, driverCategories, IDriver, IEntryList, ITeam} from "./interfaces";
import Column from "antd/lib/table/Column";
import EditDriver from "./EditDriver";
import AddDriver from "./AddDriver";
import AddTeam from "./AddTeam";
import EditTeam from "./EditTeam";
const { TextArea } = Input;
const Main = () => {
    const [ entryList, setEntryList ] = useState<IEntryList>({configVersion: 0, entries: []});

    const [isEditDriverModalOpen, setIsEditDriverModalOpen] = useState(false);
    const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);
    const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
    const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<IDriver | undefined>();
    const [selectedTeam, setSelectedTeam] = useState<ITeam | undefined>();

    const showEditDriverModal = () => {
        setIsEditDriverModalOpen(true);
    };

    const handleEditDriverCancel = () => {
        setIsEditDriverModalOpen(false);
    };

    const showAddDriverModal = () => {
        setIsAddDriverModalOpen(true);
    };

    const handleAddDriverCancel = () => {
        setIsAddDriverModalOpen(false);
    };

    const showAddTeamModal = () => {
        setIsAddTeamModalOpen(true);
    };

    const handleAddTeamCancel = () => {
        setIsAddTeamModalOpen(false);
    };

    const showEditTeamModal = () => {
        setIsEditTeamModalOpen(true);
    };

    const handleEditTeamCancel = () => {
        setIsEditTeamModalOpen(false);
    };

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
                            showEditDriverModal();
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
            <Descriptions title="Paste entryList config" />
            <TextArea style={{width: '300px'}} onChange={(val) => setEntryList(JSON.parse(val.target.value))}  />
            <br/><br/>
            <Descriptions title="Loaded config" />
            <Table
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
                                showAddDriverModal();
                                setSelectedTeam(record);
                            }
                            }>Add driver</Button>
                            <Button onClick={() => {
                                showEditTeamModal();
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
            </Table>
            <br/>
            <Button type={'primary'} onClick={() => { showAddTeamModal() }} >Add team</Button>
            <br/>
            <br/>
            <Button type={'primary'} onClick={() => { navigator.clipboard.writeText(JSON.stringify(entryList)) }} >Copy new config to clipboard</Button>
        </div>
            <Modal title="Edit driver" open={isEditDriverModalOpen} onCancel={handleEditDriverCancel} destroyOnClose={true} footer={null}>
                <EditDriver driver={selectedDriver!} entryList={entryList} setEntryList={setEntryList}  closeModal={handleEditDriverCancel} />
            </Modal>
            <Modal title="Add driver" open={isAddDriverModalOpen} onCancel={handleAddDriverCancel} destroyOnClose={true} footer={null}>
                <AddDriver team={selectedTeam!} entryList={entryList} setEntryList={setEntryList} closeModal={handleAddDriverCancel} />
            </Modal>

            <Modal title="Add team" open={isAddTeamModalOpen} onCancel={handleAddTeamCancel} destroyOnClose={true} footer={null}>
                <AddTeam entryList={entryList} setEntryList={setEntryList} closeModal={handleAddTeamCancel} />
            </Modal>

            <Modal title="Add team" open={isEditTeamModalOpen} onCancel={handleEditTeamCancel} destroyOnClose={true} footer={null}>
                <EditTeam team={selectedTeam!} entryList={entryList} setEntryList={setEntryList} closeModal={handleEditTeamCancel} />
            </Modal>
        </>
    );
}

export default Main