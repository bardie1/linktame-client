import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import LinkDto from '../../models/link';
import { NotificationConfig } from '../../models/notificationConfig';
import { linkService } from "../../services/link.service";
import { LinksList } from "../linksList/LinksList";
import { Link } from "../link/Link";
import { EditLinkSlider } from "../edit-link-slider/EditLinkSlider";
import { LoadingWheel } from "../loading-wheel/LoadingWheel";
import { Notification } from "../notification/Notification";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import "./Body.css";
import { selectUser } from '../../redux/slicers/userSlicer';
import { selectDevice } from '../../redux/slicers/deviceSlicer';


export const Body = () => {

    const [editLinkOpen, setEditLinkOpen] = useState<boolean>(false);
    const [links, setLinks] = useState<LinkDto[]>([]);
    const [currentLink, setCurrentLink] = useState<LinkDto | null>(null);
    const [linkListLoading, setLinkListLoading] = useState<boolean>(false);
    const [createLinkLoading, setCreateLinkLoading] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>(false);
    const [notificationConfig, setNotificationConfig ] = useState<NotificationConfig | null>(null)
    const [dragId, setDragId] = useState<string>('');
    const [mobileDragY, setMobileDragY] = useState<number>(0);
    const [lastDraggedOverId, setLastDraggedOverId] = useState<string>('');

    const device = useSelector(selectDevice);
    const user = useSelector(selectUser);
    const draggingLink = useRef<string>('');
    const newLink: LinkDto = {
        link: '',
        link_name: '',
        link_pos: links.length + 1
    }

   const newLinkClicked = () => {
        setEditLinkOpen(true);
        setCurrentLink(newLink);

    }

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            if (currentLink?.link !== '' && currentLink?.link_name !== '' ){
                setValid(true);
            } else {
                setValid(false)
            }
        }

        return () => {mounted = false}
    }, [currentLink])

    useEffect(() => {
        let mounted = true;
        getLinks(mounted,true);

        return () => {mounted = false};
    }, [])


    const setName = (name: string) => {
        if (currentLink) {
            let c: LinkDto = {...currentLink};
            c.link_name = name;
            setCurrentLink(c);
        }
    }
    const setUrl = (url: string) => {
        if (currentLink) {
            let c: LinkDto = {...currentLink};
            c.link = url;
            setCurrentLink(c);
        }
    }

    const createLink = async () => {
        setCreateLinkLoading(true);
        if (currentLink) {
            let res = await linkService.createLink([currentLink], user.token);
            if (res.successful) {
                setNotificationConfig({
                    type: 'success',
                    Icon: CheckCircleOutlineIcon,
                    message: 'Link Created Successfully'
                })
                setEditLinkOpen(false);
                setTimeout(()  => {
                    setNotificationConfig(null);
                }, 5000);
                setCurrentLink(null);
                getLinks(true, false);
            } else {
                setNotificationConfig({
                    type: 'error',
                    Icon: ErrorOutlineIcon,
                    message: `Unable to create link: ${res.message}`
                })
            }
            setCreateLinkLoading(false);
        }
    }

    const updateLink = async () => {
        setCreateLinkLoading(true);
        if (currentLink) {
            let res = await linkService.updateLink(currentLink, user.token);

            if (res.successful) {
                setCreateLinkLoading(false);
                let config: NotificationConfig = {
                    type: 'success',
                    Icon: CheckCircleOutlineIcon,
                    message: "Link has been updated successfully"
                }
                setNotificationConfig(config);
                getLinks(true, false);
            } else {
                setCreateLinkLoading(false);
                let config: NotificationConfig = {
                    type: 'error',
                    Icon: ErrorOutlineIcon,
                    message: "Unable to update link"
                }
                setNotificationConfig(config);
            }
        }
    }

    const editLink = (link: LinkDto) => {
        setEditLinkOpen(true);
        setCurrentLink(link);
    }

    const closeSlider = () => {
        setEditLinkOpen(false);
        setCurrentLink(null);
    }

    const getLinks = async(mounted: boolean, showLoading: boolean) => {
        if (showLoading) {
            setLinkListLoading(true);
        }
        let res = await linkService.getLinks(user.token);
        if (res.successful) {
            if (mounted) {
                setLinks([...res.links]);
                setLinkListLoading(false);
            }
            
        } else {
            if (mounted) {
                setLinkListLoading(false);
            }
            
        }
    }

    const deleteLink = async (linkName: string, linkPubId: string) => {
       let res = await linkService.deleteLink(linkPubId, linkName, user.token);

       if (res.successful) {
           setEditLinkOpen(false);
        setNotificationConfig({
            type: 'success',
            Icon: CheckCircleOutlineIcon,
            message: 'Link Deleted Successfully'
        })
        setTimeout(()  => {
            setNotificationConfig(null);
        }, 5000);
           getLinks(true, false);
       } else {
        setNotificationConfig({
            type: 'error',
            Icon: ErrorOutlineIcon,
            message: 'Link Deletion Unsuccessful'
        })
        setTimeout(()  => {
            setNotificationConfig(null);
        }, 5000);
       }
    }

    const handleDrag = (e: any) => {
        setDragId(e.currentTarget.id);
        if (e.currentTarget) {
            draggingLink.current = e.currentTarget.id
        }
        setTimeout(() => {
            let linkEls  = document.getElementsByClassName("link-container");
            if (linkEls) {
                links.forEach((l, idx) => {
                    if (l.public_id === draggingLink.current) {
                        if (device === 'desktop') {
                            (linkEls.item(idx) as HTMLScriptElement).style.opacity = "0";
                        } else {
                            let height;
                            let width;
                            if (idx === 0 && links.length > 1) {
                                height  = (linkEls.item(1) as HTMLScriptElement).offsetHeight - ((linkEls.item(0) as HTMLScriptElement).offsetHeight * 0.40);
                                width = (linkEls.item(1) as HTMLScriptElement).offsetWidth - ((linkEls.item(0) as HTMLScriptElement).offsetWidth * 0.10);
                            } else {
                                height  = (linkEls.item(0) as HTMLScriptElement).offsetHeight - ((linkEls.item(0) as HTMLScriptElement).offsetHeight * 0.40);
                                width = (linkEls.item(0) as HTMLScriptElement).offsetWidth - ((linkEls.item(0) as HTMLScriptElement).offsetWidth * 0.10);
                            }
                            let element = linkEls.item(idx) as HTMLScriptElement
                            if (element) {
                                element.style.position = "fixed";
                                element.style.height = height + "px";
                                element.style.width = width + "px";
                                let touch = e.changedTouches[0] || e.touches[0];
                                setMobileDragY(touch.clientY);
                                element.style.zIndex = '1000';
                                element.style.top = touch.clientY + 'px';
                                element.style.left = touch.clientX + "px";
                            }
                        }
                    }
                })
            }
        },0);
    }

    const dragEnd = (e: any) => {
        setLastDraggedOverId('');
        setMobileDragY(0);
        let linkEls  = document.getElementsByClassName("link-container");
        if (linkEls) {
            links.forEach((l, idx) => {
                let element = (linkEls.item(idx) as HTMLScriptElement)
                element.style.opacity = "1";
                element.style.position = 'relative';
                element.style.height = 'unset';
                element.style.width = 'unset';
                element.style.zIndex = 'unset';
                element.style.top = 'unset';
                element.style.left = 'unset';
            })
        }
    }

    const draggedOver = (e: any) =>{
        if (typeof e !== 'string') {
            e.preventDefault();
        }
        const dragLink = links.find((link) => link.public_id === dragId);


        let overLink;
        if (typeof e === 'string') {
            overLink = links.find((link) => link.public_id === e);
        } else {
            overLink = links.find((link) => link.public_id === e.currentTarget.id);
        }

        const dragLinkPosition = dragLink?.link_pos;
        const overLinkPosition = overLink?.link_pos;

        if (typeof e === 'string') {
    
        }

        const newLinkState = links.map((l) => {
            if (l.public_id === dragId) {
                if (overLinkPosition) {
                    l.link_pos = overLinkPosition;
                }
            } else {
                if (dragLinkPosition && overLinkPosition && dragLinkPosition > overLinkPosition) {

                    if (typeof e === 'string') {
                        setLastDraggedOverId(e + "%up")
                    }
                    if (l.link_pos >= overLinkPosition && l.link_pos < dragLinkPosition ) {
                        l.link_pos++;
                    }
                } else if (dragLinkPosition && overLinkPosition && dragLinkPosition < overLinkPosition) {
                    if (typeof e === 'string') {
                        setLastDraggedOverId(e + "%down")
                    }
                    if (l.link_pos <= overLinkPosition && l.link_pos > dragLinkPosition) {
                        l.link_pos--;
                    }
                }
            }

            return l
        })

        setLinks(newLinkState)
   }


    return (
        <div className="body-container">

            {(linkListLoading) ? (
                <div className="body-link-list-loader-holder">
                    <LoadingWheel color="rgb(137, 0, 223)" size="100px" borderTickness="4px" />
                </div>
            ) : (

                <LinksList noLinks={(links.length === 0 && !currentLink) ? true : false} onNewLinkClick={newLinkClicked} >
                    { links.sort((a,b) => a.link_pos - b.link_pos).map((l, idx) => {
                        return <Link draggedOver={draggedOver} dragEnd={dragEnd} handleDrag={handleDrag} index={idx} draggedY={mobileDragY} lastDraggedOverPubId={lastDraggedOverId}
                        deleteLink={deleteLink} selected={(currentLink?.public_id === l.public_id) ? true : false} onClick={editLink} key={l.public_id} link={l}/>
                    })}
                    { (currentLink && !currentLink?.public_id) && <Link selected={true} onClick={editLink} link={currentLink} />}
                </LinksList>


            )}

            
        { currentLink && <EditLinkSlider updateLink={updateLink} valid={valid} linkLoading={createLinkLoading} close={closeSlider} setCurrentLinkName={setName} setCurrentLinkUrl={setUrl} createLink={createLink} currentLink={currentLink} open={editLinkOpen} />}
        { (notificationConfig) &&
                <Notification type={notificationConfig.type} Icon={notificationConfig.Icon} message={notificationConfig.message} />}
        </div>
    )
}