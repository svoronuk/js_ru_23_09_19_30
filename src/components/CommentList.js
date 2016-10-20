import React, {Component, PropTypes} from 'react'
import Comment from './Comment'
import toggleOpen from './../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import {connect} from 'react-redux'
import {getRelation} from '../store/helpers'
import {addComment, loadComments} from '../AC/comments'
import Loader from './Loader'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,
        //from toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    componentWillUpdate(nextProps)
    {
        const {article: {id, commentsLoaded}, isOpen, loadComments} = this.props
        if (nextProps.isOpen && !isOpen && !commentsLoaded) {
            loadComments(id)
        }
    }

    render()
    {
        const {article, comments, addComment, isOpen, toggleOpen, loading} = this.props
        const loader = !article.get('commentsLoaded') && loading && isOpen ? <Loader /> : null

        const text = isOpen ? 'hide comments' : `show ${article.get('comments').length} comments`
        let body = null
        if (article.get('commentsLoaded') && isOpen) {
            if (!comments || !comments.length){
                return <div>
                    <p>No comments yet</p>
                    <NewCommentForm articleId={article.get('id')} addComment={addComment}/>
                </div>
            }

            const commentItems = comments.map(comment => <li key={comment.get('id')}><Comment comment={comment.toObject()}/></li>)
            body = <div>
                    <ul>{commentItems}</ul>
                    <NewCommentForm articleId={article.get('id')} addComment={addComment}/>
                </div>
        }
        return (
            <div>
                {!article.loading ? <a href="#" onClick={toggleOpen}>{text}</a> : null}
                {loader}
                {body}
            </div>
        )
    }
}
export default connect((state, props) =>
{
    let comments = []
    if (props.article.get('commentsLoaded')) {
        comments = getRelation(props.article, 'comments', state);
    }
    return {
        comments: comments,
        loading: state.comments.get('loading'),
    }
}, {addComment, loadComments})(toggleOpen(CommentList))