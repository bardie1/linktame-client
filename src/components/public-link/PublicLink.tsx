import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { linkService } from '../../services/link.service';
import "./PublicLink.css";

export const PublicLink = () => {

    const [links, setLinks] = useState<Array<any>>([]);
    const { name }= useParams<{name: string}>();

    useEffect(() => {
        let mounted = true;
        linkService.getLinksByName(name)
            .then(response => {
                if (mounted) {
                    setLinks([...response.links])
                }
            })
            .catch(err => console.log(err));

        return () => {mounted = false};
    }, [name])


    return (
        <div>
            {links.map((l) => {
                return <div key={l.public_id}>{l.link_name}</div>
            })}
        </div>
    )
}