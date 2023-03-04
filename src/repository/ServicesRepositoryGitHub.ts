import ServicesRepository from "./ServicesRepository.js";
import ServiceDescriptor from "../ServiceDescriptor.js";
import {getServiceDescriptors} from "./GitHubQuery.js";

export default class ServicesRepositoryGitHub implements ServicesRepository{

    config: any;
    constructor(config: any) {
        this.config = config
    }

    getServices(): Promise<ServiceDescriptor[]> {
        return getServiceDescriptors(this.config.url, this.config.token, this.config.owner, this.config.repo).then(repo => {

            let services : ServiceDescriptor[] = [];
            // @ts-ignore
            repo.repository.object.entries.forEach(entry => {
                if (entry.type === 'blob') {
                    let sd = entry.object.text;
                    services.push(new ServiceDescriptor(sd));
                }
            });
            return Promise.resolve(services);
        });

    }

}



