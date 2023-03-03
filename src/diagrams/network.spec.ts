import {expect} from 'chai';
import {it} from "mocha";
import ServiceDescriptor from "../ServiceDescriptor.js";
import {generateNetworkDiagram, generateServiceDiagram} from "../index.js";

const sdVPC : string = 'name: Access 3DS\n' +
    'description: Provides a 3DS card check\n' +
    'type: platform\n' +
    'status: Live\n' +
    'code_repo: https://github.worldpay.io/com-worldpay-gateway/customer-verifications\n' +
    'doc_repo: https://bluedragon.atlassian.net/wiki/spaces/CER/pages/993165321/CV\n' +
    'lean_sdlc:\n' +
    '  url: https://github.worldpay.com/lean-sdlc/lean-sdlc/blob/master/_data/metrics/AccessForEcomm/Aries/team_details.json\n' +
    '  path: "Services.Payments"\n' +
    'secrets_management:\n' +
    '  name: Vault\n' +
    '  repo: https://cerberus2-vault.prod.euw1.gw2.worldpay.io/ui/vault/secrets/secret/list\n' +
    'team: Cerberus\n' +
    'technology:\n' +
    '  - name: Java\n' +
    '    type: language\n' +
    '    version: 11\n' +
    '  - name: Springboot\n' +
    '    type: framework\n' +
    '    version: 2.6.7\n' +
    '  - name: Docker\n' +
    '    type: container\n' +
    '    version: 2.4\n' +
    'quality_stage_gates:\n' +
    '  unit_test_coverage: 99%\n' +
    '  automated_acceptance_tests: yes\n' +
    '  load_tests: yes\n' +
    '  resiliency_tests: manual (DR performed once a year)\n' +
    '  independently_deployable: yes\n' +
    'build_tool:\n' +
    '  name: Gradle\n' +
    '  url: N/A\n' +
    'ci_pipelines: # array of CI pipelines\n' +
    '  - name: CV Build\n' +
    '    url: https://cerberus-build-ci-1.npe.euw1.gw2.worldpay.io/view/CV/job/CV%20Build/job/master/\n' +
    'ops_dashboards: # array of operational dashboards i.e.\n' +
    '  - name: Cerberus - CV - Graphs\n' +
    '    url: https://app.scalyr.com/dash?page=Cerberus+-+CV+-+Graphs\n' +
    '    type: Scalyr\n' +
    '  - name: Cerberus - CV - Merchant Impact\n' +
    '    url: https://app.scalyr.com/dash?page=Cerberus+-+CV+-+Merchant+Impact\n' +
    '    type: Scalyr\n' +
    'interactions:\n' +
    '  tokens_detokenize_pan:\n' +
    '    name: Tokens Service\n' +
    '    endpoints:\n' +
    '      tokens:\n' +
    '        url: https://access.worldpay.com/tokens\n' +
    '        schema: https://access.worldpay.com/rels/tokens/tokens.json\n' +
    '    protocol: https\n' +
    '    timeout: 30s\n' +
    '    simulator_available: yes\n' +
    '    repo: https://github.worldpay.io/com-worldpay-gateway/com-worldpay-gateway-tokens\n' +
    '    description: To retrieve the card details from a merchant token\n' +
    '    flow_direction: out\n' +
    '    pact: https://pactbroker.npe.euw1.gw2.worldpay.io/pacts/provider/tokens/consumer/customerVerifications/latest\n' +
    '  card_payments_wpg:\n' +
    '    name: WPG\n' +
    '    endpoints:\n' +
    '      wpg:\n' +
    '        url: https://secure.worldpay.com/shoppercell/jsp/paymentAgentXml.jsp\n' +
    '    protocol: https\n' +
    '    timeout: 30s\n' +
    '    simulator_available: yes\n' +
    '    repo: N/A\n' +
    '    description: Routing of card authentication currently go to WPG as the downstream gateway\n' +
    '    flow_direction: out\n' +
    '    pact: https://pactbroker.npe.euw1.gw2.worldpay.io/pacts/provider/wpg/consumer/customerVerifications/latest\n' +
    'diagrams: # array of diagrams\n' +
    '  - name: Customer-Verifications Service Network Diagram\n' +
    '    url: https://github.devops.worldpay.local/com-worldpay-gateway/cerberus-pci-cv/blob/master/2022/E004/README.md\n' +
    '    description: Payment Service Network Diagram\n' +
    'deployment: # intended to capture where the service runs\n' +
    '  hosting: EC2\n' +
    '  aws_accounts:\n' +
    '    - name: Service Account\n' +
    '      number: 364586733063\n' +
    '  deployment_repo:\n' +
    '    - https://github.worldpay.io/com-worldpay-gateway/customer-verifications\n' +
    '    - https://github.worldpay.io/com-worldpay-gateway/customer-verifications-conf\n' +
    '    - https://github.worldpay.io/com-worldpay-gateway/customer-verifications-infra\n' +
    '  deployment_mechanism: terraform\n' +
    '  regions: # array of aws regions the service runs out of and replica count i.e.\n' +
    '    - name: eu-west-1\n' +
    '      replicas: 3\n' +
    '      vpc: \n' +
    '        name: vpc-123\n' +
    '        cidr: 110.140.32.0/21\n' +
    '        tgw: false\n' +
    '    - name: eu-west-2\n' +
    '      replicas: 3\n' +
    '      vpc: \n' +
    '        name: vpc-123\n' +
    '        cidr: 110.140.32.0/21\n' +
    '        tgw: false\n' +
    '    - name: eu-central-1\n' +
    '      replicas: 3\n' +
    '      vpc: \n' +
    '        name: vpc-123\n' +
    '        cidr: 110.140.32.0/21\n' +
    '        tgw: false\n' +
    '  cd_pipelines: # array of CD pipelines\n' +
    '    - name: CV - new deploy job\n' +
    '      url: https://cerberus-build-ci-1.prod.euw1.gw2.worldpay.io/job/CV%20Deployment%20-%20V2/job/CV%20-%20new%20deploy%20job/\n' +
    '    - name: CV - Canary Job\n' +
    '      url: https://cerberus-build-ci-1.prod.euw1.gw2.worldpay.io/job/CV%20Deployment%20-%20V2/job/CV%20-%20Canary%20Job/\n' +
    '    - name: CV - Destroy Job\n' +
    '      url: https://cerberus-build-ci-1.prod.euw1.gw2.worldpay.io/job/CV%20Deployment%20-%20V2/job/CV%20-%20destroy%20job/\n' +
    'endpoint: # array of the public/private endpoints this service provides, could be a single link to the root resource\n' +
    '  name: Customer-Verifications Resource Tree\n' +
    '  url: https://access.worldpay.com/customer-verifications/resourceTree\n' +
    '  public: true\n' +
    '  data_classification: pci-dss\n' +
    '  authentication:\n' +
    '      - basic\n' +
    '      - jwt\n' +
    'security:\n' +
    '  transport:\n' +
    '    protocol: http\n' +
    '    encryption: tls\n' +
    '  at_rest_encryption: N/A\n';


