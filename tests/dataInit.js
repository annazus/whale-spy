const userOne = {
  input: {
    name: "Jen",
    email: "jen@example.com",
    picture: "http://example.com/jen.jpg"
  },
  user: undefined
};

const userTwo = {
  input: {
    name: "Jeff",
    email: "jeff@example.com",
    picture: "http://example.com/jeff.jpg"
  },
  user: undefined
};

const pinOne = {
  input: {
    title: "My published post",
    content: "1st post content",
    latitude: 34.3,
    longitude: 34.3,
    dateSpotted: new Date()
  },
  pin: undefined
};

const pinTwo = {
  input: {
    title: "My second post",
    content: "2nd post content",
    latitude: 34.3,
    longitude: 34.3,
    dateSpotted: new Date()
  },
  pin: undefined
};

const commentOne = {
  input: {
    text: "Great post. Thanks for sharing!"
  },
  comment: undefined
};

const commentTwo = {
  input: {
    text: "I am glad you enjoyed it."
  },
  comment: undefined
};

export const initDatabase = async db => {
  console.log("wiping out");
  //Wipe out data
  Object.keys(db).forEach(table => {
    console.log(table);
    db[table].truncate({ cascade: true });
  });

  const dbUser1 = await db.User.create({ ...userOne.input });
  userOne.user = dbUser1.dataValues;
  const dbUser2 = await db.User.create({ ...userTwo.input });
  userTwo.user = dbUser2.dataValues;

  const dbPin1 = await db.Pin.create({
    ...pinOne.input,
    userId: userOne.user.id
  });
  pinOne.pin = dbPin1.dataValues;

  const dbPin2 = await db.Pin.create({
    ...pinTwo.input,
    userId: userOne.user.id
  });
  pinTwo.pin = dbPin2.dataValues;

  const dbComment1 = await db.Comment.create({
    ...commentOne.input,
    userId: userTwo.id,
    pinId: pinOne.id
  });
  commentOne.comment = dbComment1.dataValues;

  const dbComment2 = await db.Comment.create({
    ...commentTwo.input,
    userId: userOne.id,
    pinId: pinOne.id
  });
  commentTwo.comment = dbComment2.dataValues;
};

export { userOne, userTwo, pinOne, pinTwo, commentOne, commentTwo };
