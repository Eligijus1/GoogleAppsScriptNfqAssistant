class Jira {
  constructor(host, user, password) {
    this.host = host;
    this.user = user;
    this.password = password;
  }

  /**
   * Method will log to console JIRA jost and user.
   */
  logToConsoleCreadentials() {
    console.log(`Jira (host=${this.host}, user=${this.user})`);
  }

  // NOTES: 
  // ======
  // Get issue API manual     : https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueidorkey-get
  //
  // Issue worklogs API manual: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklogs/
  //                            https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-worklogs/#api-rest-api-2-issue-issueidorkey-worklog-post
  //
  /**
   * From Atlantic JIRA API extract today WorkLog ids.
   */
  getJiraApiAtlanticTodayWorkLogIds() {
    let userProperties = PropertiesService.getUserProperties();
    let dayStartDateTime = new Date(new Date().setHours(0, 0, 0, 0));
    let dayStartUnixFormat = dayStartDateTime.getTime().toString();
    let encCred = Utilities.base64Encode(userProperties.getProperty('JIRA_ATLANTIC_USER') + ':' + userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
    let url = userProperties.getProperty('JIRA_ATLANTIC_HOST') + "/rest/api/3/worklog/updated?since=" + dayStartUnixFormat;
    let headers = { "Authorization": "Basic " + encCred };

    let options = {
      "method": "GET",
      "contentType": "application/json",
      "headers": headers
    };

    let response = UrlFetchApp.fetch(url, options);
    let parsedResponse = JSON.parse(response);
    //Logger.log(parsedResponse.values);

    let worklogIds = [];

    if (parsedResponse.values.length > 0) {
      parsedResponse.values.forEach(function (value) {
        worklogIds.push(value.worklogId.toString());
      });
    }

    return worklogIds
  }

  /**
   * From Atlantic JIRA API extract today WorkLog ids.
   */
  getJiraApiAtlanticYesterdayWorkLogIds() {
    let userProperties = PropertiesService.getUserProperties();
    let MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
    let now = new Date();
    let yesterday = new Date(now.getTime() - MILLIS_PER_DAY);
    let dayStartDateTime = new Date(yesterday.setHours(0, 0, 0, 0));
    let dayStartUnixFormat = dayStartDateTime.getTime().toString();
    let encCred = Utilities.base64Encode(userProperties.getProperty('JIRA_ATLANTIC_USER') + ':' + userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
    let url = userProperties.getProperty('JIRA_ATLANTIC_HOST') + "/rest/api/3/worklog/updated?since=" + dayStartUnixFormat;
    let headers = { "Authorization": "Basic " + encCred };

    let options = {
      "method": "GET",
      "contentType": "application/json",
      "headers": headers
    };

    let response = UrlFetchApp.fetch(url, options);
    let parsedResponse = JSON.parse(response);
    //Logger.log(parsedResponse.values);

    let worklogIds = [];

    if (parsedResponse.values.length > 0) {
      parsedResponse.values.forEach(function (value) {
        worklogIds.push(value.worklogId.toString());
      });
    }

    return worklogIds
  }

  /**
   * By specified ID array extract worklog details.
   */
  getJiraApiAtlanticIssuesByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, emailAddress) {
    let userProperties = PropertiesService.getUserProperties();
    let encCred = Utilities.base64Encode(userProperties.getProperty('JIRA_ATLANTIC_USER') + ':' + userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
    let url = userProperties.getProperty('JIRA_ATLANTIC_HOST') + "/rest/api/3/worklog/list";
    let headers = { "Authorization": "Basic " + encCred };

    let requestData = {
      "ids": atlanticTodayWorkLogIds
    };

    let options = {
      "method": "POST",
      "contentType": "application/json",
      "headers": headers,
      "payload": JSON.stringify(requestData)
    };

    let response = UrlFetchApp.fetch(url, options);
    let parsedResponse = JSON.parse(response);

    let issueIds = [];

    if (parsedResponse.length > 0) {
      parsedResponse.forEach(function (value) {
        if (value.author.emailAddress === emailAddress) {
          issueIds.push(value.issueId);
        }
      });
    }

    return issueIds;
  }

  /**
   * Extract keys (for example AECP-67) by ids.
   */
  getJiraApiAtlanticWorkedIssuesKeysByIssuesIds(issueIds) {
    let userProperties = PropertiesService.getUserProperties();
    let encCred = Utilities.base64Encode(userProperties.getProperty('JIRA_ATLANTIC_USER') + ':' + userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
    let headers = { "Authorization": "Basic " + encCred };
    let options = { "method": "GET", "contentType": "application/json", "headers": headers };
    let url = '';
    let response = null;
    let parsedResponse = null;
    let issuesKeys = [];

    if (issueIds.length > 0) {
      issueIds.forEach(function (issueId) {
        url = userProperties.getProperty('JIRA_ATLANTIC_HOST') + "/rest/api/3/issue/" + issueId;
        response = UrlFetchApp.fetch(url, options);
        parsedResponse = JSON.parse(response);
        if (issuesKeys.indexOf(parsedResponse.key) === -1) {
          issuesKeys.push(parsedResponse.key);
        }
      });
    }

    return issuesKeys;
  }

  /**
   * Add work log entry to NFQ JIRA over API v2.
   */
  addJiraApiNfqWorklogEntry(issueIdOrKey, timeSpentSeconds, comment) {
    let userProperties = PropertiesService.getUserProperties();
    let url = userProperties.getProperty('JIRA_NFQ_HOST') + "/rest/api/2/issue/" + issueIdOrKey + "/worklog";
    let encCred = Utilities.base64Encode(userProperties.getProperty('JIRA_NFQ_USER') + ':' + userProperties.getProperty('JIRA_NFQ_PASSWORD'));
    let headers = { "Authorization": "Basic " + encCred };
    let requestData = { "timeSpentSeconds": timeSpentSeconds, "comment": comment };
    let options = { "method": "POST", "contentType": "application/json", "headers": headers, "payload": JSON.stringify(requestData) };
    let response = UrlFetchApp.fetch(url, options);
    let parsedResponse = JSON.parse(response);

    Logger.log(parsedResponse);
  }

  /**
   * By specified ID array extract worklog details.
   */
  getJiraApiAtlanticTotalWorkHoursByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, emailAddress) {
    let userProperties = PropertiesService.getUserProperties();
    let encCred = Utilities.base64Encode(userProperties.getProperty('JIRA_ATLANTIC_USER') + ':' + userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
    let url = userProperties.getProperty('JIRA_ATLANTIC_HOST') + "/rest/api/3/worklog/list";
    let headers = { "Authorization": "Basic " + encCred };
    let timeSpentSeconds = 0;

    let requestData = {
      "ids": atlanticTodayWorkLogIds
    };

    let options = {
      "method": "POST",
      "contentType": "application/json",
      "headers": headers,
      "payload": JSON.stringify(requestData)
    };

    let response = UrlFetchApp.fetch(url, options);
    let parsedResponse = JSON.parse(response);

    if (parsedResponse.length > 0) {
      parsedResponse.forEach(function (value) {
        if (value.author.emailAddress === emailAddress) {
          //console.info(value.timeSpent);
          //console.info(value.timeSpentSeconds);
          timeSpentSeconds += value.timeSpentSeconds;
        }
      });
    }

    return timeSpentSeconds;
  }

  /**
   * Create subtask.
   */
  jiraApiAtlanticCreateSubtask(projectKey, parentKey, summary, description, issueTypeId) {
    let userProperties = PropertiesService.getUserProperties();
    let encCred = Utilities.base64Encode(userProperties.getProperty('JIRA_ATLANTIC_USER') + ':' + userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
    let url = userProperties.getProperty('JIRA_ATLANTIC_HOST') + "/rest/api/2/issue";
    let headers = { "Authorization": "Basic " + encCred };

    let requestData = {
      "fields": {
        "project":
        {
          "key": projectKey
        },
        "parent":
        {
          "key": parentKey
        },
        "summary": summary,
        "description": description,
        "issuetype":
        {
          "id": issueTypeId
        },
        //"timeoriginalestimate": "10800"
        "timetracking": {
          "originalEstimate": "2h",
          "remainingEstimate": "2h",
        }
      }
    };

    let options = {
      "method": "POST",
      "contentType": "application/json",
      "headers": headers,
      "payload": JSON.stringify(requestData),
    };

    let response = UrlFetchApp.fetch(url, options);
    let parsedResponse = JSON.parse(response);

    // Write result information:
    //console.info("Case URL: ", "https://atlanticexp.atlassian.net/browse/" + parsedResponse.key);

    return "https://atlanticexp.atlassian.net/browse/" + parsedResponse.key;
  }
}