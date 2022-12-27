export interface IEntryList {
    entries: ITeam[];
    configVersion: number;
}

export interface ITeam {
    drivers: IDriver[];
   // customCar: string;
    raceNumber: number;
    defaultGridPosition:  number;
    forcedCarModel:  number;
    overrideDriverInfo: number;
   // isServerAdmin: number;
   // configVersion:  number;
}

export interface IDriver {
    firstName: string;
    lastName: string;
    shortName:  string;
   // nationality: number;
    driverCategory: number;
   // helmetTemplateKey: number;
   // helmetBaseColor: number;
   // helmetDetailColor: number;
   // helmetMaterialType: number;
   // helmetGlassColor: number;
   // helmetGlassMetallic: number;
   // glovesTemplateKey: number;
   // suitTemplateKey: number;
   // suitDetailColor1: number;
   // suitDetailColor2: number;
    playerID:  string;
}

export const driverCategories = [
    {
        value: '0',
        label: 'Bronze',
    },
    {
        value: '1',
        label: 'Silver',
    },
    {
        value: '2',
        label: 'Gold',
    },
    {
        value: '3',
        label: 'Platinum',
    },
]

export const cars = [
    { value: '-1', label: 'Any - player choose on joining server' },
    { value: '0', label: 'Porsche 991 GT3 R (2018)' },
    { value: '1', label: 'Mercedes-AMG GT3 (2015)' },
    { value: '2', label: 'Ferrari 488 GT3 (2018)' },
    { value: '3', label: 'Audi R8 LMS (2015)' },
    { value: '4', label: 'Lamborghini Huracán GT3 (2015)' },
    { value: '5', label: 'McLaren 650S GT3 (2015)' },
    { value: '6', label: 'Nissan GT-R Nismo GT3 (2018)' },
    { value: '7', label: 'BMW M6 GT3 (2017)' },
    { value: '8', label: 'Bentley Continental GT3 (2018)' },
    { value: '9', label: 'Porsche 991 II GT3 Cup (2017)' },
    { value: '10', label: 'Nissan GT-R Nismo GT3 (2015)' },
    { value: '11', label: 'Bentley Continental GT3 (2015)' },
    { value: '12', label: 'AMR V12 Vantage GT3 (2013)' },
    { value: '13', label: 'Reiter Engineering R-EX GT3 (2017)' },
    { value: '14', label: 'Emil Frey Jaguar G3 (2012)' },
    { value: '15', label: 'Lexus RC F GT3 (2016)' },
    { value: '16', label: 'Lamborghini Huracan GT3 Evo (2019)' },
    { value: '17', label: 'Honda NSX GT3 (2017)' },
    { value: '18', label: 'Lamborghini Huracan SuperTrofeo (2015)' },
    { value: '19', label: 'Audi R8 LMS Evo (2019)' },
    { value: '20', label: 'AMR V8 Vantage (2019)' },
    { value: '21', label: 'Honda NSX GT3 Evo (2019)' },
    { value: '22', label: 'McLaren 720S GT3 (2019)' },
    { value: '23', label: 'Porsche 991 II GT3 R (2019)' },
    { value: '24', label: 'Ferrari 488 GT3 Evo (2020)' },
    { value: '25', label: 'Mercedes-AMG GT3 (2020)' },
    { value: '26', label: 'Ferrari 488 Challenge Evo (2020)' },
    { value: '27', label: 'BMW M2 Club Sport Racing (2020)' },
    { value: '28', label: 'Porsche 992 GT3 Cup (2021)' },
    { value: '29', label: 'Lamborghini Huracán SuperTrofeo EVO2 (2021)' },
    { value: '30', label: 'BMW M4 GT3 (2022)' },
    { value: '31', label: 'Audi R8 LMS GT3 Evo 2 (2022)' },
    { value: '50', label: 'Alpine A110 GT4 (2018)' },
    { value: '51', label: 'Aston Martin Vantage GT4 (2018)' },
    { value: '52', label: 'Audi R8 LMS GT4 (2018)' },
    { value: '53', label: 'BMW M4 GT4 (2018)' },
    { value: '55', label: 'Chevrolet Camaro GT4 (2017)' },
    { value: '56', label: 'Ginetta G55 GT4 (2012)' },
    { value: '57', label: 'KTM X-Bow GT4 (2016)' },
    { value: '58', label: 'Maserati MC GT4 (2016)' },
    { value: '59', label: 'McLaren 570S GT4 (2016)' },
    { value: '60', label: 'Mercedes AMG GT4 (2016)' },
    { value: '61', label: 'Porsche 718 Cayman GT4 Clubsport' }

]