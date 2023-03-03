import ServiceDescriptor from "../ServiceDescriptor.js";


export default function generateNetworkDiagram(services : ServiceDescriptor[]): string {

    let vpcs = filterServices(services);

    let puml = '@startuml\nskinparam backgroundColor transparent\n'
              + '!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml\n'
              + '!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml\n'
              + '!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml\n'

    vpcs.forEach((vpc, key) => {
        puml = puml.concat(`Boundary(${key},${key}-${vpc.cidr}){\n`);

        vpc.services.forEach(service => {
            puml = puml.concat(`Container(${formatName(service.name)}, ${service.name})\n`);
        })

        puml = puml.concat('}\n');
    })

    puml = puml.concat('SHOW_LEGEND()\n@enduml');

    return puml;
}

// get services that have a vpc defined
function filterServices(services: ServiceDescriptor[]): Map<String,{name: string, cidr: string, services: ServiceDescriptor[], tgw: boolean }> {
    let vpcs: Map<String,{name: string, cidr: string, services: ServiceDescriptor[], tgw: boolean }> = new Map<String, {name: string; cidr: string; services: ServiceDescriptor[]; tgw: boolean}>();
    services.forEach(service => {
        service.deployment.regions.forEach(region => {
            if (region.vpc!=null) {
                if (vpcs.has(region.vpc.name)) {
                    // @ts-ignore
                    vpcs.get(region.vpc.name).services.push(service);
                } else {
                    vpcs.set(region.vpc.name,
                            {name: region.vpc.name,
                            cidr: region.vpc.cidr,
                            services:[service],
                            tgw: region.vpc.tgw});
                }
            }
        })

    })
    return vpcs;
}

function formatName(name: string ) {
    return name.replace(' ', '').toLowerCase();
}
