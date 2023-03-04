import type ServiceDescriptor from "../ServiceDescriptor.js";

export default function generateServiceDiagram(serviceDescriptor : ServiceDescriptor) {

    let service_name = formatName(serviceDescriptor?.name)
    let puml = "@startuml\nskinparam backgroundColor transparent\n!include " +
        "https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml\n" +
        "AddRelTag(\"new_contract\", $textColor=\"red\", $lineColor=\"red\", $sprite=\"&battery-empty\", $legendSprite=\"&battery-empty\", $legendText=\"New Contract\")\n" +
        "AddRelTag(\"api_drafted\", $textColor=\"orange\", $lineColor=\"orange\", $sprite=\"&pencil\", $legendSprite=\"&pencil\", $legendText=\"API Drafted\")\n" +
        "AddRelTag(\"architecture_drafted\", $textColor=\"grey\", $lineColor=\"grey\", $sprite=\"&map\", $legendSprite=\"&map\", $legendText=\"Architecture Drafted\")\n" +
        "AddRelTag(\"qa_gates_passed\", $textColor=\"purple\", $lineColor=\"purple\", $sprite=\"&shield\", $legendSprite=\"&shield\", $legendText=\"QA Gates Passed\")\n" +
        "AddRelTag(\"try\", $textColor=\"blue\", $lineColor=\"blue\", $sprite=\"&check\", $legendSprite=\"&check\", $legendText=\"Try\")\n" +
        "AddRelTag(\"live\", $textColor=\"green\", $lineColor=\"green\", $sprite=\"&battery-full\", $legendSprite=\"&battery-full\", $legendText=\"Live\")\n" +
        "AddRelTag(\"default\", $textColor=\"black\", $lineColor=\"black\", $sprite=\"&ban\", $legendSprite=\"&ban\", $legendText=\"No Status\")\n" +
        "System_Boundary(s1,\"Service Boundary\") {\nSystem(" + service_name + ",\"" + serviceDescriptor?.name + "\",\"" +
        serviceDescriptor?.description + "\")\n}\n"

    //first draw out all systems
    if (serviceDescriptor?.interactions != null) {
        for (let interaction in serviceDescriptor?.interactions) {
            if (serviceDescriptor?.interactions[interaction]?.name != null) {
                let dservice_name = formatName(serviceDescriptor?.interactions[interaction]?.name!);
                puml = puml + `System(${dservice_name},\"${serviceDescriptor?.interactions[interaction]?.name}\")\n`
            }
        }
    }

    //now add the relationships between the systems
    if (serviceDescriptor?.interactions != null) {
        for (let interaction in serviceDescriptor?.interactions) {
            if (serviceDescriptor?.interactions[interaction]?.name != null) {
                let dservice_name = formatName(serviceDescriptor?.interactions[interaction]?.name!);

                if (serviceDescriptor?.interactions[interaction]?.flow_direction != null){
                    if (serviceDescriptor?.interactions[interaction]?.flow_direction?.toLowerCase() === 'in'){
                        puml = puml + `Rel(${dservice_name} ,${service_name},\"${serviceDescriptor?.interactions[interaction]?.description} \",$tags=\"${serviceDescriptor?.interactions[interaction]?.status}\")\n`
                    } else if (serviceDescriptor.interactions[interaction]?.flow_direction?.toLowerCase() === 'out'){
                        puml = puml + `Rel(${service_name}, ${dservice_name},\"${serviceDescriptor?.interactions[interaction]?.description} \",$tags=\"${serviceDescriptor?.interactions[interaction]?.status}\")\n`
                    }
                }

            }
        }
    }

    puml = puml + "SHOW_LEGEND()\n @enduml"
    return puml;
}

function formatName(name: string ) {
    return name.replace(' ', '').toLowerCase();
}
