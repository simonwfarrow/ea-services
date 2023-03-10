import ServicesRepository from "./ServicesRepository.js";
import {ServiceDescriptor} from "../model/ServiceDescriptor.js";
import * as fs from "fs";
import path from "path";

class ServiceRepositoryLocal implements ServicesRepository {

    getServices(config: any): Promise<ServiceDescriptor[]> {

        let services: ServiceDescriptor[] = [];
        fs.readdir(config.path, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            files.forEach(function (file) {

                file = path.resolve(config.path, file);

                fs.readFile(file, 'utf-8', (err,data) => {
                    if (err) {
                        console.error(err);
                    }
                    services.push(new ServiceDescriptor(data,file));
                });



            });

        });
        return Promise.resolve(services);
    }
}

export default ServiceRepositoryLocal
