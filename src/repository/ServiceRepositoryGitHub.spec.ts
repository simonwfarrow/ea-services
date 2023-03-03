import 'mocha';
import ServicesRepositoryGitHub from "./ServicesRepositoryGitHub.js";
import {expect} from "chai";

describe('The Github Service Repository', function () {
    it('returns a service', function () {
        let repo = new ServicesRepositoryGitHub();
        repo.getServices({
            url: 'https://github.worldpay.com/api',
            token: 'Bearer <TOKEN>',
            owner: 'access-for-ecom-doc',
            repo: 'electronic-architect'
        }).then(services => {
            expect(services).to.have.length.above(0);
        })
    })
})
