import 'mocha';
import {ServiceRepositoryLocal} from "../index.js";
import {expect} from "chai";

describe('The Local Service Repository', function () {
    xit('returns a service', function () {
        let repo = new ServiceRepositoryLocal();
        repo.getServices({
            path: '/Users/e5591703/Projects/electronic-architect/resources/service_descriptors'
        }).then(services => {
            expect(services).to.have.length.above(0);
        })
    })
})
