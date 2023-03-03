// @ts-nocheck
import yaml from "js-yaml";

export const parseYaml = function (service: string) {
    return yaml.load(service);
}

export default class ServiceDescriptor{
    name:                 string;
    description:          string;
    type:                 string;
    status:               string;
    code_repo:            string;
    doc_repo:             string;
    lean_sdlc:            LeanSdlc;
    secrets_management:   SecretsManagement;
    team:                 string;
    technology:           Technology[];
    build_tool:           BuildTool;
    quality_stage_gates:  QualityStageGates;
    ci_pipelines:         BuildTool[];
    ops_dashboards:       OpsDashboard[];
    interactions:         Interactions;
    diagrams:             Diagram[];
    deployment:           Deployment;
    endpoint:             Endpoint;
    security:             Security;

    constructor(service: string) {

        const ymlObj = parseYaml(service)

        this.name = ymlObj.name;
        this.description = ymlObj.description;
        this.type  = ymlObj.type;
        this.code_repo = ymlObj.code_repo;
        this.doc_repo = ymlObj.doc_repo;

        if (ymlObj.lean_sdlc != null) {
            this.lean_sdlc = new LeanSdlc(ymlObj.lean_sdlc);
        }

        if (ymlObj.secrets_management != null) {
            this.secrets_management = new SecretsManagement(ymlObj.secrets_management);
        }

        this.team = ymlObj.team;

        if (ymlObj.technology != null) {
            ymlObj.technology.forEach(tech => {
                this.technology = [];
                this.technology.push(new Technology(tech));
            })
        }

        if (ymlObj.build_tool != null) {
            this.build_tool = new BuildTool(ymlObj.build_tool);
        }
        if (ymlObj.quality_stage_gates != null) {
            this.quality_stage_gates = new QualityStageGates(ymlObj.quality_stage_gates);
        }

        if (ymlObj.ci_pipelines != null) {
            ymlObj.ci_pipelines.forEach(pipeline => {
                this.ci_pipelines = [];
                this.ci_pipelines.push(new BuildTool(pipeline));
            })
        }

        if (ymlObj.ops_dashboards != null) {
            ymlObj.ops_dashboards.forEach(dash => {
                this.ops_dashboards = [];
                this.ops_dashboards.push(new OpsDashboard(dash));
            })
        }

        if (ymlObj.diagrams != null) {
            ymlObj.diagrams.forEach(diagram => {
                this.diagrams = [];
                this.diagrams.push(new Diagram(diagram));
            })
        }

        if (ymlObj.deployment != null) {
            this.deployment = new Deployment(ymlObj.deployment);
        }
        if (ymlObj.endpoint != null) {
            this.endpoint = new Endpoint(ymlObj.endpoint);
        }
        if (ymlObj.security != null) {
            this.security = new Security(ymlObj.security);
        }


    }

}


export class BuildTool {
    name: null | string;
    url:  null | string;

    constructor(buildTool: any) {
        this.name = buildTool.name;
        this.url = buildTool.url;
    }
}

export class Deployment {
    hosting:              string;
    aws_accounts:         AwsAccount[];
    deployment_repo:      string;
    deployment_mechanism: string;
    regions:              Region[];
    cd_pipelines:         BuildTool;

    constructor(deployment: any) {
        this.hosting = deployment.hosting;
        this.aws_accounts = [];
        this.regions = [];

        if (deployment.aws_accounts != null) {
            deployment.aws_accounts.forEach(awsAccount => {
                this.aws_accounts.push(new AwsAccount(awsAccount));
            })
        }

        this.deployment_repo = deployment.deployment_repo;
        this.deployment_mechanism = deployment.deployment_mechanism;

        if (deployment.regions != null) {
            deployment.regions.forEach(region => {
                this.regions = [];
                this.regions.push(new Region(region));
            })
        }

        if (deployment.cd_pipelines != null) {
            this.cd_pipelines = new BuildTool(deployment.cd_pipelines);
        }

    }

}

export class AwsAccount {
    name:   string;
    number: number;

    constructor(awsAccount: any) {
        this.name = awsAccount.name;
        this.number = awsAccount.number;
    }
}

