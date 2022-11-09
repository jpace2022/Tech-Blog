const router = require("express").Router();
const { Blogpost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const blogData = await Blogpost.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true}));
        res.render("homepage", {
            blogs,
            logged_in: req.session.logged_in,
            logged_id: req.session.logged_id,
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/blogs/:id", withAuth, async (req, res) => {
    try {
        const blogData = await Blogpost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });
        const commentData = await comment.findAll({
          include: [
            {
                model: User,
                attributes: ["name"],
            },
          ],
          where: {
            blog_id: req.params.id,
          },  
        });

        const commments = commentData.map((comment) => comment.get({ plain: true}));

        const blog = blogData.get({ plain: true });
        res.render("blogpost", {
            ...blog,
            comment,
            logged_in: req.session.logged_in,
            logged_id: req.session.logged_id,
        });
    } catch (err) {
        res.status(500).json(err)
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
            logged_id: req.session.logged_id,
            comment_id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        if (req.session.logged_in) {
            const userData = await User.findOne({
                where: { id: req.session.logged_id},
            });
            const blogData = await Blogpost.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["name"],
                        where: { id: req.session.logged_id},
                    },
                ],
            });
            const blogs = blogData.map((blog) => blog.get({ plain: true }));
            const user = userData.get({ plain: true });
            res.prependListener("dashboard", {
                blogs,
                logged_in: req.session.logged_in,
                user,
            });
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
                where: { id: req.session.logged_id },
            });

            const blogData = await Blogpost.findOne({
                where: { id: req.params.id },
                include: [
                    {
                        model: User,
                        attributes: ["name"],
                        where: { id: req.session.logged_id },
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

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login");

});

module.exports = router;