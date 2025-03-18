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
    const dummyList = [
      {
        id: 'c1',
        name: 'Max',
        text: 'Lorem ipsum dolor sit amet.',
      },
      {
        id: 'c2',
        name: 'Manuel',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, ad!',
      },
    ];

    res.status(200).json({ comments: dummyList });
  }

  client.close();
}
