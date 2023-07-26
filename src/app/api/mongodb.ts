import {MongoClient, ObjectId} from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
const url = String(process.env.mongodburl);
const client = new MongoClient(url);
console.log(process.env.mongodburl);



export async function addTask(taskDetails:any) {
  await client.db('Shankar')
      .collection('mySkills')
      .insertOne({
        name: taskDetails?.name,
        dueBy: taskDetails?.dueBy,
        subTasks: taskDetails?.subTasks,
        taskStatus: taskDetails?.taskStatus,
        taskNotes: taskDetails?.notes,
        timestamp: taskDetails?.timestamp,
        tags: taskDetails?.tags
      });
  return getTasks();
}

export function getTasks() {
  console.log('getting mongodb data ', process.env.mongodbname)
  return client.db(process.env.mongodbname)
      .collection(String(process.env.mongodbview))
      .find({})
      .toArray();
}

export async function updateTask(taskDetails:any) {
  let obj = {...taskDetails};
  delete obj._id; // delete the id field from the object, so that it can be sent to replaceOne query
  let updateDocument = await client.db(process.env.mongodbname)
      .collection(String(process.env.mongodbview))
      .replaceOne({
        _id: new ObjectId(taskDetails._id)
      }, obj, {upsert: true});

  if (updateDocument.acknowledged) {
    return getTasks();
  } else {
    console.log(`${updateDocument}`)
  }
}

export async function deleteTask(documentId:any) {
  console.log('dele', documentId)
  let deletionRequest = await client.db(process.env.mongodbname)
      .collection(String(process.env.mongodbview))
      .deleteOne({_id: new ObjectId(documentId)})
  console.log('deletionstates', deletionRequest)
  return getTasks();
}