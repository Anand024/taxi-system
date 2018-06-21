export class DriverDataModel {

    constructor(
        public driverId: string, public userId: number, public role: string,
        public status: number, public firstName: string, public lastName: string,
        public mobileNumber: number, public email: string, public photo: string,
        public address: string, public cabId: number, public street: string,
        public zip: string, public cityId: number, public stateId: number,
        public countryId: number, public sex: string, public password: string,
        public otherPhone: number, public startDate: string, public driverLicenceNumber: string,
        public driverLicenceExpiry: string, public crb: string, public delivery: string,
        public female: string, public luggage: string, public NHS: string, public pets: string,
        public uniformed: string, public topman: string, public driverAttribteId: number,
        public policeDisclose: string, public proofOfAddress: string, public licencePhoto: string,
        public pcoLicence: string, public agreement: string, public licencePaper: string,
        public insurance: string, public driverDocumentId: number, public aliasName: string) {

        }
}

export class AddDriverDataModel {
    public address: string;
    public agreement: string;
    public aliasName: string;
    public cabId: number;
    public cityId: number;
    public countryId: number;
    public crb: string;
    public delivery: string;
    public driverAttribteId: number;
    public driverDocumentId: number;
    public driverId: number;
    public driverLicenceExpiry: any;
    public driverLicenceNumber: string;
    public email: string;
    public female: string;
    public firstName: string;
    public insurance: string;
    public lastName: string;
    public licencePaper: string;
    public licencePhoto: string;
    public luggage: string;
    public mobileNo: number;
    public nhs: string;
    public otherPhone: number;
    public password: string;
    public pcoLicence: string;
    public pets: string;
    public photo: string;
    public policeDisclose: string;
    public proofOfAddress: string;
    public sex: string;
    public startDate: any;
    public stateId: number;
    public status: number;
    public street: string;
    public topman: string;
    public uniformed: string;
    public zip: string;

    constructor(
        // public address: string, public agreement: string, public aliasName: string,
        // public cabId: number, public cityId: number, public countryId: number, public crb: string,
        // public delivery: string, public driverAttribteId: number, public driverDocumentId: number,
        // public driverId: number, public driverLicenceExpiry: string, public driverLicenceNumber: string,
        // public email: string, public female: string, public firstName: string, public insurance: string,
        // public lastName: string, public licencePaper: string, public licencePhoto: string, public luggage: string,
        // public mobileNo: number, public nhs: string, public otherPhone: number, public password: string,
        // public pcoLicence: string, public pets: string, public photo: string, public policeDisclose: string,
        // public proofOfAddress: string, public sex: string, public startDate: string,
        // public stateId: number, public status: number, public street: string, public topman: string,
        // public uniformed: string, public zip: string
    ) {}
}
