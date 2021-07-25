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


export const Body = () => {

    const [editLinkOpen, setEditLinkOpen] = useState<boolean>(false);
    const [links, setLinks] = useState<LinkDto[]>([]);
    const [currentLink, setCurrentLink] = useState<LinkDto | null>(null);
    const [linkListLoading, setLinkListLoading] = useState<boolean>(false);
    const [createLinkLoading, setCreateLinkLoading] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>(false);
    const [notificationConfig, setNotificationConfig ] = useState<NotificationConfig | null>(null)
    const [dragId, setDragId] = useState<string>('');

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
        getLinks(mounted);

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
            console.log(res);
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
                getLinks(true);
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
                getLinks(true);
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

    const getLinks = async(mounted: boolean) => {
        setLinkListLoading(true);
        let res = await linkService.getLinks(user.token);
        console.log(res);
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
           getLinks(true);
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
        console.log(e.currentTarget.id);
        setDragId(e.currentTarget.id);
        if (e.currentTarget) {
            draggingLink.current = e.currentTarget.id
        }
        setTimeout(() => {
            let linkEls  = document.getElementsByClassName("link-container");
            if (linkEls) {
            links.forEach((l, idx) => {
                if (l.public_id === draggingLink.current)
                (linkEls.item(idx) as HTMLScriptElement).style.opacity = "0";
            })
        }
        },0);
    }

    const dragEnd = (e: any) => {
        let linkEls  = document.getElementsByClassName("link-container");
        if (linkEls) {
            links.forEach((l, idx) => {
                (linkEls.item(idx) as HTMLScriptElement).style.opacity = "1";
            })
        }
    }

    const handleDrop = (e: any) => {
        // const dragLink = links.find((link) => link.public_id === dragId);
        // const dropLink = links.find((link) => link.public_id === e.currentTarget.id);
        // const dragLinkOrder = dragLink?.link_pos;
        // const dropLinkOrder = dropLink?.link_pos; 
        // const newLinkState = links.map((link) => {
        //     if (link.public_id === dragId) {
        //         if (dropLinkOrder){
        //             link.link_pos = dropLinkOrder;
        //         }
        //     } else {
        //         if (dragLinkOrder && dropLinkOrder && dragLinkOrder > dropLinkOrder) {
        //             if (link.link_pos >= dropLinkOrder && link.link_pos < dragLinkOrder ) {
        //                 link.link_pos++;
        //             }
        //         } else if (dragLinkOrder && dropLinkOrder && dragLinkOrder < dropLinkOrder) {
        //             if (link.link_pos <= dropLinkOrder && link.link_pos > dragLinkOrder) {
        //                 link.link_pos--;
        //             }
        //         }
        //     }

        //     return link;
        // });

        // console.log(newLinkState);

        // setLinks(newLinkState);
    }

    const draggedOver = (e: any) =>{
        e.preventDefault();
        const dragLink = links.find((link) => link.public_id === dragId);
        const overLink = links.find((link) => link.public_id === e.currentTarget.id);

        const dragLinkPosition = dragLink?.link_pos;
        const overLinkPosition = overLink?.link_pos;

        const newLinkState = links.map((l) => {
            if (l.public_id === dragId) {
                if (overLinkPosition) {
                    l.link_pos = overLinkPosition;
                }
            } else {
                if (dragLinkPosition && overLinkPosition && dragLinkPosition > overLinkPosition) {
                    if (l.link_pos >= overLinkPosition && l.link_pos < dragLinkPosition ) {
                        l.link_pos++;
                    }
                } else if (dragLinkPosition && overLinkPosition && dragLinkPosition < overLinkPosition) {
                    if (l.link_pos <= overLinkPosition && l.link_pos > dragLinkPosition) {
                        l.link_pos--;
                    }
                }
            }

            return l
        })

        setLinks(newLinkState)
        // let linkEls  = document.getElementsByClassName("link-container");
        // if (linkEls) {
        //     links.forEach((l, idx) => {
        //         if (l.public_id === draggedOverId) {
        //             (linkEls.item(idx) as HTMLScriptElement).style.marginTop = "30px";
        //         } else {
        //             (linkEls.item(idx) as HTMLScriptElement).style.marginTop = "0";
        //         }
        //     })
        // }
        
   }


    return (
        <div className="body-container">

            {(linkListLoading) ? (
                <div className="body-link-list-loader-holder">
                    <LoadingWheel color="rgb(137, 0, 223)" size="100px" borderTickness="4px" />
                </div>
            ) : (

                <LinksList noLinks={(links.length === 0 && !currentLink) ? true : false} onNewLinkClick={newLinkClicked} >
                    { links.sort((a,b) => a.link_pos - b.link_pos).map(l => {
                        return <Link draggedOver={draggedOver} dragEnd={dragEnd} handleDrag={handleDrag} handleDrop={handleDrop} deleteLink={deleteLink} selected={(currentLink?.public_id === l.public_id) ? true : false} onClick={editLink} key={l.public_id} link={l}/>
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