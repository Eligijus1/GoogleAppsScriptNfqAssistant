function debug() {
  /*
  let userProperties = PropertiesService.getUserProperties();
  let jiraAtlantic = new Jira(userProperties.getProperty('JIRA_ATLANTIC_HOST'), userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
  let originalEstimate = "";
  parsedResponse = jiraAtlantic.searchForIssues('assignee=?? and status not in (Done,Not-Needed,QA) and issuetype = Story order by priority DESC');
  parsedResponse.issues.forEach(function (issue) {
    if (typeof (issue.fields.timetracking.originalEstimate) === "undefined") {
      Logger.log(issue.id + " - " + issue.key);
    }
    else {
      Logger.log(issue.id + " - " + issue.key + " - " + issue.fields.timetracking.originalEstimate);
      //Logger.log(issue);
    }
  });
  */
  /*
  let userProperties = PropertiesService.getUserProperties();
  let jiraAtlantic = new Jira(userProperties.getProperty('JIRA_ATLANTIC_HOST'), userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
  Logger.log(jiraAtlantic.findUserIdByEmail('???'));
    */

  /*
  let userProperties = PropertiesService.getUserProperties();
  let jiraAtlantic = new Jira(userProperties.getProperty('JIRA_ATLANTIC_HOST'), userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
  */

  /*
    let userProperties = PropertiesService.getUserProperties();
    let jiraAtlantic = new Jira(userProperties.getProperty('JIRA_ATLANTIC_HOST'), userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
    jiraAtlantic.getWorkflows();
  */

  /*
  let userProperties = PropertiesService.getUserProperties();
  let jiraAtlantic = new Jira(userProperties.getProperty('JIRA_ATLANTIC_HOST'), userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
  let todayWorkLogIds = jiraAtlantic.getTodayWorkLogIds();
    Logger.log("totalWorkHours: " + totalWorkHours);
  */

  /*
    let userProperties = PropertiesService.getUserProperties();
    let jiraAtlantic = new Jira(userProperties.getProperty('JIRA_ATLANTIC_HOST'), userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
    jiraAtlantic.addWorklogEntry('AECP-67', 3600, 'Test 1')
  */

  /*
      let userProperties = PropertiesService.getUserProperties();
      let jiraAtlantic = new Jira(userProperties.getProperty('JIRA_ATLANTIC_HOST'), userProperties.getProperty('JIRA_ATLANTIC_USER'), userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
      let todayWorkLogIds = jiraAtlantic.getTodayWorkLogIds();
      //Logger.log("todayWorkLogIds: " + todayWorkLogIds);
      let yesterdayWorkLogIds = jiraAtlantic.getYesterdayWorkLogIds();
      //Logger.log("yesterdayWorkLogIds: " + yesterdayWorkLogIds);
            //Logger.log("issuesIds: " + issuesIds);
      let issuesKeys = jiraAtlantic.getIssuesKeysByIssuesIds(issuesIds);
      //Logger.log("issuesKeys: " + issuesKeys);
      jiraAtlantic.addWorklogEntry(issueIdOrKey, timeSpentSeconds, comment)
  */

  // var name = Browser.inputBox('Enter your name', Browser.Buttons.OK_CANCEL);
  /*
  // https://developers.google.com/apps-script/reference/mail/mail-app
  MailApp.sendEmail({
    to: "???",
    subject: "Test mail 1",
    htmlBody: "Test 1<br>" +
      "Test 2"
  });
  */
  /*
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  Logger.log("Remaining daily email quota: " + emailQuotaRemaining);
  MailApp.sendEmail("???",
                  "???",
                  "TPS report status",
                  "What is the status of those TPS reports?");
  */
  /*
  MailApp.sendEmail({
    to: "???",
    subject: "Test mail 1",
    htmlBody: "inline Google Logo<img src='cid:googleLogo'> images! <br>" +
      "inline YouTube Logo <img src='cid:youtubeLogo'>",
    inlineImages:
    {
      googleLogo: googleLogoBlob,
      youtubeLogo: youtubeLogoBlob
    }
  });
  */
  /*
    return CardService
     .newCardBuilder()
     .setHeader(
         CardService.newCardHeader()
             .setTitle('Widget demonstration')
             .setSubtitle('Check out these widgets')
             .setImageStyle(CardService.ImageStyle.SQUARE)
             .setImageUrl(
                 'https://www.example.com/images/headerImage.png'))
     .addSection(
          CardService.newCardSection()
              .setHeader('Simple widgets')  // optional
              .addWidget(CardService.newTextParagraph().setText(
                  'These widgets are display-only. ' +
                  'A text paragraph can have multiple lines and ' +
                  'formatting.'))
              .addWidget(CardService.newImage().setImageUrl(
                  'https://www.example.com/images/mapsImage.png')))
     .addCardAction(CardService.newCardAction().setText('Gmail').setOpenLink(
         CardService.newOpenLink().setUrl('https://mail.google.com/mail')))
     .build();
     */
  /*
  var action = CardService.newAction().setFunctionName("notificationCallback");
  CardService.newTextButton().setText('Save').setOnClickAction(action);
  */
  // ...
  /*
  Logger.log('It ran!');
  SpreadsheetApp.getUi().prompt('prompt here');
  Browser.msgBox('Hello, world!', Browser.Buttons.OK);
  */
  /*
  // The code below sets the value of name to the name input by the user, or 'cancel'.
  var name = Browser.inputBox('Enter your name', Browser.Buttons.OK_CANCEL);
  */
  /*
  let userProperties = PropertiesService.getUserProperties();
  let dubaiLiveCookies = apiAecErpLogin(userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_USER1'), userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_USER1_PASS'));
  let aecErpProblemsReportTaskGenerator = new AecErpProblemsReportTaskGenerator();
  console.info(aecErpProblemsReportTaskGenerator.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkInvoicesOfTypePaymentWithPositiveDueAmount', "34) Found invoices of type Payment with positive due amount."));
  */
  // https://script.google.com/home/usersettings
  // Enable "Google Apps Script API"
  //
  // Google Apps Script GitHub Assistant: Error	[github assistant] undefined
  // Manage your gas code with github/github enterprise/bitbucket/gitlab
  //
}
/*

function notificationCallback() {
  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification()
      .setText("Some info to display to user"))
    .build();
}
*/