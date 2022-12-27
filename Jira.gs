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

  /**
   * Eextract today WorkLog ids.
   */
  getTodayWorkLogIds() {
    let dayStartDateTime = new Date(new Date().setHours(0, 0, 0, 0));
    let dayStartUnixFormat = dayStartDateTime.getTime().toString();
    let encCred = Utilities.base64Encode(this.user + ':' + this.password);
    let url = this.host + "/rest/api/3/worklog/updated?since=" + dayStartUnixFormat;
    let headers = { "Authorization": "Basic " + encCred };

    let options = {
      "method": "GET",
      "contentType": "application/json",
      "headers": headers
    };

    let response = UrlFetchApp.fetch(url, options);
    let parsedResponse = JSON.parse(response);

    let worklogIds = [];

    if (parsedResponse.values.length > 0) {
      parsedResponse.values.forEach(function (value) {
        worklogIds.push(value.worklogId.toString());
      });
    }

    return worklogIds
  }

  /**
   * Extract today WorkLog ids.
   */
  getYesterdayWorkLogIds() {
    let MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
    let now = new Date();
    let yesterday = new Date(now.getTime() - MILLIS_PER_DAY);
    let dayStartDateTime = new Date(yesterday.setHours(0, 0, 0, 0));
    let dayStartUnixFormat = dayStartDateTime.getTime().toString();
    let encCred = Utilities.base64Encode(this.user + ':' + this.password);
    let url = this.host + "/rest/api/3/worklog/updated?since=" + dayStartUnixFormat;
    let headers = { "Authorization": "Basic " + encCred };

    let options = {
      "method": "GET",
      "contentType": "application/json",
      "headers": headers
    };

    let response = UrlFetchApp.fetch(url, options);
    let parsedResponse = JSON.parse(response);

    let worklogIds = [];

    if (parsedResponse.values.length > 0) {
      parsedResponse.values.forEach(function (value) {
        worklogIds.push(value.worklogId.toString());
      });
    }

    return worklogIds
  }

  /**
   * Extract Issues IDs by specified worklog id.
   * 
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklogs/#api-rest-api-3-worklog-list-post
   */
  getIssuesIdsByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, emailAddress) {
    let encCred = Utilities.base64Encode(this.user + ':' + this.password);
    let url = this.host + "/rest/api/3/worklog/list";
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
   * Extract Issues keys (for example AECP-67) by Issues ids.
   */
  getIssuesKeysByIssuesIds(issueIds) {
    let encCred = Utilities.base64Encode(this.user + ':' + this.password);
    let headers = { "Authorization": "Basic " + encCred };
    let options = { "method": "GET", "contentType": "application/json", "headers": headers };
    let url = '';
    let response = null;
    let parsedResponse = null;
    let issuesKeys = [];
    let currentHost = this.host;

    if (issueIds.length > 0) {
      issueIds.forEach(function (issueId) {
        url = currentHost + "/rest/api/3/issue/" + issueId;
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
   * Add work log entry.
   * 
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklogs/#api-rest-api-3-issue-issueidorkey-worklog-post
   */
  addWorklogEntry(issueIdOrKey, timeSpentSeconds, comment) {
    let url = this.host + "/rest/api/3/issue/" + issueIdOrKey + "/worklog";
    let encCred = Utilities.base64Encode(this.user + ':' + this.password);
    let headers = { "Authorization": "Basic " + encCred };

    let requestData = {
      "timeSpentSeconds": timeSpentSeconds,
      "comment": {
        "type": "doc",
        "version": 1,
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "text": comment,
                "type": "text"
              }
            ]
          }
        ]
      }
    };

    let options = {
      "method": "POST",
      "contentType": "application/json",
      "headers": headers,
      "payload": JSON.stringify(requestData)
    };

    let response = UrlFetchApp.fetch(url, options);
    let parsedResponse = JSON.parse(response);

    Logger.log(parsedResponse);
  }

  /**
   * Extract today total time.
   */
  getTotalWorkHoursByWorkLogIdsAndAuthorEmail(todayWorkLogIds, emailAddress) {
    let encCred = Utilities.base64Encode(this.user + ':' + this.password);
    let url = this.host + "/rest/api/3/worklog/list";
    let headers = { "Authorization": "Basic " + encCred };
    let timeSpentSeconds = 0;

    let requestData = {
      "ids": todayWorkLogIds
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
  createSubtask(projectKey, parentKey, summary, description, issueTypeId) {
    let encCred = Utilities.base64Encode(this.user + ':' + this.password);
    let url = this.h + "/rest/api/3/issue";
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

  /**
   * Extract existing workflows.
   * 
   * NOTE: Only Jira administrators can access workflows.
   * 
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflow-search-get
   */
  getWorkflows() {
    let encCred = Utilities.base64Encode(this.user + ':' + this.password);
    let url = this.host + "/rest/api/3/workflow/search";
    let headers = { "Authorization": "Basic " + encCred };
    let timeSpentSeconds = 0;

    let options = {
      "method": "GET",
      "contentType": "application/json",
      "headers": headers
    };

    let response = UrlFetchApp.fetch(url, options);
    console.log(response);
    //let parsedResponse = JSON.parse(response);

    /*
    if (parsedResponse.length > 0) {
      parsedResponse.forEach(function (value) {
        if (value.author.emailAddress === emailAddress) {
          //console.info(value.timeSpent);
          //console.info(value.timeSpentSeconds);
          timeSpentSeconds += value.timeSpentSeconds;
        }
      });
    }
    */

    //return timeSpentSeconds;
  }

  /**
   * Search issues.
   * 
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-post
   */
  searchForIssues(jql) {
    let encCred = Utilities.base64Encode(this.user + ':' + this.password);
    let url = this.host + "/rest/api/3/search";
    let headers = { "Authorization": "Basic " + encCred };
    //let jql = '("Epic Link" = AEWL2-73)';
    //let jql = '(parent=AEWL2-73 OR "Epic Link"=AEWL2-73 OR "Parent Link"=AEWL2-73) AND status not in (Closed,Done,Canceled,Declined,Not-Needed,QA) AND assignee="eligijus.stugys@nfq.lt"'
    //let jql = 'status=QA AND assignee="eligijus.stugys@nfq.lt"'

    let requestData = {
      "jql": jql,
      /*
      "expand": [
        "names",
        "schema",
        "operations"
      ],
      */
      "maxResults": 50,
      "fieldsByKeys": false,
      "fields": [
        //"summary",
        //"status",
        //"assignee"
        "id",
        "key",
        "assignee.displayName"
      ],
      "startAt": 0
    };

    let options = {
      "method": "POST",
      "contentType": "application/json",
      "headers": headers,
      "payload": JSON.stringify(requestData),
    };

    let response = UrlFetchApp.fetch(url, options);
    let parsedResponse = JSON.parse(response);

    // DEBUG:
    /*
    Logger.log("Total issues extracted: " + parsedResponse.issues.length);
    parsedResponse.issues.forEach(function (issue) {
      
      Logger.log(issue.id + " - " + issue.key);
    });
    */

    return parsedResponse;
  }

  /**
   * Assign specified user QA tasks to anotherspecified user.
   * 
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueidorkey-assignee-put
   * 
   * TODO: implement
   */
  assignQaTasksToAnotherPerson(emailAddressFrom, emailAddressTo) {
    let encCred = Utilities.base64Encode(this.user + ':' + this.password);
    let url = this.host + "/rest/api/3/worklog/list";
    let headers = { "Authorization": "Basic " + encCred };
    let fromQaTasks = this.jiraAtlantic.searchForIssues('status=QA AND assignee="eligijus.stugys@nfq.lt"');

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

    /*
    if (parsedResponse.length > 0) {
      parsedResponse.forEach(function (value) {
        if (value.author.emailAddress === emailAddress) {
          //console.info(value.timeSpent);
          //console.info(value.timeSpentSeconds);
          timeSpentSeconds += value.timeSpentSeconds;
        }
      });
    }
    */

    // return timeSpentSeconds;
  }
}
