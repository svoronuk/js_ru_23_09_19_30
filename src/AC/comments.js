import { ADD_COMMENT, LOAD_COMMENTS, START, SUCCESS } from '../constants'
import $ from 'jquery'

export function addComment(comment, articleId) {
    return {
        type: ADD_COMMENT,
        payload: {
            articleId, comment
        },
        generateId: true
    }
}

export function loadComments(articleId) {
    return (dispatch) => {
        dispatch({
            type: LOAD_COMMENTS + START,
        payload: {articleId}
        })

        setTimeout(() => {
            $.get(`/api/comment?article=${articleId}`)
                .done(response => dispatch({
                    type: LOAD_COMMENTS + SUCCESS,
                    payload: {articleId},
                    response
                }))
        }, 1000)
    }
}