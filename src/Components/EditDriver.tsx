import { useState } from "react";
import {driverCategories, IDriver, IEntryList} from "./interfaces";
import {Button, Input, Select} from "antd";

export interface IEditDriverProps {
    driver: IDriver;
    setEntryList: React.Dispatch<React.SetStateAction<IEntryList>>;
    entryList: IEntryList;
    closeModal: () => void;
}
const EditDriver = (props: IEditDriverProps) => {
    const { driver, setEntryList, entryList, closeModal } = props;
    const [ d, setD ] = useState<IDriver>(driver);
    const team = entryList.entries.find((x) => x.drivers.some((y) => y.playerID === driver.playerID))
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
                            driverCategory: value as unknown as number})
                )
                }
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
                               drivers: x.drivers.map((y) => {
                                   if (y.playerID === driver.playerID) {
                                       return d;
                                   }

                                   return y;
                               })
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

export default EditDriver