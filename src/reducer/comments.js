import {arrayToMap} from '../store/helpers'
import {ADD_COMMENT, LOAD_COMMENTS, SUCCESS, START} from '../constants'
import {Record, Map} from 'immutable'

const CommentModel = Record({
    id: null,
    user: '',
    text: ''
})

const defaultState = new Map({
    entities: new Map({}),
    loading: false,
})

export default (comments = defaultState, action) =>
{
    const {type, payload, response, generatedId} = action

    switch (type) {
        case ADD_COMMENT:
            return comments.setIn(['entities', generatedId], new CommentModel({...payload.comment, id: generatedId}))
        case LOAD_COMMENTS + START:
            return comments.set('loading', true)
        case LOAD_COMMENTS + SUCCESS:
            return comments.update('entities', entities => entities.merge(arrayToMap(response, comment => new CommentModel(comment)))).set('loading', false)
    }

    return comments
}