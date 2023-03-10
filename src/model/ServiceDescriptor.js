// @ts-nocheck
import yaml from "js-yaml";
export const parseYaml = function (service) {
    return yaml.load(service);
};
export class ServiceDescriptor {
    constructor(service, path) {
        if (service != null && path != null) {
            const ymlObj = parseYaml(service);
            this._path = path;
            this.name = ymlObj.name;
            this.description = ymlObj.description;
            this.type = ymlObj.type;
            this.status = ymlObj.status;
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
                this.technology = [];
                ymlObj.technology.forEach(tech => {
                    this.technology.push(new Technology(tech));
                });
            }
            if (ymlObj.build_tool != null) {
                this.build_tool = new BuildTool(ymlObj.build_tool);
            }
            if (ymlObj.quality_stage_gates != null) {
                this.quality_stage_gates = new QualityStageGates(ymlObj.quality_stage_gates);
            }
            if (ymlObj.ci_pipelines != null) {
                this.ci_pipelines = [];
                ymlObj.ci_pipelines.forEach(pipeline => {
                    this.ci_pipelines.push(new BuildTool(pipeline));
                });
            }
            if (ymlObj.ops_dashboards != null) {
                this.ops_dashboards = [];
                ymlObj.ops_dashboards.forEach(dash => {
                    this.ops_dashboards.push(new OpsDashboard(dash));
                });
            }
            if (ymlObj.interactions != null) {
                this.interactions = new Interactions(ymlObj.interactions);
            }
            if (ymlObj.diagrams != null) {
                this.diagrams = [];
                ymlObj.diagrams.forEach(diagram => {
                    this.diagrams.push(new Diagram(diagram));
                });
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
}
export class BuildTool {
    constructor(buildTool) {
        this.name = buildTool.name;
        this.url = buildTool.url;
    }
}
export class Deployment {
    constructor(deployment) {
        this.hosting = deployment.hosting;
        this.aws_accounts = [];
        this.regions = [];
        if (deployment.aws_accounts != null) {
            deployment.aws_accounts.forEach(awsAccount => {
                this.aws_accounts.push(new AwsAccount(awsAccount));
            });
        }
        this.deployment_repo = deployment.deployment_repo;
        this.deployment_mechanism = deployment.deployment_mechanism;
        if (deployment.regions != null) {
            this.regions = [];
            deployment.regions.forEach(region => {
                this.regions.push(new Region(region));
            });
        }
        if (deployment.cd_pipelines != null) {
            this.cd_pipelines = new BuildTool(deployment.cd_pipelines);
        }
    }
}
export class AwsAccount {
    constructor(awsAccount) {
        this.name = awsAccount.name;
        this.number = awsAccount.number;
    }
}
export class Endpoint {
    constructor(endpoint) {
        this.name = endpoint.name;
        this.url = endpoint.url;
        this.public = endpoint.public;
        this.data_classification = endpoint.data_classification;
        this.authentication = [];
        if (endpoint.authentication != null) {
            endpoint.authentication.forEach(auth => {
                this.authentication.push(auth);
            });
        }
    }
}
export class Interactions {
    constructor(interactions) {
        for (const [key, value] of Object.entries(interactions)) {
            this[key] = new Interaction(value);
        }
    }
}
export class Interaction {
    constructor(interaction) {
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
    constructor(endpoints) {
        for (const [key, value] of Object.entries(endpoints)) {
            this[key] = new Endpoint(value);
        }
    }
}
export class LeanSdlc {
    constructor(leanSdlc) {
        this.url = leanSdlc.url;
        this.path = leanSdlc.path;
    }
}
export class OpsDashboard {
    constructor(opsDashboard) {
        this.name = opsDashboard.name;
        this.url = opsDashboard.url;
        ;
        this.type = opsDashboard.type;
    }
}
export class QualityStageGates {
    constructor(qos) {
        this.unit_test_coverage = qos.unit_test_coverage;
        this.automated_acceptance_tests = qos.automated_acceptance_tests;
        this.load_tests = qos.load_tests;
        this.resiliency_tests = qos.resiliency_tests;
        this.independently_deployable = qos.independently_deployable;
    }
}
export class Region {
    constructor(region) {
        this.name = region.name;
        this.replicas = region.replicas;
        if (region.vpc != null) {
            this.vpc = new VPC(region.vpc);
        }
    }
}
export class VPC {
    constructor(vpc) {
        this.name = vpc.name;
        this.cidr = vpc.cidr;
        this.tgw = vpc.tgw;
    }
}
export class SecretsManagement {
    constructor(secrets) {
        this.name = secrets.name;
        this.repo = secrets.repo;
    }
}
export class Security {
    constructor(security) {
        if (security.transport != null) {
            this.transport = new Transport(security.transport);
        }
        this.at_rest_encryption = security.at_rest_encryption;
    }
}
export class Transport {
    constructor(transport) {
        this.protocol = transport.protocol;
        this.encryption = transport.encryption;
    }
}
export class Technology {
    constructor(technology) {
        this.name = technology.name;
        this.type = technology.type;
        this.version = technology.version;
    }
}
export class Diagram {
    constructor(diagram) {
        this.name = diagram.name;
        this.url = diagram.url;
        this.description = diagram.description;
    }
}
