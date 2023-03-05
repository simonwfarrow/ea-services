
export type ServiceDescriptor = {
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
};

export type BuildTool = {
    name: null | string;
    url:  null | string;
}

export type Deployment = {
    hosting:              string;
    aws_accounts:         AwsAccount[];
    deployment_repo:      string;
    deployment_mechanism: string;
    regions:              Region[];
    cd_pipelines:         BuildTool;
}

export type AwsAccount =  {
    name:   string;
    number: number;
}

export type Endpoint = {
    name:                string;
    url:                 string;
    public:              boolean;
    data_classification: string;
    authentication:      string[];
}

export type Interactions = {
    [x: string]: Interaction;
}

export type Interaction = {
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

}

export type Endpoints =  {
    [x: string]: Endpoint;
}

export type LeanSdlc = {
    url:  string;
    path: string;
}

export type OpsDashboard = {
    name: string;
    url:  string;
    type: string;
}

export type QualityStageGates = {
    unit_test_coverage:         number;
    automated_acceptance_tests: string;
    load_tests:                 string;
    resiliency_tests:           string;
    independently_deployable:   string;

}

export type Region = {
    name:     string;
    replicas: number;
    vpc: VPC;
}

export type VPC = {
    name: string
    cidr: string
    tgw: boolean
}

export type SecretsManagement = {
    name: string;
    repo: string;
}

export type Security = {
    transport: Transport;
    at_rest_encryption: string;
}

export type Transport = {
    protocol:   string;
    encryption: string;
}

export type Technology =  {
    name:    string;
    type:    string;
    version: string;
}

export type Diagram = {
    name:   string;
    url:    string;
    description: string;
}
