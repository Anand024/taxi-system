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
