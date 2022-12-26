import {useState} from "react";
import {IDriver, ITeam,  IEntryList} from "./interfaces";
import {Button,  Input} from "antd";

export interface IAddDriverProps {
    team: ITeam;
    setEntryList: React.Dispatch<React.SetStateAction<IEntryList>>;
    entryList: IEntryList;
    closeModal: () => void;
}
const AddDriver = (props: IAddDriverProps) => {
    const { team, setEntryList, entryList, closeModal } = props;
    const [ d, setD ] = useState<IDriver>({
        driverCategory: 0,
        firstName: "",
        glovesTemplateKey: 0,
        helmetBaseColor: 0,
        helmetDetailColor: 0,
        helmetGlassColor: 0,
        helmetGlassMetallic: 0,
        helmetMaterialType: 0,
        helmetTemplateKey: 0,
        lastName: "",
        nationality: 0,
        playerID: "",
        shortName: "",
        suitDetailColor1: 0,
        suitDetailColor2: 0,
        suitTemplateKey: 0
    });
    return (
        <>
            <span>First Name:</span>
            <Input  value={d.firstName} onChange={((val) =>
                    setD({ ...d,
                        firstName: val.target.value})
            )} />
            <span>Last Name:</span>
            <Input  value={d.lastName} onChange={((val) =>
                    setD({ ...d,
                        lastName: val.target.value})
            )} />
            <span>Short Name:</span>
            <Input  value={d.shortName} onChange={((val) =>
                    setD({ ...d,
                        shortName: val.target.value})
            )} />
            <span>PlayerID:</span>
            <Input  value={d.playerID} onChange={((val) =>
                    setD({ ...d,
                        playerID: val.target.value})
            )} />
            <br/>
            <br/>
            <Button type={'primary'} onClick={() =>{
                setEntryList({
                    ...entryList,
                    entries: entryList.entries.map((x) => {
                        if (x.raceNumber === team?.raceNumber){
                            return {
                                ...x,
                                drivers: [
                                    ...x.drivers,
                                d]
                            }
                        }

                        return x;
                    })
                });
                closeModal();
            }
            } >Save</Button>
        </>
    );
}

export default AddDriver