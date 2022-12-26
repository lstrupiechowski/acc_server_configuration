export interface IEntryList {
    entries: ITeam[];
    configVersion: number;
}

export interface ITeam {
    drivers: IDriver[];
    customCar: string;
    raceNumber: number;
    defaultGridPosition:  number;
    forcedCarModel:  number;
    overrideDriverInfo: number;
    isServerAdmin: number;
    configVersion:  number;
}

export interface IDriver {
    firstName: string;
    lastName: string;
    shortName:  string;
    nationality: number;
    driverCategory: number;
    helmetTemplateKey: number;
    helmetBaseColor: number;
    helmetDetailColor: number;
    helmetMaterialType: number;
    helmetGlassColor: number;
    helmetGlassMetallic: number;
    glovesTemplateKey: number;
    suitTemplateKey: number;
    suitDetailColor1: number;
    suitDetailColor2: number;
    playerID:  string;
}