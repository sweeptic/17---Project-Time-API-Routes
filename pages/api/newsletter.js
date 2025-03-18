import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = new MongoClient(
      'mongodb+srv://mongouser123:Hardfloor888888@cluster0.5mx6g.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0'
    );

    // const client = await MongoClient.connect(
    //   'mongodb+srv://mongouser123:Hardfloor888888@cluster0.5mx6g.mongodb.net/newsletter?retryWrites=true&w=majority&appName=Cluster0'
    // );

    const db = client.db();
    await db.collection('emails').insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: 'Signed up' });
  }
}
