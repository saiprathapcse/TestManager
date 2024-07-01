const express = require('express');
const Test = require('../model/Test');
const Testanswers = require('../model/answer');
const router = express.Router();

// Create a new test
router.post('/', async (req, res) => {
  const { testType, questions, teacherId } = req.body;
  try {
    const test = new Test({ title:testType, teacherId, questions });
    await test.save();
    res.status(201).json(test);
    res.send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tests
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find();
    // res.json(tests);
    res.send(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/update', async (req, res) => {
  const { testId, status } = req.body;
  try {
    const test = await Test.findById(testId);
    if (test) {
      if (test.status === 'Completed') {
        res.send('Test already completed')
        return;
      }
      test.status = status;
      await test.save();
      res.json(test);
    } else {
      res.status(404).json({ message: 'Test not found' });
      res.send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 });

router.post('/submit', async(req, res) => {
    const {title, teacherId, questions, username} = req.body;
  try {
      console.log('1')
    const answer = await new Testanswers({ title, teacherId, questions, username });
    console.log('2')
    const id = await answer.save();
    // res.status(201).json(answer);
    console.log(id)
    res.send(id);
    
    }
    catch (error) {
    res.status(500).json({ error: error.message });
    }
})

module.exports = router;
