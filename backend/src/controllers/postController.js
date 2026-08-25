import Post from "../models/Post.js";
import { makeCrud } from "./crudFactory.js";

export default makeCrud(Post);
