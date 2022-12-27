function main() {
  let userProperties = PropertiesService.getUserProperties();
  let jiraNfq = new Jira(userProperties.getProperty('JIRA_NFQ_HOST'), userProperties.getProperty('JIRA_NFQ_USER'), userProperties.getProperty('JIRA_NFQ_PASSWORD'));
  let jiraAtlantic = new Jira(userProperties.getProperty('JIRA_ATLANTIC_HOST'), userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));

  jiraAtlantic.assignQaTasksToAnotherPerson('eligijus.stugys@nfq.lt', 'justas@atlanticexpresscorp.com');
}
