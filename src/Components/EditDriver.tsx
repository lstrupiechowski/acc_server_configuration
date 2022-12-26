import {useState} from "react";
import {IDriver, IEntryList} from "./interfaces";
import {Button,  Input} from "antd";

export interface IEditDriverProps {
    driver: IDriver,
    setEntryList: React.Dispatch<React.SetStateAction<IEntryList>>,
    entryList: IEntryList
}
const EditDriver = (props: IEditDriverProps) => {
    const { driver, setEntryList, entryList } = props;
    const [ d, setD ] = useState<IDriver>(driver);
    const team = entryList.entries.find((x) => x.drivers.some((y) => y.playerID === d.playerID))
    return (
        <>
            <span>First Name:</span>
           <Input  value={d.firstName} onChange={((val) =>
               setD({ ...d,
               firstName: val.target.value})
               )} />
            <Button title={'Save'} onClick={() =>{
                setEntryList({
                    ...entryList,
                    entries: entryList.entries.map((x) => {
                       if (x.raceNumber === team?.raceNumber){
                           return {
                               ...x,
                               drivers: x.drivers.map((y) => {
                                   if (y.playerID === d.playerID) {
                                       return d;
                                   }

                                   return y;
                               })
                           }
                       }

                       return x;
                    })
                })
            }
            } />
        </>
    );
}

export default EditDriver