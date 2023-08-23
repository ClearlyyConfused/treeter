import AddPost from './AddPost';
import LikePost from './LikePost';
import PostComments from './PostComments';
import DeletePost from './DeletePost';
import UpdatePost from './UpdatePost';
import ViewPost from './ViewPost';
import SharePost from './SharePost';
import AddComment from './AddComment';

function PostFunctions() {
	return { AddPost, AddComment, LikePost, PostComments, DeletePost, UpdatePost, ViewPost, SharePost };
}

export default PostFunctions;
