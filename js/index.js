import FormRecord from "./FormRecord.js";
import RecordList from "./RecordList.js";
import Api from "./Api.js";

const api = new Api();
const recordList = new RecordList(api);
new FormRecord(recordList);
recordList.loadData();
