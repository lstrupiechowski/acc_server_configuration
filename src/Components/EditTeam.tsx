import {useState} from "react";
import { ITeam,  IEntryList} from "./interfaces";
import {Button,  Input} from "antd";

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
            <Input value={d.raceNumber} onChange={((val) =>
                    setD({ ...d,
                        raceNumber: val.target.value as unknown as number })
            )} />
            <span>Custom car:</span>
            <Input value={d.customCar} onChange={((val) =>
                    setD({ ...d,
                        customCar: val.target.value})
            )} />
            <span>Forced car model:</span>
            <Input  value={d.forcedCarModel} onChange={((val) =>
                    setD({ ...d,
                        forcedCarModel: val.target.value as unknown as number})
            )} />
            <span>Override driver info:</span>
            <Input  value={d.overrideDriverInfo} onChange={((val) =>
                    setD({ ...d,
                        overrideDriverInfo: val.target.value as unknown as number})
            )} />
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