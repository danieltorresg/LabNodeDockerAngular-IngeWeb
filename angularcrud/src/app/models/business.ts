export class Business {
    person_name: String;
    business_name: String;
    business_gst_number: Number;
    _id!: String;
    constructor(data: { person_name: String; business_name: String; business_gst_number: Number; } ){
        this.person_name = data.person_name;
        this.business_name = data.business_name;
        this.business_gst_number = data.business_gst_number;
    }
}
