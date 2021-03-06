const dotenv = require('dotenv')
const { App, Stack } = require('@aws-cdk/core')
const Configs = require('./configs-stack')
const Cognito = require('./cognito-stack')
const GraphQL = require('./graphql-stack')

const app = new App({ autoSynth: true })
const envVars = { ...dotenv.config().parsed, ...process.env }
const config = {
  ...envVars,
  env: { account: envVars.CDK_AWS_ACCOUNT, region: envVars.CDK_AWS_REGION },
}

const { configs } = new Configs(app, `${config.CDK_STACK_NAME}-${config.CDK_STACK_ENV}-Configs`, { ...config })
const { userPool } = new Cognito(app, `${config.CDK_STACK_NAME}-${config.CDK_STACK_ENV}-Cognito`, {
  ...config,
  ...configs,
})
const { graphQlApi, graphqlApiKey } = new GraphQL(app, `${config.CDK_STACK_NAME}-${config.CDK_STACK_ENV}-GraphQL`, {
  ...config,
  ...configs,
  userPool,
})
