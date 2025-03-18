import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = new MongoClient(
    'mongodb+srv://mongouser123:Hardfloor888888@cluster0.5mx6g.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0'
  );

  //   const client = await MongoClient.connect(
  //     'mongodb+srv://mongouser123:Hardfloor888888@cluster0.5mx6g.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0'
  //   );
  if (req.method === 'POST') {
    const { email, name, text } = req.body.commentData;
    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const newComment = { email, name, text, eventId };

    const db = client.db();
    const result = await db.collection('comments').insertOne(newComment);

    console.log(result);

    res.status(201).json({ message: 'Added comment.', comment: newComment });
  }

  if (req.method === 'GET') {
    const db = client.db();
    const documents = await db.collection('comments').find().sort({ _id: -1 }).toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
}
