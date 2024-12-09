import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		unique: true,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

blogSchema.pre('validate', function (next) {
	if (this.title) {
		this.slug = slugify(this.title, { lower: true, strict: true });
	}
	next();
});

export const Blog = mongoose.model("Blog", blogSchema);