const sdNoVPC : string = 'name: Access 3DS\n' +
    'description: Provides a 3DS card check\n' +
    'type: platform\n' +
    'status: Live\n' +
    'code_repo: https://github.worldpay.io/com-worldpay-gateway/customer-verifications\n' +
    'doc_repo: https://bluedragon.atlassian.net/wiki/spaces/CER/pages/993165321/CV\n' +
    'lean_sdlc:\n' +
    '  url: https://github.worldpay.com/lean-sdlc/lean-sdlc/blob/master/_data/metrics/AccessForEcomm/Aries/team_details.json\n' +
    '  path: "Services.Payments"\n' +
    'secrets_management:\n' +
    '  name: Vault\n' +
    '  repo: https://cerberus2-vault.prod.euw1.gw2.worldpay.io/ui/vault/secrets/secret/list\n' +
    'team: Cerberus\n' +
    'technology:\n' +
    '  - name: Java\n' +
    '    type: language\n' +
    '    version: 11\n' +
    '  - name: Springboot\n' +
    '    type: framework\n' +
    '    version: 2.6.7\n' +
    '  - name: Docker\n' +
    '    type: container\n' +
    '    version: 2.4\n' +
    'quality_stage_gates:\n' +
    '  unit_test_coverage: 99%\n' +
    '  automated_acceptance_tests: yes\n' +
    '  load_tests: yes\n' +
    '  resiliency_tests: manual (DR performed once a year)\n' +
    '  independently_deployable: yes\n' +
    'build_tool:\n' +
    '  name: Gradle\n' +
    '  url: N/A\n' +
    'ci_pipelines: # array of CI pipelines\n' +
    '  - name: CV Build\n' +
    '    url: https://cerberus-build-ci-1.npe.euw1.gw2.worldpay.io/view/CV/job/CV%20Build/job/master/\n' +
    'ops_dashboards: # array of operational dashboards i.e.\n' +
    '  - name: Cerberus - CV - Graphs\n' +
    '    url: https://app.scalyr.com/dash?page=Cerberus+-+CV+-+Graphs\n' +
    '    type: Scalyr\n' +
    '  - name: Cerberus - CV - Merchant Impact\n' +
    '    url: https://app.scalyr.com/dash?page=Cerberus+-+CV+-+Merchant+Impact\n' +
    '    type: Scalyr\n' +
    'interactions:\n' +
    '  tokens_detokenize_pan:\n' +
    '    name: Tokens Service\n' +
    '    endpoints:\n' +
    '      tokens:\n' +
    '        url: https://access.worldpay.com/tokens\n' +
    '        schema: https://access.worldpay.com/rels/tokens/tokens.json\n' +
    '    protocol: https\n' +
    '    timeout: 30s\n' +
    '    simulator_available: yes\n' +
    '    repo: https://github.worldpay.io/com-worldpay-gateway/com-worldpay-gateway-tokens\n' +
    '    description: To retrieve the card details from a merchant token\n' +
    '    flow_direction: out\n' +
    '    pact: https://pactbroker.npe.euw1.gw2.worldpay.io/pacts/provider/tokens/consumer/customerVerifications/latest\n' +
    '  card_payments_wpg:\n' +
    '    name: WPG\n' +
    '    endpoints:\n' +
    '      wpg:\n' +
    '        url: https://secure.worldpay.com/shoppercell/jsp/paymentAgentXml.jsp\n' +
    '    protocol: https\n' +
    '    timeout: 30s\n' +
    '    simulator_available: yes\n' +
    '    repo: N/A\n' +
    '    description: Routing of card authentication currently go to WPG as the downstream gateway\n' +
    '    flow_direction: out\n' +
    '    pact: https://pactbroker.npe.euw1.gw2.worldpay.io/pacts/provider/wpg/consumer/customerVerifications/latest\n' +
    'diagrams: # array of diagrams\n' +
    '  - name: Customer-Verifications Service Network Diagram\n' +
    '    url: https://github.devops.worldpay.local/com-worldpay-gateway/cerberus-pci-cv/blob/master/2022/E004/README.md\n' +
    '    description: Payment Service Network Diagram\n' +
    'deployment: # intended to capture where the service runs\n' +
    '  hosting: EC2\n' +
    '  aws_accounts:\n' +
    '    - name: Service Account\n' +
    '      number: 364586733063\n' +
    '  deployment_repo:\n' +
    '    - https://github.worldpay.io/com-worldpay-gateway/customer-verifications\n' +
    '    - https://github.worldpay.io/com-worldpay-gateway/customer-verifications-conf\n' +
    '    - https://github.worldpay.io/com-worldpay-gateway/customer-verifications-infra\n' +
    '  deployment_mechanism: terraform\n' +
    '  regions: # array of aws regions the service runs out of and replica count i.e.\n' +
    '    - name: eu-west-1\n' +
    '      replicas: 3\n' +
    '    - name: eu-west-2\n' +
    '      replicas: 3\n' +
    '    - name: eu-central-1\n' +
    '      replicas: 3\n' +
    '  cd_pipelines: # array of CD pipelines\n' +
    '    - name: CV - new deploy job\n' +
    '      url: https://cerberus-build-ci-1.prod.euw1.gw2.worldpay.io/job/CV%20Deployment%20-%20V2/job/CV%20-%20new%20deploy%20job/\n' +
    '    - name: CV - Canary Job\n' +
    '      url: https://cerberus-build-ci-1.prod.euw1.gw2.worldpay.io/job/CV%20Deployment%20-%20V2/job/CV%20-%20Canary%20Job/\n' +
    '    - name: CV - Destroy Job\n' +
    '      url: https://cerberus-build-ci-1.prod.euw1.gw2.worldpay.io/job/CV%20Deployment%20-%20V2/job/CV%20-%20destroy%20job/\n' +
    'endpoint: # array of the public/private endpoints this service provides, could be a single link to the root resource\n' +
    '  name: Customer-Verifications Resource Tree\n' +
    '  url: https://access.worldpay.com/customer-verifications/resourceTree\n' +
    '  public: true\n' +
    '  data_classification: pci-dss\n' +
    '  authentication:\n' +
    '      - basic\n' +
    '      - jwt\n' +
    'security:\n' +
    '  transport:\n' +
    '    protocol: http\n' +
    '    encryption: tls\n' +
    '  at_rest_encryption: N/A\n';

describe('The network module', function() {
    it('generates a network diagram from multiple service descriptors', function () {

        let sds: ServiceDescriptor[] = [];
        sds.push(new ServiceDescriptor(sdVPC));
        sds.push(new ServiceDescriptor(sdNoVPC))

        const result = generateNetworkDiagram(sds);

        expect('@startuml\n'
            + 'skinparam backgroundColor transparent\n'
            + '!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml\n'
            + '!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml\n'
            + '!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml\n'
            + 'Boundary(vpc-123,vpc-123-110.140.32.0/21){\n'
            + 'Container(access3ds, Access 3DS)\n'
            + '}\n'
            + 'SHOW_LEGEND()\n'
            + '@enduml').to.eq(result);

    })
})
