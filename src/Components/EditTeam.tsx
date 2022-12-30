import { useState } from "react";
import {ITeam, IEntryList, cars} from "./interfaces";
import {Button, InputNumber, Select, Switch} from "antd";

export interface IEditTeamProps {
    team: ITeam;
    setEntryList: React.Dispatch<React.SetStateAction<IEntryList>>;
    entryList: IEntryList;
    closeModal: () => void;
}
const EditTeam = (props: IEditTeamProps) => {
    const { team, setEntryList, entryList, closeModal } = props;
    const [ d, setD ] = useState<ITeam>(team);

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
                            forcedCarModel: Number(value) })
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
                    entries: entryList.entries.map((x) => {
                    if (x.raceNumber === team?.raceNumber){
                        return d;
                    }

                    return x;
                })})
                closeModal();
            }
            } >Save</Button>
        </>
    );
}

export default EditTeam