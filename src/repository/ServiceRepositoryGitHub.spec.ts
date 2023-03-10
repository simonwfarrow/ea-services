import 'mocha';
import {expect} from "chai";
import {getGitHubGraphQLConn} from "@electronic-architect/ea-content";
import ServicesRepositoryGitHub from "./ServicesRepositoryGitHub.js";


describe('The Github Service Repository', function () {
    it('returns a service', function () {
        let conn = getGitHubGraphQLConn(process.env.HOST || 'https://api.github.com' ,`Bearer ${process.env.TOKEN}`);
        const config = {
            connection: conn,
            owner: 'simonwfarrow',
            repo: 'ea-resources'
        };
        const repo = new ServicesRepositoryGitHub();
        repo.getServices(config).then(services => {
            expect(services).to.have.length.above(0);
        })
    })
})
