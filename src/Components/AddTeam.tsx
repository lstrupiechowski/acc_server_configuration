import { useState } from "react";
import {ITeam, IEntryList, cars} from "./interfaces";
import {Button, InputNumber, Select, Switch} from "antd";

export interface IAddTeamProps {
    setEntryList: React.Dispatch<React.SetStateAction<IEntryList>>;
    entryList: IEntryList;
    closeModal: () => void;
}
const AddTeam = (props: IAddTeamProps) => {
    const { setEntryList, entryList, closeModal } = props;
    const [ d, setD ] = useState<ITeam>({
        defaultGridPosition: -1,
        drivers: [],
        forcedCarModel: -1,
        overrideDriverInfo: 1,
        raceNumber: 0
    });

    return (
        <>
            <span>Race number:</span>
            <br/>
            <InputNumber value={d.raceNumber} onChange={((val) =>
                    setD({ ...d,
                        raceNumber: val ?? -1 })
            )} />
            <br/>
            <br/>
            <span>Forced car model:</span>
            <br/>
            <Select
                style={{ width: 350 }}
                defaultValue={d.forcedCarModel.toString()}
                onChange={((value: string) =>
                        setD({ ...d,
                            forcedCarModel: value as unknown as number})
                )
                }
                options={cars}
            />
            <br/>
            <br/>
            <span style={{margin: '4px'}} >Override driver info:</span>
            <Switch defaultChecked={d.overrideDriverInfo === 1} onChange={((val) =>
                    setD({ ...d,
                        overrideDriverInfo: val ? 1 : 0})
            )} />
            {d.overrideDriverInfo !== 1 ?
                <><br/><span style={{margin: '4px', color: "red"}} >For now server doesn't start when disabled</span></>
                : undefined}
            <br/>
            <br/>
            <Button type={'primary'} onClick={() =>{
                setEntryList({
                    ...entryList,
                    entries: [...entryList.entries, d]
                });
                closeModal();
            }
            } >Save</Button>
        </>
    );
}

export default AddTeam