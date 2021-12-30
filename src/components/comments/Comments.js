import { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card, Form, InputGroup, useAccordionButton } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux';
import { getComments, unloadComments, addComment } from "../../redux/slices/commentSlice";

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
          Comments
          <Badge
            bg='secondary'
            style={{marginLeft:'0.2rem'}}
          >
            {comments.length}
          </Badge>
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

  return(
    <>
      {commentType === null ?(
        <></>
      ) : (
      <CommentInput type={commentType} newsId={props.newsId}/>
      )}
      {!commentItems || commentItems.length === 0 ?(
        <></>
      ) : (
        commentItems.map(item => {
          return(
          <CommentItem key={item.text} item={item} type={commentType}/>
          )
        })
      )}
    </>
  )
}

export function CommentItem(props) {
  const { item, newsId, type } = props;
  let { id, userFullName, text, date, replies, isOwner } = item
  date = new Date(date).toLocaleString('en-UK')
  let replyLength = 0
  if(replies !== null) replyLength = replies.length

  return(
    <Card className='mb-0 mt-0' style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Card.Body >
        <Card.Title style={{ justifyContent: "space-between", display: "flex", margin: "0rem", alignItems: 'center' }}>
          <Card.Text className="mb-2">
            {userFullName}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        </Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        
        <Accordion>
          {type === 'Reply' ?(
            <></>
          ) : (
          <ToggleButton eventKey='0'>
            Replies
            <Badge
              bg='light'
              pill
              text='secondary'
            >
              {replyLength}
            </Badge>
          </ToggleButton>
          )}
          {!isOwner ?(
            <></>
          ) : (
            <>
              <ToggleButton eventKey='1'>
                Edit...
              </ToggleButton>
              <Button
                variant='link'
                size='sm'
              >
                Delete
              </Button>
            </>
          )}
          <Accordion.Collapse eventKey='0'>
            <CommentList comments={replies} type={type !== 'Reply' ?('Reply'):(null)}/>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey='1'>
            <CommentInput type='CommentEdit' editText={text}/>
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
      click: () => dispatch(addComment({newsId: props.newsId, commentText: commentText})),
      buttonText: 'Comment'   
    },
    Reply: {
      placeholder: 'Add new reply',
      click: () => console.log(commentText),
      buttonText: 'Reply'
    },
    CommentEdit: {
      placeholder: 'Edit comment',
      value: props.editText,
      click: () => console.log(commentType),
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
      variant='link'
      size='sm'
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  )
}