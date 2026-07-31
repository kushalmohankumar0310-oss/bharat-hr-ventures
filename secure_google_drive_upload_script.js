/**
 * BHARAT HR VENTURES PRIVATE LIMITED - BACKEND INTEGRATION
 * GOOGLE SHEETS & GOOGLE DRIVE SECURE DATABASE CONNECTOR
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Click Extensions -> Apps Script.
 * 3. Replace all default code with this script.
 * 4. Save and click Deploy -> Manage Deployments.
 * 5. Edit the active deployment, change version to "New version", and click Deploy.
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    
    // Check if the request is a file upload or a standard survey lead
    if (data.action === "upload" && data.fileData) {
      // 1. PROCESS SECURE FILE UPLOAD TO GOOGLE DRIVE
      var folderName = "Bharat HR Ventures Lead Uploads";
      var folders = DriveApp.getFoldersByName(folderName);
      var folder;
      
      if (folders.hasNext()) {
        folder = folders.next();
      } else {
        folder = DriveApp.createFolder(folderName);
      }
      
      // Decode base64 file data
      var contentType = data.mimeType || "application/octet-stream";
      var decodedBytes = Utilities.base64Decode(data.fileData);
      var blob = Utilities.newBlob(decodedBytes, contentType, data.filename);
      var file = folder.createFile(blob);
      
      // Set sharing settings to "anyone with link can view" so administrators can open it via the link
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      
      var fileUrl = file.getUrl();
      
      // 2. LOG FILE DETAILS TO "Uploaded Documents" TAB
      var docSheet = ss.getSheetByName("Uploaded Documents");
      if (!docSheet) {
        docSheet = ss.insertSheet("Uploaded Documents");
      }
      
      if (docSheet.getLastRow() === 0) {
        docSheet.appendRow([
          "Status",
          "Timestamp (IST)",
          "Company Name",
          "Contact Name",
          "Email Address",
          "Document Type",
          "File Name",
          "Google Drive Secure Link"
        ]);
        var headerRange = docSheet.getRange(1, 1, 1, 8);
        headerRange.setFontWeight("bold")
                   .setBackground("#0f172a")
                   .setFontColor("#ffffff")
                   .setFontSize(11)
                   .setHorizontalAlignment("center")
                   .setVerticalAlignment("middle");
        docSheet.setRowHeight(1, 35);
      }
      
      docSheet.appendRow([
        "Yet to Review",
        data.timestamp,
        data.companyName,
        data.contactName,
        data.emailAddress,
        data.documentType,
        data.filename,
        fileUrl
      ]);
      
      var lastRow = docSheet.getLastRow();
      var rowRange = docSheet.getRange(lastRow, 1, 1, 8);
      rowRange.setFontSize(10)
              .setVerticalAlignment("middle")
              .setWrap(true);
              
      docSheet.getRange(lastRow, 1).setHorizontalAlignment("center");
      docSheet.getRange(lastRow, 2).setHorizontalAlignment("center");
      docSheet.getRange(lastRow, 8).setHorizontalAlignment("left");
      
      docSheet.autoResizeColumns(1, 8);
      docSheet.setColumnWidth(8, 300); // Drive Link width
      
    } else {
      // 3. PROCESS STANDARD SURVEY LEAD SUBMISSION
      var leadsSheet = ss.getSheetByName("Leads");
      if (!leadsSheet) {
        leadsSheet = ss.insertSheet("Leads");
      }
      
      if (leadsSheet.getLastRow() === 0) {
        leadsSheet.appendRow([
          "Status", 
          "Timestamp (IST)", 
          "Company Name", 
          "Contact Name", 
          "Email Address", 
          "Phone Number", 
          "Service Required", 
          "Message / Requirements", 
          "Q1: Importance of Social Security", 
          "Q2: Offered Benefits", 
          "Q3: Primary Reason", 
          "Q4: Satisfaction", 
          "Q5: Productivity Impact", 
          "Q6: Challenges Faced", 
          "Q7: Expansion Intent"
        ]);
        var headerRange = leadsSheet.getRange(1, 1, 1, 15);
        headerRange.setFontWeight("bold")
                   .setBackground("#0f172a")
                   .setFontColor("#ffffff")
                   .setFontSize(11)
                   .setHorizontalAlignment("center")
                   .setVerticalAlignment("middle");
        leadsSheet.setRowHeight(1, 35);
      }
      
      leadsSheet.appendRow([
        "Yet to Contact", 
        data.timestamp,
        data.companyName,
        data.contactName,
        data.emailAddress,
        "'" + data.phoneNumber,
        data.serviceRequired,
        data.message,
        data.q1Importance,
        data.q2Benefits,
        data.q3Reason,
        data.q4Satisfaction,
        data.q5Productivity,
        data.q6Challenges,
        data.q7Expansion
      ]);
      
      var lastRow = leadsSheet.getLastRow();
      var rowRange = leadsSheet.getRange(lastRow, 1, 1, 15);
      rowRange.setFontSize(10)
              .setVerticalAlignment("middle")
              .setWrap(true);
              
      leadsSheet.getRange(lastRow, 1).setHorizontalAlignment("center");
      leadsSheet.getRange(lastRow, 2).setHorizontalAlignment("center");
      leadsSheet.getRange(lastRow, 6).setHorizontalAlignment("center");
      
      leadsSheet.autoResizeColumns(1, 15);
      leadsSheet.setColumnWidth(8, 250);
      leadsSheet.setColumnWidth(9, 220);
      leadsSheet.setColumnWidth(10, 220);
      leadsSheet.setColumnWidth(13, 220);
      leadsSheet.setColumnWidth(14, 250);
    }
    
    // Auto-clean default empty sheets (e.g. Sheet1) to keep the file neat
    var defaultSheet = ss.getSheetByName("Sheet1");
    if (defaultSheet && ss.getSheets().length > 1 && defaultSheet.getLastRow() === 0) {
      ss.deleteSheet(defaultSheet);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
