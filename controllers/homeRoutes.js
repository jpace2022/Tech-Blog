const router = require("express").Router();
const { Blogpost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const blogData = await Blogpost.findAll({
        include: [{
        model: User,
        attributes: ["name"]
            }]
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true}));
        res.render("homepage", {
            blogs,
            loggedIn: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");

});

router.get("/blogs/:id", async (req, res) => {
    if ((req.session.logged_in = false)) {
    } else {
      try {
        const blogData = await Blogpost.findByPk(req.params.id, {
          include: [
            {
              model: User,
              attributes: ["name"],
            },
            {
              model: Comment,
              
              include: [
                  {
                      model: User,
                      attributes: ["name"],
                    },
              ],
            },
          ],
        });
  
        if (blogData) {
          console.log(blogData);
  
          const blog = blogData.get({ plain: true });
          res.render("update-blog", {
            blog,
            // comments,
            // logged_in: req.session.logged_in
          });
        } else {
          res.status(404).json({ message: "No post found!" });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  });

router.get("/update-comment/:id", withAuth, async (req, res) => {
    try {
        const clicked_comment = await Comment.findOne({
            where: {
                id: req.params.id,
            },
        });
        const comment_id = req.params.id;

        const blogData = await Blogpost.findByPk(clicked_comment.blog_id, {
            inlcude: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
            where: {
                blog_id: clicked_comment.blog_id,
            },
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        const blog = blogData.get({ plain: true });

        res.render("update-commnet", {
            ...blog,
            comments,
            logged_in: req.session.logged_in,
            logged_id: req.session.user_id,
            comment_id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/dashboard", async (req, res) => {
    try {
        if (req.session.logged_in) {
            const userData = await User.findOne({
                where: { id: req.session.user_id}
            });
            const blogData = await Blogpost.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["name"]
                    },
                ],
            });
            const blogs = blogData.map((blog) =>
            blog.get({ plain: true }));
            const user = userData.get({ plain: true });
            res.render("dashboard", {blogs, logged_in: req.session.logged_in, user, });
            console.log(req)
            return;
        } else {
            res.redirect("/login");
            return;
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/update-blog/:id", withAuth, async (req, res) => {
    try {
        if (req.session.logged_in) {
            const userData = await User.findOne({
                where: { id: req.session.user_id },
            });

            const blogData = await Blogpost.findOne({
                where: { id: req.params.id },
                include: [
                    {
                        model: User,
                        attributes: ["name"]
                    },
                ],
            });

            const blog = blogData.get({ plain: true });
            const user = userData.get({ plain: true});
            res.render("update-blog", {
                ...blog,
                logged_in: req.session.logged_in,
                user,
            });
            return;
        } else {
            res.redirect("/login");
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;