import { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';
import { getComments } from "../../redux/slices/commentSlice";

export function CommentContainer(props) {
  const dispatch = useDispatch();
  const commentStatus = useSelector((state) => state.comments.status)

  useEffect(() =>{
    if(commentStatus === 'idle') {
      dispatch(getComments(props.newsId))
    }
  }, [dispatch, commentStatus, props.newsId])

  return(
    <CommentInput/>
  )
}

export function CommentList(props) {

}

export function CommentInput(props) {
  const types = {
    Comment: {
      placeholder: 'Add new comment'
    },
    Reply: {
      placeholder: 'Add new reply'
    },
    CommentEdit: {
      placeholder: 'Edit comment'
    }
  }
  let type = props.type || 'Comment'
  console.log(types[type])


  return(
    <InputGroup>
      <Form.Control
         as='textarea'
         aria-label='With textarea'
         placeholder={type.placeholder}
         value={'text'}
        
      />
    </InputGroup>
  )
}