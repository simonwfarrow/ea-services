import 'mocha';
import ServicesRepositoryGitHub from "./ServicesRepositoryGitHub.js";
import {expect} from "chai";

describe('The Github Service Repository', function () {
    it('returns a service', function () {
        let repo = new ServicesRepositoryGitHub({
            url: 'https://api.github.com',
            token: 'Bearer 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',
            owner: 'simonwfarrow',
            repo: 'ea-resources'
        });
        repo.getServices().then(services => {
            expect(services).to.have.length.above(0);
        })
    })
})
