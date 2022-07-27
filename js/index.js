import FormRecord from "./FormRecord.js";
import RecordList from "./RecordList.js";

const recordList = new RecordList();
new FormRecord(recordList);
recordList.loadData();
