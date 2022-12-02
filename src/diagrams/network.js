export default function generateNetworkDiagram(services) {
    // get services that have a vpc defined
    const svcsVpc = services.filter(service => service.deployment.regions.filter((region) => region.vpc != null));
    console.log(svcsVpc);
}
