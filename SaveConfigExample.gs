/**
 * Method responsible for configuratio save.
 */
function saveConfiguration() {
  let userProperties = PropertiesService.getUserProperties();
  
  userProperties.setProperty('JIRA_NFQ_HOST', '???');
  userProperties.setProperty('JIRA_NFQ_USER', '???');
  userProperties.setProperty('JIRA_NFQ_PASSWORD', '???');

  userProperties.setProperty('JIRA_ATLANTIC_HOST', '???');
  userProperties.setProperty('JIRA_ATLANTIC_USER', '???');
  userProperties.setProperty('JIRA_ATLANTIC_PASSWORD', '???');

  userProperties.setProperty('MAIL_J', '??');

  Logger.log(userProperties.getProperties());
}