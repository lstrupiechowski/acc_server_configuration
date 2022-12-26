import {useState} from "react";
import {IDriver, ITeam,  IEntryList} from "./interfaces";
import {Button,  Input} from "antd";

export interface IAddTeamProps {
    setEntryList: React.Dispatch<React.SetStateAction<IEntryList>>;
    entryList: IEntryList;
    closeModal: () => void;
}
const AddTeam = (props: IAddTeamProps) => {
    const { setEntryList, entryList, closeModal } = props;
    const [ d, setD ] = useState<ITeam>({
        configVersion: 0,
        customCar: 'panky',
        defaultGridPosition: -1,
        drivers: [],
        forcedCarModel: 0,
        isServerAdmin: 0,
        overrideDriverInfo: 1,
        raceNumber: 0
    });

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