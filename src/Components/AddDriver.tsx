import { useState } from "react";
import {IDriver, ITeam, IEntryList, driverCategories} from "./interfaces";
import {Button, Input, Select} from "antd";

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
        lastName: "",
        playerID: "",
        shortName: ""
    });
    return (
        <>
            <span>First Name:</span>
            <Input  value={d.firstName} onChange={((val) =>
                    setD({ ...d,
                        firstName: val.target.value})
            )} />
            <br/>
            <br/>
            <span>Last Name:</span>
            <Input  value={d.lastName} onChange={((val) =>
                    setD({ ...d,
                        lastName: val.target.value})
            )} />
            <br/>
            <br/>
            <span>Short Name:</span>
            <Input  value={d.shortName} onChange={((val) =>
                    setD({ ...d,
                        shortName: val.target.value})
            )} />
            <br/>
            <br/>
            <span>Driver category:</span>
            <br/>
            <Select
                style={{ width: 150 }}
                defaultValue={d.driverCategory.toString()}
                onChange={((value: string) =>
                        setD({ ...d,
                            driverCategory: Number(value)})
                )}
                options={driverCategories}
            />
            <br/>
            <br/>
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