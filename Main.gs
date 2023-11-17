/**
 * Main cron method, that is executed every time.
 */
function main() {
  Logger.log("Assistant v1 'main' method started.");

  let userProperties = PropertiesService.getUserProperties();
  let jiraAtlantic = new Jira(userProperties.getProperty('JIRA_ATLANTIC_HOST'), userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));

  jiraAtlantic.assignQaTasksToAnotherPerson(userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('MAIL_J'));
  jiraAtlantic.unAssignDoneTasksFromPerson(userProperties.getProperty('JIRA_ATLANTIC_USER'));

  Logger.log("'main' method finished.");
}

/**
 * Time trigger method, to copy registered hours from Atlantic JIRA to NFQ JIRA.
 */
function registerTodayAtlanticJiraHoursToNfqJira() {
  let userProperties = PropertiesService.getUserProperties();
  let jiraAtlantic = new Jira(userProperties.getProperty('JIRA_ATLANTIC_HOST'), userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
  let jiraNfq = new Jira(userProperties.getProperty('JIRA_NFQ_HOST'), userProperties.getProperty('JIRA_NFQ_USER'), userProperties.getProperty('JIRA_NFQ_PASSWORD'));
  let dayToday = new Date(new Date().setHours(0, 0, 0, 0));// Today
  jiraAtlantic.copyHoursReportToAnotherJiraCase('AECP-8097', dayToday, jiraNfq, "Worked on Atlantic JIRA (https://atlanticexp.atlassian.net) cases: ");
}

/**
 * Time trigger method, to copy registered hours from Atlantic JIRA to NFQ JIRA.
 */
function registerYesterdayAtlanticJiraHoursToNfqJira() {
  let userProperties = PropertiesService.getUserProperties();
  let jiraAtlantic = new Jira(userProperties.getProperty('JIRA_ATLANTIC_HOST'), userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
  let jiraNfq = new Jira(userProperties.getProperty('JIRA_NFQ_HOST'), userProperties.getProperty('JIRA_NFQ_USER'), userProperties.getProperty('JIRA_NFQ_PASSWORD'));
  let dayYesterday = new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0));
  jiraAtlantic.copyHoursReportToAnotherJiraCase('AECP-8097', dayYesterday, jiraNfq, "Worked on Atlantic JIRA (https://atlanticexp.atlassian.net) cases: ");
}
