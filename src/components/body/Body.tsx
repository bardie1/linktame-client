import React, { useEffect, useState } from 'react';
import LinkDto from '../../models/link';
import { NotificationConfig } from '../../models/notificationConfig';
import { linkService } from "../../services/link.service";
import { LinksList } from "../linksList/LinksList";
import { Link } from "../link/Link";
import { EditLinkSlider } from "../edit-link-slider/EditLinkSlider";
import { LoadingWheel } from "../loading-wheel/LoadingWheel";
import { Notification } from "../notification/Notification";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import "./Body.css";


export const Body = () => {

    const [editLinkOpen, setEditLinkOpen] = useState<boolean>(false);
    const [links, setLinks] = useState<LinkDto[]>([]);
    const [currentLink, setCurrentLink] = useState<LinkDto | null>(null);
    const [linkListLoading, setLinkListLoading] = useState<boolean>(false);
    const [createLinkLoading, setCreateLinkLoading] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>(false);
    const [notificationConfig, setNotificationConfig ] = useState<NotificationConfig | null>(null)

    const newLink: LinkDto = {
        link: '',
        link_name: '',
        link_pos: links.length
    }

   const newLinkClicked = () => {
        setEditLinkOpen(true);
        setCurrentLink(newLink);

    }

    useEffect(() => {
        if (currentLink?.link !== '' && currentLink?.link_name !== '' ){
            setValid(true);
        } else {
            setValid(false)
        }
    }, [currentLink])

    useEffect(() => {
        setTimeout(() => {
            getLinks();
        }, 100)
    }, [])


    useEffect(() => {
        if (currentLink) {
            setCurrentLink(links[links.length - 1]);
        }
    }, [links]);

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
            let res = await linkService.createLink([currentLink]);
            if (res.successful) {
                setNotificationConfig({
                    type: 'success',
                    Icon: CheckCircleOutlineIcon,
                    message: 'Link Created Successfully'
                })
                setTimeout(()  => {
                    setNotificationConfig(null);
                }, 5000);
                getLinks();
            } else {
                
            }
            setCreateLinkLoading(false);
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

    const getLinks = async() => {
        setLinkListLoading(true);
        return new Promise(async (resolve, reject) => {
            let res = await linkService.getLinks();
            if (res.successful) {
                let resLinks = [...res.links];
                setLinks(resLinks);
                setLinkListLoading(false);
                resolve(true)
            } else {
                setLinkListLoading(false);
                reject(true);
            }
        })
    }

    const deleteLink = async (linkName: string, linkPubId: string) => {
       let res = await linkService.deleteLink(linkPubId, linkName);

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
           getLinks();
       } else {
        setNotificationConfig({
            type: 'error',
            Icon: CheckCircleOutlineIcon,
            message: 'Link Deletion Unsuccessful'
        })
        setTimeout(()  => {
            setNotificationConfig(null);
        }, 5000);
       }
    }

    return (
        <div className="body-container">

            {(linkListLoading) ? (
                <div className="body-link-list-loader-holder">
                    <LoadingWheel color="rgb(137, 0, 223)" size="100px" borderTickness="4px" />
                </div>
            ) : (

                <LinksList noLinks={(links.length === 0 && !currentLink) ? true : false} onNewLinkClick={newLinkClicked} >
                    { links.map(l => {
                        return <Link deleteLink={deleteLink} selected={(currentLink?.public_id === l.public_id) ? true : false} onClick={editLink} key={l.public_id} link={l}/>
                    })}
                    { (currentLink && !currentLink?.public_id) && <Link selected={true} onClick={editLink} link={currentLink} />}
                </LinksList>


            )}

            
        { currentLink && <EditLinkSlider valid={valid} linkLoading={createLinkLoading} close={closeSlider} setCurrentLinkName={setName} setCurrentLinkUrl={setUrl} createLink={createLink} currentLink={currentLink} open={editLinkOpen} />}
        { (notificationConfig) &&
                <Notification type={notificationConfig.type} Icon={notificationConfig.Icon} message={notificationConfig.message} />}
        </div>
    )
}