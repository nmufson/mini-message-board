const express = require('express');
const router = express.Router();

const messages = [
  {
    text: "Yooooooo!",
    user: "Nick",
    added: new Date(),
    id: 0
  },
  {
    text: "Ya diiiiggggg!",
    user: "Gimli",
    added: new Date(),
    id: 1
  }
];

const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "New Message" },
];

router.get("/", (req, res) => {
  res.render("index", { links: links, title: "Mini Messageboard", messages: messages });
});

router.get("/new", (req, res) => {
  res.render("form", { links: links, title: "Mini Messageboard", messages: messages });
});

router.get('/message/:id', (req, res) => {
  // route params are always strings
  // need to convert to a number 
  const messageId = parseInt(req.params.id, 10);
  console.log(messageId)
  console.log(messages)
  const message = messages.find(m => m.id === messageId); // Assuming you have a way to retrieve the message
  console.log(message)
  if (message) {
    res.render('message', { message, links: links, title: "Mini Messageboard"  });
  } else {
    res.status(404).send('Message not found');
  }
});


// req.body fields are named accoriding to the name attribute 
// in my form inputs 
router.post("/new", (req, res) => {

  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;
  const messageId = messages.length

  messages.push({ text: messageText, user: messageUser, added: new Date(), id: messageId })

  // sends users back to index after submitting new message
  res.redirect("/")
})

module.exports = router;