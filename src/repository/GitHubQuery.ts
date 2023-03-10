import {graphql} from "@octokit/graphql/dist-types/types";


export async function getServiceDescriptors(connection: graphql, owner: string, repoName: string) {

    const repository = await connection(
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
