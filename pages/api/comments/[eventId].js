export default function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    const { email, name, text } = req.body.commentData;
    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    console.log(email, name, text);

    const newComment = { id: new Date().toISOString(), email, name, text };

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
}