export class Endpoint {
    name:                string;
    url:                 string;
    public:              boolean;
    data_classification: string;
    authentication:      string[];

    constructor(endpoint: any) {
        this.name = endpoint.name;
        this.url = endpoint.url;
        this.public = endpoint.public;
        this.data_classification = endpoint.data_classification;
        this.authentication = [];
        if (endpoint.authentication!=null){
            endpoint.authentication.forEach(auth => {
                this.authentication.push(auth);
            })
        }
    }
}

export class Interactions {
    [x: string]: Interaction;

     constructor(interactions: any) {
         interactions.forEach(key,interaction => {
            this.key = new Interaction(interaction);
         })
     }
}

export class Interaction {
    name:                string;
    endpoints:           Endpoints;
    protocol:            string;
    timeout:             string;
    simulator_available: string;
    repo:                string;
    description:         string;
    flow_direction:      string;
    pact:                string;
    status:              string;

    constructor(interaction: any) {
        this.name = interaction.name;
        if (interaction.endpoints != null) {
            this.endpoints = new Endpoints(interaction.endpoints);
        }
        this.protocol = interaction.protocol;
        this.timeout = interaction.timeout;
        this.simulator_available = interaction.simulator_available;
        this.repo = interaction.repo;
        this.description = interaction.description;
        this.flow_direction = interaction.flow_direction;
        this.pact = interaction.pact;
        this.status = interaction.status;
    }

}

export class Endpoints {
    [x: string]: Endpoint;

    constructor(endpoints: any) {
        endpoints.forEach(key,endpoint => {
            this.key = new Endpoint(endpoint);
        })

    }

}

export class LeanSdlc {
    url:  string;
    path: string;

    constructor(leanSdlc: any) {
        this.url = leanSdlc.url;
        this.path = leanSdlc.path;
    }

}

export class OpsDashboard {
    name: string;
    url:  string;
    type: string;

    constructor(opsDashboard: any) {
        this.name = opsDashboard.name;
        this.url = opsDashboard.url;;
        this.type = opsDashboard.type;
    }
}

export class QualityStageGates {
    unit_test_coverage:         number;
    automated_acceptance_tests: string;
    load_tests:                 string;
    resiliency_tests:           string;
    independently_deployable:   string;

    constructor(qos: any) {
        this.unit_test_coverage = qos.unit_test_coverage;
        this.automated_acceptance_tests = qos.automated_acceptance_tests;
        this.load_tests = qos.load_tests;
        this.resiliency_tests = qos.resiliency_tests;
        this.independently_deployable = qos.independently_deployable;
    }

}

export class Region {
    name:     string;
    replicas: number;
    vpc: VPC;

    constructor(region: any) {
        this.name = region.name;
        this.replicas = region.replicas;
        if (region.vpc != null) {
            this.vpc = new VPC(region.vpc);
        }
    }
}

export class VPC {
    name: string
    cidr: string
    tgw: boolean

    constructor(vpc: any) {
        this.name = vpc.name;
        this.cidr = vpc.cidr;
        this.tgw = vpc.tgw;
    }

}

export class SecretsManagement {
    name: string;
    repo: string;

    constructor(secrets: any) {
        this.name = secrets.name;
        this.repo = secrets.repo;
    }
}

export class Security {
    transport: Transport;
    at_rest_encryption: string;

    constructor(security: any) {
        if (security.transport != null) {
            this.transport = new Transport(security.transport);
        }
        this.at_rest_encryption = security.at_rest_encryption;
    }
}

export class Transport {
    protocol:   string;
    encryption: string;

    constructor(transport: any) {
        this.protocol = transport.protocol;
        this.encryption = transport.encryption;
    }
}

export class Technology {
    name:    string;
    type:    string;
    version: string;

    constructor(technology: any) {
        this.name = technology.name;
        this.type = technology.type;
        this.version = technology.version;
    }
}

export class Diagram {
    name:   string;
    url:    string;
    description: string;

    constructor(diagram: any) {
        this.name = diagram.name;
        this.url = diagram.url;
        this.description = diagram.description;
    }
}
