import {ServiceDescriptor} from "../model/ServiceDescriptor.js";

export default interface ServicesRepository {
    getServices(config: any): Promise<ServiceDescriptor[]>
}
