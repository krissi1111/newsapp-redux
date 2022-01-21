import { useEffect, useState } from "react";
import { Accordion, Button, ButtonGroup, Card, Form, InputGroup, useAccordionButton } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';
import { getComments, unloadComments, addComment, addReply, editComment, deleteComment, deleteReply, editReply } from "../../redux/slices/commentSlice";
import { Icon } from '@iconify/react';
import { selectUser } from "../../redux/slices/authSlice";

export function CommentContainer(props) {
  const dispatch = useDispatch();
  const commentValues = useSelector((state) => state.comments)
  const commentStatus = commentValues.status
  const comments = commentValues.commentData
  const modalShow = useSelector((state) => state.newsModal.show)

  useEffect(() =>{
    if(modalShow && commentStatus === 'idle') {
      dispatch(getComments(props.newsId))
    }
    else if(!modalShow) {
      dispatch(unloadComments())
    }
  }, [dispatch, commentStatus, props.newsId, modalShow])

  return(
    <>
    <Accordion>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>
          <Icon inline={true} className="mx-1" icon='mdi:comment-outline'/>
           {comments.length} Comments
        </Accordion.Header>
        <Accordion.Collapse eventKey='0'>
          <>
          <CommentList comments={comments} type='Comment' newsId={props.newsId}/>
          </>
        </Accordion.Collapse>
      </Accordion.Item>
    </Accordion>
    </>
  )
}

export function CommentList(props) {
  let commentItems = props.comments
  let commentType = props.type
  let newsId = props.newsId
  let commentId = props.commentId || -1

  return(
    <>
      <CommentInput type={commentType} newsId={newsId} commentId={commentId}/>
      {commentItems.map(item => {
        return(
        <CommentItem key={item.text} item={item} type={commentType} newsId={newsId}/>
        )
      })
      }
    </>
  )
}

export function CommentItem(props) {
  const { item, newsId, type } = props;
  let { id, userId, userFullName, text, date, replies } = item
  let currentUser = useSelector(selectUser)
  let isOwner = (userId === currentUser.id) || (currentUser.userType === 'Admin')
  date = new Date(date).toLocaleString('is', {timeStyle: "short", dateStyle: "short"})

  const dispatch = useDispatch();
  const handleDelete = () => {
    if(type === 'Comment') dispatch(deleteComment({ commentId: id }))
    else if(type === 'Reply') dispatch(deleteReply({ replyId: id }))
  }

  return(
    <Card>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between my-0 align-items-center">
          <Card.Text className="mb-2">
            {userFullName}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            {date}
          </Card.Subtitle>
        </Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        <Accordion>
          <ButtonGroup>
            {type === 'Comment' ? (
            <ToggleButton eventKey='0'>
              <Icon inline={true} className="mx-1" icon='mdi:comment-outline'/>
              {replies.length} Replies
            </ToggleButton>
            ) : (<></>)
            }
            {!isOwner ? (
              <></>
              ) : (
              <>
                <ToggleButton eventKey='1'>
                  <Icon inline={true} className="mx-1" icon='mdi:comment-edit-outline'/>
                  Edit
                </ToggleButton>
                <Button
                  variant='light'
                  size='sm'
                  onClick={handleDelete}
                  style={{backgroundColor: 'white'}}
                >
                  <Icon inline={true} className="mx-1" icon='mdi:comment-remove-outline'/>
                  Delete
                </Button>
              </>
              )
            }
          </ButtonGroup>
          <Accordion.Collapse eventKey='0'>
            <CommentList 
              comments={replies} 
              type='Reply'
              newsId={newsId}
              commentId={id}
            />
          </Accordion.Collapse>
          <Accordion.Collapse eventKey='1'>
            {type === 'Comment' ? (
              <CommentInput type='CommentEdit' id={id} editText={text}/>
            ) : (
              <CommentInput type='ReplyEdit' id={id} editText={text}/>
            )}
          </Accordion.Collapse>
        </Accordion>
      </Card.Body>
    </Card>
  )
}

export function CommentInput(props) {
  const dispatch = useDispatch();

  const types = {
    Comment: {
      placeholder: 'Add new comment',
      click: () => dispatch(addComment({newsId: props.newsId, text: commentText})),
      buttonText: 'Comment'   
    },
    Reply: {
      placeholder: 'Add new reply',
      click: () => dispatch(addReply({newsId: props.newsId, text: commentText, commentId: props.commentId})),
      buttonText: 'Reply'
    },
    CommentEdit: {
      placeholder: 'Edit comment',
      value: props.editText,
      click: () => dispatch(editComment({text: commentText, commentId: props.id})),
      buttonText: 'Edit'
    },
    ReplyEdit: {
      placeholder: 'Edit reply',
      value: props.editText,
      click: () => dispatch(editReply({text: commentText, replyId: props.id})),
      buttonText: 'Edit'
    }
  }

  let commentType = props.type
  let type = types[commentType]
  const [commentText, setCommentText] = useState(type.value)
  
  return(
      <InputGroup>
        <Form.Control
          as='textarea'
          placeholder={type.placeholder}
          value={commentText}
          onChange={event => setCommentText(event.target.value)}
        />
        <Button variant='outline-secondary' onClick={type.click}>{type.buttonText}</Button>
      </InputGroup>
  )
}

function ToggleButton({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey)

  return(
    <Button
      variant='light'
      size='sm'
      onClick={decoratedOnClick}
      style={{backgroundColor: 'white'}}
    >
      {children}
    </Button>
  )
}



