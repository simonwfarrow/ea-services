import ServiceDescriptor from "../ServiceDescriptor.js";

export default interface ServicesRepository {
    getServices(config: any): Promise<ServiceDescriptor[]>
}
