import ServiceDescriptor from "../ServiceDescriptor.js";
import {Region} from "../ServiceDescriptor.js";

export default function generateNetworkDiagram(services : ServiceDescriptor[]) {

    // get services that have a vpc defined
    const svcsVpc : ServiceDescriptor[] = services.filter(service =>
        service.deployment.regions.filter((region:Region)  => region.vpc != null)
    )

    console.log(svcsVpc);
}
