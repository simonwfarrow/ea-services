import ServicesRepository from "./ServicesRepository.js";
import {ServiceDescriptor} from "../model/ServiceDescriptor.js";
import {getServiceDescriptors} from "./GitHubQuery.js";

export default class ServicesRepositoryGitHub implements ServicesRepository{

    getServices(config: any): Promise<ServiceDescriptor[]> {
        return getServiceDescriptors(config.connection, config.owner, config.repo).then(repo => {

            let services : ServiceDescriptor[] = [];
            // @ts-ignore
            repo.repository.object.entries.forEach(entry => {
                if (entry.type === 'blob') {
                    let sd = entry.object.text;
                    services.push(new ServiceDescriptor(sd,entry.path));
                }
            });
            return Promise.resolve(services);
        });

    }

}



