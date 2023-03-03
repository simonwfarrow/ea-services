import {graphql} from '@octokit/graphql';

export async function getServiceDescriptors(url: string, token: string, owner: string, repoName: string) {
    const graphqlAuth = graphql.defaults({
        baseUrl: url,
        headers: {
            authorization: token,
        },
    });

    const repository = await graphqlAuth(
        `query getSDs($owner: String!, $name: String!) {
                    repository(owner: $owner, name: $name ) {
                        object(expression: "HEAD:resources/service_descriptors/") {
                          ... on Tree {
                            entries {
                              name
                              type
                              mode
                              path

                              object {
                                ... on Blob {
                                  byteSize
                                  text
                                  isBinary
                                }
                              }
                            }
                          }
                        }
                    }
                }`,
        {owner: owner, name: repoName},
    );
    return repository;
}
