var oldeEstimate: any[] = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,2.0,0.0]
var newEstimate: any[] = [0.0,0.0,0.0,0.0,0.0,2.0,2.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.5,0.5,0.0,3.0,1.0,0.0,0.0,2.0,0.5,0.5,2.0,3.0,2.0]
var DateTIME: any[] = ["07/13/2022","07/13/2022","07/13/2022","07/13/2022","07/13/2022","07/20/2022","07/20/2022","07/20/2022","07/20/2022","07/20/2022","07/20/2022","07/20/2022","07/21/2022","07/21/2022","07/21/2022","07/21/2022","07/21/2022","07/21/2022","07/21/2022","07/21/2022","07/21/2022","07/25/2022","07/26/2022","07/26/2022","07/27/2022","07/29/2022","07/29/2022","07/29/2022","07/29/2022","07/29/2022","08/04/2022"]
var DateTIME: any[] = ["1657712863000","1657713006000","1657713272000","1657713522000","1657713686000","1658306786000","1658306888000","1658314390000","1658314473000","1658314648000","1658314780000","1658314841000","1658381234000","1658381449000","1658388365000","1658388445000","1658388770000","1658395001000","1658395014000","1658395303000","1658396180000","1658740153000","1658822945000","1658833812000","1658899340000","1659073304000","1659087440000","1659087714000","1659097230000","1659097284000","1659590136000"]
export const chartConfig = {
    // burndownchar:{"changes":{"1632287465000":[{"key":"BLINTERIM-3","statC":{}}],"1632287466000":[{"key":"BLINTERIM-3","added":true}],"1632287668000":[{"key":"BLINTERIM-2","statC":{},"added":true}],"1632287793000":[{"key":"BLINTERIM-1","statC":{}}],"1632287794000":[{"key":"BLINTERIM-1","added":true}],"1632294224000":[{"key":"BLINTERIM-1","column":{"notDone":true,"newStatus":"10003"}},{"key":"BLINTERIM-2","column":{"notDone":true,"newStatus":"10003"}}],"1632294225000":[{"key":"BLINTERIM-3","column":{"notDone":true,"newStatus":"10003"}}],"1632305778000":[{"key":"BLINTERIM-3","column":{"notDone":false,"done":true,"newStatus":"5"}}],"1632990723000":[{"key":"BLINTERIM-3","column":{"notDone":true,"done":false,"newStatus":"4"}}],"1633607196000":[{"key":"BLINTERIM-33","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633607334000":[{"key":"BLINTERIM-34","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633607854000":[{"key":"BLINTERIM-35","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633608175000":[{"key":"BLINTERIM-36","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633608304000":[{"key":"BLINTERIM-37","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633608613000":[{"key":"BLINTERIM-38","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633608805000":[{"key":"BLINTERIM-39","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633608971000":[{"key":"BLINTERIM-40","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633609549000":[{"key":"BLINTERIM-41","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633610055000":[{"key":"BLINTERIM-42","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633611037000":[{"key":"BLINTERIM-43","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633611511000":[{"key":"BLINTERIM-44","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633612397000":[{"key":"BLINTERIM-45","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633612837000":[{"key":"BLINTERIM-46","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633613008000":[{"key":"BLINTERIM-47","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633613122000":[{"key":"BLINTERIM-48","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1633683911000":[{"key":"BLINTERIM-43","statC":{"newValue":14400.0}}],"1633684004000":[{"key":"BLINTERIM-47","statC":{"newValue":10800.0}}],"1633701582000":[{"key":"BLINTERIM-38","statC":{"newValue":14400.0}}],"1633704228000":[{"key":"BLINTERIM-42","statC":{"newValue":7200.0}}],"1633941928000":[{"key":"BLINTERIM-37","statC":{"newValue":10800.0}}],"1633941955000":[{"key":"BLINTERIM-36","statC":{"newValue":10800.0}}],"1634042505000":[{"key":"BLINTERIM-33","column":{"notDone":false,"done":true,"newStatus":"10005"}}],"1634042524000":[{"key":"BLINTERIM-34","column":{"notDone":false,"done":true,"newStatus":"10005"}}],"1634042533000":[{"key":"BLINTERIM-36","column":{"notDone":false,"done":true,"newStatus":"10005"}}],"1634042543000":[{"key":"BLINTERIM-37","column":{"notDone":false,"done":true,"newStatus":"10005"}}],"1634042552000":[{"key":"BLINTERIM-38","column":{"notDone":false,"done":true,"newStatus":"10005"}}],"1634042561000":[{"key":"BLINTERIM-40","column":{"notDone":false,"done":true,"newStatus":"5"}}],"1634042568000":[{"key":"BLINTERIM-41","column":{"notDone":false,"done":true,"newStatus":"10005"}}],"1634042576000":[{"key":"BLINTERIM-42","column":{"notDone":false,"done":true,"newStatus":"10005"}}],"1634044673000":[{"key":"BLINTERIM-46","column":{"notDone":false,"done":true,"newStatus":"5"}}],"1634727398000":[{"key":"BLINTERIM-3","column":{"notDone":false,"done":true,"newStatus":"5"}}],"1634727564000":[{"key":"BLINTERIM-2","column":{"notDone":false,"done":true,"newStatus":"5"}}],"1634727592000":[{"key":"BLINTERIM-35","column":{"notDone":false,"done":true,"newStatus":"10005"}}],"1634727599000":[{"key":"BLINTERIM-45","column":{"notDone":false,"done":true,"newStatus":"5"}}],"1634727604000":[{"key":"BLINTERIM-47","column":{"notDone":false,"done":true,"newStatus":"10005"}}],"1634727610000":[{"key":"BLINTERIM-43","column":{"notDone":false,"done":true,"newStatus":"10005"}}],"1634727629000":[{"key":"BLINTERIM-44","column":{"notDone":false,"done":true,"newStatus":"5"}}],"1634727652000":[{"key":"BLINTERIM-48","column":{"notDone":false,"done":true,"newStatus":"5"}}],"1634727671000":[{"key":"BLINTERIM-39","column":{"notDone":false,"done":true,"newStatus":"5"}}],"1634727683000":[{"key":"BLINTERIM-1","column":{"notDone":false,"done":true,"newStatus":"5"}}]},"startTime":1631523607266,"endTime":1634234400000,"now":1661390914334,"statisticField":{"typeId":"field","fieldId":"timeoriginalestimate","id":"field_timeoriginalestimate","name":"Original Time Estimate","isValid":true,"isEnabled":true,"renderer":"duration"},"issueToParentKeys":{},"issueToSummary":{"BLINTERIM-1":"QA of Sprint 1 tasks","BLINTERIM-2":"Game Portal Changes","BLINTERIM-3":"Admin Portal Changes","BLINTERIM-40":"[Suggestion][Admin] If toggle button of CME is on, then CME image and disclosure should be mandatory, while adding game","BLINTERIM-33":"[Bug][Admin] User is not able to play the game created, after deleting a sponsor, in admin module","BLINTERIM-44":"[Admin][Web] User's are not getting play invitation for newly copied game, if admin copied one game with same invitee list as before","BLINTERIM-43":"[End user][CME disclosure] The CME disclosure is not getting opened, after click on it, on end user platform","BLINTERIM-42":"[Admin][Game list] Game list is not getting updated automatically, after copying a game, in admin module","BLINTERIM-41":"[Admin][Upload image/video] The upload image/video is not functioning properly as expected, on add game, add question etc pages","BLINTERIM-37":"[Suggestion][Admin] Admin should get message \"Email has been sent to you with further instructions/Email sent successfully\", after click on password reset button","BLINTERIM-48":"[Suggestion][End user] The warning/error message should get displayed, if player didn't select any option and tried to click on submit button, while playing game","BLINTERIM-36":"[Admin][Web] Keyboard shortcuts are not working as expected on admin module specially on sign in,reset password page","BLINTERIM-47":"[End user][iPad] The UI of the word \"Correct\" looks slightly misaligned on ipad, after answering any question on ipad only","BLINTERIM-35":"[End user][Responsive] Other random player's earned points are getting displayed, after completing the game, on leaderboard section","BLINTERIM-46":"[End user][Mobile][Landscape mode] The bottom content \"@2021 Spark Health care\" -this content is not able to view/scroll, after answering a question which has some reference and other details","BLINTERIM-34":"[Admin][Web] Admin gets \"Link is expired\" message, after click on Preview button, on home page","BLINTERIM-45":"[End user][Game summary][Leaderboard] Wrong data is getting displayed at end user side, after finishing the game","BLINTERIM-39":"[Suggestion][Admin] Admin should get the message \"Link is expired. Try requesting new one\" as soon as admin clicks on reset password button from old/expired mail","BLINTERIM-38":"[Suggestion][Admin] While resetting password, blank spaces are getting accepted in password field"},"workRateData":{"timezone":"America/New_York","rates":[{"start":1631523607266,"end":1631923200000,"rate":1},{"start":1631923200000,"end":1632096000000,"rate":0},{"start":1632096000000,"end":1632528000000,"rate":1},{"start":1632528000000,"end":1632700800000,"rate":0},{"start":1632700800000,"end":1633132800000,"rate":1},{"start":1633132800000,"end":1633305600000,"rate":0},{"start":1633305600000,"end":1633737600000,"rate":1},{"start":1633737600000,"end":1633910400000,"rate":0},{"start":1633910400000,"end":1634342400000,"rate":1},{"start":1634342400000,"end":1634515200000,"rate":0},{"start":1634515200000,"end":1634947200000,"rate":1},{"start":1634947200000,"end":1635120000000,"rate":0},{"start":1635120000000,"end":1635552000000,"rate":1},{"start":1635552000000,"end":1635724800000,"rate":0},{"start":1635724800000,"end":1636156800000,"rate":1},{"start":1636156800000,"end":1636329600000,"rate":0},{"start":1636329600000,"end":1636761600000,"rate":1},{"start":1636761600000,"end":1636934400000,"rate":0},{"start":1636934400000,"end":1637366400000,"rate":1},{"start":1637366400000,"end":1637539200000,"rate":0},{"start":1637539200000,"end":1637971200000,"rate":1},{"start":1637971200000,"end":1638144000000,"rate":0},{"start":1638144000000,"end":1638576000000,"rate":1},{"start":1638576000000,"end":1638748800000,"rate":0},{"start":1638748800000,"end":1639180800000,"rate":1},{"start":1639180800000,"end":1639353600000,"rate":0},{"start":1639353600000,"end":1639785600000,"rate":1},{"start":1639785600000,"end":1639958400000,"rate":0},{"start":1639958400000,"end":1640390400000,"rate":1},{"start":1640390400000,"end":1640563200000,"rate":0},{"start":1640563200000,"end":1640995200000,"rate":1},{"start":1640995200000,"end":1641168000000,"rate":0},{"start":1641168000000,"end":1641600000000,"rate":1},{"start":1641600000000,"end":1641772800000,"rate":0},{"start":1641772800000,"end":1642204800000,"rate":1},{"start":1642204800000,"end":1642377600000,"rate":0},{"start":1642377600000,"end":1642809600000,"rate":1},{"start":1642809600000,"end":1642982400000,"rate":0},{"start":1642982400000,"end":1643414400000,"rate":1},{"start":1643414400000,"end":1643587200000,"rate":0},{"start":1643587200000,"end":1644019200000,"rate":1},{"start":1644019200000,"end":1644192000000,"rate":0},{"start":1644192000000,"end":1644624000000,"rate":1},{"start":1644624000000,"end":1644796800000,"rate":0},{"start":1644796800000,"end":1645228800000,"rate":1},{"start":1645228800000,"end":1645401600000,"rate":0},{"start":1645401600000,"end":1645833600000,"rate":1},{"start":1645833600000,"end":1646006400000,"rate":0},{"start":1646006400000,"end":1646438400000,"rate":1},{"start":1646438400000,"end":1646611200000,"rate":0},{"start":1646611200000,"end":1647043200000,"rate":1},{"start":1647043200000,"end":1647216000000,"rate":0},{"start":1647216000000,"end":1647648000000,"rate":1},{"start":1647648000000,"end":1647820800000,"rate":0},{"start":1647820800000,"end":1648252800000,"rate":1},{"start":1648252800000,"end":1648425600000,"rate":0},{"start":1648425600000,"end":1648857600000,"rate":1},{"start":1648857600000,"end":1649030400000,"rate":0},{"start":1649030400000,"end":1649462400000,"rate":1},{"start":1649462400000,"end":1649635200000,"rate":0},{"start":1649635200000,"end":1650067200000,"rate":1},{"start":1650067200000,"end":1650240000000,"rate":0},{"start":1650240000000,"end":1650672000000,"rate":1},{"start":1650672000000,"end":1650844800000,"rate":0},{"start":1650844800000,"end":1651276800000,"rate":1},{"start":1651276800000,"end":1651449600000,"rate":0},{"start":1651449600000,"end":1651881600000,"rate":1},{"start":1651881600000,"end":1652054400000,"rate":0},{"start":1652054400000,"end":1652486400000,"rate":1},{"start":1652486400000,"end":1652659200000,"rate":0},{"start":1652659200000,"end":1653091200000,"rate":1},{"start":1653091200000,"end":1653264000000,"rate":0},{"start":1653264000000,"end":1653696000000,"rate":1},{"start":1653696000000,"end":1653868800000,"rate":0},{"start":1653868800000,"end":1654300800000,"rate":1},{"start":1654300800000,"end":1654473600000,"rate":0},{"start":1654473600000,"end":1654905600000,"rate":1},{"start":1654905600000,"end":1655078400000,"rate":0},{"start":1655078400000,"end":1655510400000,"rate":1},{"start":1655510400000,"end":1655683200000,"rate":0},{"start":1655683200000,"end":1656115200000,"rate":1},{"start":1656115200000,"end":1656288000000,"rate":0},{"start":1656288000000,"end":1656720000000,"rate":1},{"start":1656720000000,"end":1656892800000,"rate":0},{"start":1656892800000,"end":1657324800000,"rate":1},{"start":1657324800000,"end":1657497600000,"rate":0},{"start":1657497600000,"end":1657929600000,"rate":1},{"start":1657929600000,"end":1658102400000,"rate":0},{"start":1658102400000,"end":1658534400000,"rate":1},{"start":1658534400000,"end":1658707200000,"rate":0},{"start":1658707200000,"end":1659139200000,"rate":1},{"start":1659139200000,"end":1659312000000,"rate":0},{"start":1659312000000,"end":1659744000000,"rate":1},{"start":1659744000000,"end":1659916800000,"rate":0},{"start":1659916800000,"end":1660348800000,"rate":1},{"start":1660348800000,"end":1660521600000,"rate":0},{"start":1660521600000,"end":1660953600000,"rate":1},{"start":1660953600000,"end":1661126400000,"rate":0},{"start":1661126400000,"end":1661390914334,"rate":1}]},"openCloseChanges":{}},
    // burndownchar:{"changes":{"1660302718000":[{"key":"TS-5","added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660302742000":[{"key":"TS-6","added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660302762000":[{"key":"TS-7","added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660302781000":[{"key":"TS-8","added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660302794000":[{"key":"TS-9","added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660302918000":[{"key":"TS-7","statC":{"newValue":90000.0}}],"1660302937000":[{"key":"TS-5","statC":{"newValue":28800.0}}],"1660302954000":[{"key":"TS-6","statC":{"newValue":14400.0}}],"1660302965000":[{"key":"TS-8","statC":{"newValue":18000.0}}],"1660302975000":[{"key":"TS-9","statC":{"newValue":25200.0}}],"1660303074000":[{"key":"TS-9","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660396517000":[{"key":"TS-6","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660482009000":[{"key":"TS-8","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660576045000":[{"key":"TS-7","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660576151000":[{"key":"TS-20","statC":{},"added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660576166000":[{"key":"TS-20","statC":{"newValue":18000.0}}],"1660576206000":[{"key":"TS-20","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660580612000":[{"key":"TS-20","statC":{"oldValue":18000.0,"newValue":14400.0}}],"1660580710000":[{"key":"TS-20","column":{"notDone":true,"done":false,"newStatus":"3"}}],"1660580714000":[{"key":"TS-20","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660636976000":[{"key":"TS-8","statC":{"oldValue":18000.0}}],"1660636981000":[{"key":"TS-8","statC":{"newValue":18000.0}}],"1660636995000":[{"key":"TS-8","statC":{"oldValue":18000.0,"newValue":14400.0}}],"1660637110000":[{"key":"TS-8","column":{"notDone":true,"done":false,"newStatus":"3"}}],"1660645812000":[{"key":"TS-6","column":{"notDone":true,"done":false,"newStatus":"10012"}}],"1660659965000":[{"key":"TS-6","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660660418000":[{"key":"TS-5","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660660495000":[{"key":"TS-5","column":{"notDone":true,"done":false,"newStatus":"10012"}}],"1660733165000":[{"key":"TS-5","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660733232000":[{"key":"TS-8","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660733394000":[{"key":"TS-21","statC":{},"added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660733442000":[{"key":"TS-21","statC":{"newValue":1800.0}}],"1660740900000":[{"key":"TS-21","column":{"notDone":false,"done":true,"newStatus":"10011"}}]},"startTime":1660303011529,"endTime":1661527140000,"completeTime":1660740907017,"now":1661238772257,"statisticField":{"typeId":"field","fieldId":"timeoriginalestimate","id":"field_timeoriginalestimate","name":"Original Time Estimate","isValid":true,"isEnabled":true,"renderer":"duration"},"issueToParentKeys":{},"issueToSummary":{"TS-5":"Test issue 01","TS-20":"test bug 15 aug","TS-21":"aug 17","TS-9":"test issue 05","TS-8":"test issue 04","TS-7":"test issue 03","TS-6":"test Issue 02"},"workRateData":{"timezone":"Etc/GMT","rates":[{"start":1660303011529,"end":1660348800000,"rate":1},{"start":1660348800000,"end":1660521600000,"rate":0},{"start":1660521600000,"end":1660953600000,"rate":1},{"start":1660953600000,"end":1661126400000,"rate":0},{"start":1661126400000,"end":1661527140000,"rate":1}]},"openCloseChanges":{"1660740907064":[{"userDisplayNameHtml":"<a class=\"user-hover\" rel=\"62b05c34cebad33432f5c634\" id=\"_62b05c34cebad33432f5c634\" data-user=\"{&quot;accountId&quot;: &quot;62b05c34cebad33432f5c634&quot;}\" href=\"/secure/ViewProfile.jspa?accountId=62b05c34cebad33432f5c634\">Suraj Jaiswal</a>","operation":"CLOSE"}]},"lastUserWhoClosedHtml":"<a class=\"user-hover\" rel=\"62b05c34cebad33432f5c634\" id=\"_62b05c34cebad33432f5c634\" data-user=\"{&quot;accountId&quot;: &quot;62b05c34cebad33432f5c634&quot;}\" href=\"/secure/ViewProfile.jspa?accountId=62b05c34cebad33432f5c634\">Suraj Jaiswal</a>"},
    // burndownchar:{"changes":{"1660302718000":[{"key":"TS-5","added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660302742000":[{"key":"TS-6","added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660302762000":[{"key":"TS-7","added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660302781000":[{"key":"TS-8","added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660302794000":[{"key":"TS-9","added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660302918000":[{"key":"TS-7","statC":{"newValue":90000.0}}],"1660302937000":[{"key":"TS-5","statC":{"newValue":28800.0}}],"1660302954000":[{"key":"TS-6","statC":{"newValue":14400.0}}],"1660302965000":[{"key":"TS-8","statC":{"newValue":18000.0}}],"1660302975000":[{"key":"TS-9","statC":{"newValue":25200.0}}],"1660303074000":[{"key":"TS-9","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660396517000":[{"key":"TS-6","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660482009000":[{"key":"TS-8","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660576045000":[{"key":"TS-7","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660576151000":[{"key":"TS-20","statC":{},"added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660576166000":[{"key":"TS-20","statC":{"newValue":18000.0}}],"1660576206000":[{"key":"TS-20","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660580612000":[{"key":"TS-20","statC":{"oldValue":18000.0,"newValue":14400.0}}],"1660580710000":[{"key":"TS-20","column":{"notDone":true,"done":false,"newStatus":"3"}}],"1660580714000":[{"key":"TS-20","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660636976000":[{"key":"TS-8","statC":{"oldValue":18000.0}}],"1660636981000":[{"key":"TS-8","statC":{"newValue":18000.0}}],"1660636995000":[{"key":"TS-8","statC":{"oldValue":18000.0,"newValue":14400.0}}],"1660637110000":[{"key":"TS-8","column":{"notDone":true,"done":false,"newStatus":"3"}}],"1660645812000":[{"key":"TS-6","column":{"notDone":true,"done":false,"newStatus":"10012"}}],"1660659965000":[{"key":"TS-6","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660660418000":[{"key":"TS-5","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660660495000":[{"key":"TS-5","column":{"notDone":true,"done":false,"newStatus":"10012"}}],"1660733165000":[{"key":"TS-5","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660733232000":[{"key":"TS-8","column":{"notDone":false,"done":true,"newStatus":"10011"}}],"1660733394000":[{"key":"TS-21","statC":{},"added":true,"column":{"notDone":true,"newStatus":"10012"}}],"1660733442000":[{"key":"TS-21","statC":{"newValue":1800.0}}],"1660740900000":[{"key":"TS-21","column":{"notDone":false,"done":true,"newStatus":"10011"}}]},"startTime":1660303011529,"endTime":1661527140000,"completeTime":1660740907017,"now":1661407785094,"statisticField":{"typeId":"field","fieldId":"timeoriginalestimate","id":"field_timeoriginalestimate","name":"Original Time Estimate","isValid":true,"isEnabled":true,"renderer":"duration"},"issueToParentKeys":{},"issueToSummary":{"TS-5":"Test issue 01","TS-20":"test bug 15 aug","TS-21":"aug 17","TS-9":"test issue 05","TS-8":"test issue 04","TS-7":"test issue 03","TS-6":"test Issue 02"},"workRateData":{"timezone":"Etc/GMT","rates":[{"start":1660303011529,"end":1660348800000,"rate":1},{"start":1660348800000,"end":1660521600000,"rate":0},{"start":1660521600000,"end":1660953600000,"rate":1},{"start":1660953600000,"end":1661126400000,"rate":0},{"start":1661126400000,"end":1661527140000,"rate":1}]},"openCloseChanges":{"1660740907064":[{"userDisplayNameHtml":"<a class=\"user-hover\" rel=\"62b05c34cebad33432f5c634\" id=\"_62b05c34cebad33432f5c634\" data-user=\"{&quot;accountId&quot;: &quot;62b05c34cebad33432f5c634&quot;}\" href=\"/secure/ViewProfile.jspa?accountId=62b05c34cebad33432f5c634\">Suraj Jaiswal</a>","operation":"CLOSE"}]},"lastUserWhoClosedHtml":"<a class=\"user-hover\" rel=\"62b05c34cebad33432f5c634\" id=\"_62b05c34cebad33432f5c634\" data-user=\"{&quot;accountId&quot;: &quot;62b05c34cebad33432f5c634&quot;}\" href=\"/secure/ViewProfile.jspa?accountId=62b05c34cebad33432f5c634\">Suraj Jaiswal</a>"},
    burndownchar: {"changes":{"1653459799000":[{"key":"MT-3","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1653460082000":[{"key":"MT-6","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1653475131000":[{"key":"MT-3","added":true}],"1653475135000":[{"key":"MT-6","added":true}],"1657712863000":[{"key":"MT-55","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1657713006000":[{"key":"MT-56","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1657713272000":[{"key":"MT-57","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1657713522000":[{"key":"MT-58","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1657713686000":[{"key":"MT-59","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1657791103000":[{"key":"MT-56","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1658306786000":[{"key":"MT-57","statC":{"newValue":7200.0}}],"1658306888000":[{"key":"MT-58","statC":{"newValue":7200.0}}],"1658313706000":[{"key":"MT-58","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1658314390000":[{"key":"MT-60","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658314473000":[{"key":"MT-61","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658314609000":[{"key":"MT-62","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658314648000":[{"key":"MT-63","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658314780000":[{"key":"MT-64","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658314841000":[{"key":"MT-65","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658316089000":[{"key":"MT-66","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658381234000":[{"key":"MT-67","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658381449000":[{"key":"MT-68","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658388365000":[{"key":"MT-69","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658388445000":[{"key":"MT-70","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658388770000":[{"key":"MT-71","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658395001000":[{"key":"MT-60","statC":{"newValue":60.0}}],"1658395014000":[{"key":"MT-60","statC":{"oldValue":60.0,"newValue":1800.0}}],"1658395303000":[{"key":"MT-63","statC":{"newValue":1800.0}}],"1658396180000":[{"key":"MT-72","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658396700000":[{"key":"MT-64","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1658396742000":[{"key":"MT-60","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1658396817000":[{"key":"MT-57","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1658396852000":[{"key":"MT-63","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1658396930000":[{"key":"MT-68","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1658740153000":[{"key":"MT-65","statC":{"newValue":10800.0}}],"1658822945000":[{"key":"MT-67","statC":{"newValue":3600.0}}],"1658832852000":[{"key":"MT-70","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1658832928000":[{"key":"MT-61","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1658833021000":[{"key":"MT-65","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1658833078000":[{"key":"MT-67","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1658833812000":[{"key":"MT-73","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658899340000":[{"key":"MT-74","statC":{},"column":{"notDone":true,"newStatus":"1"}}],"1658998706000":[{"key":"MT-56","added":true}],"1658998726000":[{"key":"MT-57","added":true}],"1658998744000":[{"key":"MT-55","added":true},{"key":"MT-58","added":true}],"1658998781000":[{"key":"MT-73","added":true}],"1658998783000":[{"key":"MT-59","added":true}],"1658998793000":[{"key":"MT-74","added":true}],"1658998808000":[{"key":"MT-72","added":true}],"1658998813000":[{"key":"MT-60","added":true}],"1658998822000":[{"key":"MT-71","added":true}],"1658998828000":[{"key":"MT-61","added":true}],"1658998831000":[{"key":"MT-70","added":true}],"1658998845000":[{"key":"MT-62","added":true}],"1658998850000":[{"key":"MT-69","added":true}],"1658998863000":[{"key":"MT-68","added":true}],"1658998864000":[{"key":"MT-63","added":true}],"1658998888000":[{"key":"MT-64","added":true}],"1658998901000":[{"key":"MT-67","added":true}],"1658998905000":[{"key":"MT-65","added":true}],"1658998916000":[{"key":"MT-66","added":true}],"1659072620000":[{"key":"MT-69","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1659073304000":[{"key":"MT-59","statC":{"newValue":7200.0}}],"1659087440000":[{"key":"MT-74","statC":{"newValue":1800.0}}],"1659087628000":[{"key":"MT-74","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1659087634000":[{"key":"MT-74","column":{"notDone":true,"done":false,"newStatus":"4"}}],"1659087714000":[{"key":"MT-73","statC":{"newValue":1800.0}}],"1659096360000":[{"key":"MT-59","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1659097230000":[{"key":"MT-72","statC":{"newValue":7200.0}}],"1659097284000":[{"key":"MT-72","statC":{"oldValue":7200.0,"newValue":10800.0}}],"1659097463000":[{"key":"MT-72","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1659097511000":[{"key":"MT-74","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1659097525000":[{"key":"MT-73","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1659098005000":[{"key":"MT-55","column":{"notDone":false,"done":true,"newStatus":"10002"}}],"1659590136000":[{"key":"MT-71","statC":{"newValue":7200.0}}],"1659592286000":[{"key":"MT-75","statC":{},"added":true,"column":{"notDone":true,"newStatus":"1"}}],"1659675274000":[{"key":"MT-71","column":{"notDone":false,"done":true,"newStatus":"10002"}}]},"startTime":1653475146197,"endTime":1653674400000,"completeTime":1660029289962,"now":1661407512016,"statisticField":{"typeId":"field","fieldId":"timeoriginalestimate","id":"field_timeoriginalestimate","name":"Original Time Estimate","isValid":true,"isEnabled":true,"renderer":"duration"},"issueToParentKeys":{},"issueToSummary":{"MT-63":"[Add resources] giving same error (choose technology) all the time if any of the field kept empty ","MT-74":"[Resources] Edit Experience issue","MT-62":"Gap between technology and team is uneven on resource page ","MT-73":"[Resources] \"choose experiences\" (is in bold ) should be same as other like choose technology and search","MT-61":"Spelling mistake - Project already exists ","MT-72":"[Resources] there should be provision for clear experience filter","MT-60":"[Add resources] Select team dropdown is not displaying properly , not able to scroll dropdown list ","MT-71":"Team- Special characters and numbers are accepting and getting added in the team member list even though error message is been through ","MT-56":"[Project] Images not getting load on project page","MT-67":"[project list] server error occurs while adding project ","MT-55":"[Team page] spelling mistakes","MT-66":"Email format for resources is invalid [e.g- abc@yopmail.co] is accepting ","MT-65":"Search functionality not working for resources list ","MT-64":"sometimes resource not getting add in the list","MT-75":"Mistake in Successfully word ","MT-3":"Jira API research","MT-59":"[Team page] accepting invalid names or alphabets in team member, project lead field like abcd","MT-58":"[Project detail page] description field should not accept spaces and redirect to next","MT-69":"[Team] In select role dropdown QA option is not there","MT-57":"After refreshing the page user redirects directly to project detail page","MT-68":"[Project list] Description error","MT-6":"Create Database Diagram","MT-70":"[Resources] resources list is not in proper alphabetical order"},"workRateData":{"timezone":"Asia/Kolkata","rates":[{"start":1653475146197,"end":1653676200000,"rate":1},{"start":1653676200000,"end":1653849000000,"rate":0},{"start":1653849000000,"end":1654281000000,"rate":1},{"start":1654281000000,"end":1654453800000,"rate":0},{"start":1654453800000,"end":1654885800000,"rate":1},{"start":1654885800000,"end":1655058600000,"rate":0},{"start":1655058600000,"end":1655490600000,"rate":1},{"start":1655490600000,"end":1655663400000,"rate":0},{"start":1655663400000,"end":1656095400000,"rate":1},{"start":1656095400000,"end":1656268200000,"rate":0},{"start":1656268200000,"end":1656700200000,"rate":1},{"start":1656700200000,"end":1656873000000,"rate":0},{"start":1656873000000,"end":1657305000000,"rate":1},{"start":1657305000000,"end":1657477800000,"rate":0},{"start":1657477800000,"end":1657909800000,"rate":1},{"start":1657909800000,"end":1658082600000,"rate":0},{"start":1658082600000,"end":1658514600000,"rate":1},{"start":1658514600000,"end":1658687400000,"rate":0},{"start":1658687400000,"end":1659119400000,"rate":1},{"start":1659119400000,"end":1659292200000,"rate":0},{"start":1659292200000,"end":1659724200000,"rate":1},{"start":1659724200000,"end":1659897000000,"rate":0},{"start":1659897000000,"end":1660029289962,"rate":1}]},"openCloseChanges":{"1660029290031":[{"userDisplayNameHtml":"<a class=\"user-hover\" rel=\"61caafdaf3037f0069a05916\" id=\"_61caafdaf3037f0069a05916\" data-user=\"{&quot;accountId&quot;: &quot;61caafdaf3037f0069a05916&quot;}\" href=\"/secure/ViewProfile.jspa?accountId=61caafdaf3037f0069a05916\">Suraj Jaiswal</a>","operation":"CLOSE"}]},"lastUserWhoClosedHtml":"<a class=\"user-hover\" rel=\"61caafdaf3037f0069a05916\" id=\"_61caafdaf3037f0069a05916\" data-user=\"{&quot;accountId&quot;: &quot;61caafdaf3037f0069a05916&quot;}\" href=\"/secure/ViewProfile.jspa?accountId=61caafdaf3037f0069a05916\">Suraj Jaiswal</a>"},
    // Project Overall Project Score
    Overall_Project_Score_Chart: [{
        chart: {
            animations: {
                speed: 360, animateGradually: {
                    enabled: false
                }
            }, fontFamily: 'inherit', foreColor: 'inherit', height: '100%', type: 'donut', sparkline: {
                enabled: true
            }
        },
        colors: ['#3182CE', '#63B3ED', "#231488", "#3ac5b7", "#e46e3b"],
        labels: ["Naynesh Rathod", "Rishikesh Salunkhe", "Suraj Jaiswal", "Pooja Tangade", "Sanskriti Gupta"],
        plotOptions: {
            pie: {
                customScale: 0.9, expandOnClick: false, donut: {
                    size: '70%'
                }
            }
        },
        series: [44, 55, 13, 43, 22],
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            }, active: {
                filter: {
                    type: 'none'
                }
            }
        },
        tooltip: {
            enabled: true, fillSeriesColor: false, theme: 'dark',
        },
        legend: {position: "top", horizontalAlign: "left"}
    }],
    // Project and Sprint Customer Happiness Score
    Customer_Happiness_Score_Chart: [{
        series: [75],
        chart: {
            height: 350, type: "radialBar", toolbar: {
                show: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90, endAngle: 90, hollow: {
                    margin: 60,
                    size: "70%",
                    background: "transparent",
                    image: undefined,
                    position: "front",
                    dropShadow: {
                        enabled: true, top: 3, left: 0, blur: 4, opacity: 0.24
                    }
                }, track: {
                    background: "#fff", strokeWidth: "67%", margin: 0, // margin is in pixels
                    dropShadow: {
                        enabled: true, top: -3, left: 0, blur: 4, opacity: 0.35
                    }
                },

                dataLabels: {
                    show: true,
                    value: {
                        formatter: function (val: any) {
                            return parseInt(val.toString(), 10).toString();
                        }, color: "#111", fontSize: "30px", show: true
                    }
                }
            }
        },
        fill: {
            type: "gradient", gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#ABE5A1"],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            curve: ['smooth', 'straight', 'stepline']
        },
        labels: ["All Test Cases Passed!"],
        responsive: [{breakpoint: 480, options: {chart: {width: 200}, legend: {position: "bottom"}}}],
        legend: {position: "top", horizontalAlign: "left"}
    }],
    // Project Timeline Chart
    Timeline_Chart: [{
        series: [{
            name: "Bob", data: [{
                x: "Design", y: [new Date("2019-03-05").getTime(), new Date("2019-03-08").getTime()]
            }, {
                x: "Code", y: [new Date("2019-03-02").getTime(), new Date("2019-03-05").getTime()]
            }, {
                x: "Code", y: [new Date("2019-03-05").getTime(), new Date("2019-03-07").getTime()]
            }, {
                x: "Test", y: [new Date("2019-03-03").getTime(), new Date("2019-03-09").getTime()]
            }, {
                x: "Test", y: [new Date("2019-03-08").getTime(), new Date("2019-03-11").getTime()]
            }, {
                x: "Validation", y: [new Date("2019-03-11").getTime(), new Date("2019-03-16").getTime()]
            }, {
                x: "Design", y: [new Date("2019-03-01").getTime(), new Date("2019-03-03").getTime()]
            }]
        }, {
            name: "Joe", data: [{
                x: "Design", y: [new Date("2019-03-02").getTime(), new Date("2019-03-05").getTime()]
            }, {
                x: "Test", y: [new Date("2019-03-06").getTime(), new Date("2019-03-16").getTime()]
            }, {
                x: "Code", y: [new Date("2019-03-03").getTime(), new Date("2019-03-07").getTime()]
            }, {
                x: "Deployment", y: [new Date("2019-03-20").getTime(), new Date("2019-03-22").getTime()]
            }, {
                x: "Design", y: [new Date("2019-03-10").getTime(), new Date("2019-03-16").getTime()]
            }]
        }, {
            name: "Dan", data: [{
                x: "Code", y: [new Date("2019-03-10").getTime(), new Date("2019-03-17").getTime()]
            }, {
                x: "Validation", y: [new Date("2019-03-05").getTime(), new Date("2019-03-09").getTime()]
            }]
        }],
        chart: {
            height: 350, type: "rangeBar"
        },
        plotOptions: {
            bar: {
                horizontal: true, barHeight: "80%"
            }
        },
        xaxis: {
            type: "datetime"
        },
        fill: {
            type: "gradient", gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [50, 0, 100, 100]
            }
        },
        legend: {
            position: "top", horizontalAlign: "left"
        }
    }],

    // Sprint Start
    // Sprint Defect Leakage
    Defect_Leakage_Chart: [{
        chart: {
            height: 280, offsetY: -20, type: "radialBar",
        },
        series: [67],
        labels: ['More Bugs to Fix during the Iteration'],
        colors: ["#DC2626"],
        fullcolors: ["#22C55E"],
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 8,
                        opacity: 0.15
                      }
                },
                dataLabels: {
                    name: {
                        // show: false,
                        fontSize: "14px",
                        color: undefined,
                        offsetY: 65,
                        values: "More Bugs to Fix during the Iteration"
                    },
                    value: {
                        offsetY: 25,
                        fontSize: "22px",
                        color: undefined,
                        fontWeight: 800,
                    },
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [
                  {
                    offset: 20,
                    color: "#22C55E",
                    opacity: 1
                  },

                  {
                    offset: 100,
                    color: "#DC2626",
                    opacity: 1
                  }
                ]
              }
            // }
        },
        fullfill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                // type: "gradient",
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [
                   
                  {
                    offset: 30,
                    color: "#DC2626",
                    opacity: 1
                  },

                  {
                    offset: 100,
                    color: "#22C55E",
                    opacity: 1
                  }
                ]
              }
            // }
        },
        stroke: {
            lineCap: "butt",
            dashArray: 0
        },
        legend: { position: "top", horizontalAlign: "left" },
    }],
    // Sprint Retest Ratio
    retest_ratio_chart: [{
        series: [44, 67, 83],
        colors: ["#0054A4", "#EF4444", "#FBBF24"],
        chart: {height: 200, type: "radialBar"}, legend: {position: "top", horizontalAlign: "left"}, plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: "22px"
                    }, value: {
                        fontSize: "16px"
                    }, total: {
                        show: true, label: "Total", formatter: function (w: any) {
                            return "249";
                        }
                    }
                }
            }
        },
        labels: ["Apples", "Oranges", "Berries"]
    }],
    // Sprint Schedule Variance
    Schedule_Variance_chart: [{
        series: [{
            name: "New  Estimates", data: oldeEstimate,
            // name: "New  Estimates", data: oldeEstimate.map((y, i) => ({y, x: DateTIME[i]})),
        }, {
            name: "Old Estimates", data: newEstimate,
            // name: "Old Estimates", data: newEstimate.map((y, i) => ({y, x: DateTIME[i]})),
        }],
        chart: {
            height: 350, type: "line", zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 1.5,
            curve: "stepline"
        },
        title: {
            text: "Schedule Variance", align: "left"
        },
        grid: {
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        }, 
        xaxis: {
            // type: 'datetime', tickAmount: 10, labels: {
            //     hideOverlappingLabels: true, datetimeFormatter: {
            //         day: 'M/dd',
            //     }
            // }
        },
        yaxis: {
            // type: 'datetime', tickAmount: 10, labels: {
            //     hideOverlappingLabels: true, datetimeFormatter: {
            //         day: 'M/dd',
            //     }
            // }
        }
    }],
    //this is for a Sprint Customer Happiness Score
    SCORE_CHART: [{
        chart: {
          height: 280,
          type: "radialBar",
        },
      
        series: [67],
        colors: ["#20E647"],
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: {
              margin: 20,
              size: "70%",
              background: "#293450",
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 8,
                opacity: 0.15
              }
            },
            dataLabels: {
              name: {
                show: false,
                offsetY: -10,
                color: "#fff",
                fontSize: "13px"
              },
              value: {
                offsetY: 12,
                color: "#fff",
                fontSize: "30px",
                show: true,
                formatter: function (val:any) {
                    return val 
                  }
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            gradientToColors: ["#87D4F9"],
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Progress"],
      } 
    ],
    // Sprint Progress
    Sprint_Progress_Chart: [{
        series: [100],
        chart: {type: "radialBar", offsetY: -20, height: '300'},
        fill: {
            type: "gradient", gradient: {
                shade: "light",
                shadeIntensity: 0.4,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 53, 91]
            }
        },
        labels: ["All Test Cases Passed!"],
        responsive: [{breakpoint: 480, options: {chart: {width: 200}, legend: {position: "bottom"}}}],
        plotOptions: {
            radialBar: {
                startAngle: -90, endAngle: 90, track: {
                    background: "#e7e7e7", strokeWidth: "97%", margin: 5, // margin is in pixels
                    dropShadow: {
                        enabled: true, top: 2, left: 0, opacity: 0.31, blur: 2
                    }
                },
                dataLabels: {
                    textAnchor: 'middle', name: {
                        fontSize: "16px", color: undefined, offsetY: 55,
                    }, value: {
                        offsetY: 6, fontSize: "22px", color: undefined, formatter: function (val: any) {
                            return val;
                        }
                    },
                }
            }
        },
        legend: {position: "top", horizontalAlign: "left"}
    }],
    // this is a temp
    Pie_Chart: [{
        series: [44, 55, 13, 43, 22],
        chart: {type: "donut", height: '300'},
        title: {text: "Overall Project Score"},
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        xaxis: {categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]},
        responsive: [{breakpoint: 480, options: {chart: {width: 200}, legend: {position: "bottom"}}}],
        legend: {position: "top", horizontalAlign: "left"},
        dataLabels: { 
            enabled: false,
        }
    }],

}

export interface ChartInterface {
    [key: string]: string;
}
