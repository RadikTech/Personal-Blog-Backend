import slugify from "slugify";
import { Blog } from "../models/blog.model.js";

export async function createPost(req, res) {
	try {
		const { title, content } = req.body;

		if (!title || !content) {
			return res.status(200).json({ success: false, message: "All fields are required" });
		}

		// create slug and check it also
		const slug = slugify(title, { lower: true, strict: true });
		const isSlugPresent = await Blog.findOne({ slug: slug });
		if (isSlugPresent) {
			return res.status(200).json({ success: false, message: "Blog like this already present" });
		}

		const newPost = new Blog({ title, content });
		await newPost.save();

		res.status(200).json({
			success: true,
			message: "Post Created Successfully",
		});
	} catch (error) {
		console.log("Error in createPost controller", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function getAllPosts(req, res) {
	try {
		const posts = await Blog.find().sort({ createdAt: -1 });
		if (!posts || posts.length == 0) {
			return res.status(200).json({
				success: false,
				message: "No posts found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Success",
			data: posts,
		});
	} catch (error) {
		res.status(500).json({ error: "Unable to fetch posts" });
	}
}

export async function viewPost(req, res) {
	try {
		const slug = req.params.slug;

		if (!slug) {
			return res.status(200).json({ success: false, message: "Post not found" });
		}

		const posts = await Blog.findOne({ slug: slug });
		res.status(200).json({
			success: true,
			message: "Success",
			data: posts,
		});
	} catch (error) {
		res.status(500).json({ error: "Unable to view post" });
	}
}


export async function editPost(req, res) {
	try {
		const { title, content } = req.body;

		if (!title || !content) {
			return res.status(200).json({ success: false, message: "All field require" });
		}

		const updatedPost = await Blog.findOneAndUpdate(
			{ slug: req.params.slug }, //find by
			{ title, content }, // update here
			{ new: true, runValidators: true } //return new doc and validate
		);

		if (!updatedPost) {
			return res.status(200).json({
				success: false,
				message: "Post not found!!!"
			});
		}

		res.status(200).json({
			success: true,
			message: "Post updated successfully",
		});
	} catch (error) {
		res.status(500).json({ error: "Unable to update post" });
	}
}

export async function deletePost(req, res) {
	try {
		const slug = req.params.slug;

		if (!slug) {
			return res.status(200).json({ success: false, message: "Slug not found" });
		}

		const deletedPost = await Blog.findOneAndDelete({ slug: slug });
		if (!deletedPost) {
			return res.status(200).json({
				success: false,
				message: "Post not found!!!"
			});
		}

		res.status(200).json({
			success: true,
			message: "Post deleted successfully",
		});
	} catch (error) {
		res.status(500).json({ error: "Unable to delete post" });
	}
}