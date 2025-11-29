import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, addPost, toggleLike, addComment, addReply } from '../store/store';
import { Card, Button, Input } from '../components/Common';
import { MessageSquare, ThumbsUp, Share2, Search, Plus, Send, X, MoreHorizontal, CornerDownRight } from 'lucide-react';
import { Post, Comment } from '../types';

const Community: React.FC = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.community);
  const { user } = useSelector((state: RootState) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null); // For main post comments
  const [activeReplyInputId, setActiveReplyInputId] = useState<string | null>(null); // For nested replies
  
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
      e.preventDefault();
      if (!user || !newPost.title.trim() || !newPost.content.trim()) return;

      const post: Post = {
          id: `p${Date.now()}`,
          author: user.name,
          avatar: user.avatar || 'https://ui-avatars.com/api/?name=User',
          title: newPost.title,
          content: newPost.content,
          likes: 0,
          likedBy: [],
          comments: [],
          time: 'Just now'
      };

      dispatch(addPost(post));
      setNewPost({ title: '', content: '' });
      setIsModalOpen(false);
  };

  const handleLike = (postId: string) => {
      if (user) {
          dispatch(toggleLike({ postId, userId: user.id }));
      }
  };

  const handleComment = (postId: string) => {
      if (!user || !commentText.trim()) return;

      const comment: Comment = {
          id: `c${Date.now()}`,
          author: user.name,
          avatar: user.avatar || 'https://ui-avatars.com/api/?name=User',
          content: commentText,
          time: 'Just now',
          replies: []
      };

      dispatch(addComment({ postId, comment }));
      setCommentText('');
  };

  const handleReply = (postId: string, commentId: string) => {
      if (!user || !replyText.trim()) return;
      
      const reply: Comment = {
          id: `r${Date.now()}`,
          author: user.name,
          avatar: user.avatar || 'https://ui-avatars.com/api/?name=User',
          content: replyText,
          time: 'Just now',
          replies: []
      };

      dispatch(addReply({ postId, commentId, reply }));
      setReplyText('');
      setActiveReplyInputId(null);
  }

  const handleShare = (post: Post) => {
      const currentUrl = window.location.href;
      const shareUrl = (currentUrl.startsWith('http://') || currentUrl.startsWith('https://')) 
          ? currentUrl 
          : `https://sims.must.ac.tz/community/post/${post.id}`;

      if (navigator.share) {
          navigator.share({
              title: post.title,
              text: post.content,
              url: shareUrl
          }).catch((err) => {
              console.warn("Share failed:", err);
              alert(`Link copied: ${shareUrl}`);
          });
      } else {
          alert(`Link copied: ${shareUrl}`);
      }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Community Forum</h1>
            <p className="text-slate-500">Connect with other learners and instructors.</p>
        </div>
        <Button icon={Plus} onClick={() => setIsModalOpen(true)}>New Post</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
              {/* Search Bar */}
              <Card className="p-4 flex items-center space-x-4">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search discussions..." 
                    className="flex-1 border-none focus:ring-0 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </Card>

              {/* Posts Feed */}
              {filteredPosts.map(post => {
                  const isLiked = user ? post.likedBy.includes(user.id) : false;
                  return (
                    <Card key={post.id} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                                <img src={post.avatar} alt={post.author} className="h-10 w-10 rounded-full mr-3 object-cover" />
                                <div>
                                    <p className="text-sm font-medium text-slate-900">{post.author}</p>
                                    <p className="text-xs text-slate-500">{post.time}</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <MoreHorizontal className="h-5 w-5" />
                            </button>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h3>
                        <p className="text-slate-600 mb-4 whitespace-pre-wrap">{post.content}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-slate-500 pt-4 border-t border-slate-100">
                            <button 
                                onClick={() => handleLike(post.id)}
                                className={`flex items-center transition-colors ${isLiked ? 'text-green-600 font-medium' : 'hover:text-green-700'}`}
                            >
                                <ThumbsUp className={`h-4 w-4 mr-1.5 ${isLiked ? 'fill-current' : ''}`} />
                                {post.likes} Likes
                            </button>
                            <button 
                                onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                                className="flex items-center hover:text-green-700 transition-colors"
                            >
                                <MessageSquare className="h-4 w-4 mr-1.5" />
                                {post.comments.length} Comments
                            </button>
                            <button 
                                onClick={() => handleShare(post)}
                                className="flex items-center hover:text-green-700 transition-colors ml-auto"
                            >
                                <Share2 className="h-4 w-4 mr-1.5" />
                                Share
                            </button>
                        </div>

                        {/* Comments Section */}
                        {activeCommentId === post.id && (
                            <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-xl">
                                <div className="space-y-4 mb-4">
                                    {post.comments.length === 0 && <p className="text-sm text-slate-500 text-center">No comments yet. Be the first!</p>}
                                    {post.comments.map(comment => (
                                        <div key={comment.id} className="space-y-2">
                                            {/* Parent Comment */}
                                            <div className="flex space-x-3">
                                                <img src={comment.avatar} alt={comment.author} className="h-8 w-8 rounded-full object-cover" />
                                                <div className="flex-1 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <span className="text-sm font-semibold text-slate-900">{comment.author}</span>
                                                        <span className="text-xs text-slate-400">{comment.time}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-700">{comment.content}</p>
                                                    <button 
                                                        onClick={() => setActiveReplyInputId(activeReplyInputId === comment.id ? null : comment.id)}
                                                        className="text-xs text-green-600 font-medium mt-2 hover:underline flex items-center"
                                                    >
                                                        <CornerDownRight className="h-3 w-3 mr-1" /> Reply
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Nested Replies */}
                                            {comment.replies && comment.replies.map(reply => (
                                                <div key={reply.id} className="flex space-x-3 pl-11">
                                                    <img src={reply.avatar} alt={reply.author} className="h-6 w-6 rounded-full object-cover" />
                                                    <div className="flex-1 bg-slate-100 p-2 rounded-lg border border-slate-200">
                                                         <div className="flex justify-between items-baseline mb-1">
                                                            <span className="text-xs font-semibold text-slate-900">{reply.author}</span>
                                                            <span className="text-[10px] text-slate-400">{reply.time}</span>
                                                        </div>
                                                        <p className="text-xs text-slate-700">{reply.content}</p>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Reply Input */}
                                            {activeReplyInputId === comment.id && (
                                                <div className="flex space-x-2 pl-11 items-center">
                                                    <div className="flex-1 relative">
                                                        <input 
                                                            type="text" 
                                                            placeholder={`Reply to ${comment.author}...`}
                                                            className="w-full pl-3 pr-10 py-1.5 rounded-full border border-slate-300 focus:ring-green-500 focus:border-green-500 text-xs"
                                                            value={replyText}
                                                            onChange={(e) => setReplyText(e.target.value)}
                                                            onKeyDown={(e) => e.key === 'Enter' && handleReply(post.id, comment.id)}
                                                            autoFocus
                                                        />
                                                        <button 
                                                            onClick={() => handleReply(post.id, comment.id)}
                                                            className="absolute right-1 top-1 p-0.5 text-green-600 hover:bg-green-50 rounded-full"
                                                        >
                                                            <Send className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex space-x-3 mt-4">
                                    <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-full object-cover" />
                                    <div className="flex-1 relative">
                                        <input 
                                            type="text" 
                                            placeholder="Write a comment..." 
                                            className="w-full pl-4 pr-10 py-2 rounded-full border border-slate-300 focus:ring-green-500 focus:border-green-500 text-sm"
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleComment(post.id)}
                                        />
                                        <button 
                                            onClick={() => handleComment(post.id)}
                                            className="absolute right-1.5 top-1.5 p-1 text-green-600 hover:bg-green-50 rounded-full"
                                        >
                                            <Send className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                  );
              })}
          </div>

          <div className="space-y-6">
              <Card className="p-5">
                  <h3 className="font-bold text-slate-900 mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                      {['React', 'Design', 'Career', 'Python', 'Help', 'Showcase'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full cursor-pointer hover:bg-slate-200">
                              #{tag}
                          </span>
                      ))}
                  </div>
              </Card>
              <Card className="p-5">
                  <h3 className="font-bold text-slate-900 mb-4">Guidelines</h3>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                      <li>Be respectful to others</li>
                      <li>Stay on topic</li>
                      <li>No spam or self-promotion</li>
                      <li>Use code blocks for code</li>
                  </ul>
              </Card>
          </div>
      </div>

      {/* New Post Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="font-bold text-lg text-slate-900">Create New Post</h3>
                      <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                          <X className="h-5 w-5" />
                      </button>
                  </div>
                  <form onSubmit={handleCreatePost} className="p-6 space-y-4">
                      <Input 
                        label="Title" 
                        value={newPost.title} 
                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                        placeholder="What's on your mind?"
                        required
                      />
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                          <textarea 
                              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-3 border"
                              rows={5}
                              value={newPost.content}
                              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                              placeholder="Share your thoughts, questions, or ideas..."
                              required
                          />
                      </div>
                      <div className="flex justify-end pt-2">
                          <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="mr-2">Cancel</Button>
                          <Button type="submit">Post</Button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default Community;