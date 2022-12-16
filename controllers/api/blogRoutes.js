const router = require('express').Router();
const { Blogpost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blogpost.create({
        ...req.body,
        user_id: req.session.user_id,
    });

      res.status(200).json(newBlog);
  } catch (err) {

    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Comment.destroy({ 
        where: { 
            blog_id: req.params.id,
         },
       });

    const blogData = await Blogpost.destroy({
        where: {
            id: req.params.id,
        },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
    console.log(res)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const blogData = await Blogpost.update(
      {
        description: req.body.description,
        name: req.body.name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log(blogData);
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
