import { useEffect } from "react";
import { Button, ButtonGroup, Image, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getUserFavs, selectLoggedIn, selectUser, selectUserFavs } from "../../redux/slices/authSlice";
import { favAddRemove } from "../../redux/slices/authSlice";
import { showModal } from "../../redux/slices/newsModalSlice";
import { CommentContainer } from "../comments/Comments";
import { Icon } from '@iconify/react';


export function NewsModal(props) {
  const dispatch = useDispatch();
  const modalValues = useSelector((state) => state.newsModal)
  const user = useSelector(selectUser)
  const loggedIn = useSelector(selectLoggedIn)
  const userFavs = useSelector(selectUserFavs)
  

  let { show, item, status } = modalValues
  let { id, title, summary, link, image, date, origin } = item
  date = new Date(date).toLocaleString('is', {timeStyle: "short", dateStyle: "short"})
  const isFav = userFavs.includes(id)

  const handleClose = () => dispatch(showModal(false))
  const handleFav = () => dispatch(favAddRemove({ newsId: id}))

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {!loggedIn ? (
        'Sign in to add to favorites'
      ) : isFav ? (
        'Remove from favorites'
      ) : (
        'Add to favorites'
      )}
    </Tooltip>
  );
  

  return(
    <>
      {status === 'initial' ? (
        <></>
      ) : (
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {origin}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image
              variant="top" 
              src={image} 
              style={{ width: "100%", maxHeight: '20rem', objectFit: 'cover'}}
            />
            <Modal.Title id="contained-modal-title-vcenter" style={{ marginBlock: '0.5rem' }}>
              {title}
            </Modal.Title>
            <div className="mb-2 text-muted"><Icon inline={true} icon='mdi:calendar-month'/> {date}</div>
            <p>
              {summary}
            </p>
          </Modal.Body>
            <CommentContainer newsId={id}/>
          <Modal.Footer style={{display:'flex', justifyContent: 'space-between'}}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              {
                isFav ?(
                  <Button variant='outline-warning' onClick={handleFav}>
                    <Icon inline={true} icon='emojione:star'/> 
                  </Button>
                ) : (
                  <Button variant='outline-primary' onClick={handleFav}>
                    <Icon inline={true} icon='el:star-empty'/>
                  </Button>
                )
              }
            </OverlayTrigger>
            <ButtonGroup style={{ display:'flex', alignItems:'center'}}>
              {
                user.userType === 'Admin' ?(
                  <Button >Delete</Button>
                ) : (
                  <></>
                )
              }
              <Button href={link} variant="outline-primary">
                Visit site
                <Icon inline={true} className="mx-1" icon='eva:external-link-fill'/>
              </Button>{' '}
              <Button onClick={handleClose}>Close</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      )
      }
    </>
  )

  
}

export default NewsModal