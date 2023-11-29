import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import CreatePost from "../../components/Post/CreatePost";
import * as communityService from '../../utilities/community-api'

const CommunityDetailPage = ({ user }) => {
    const [community, setCommunity] = useState([])
    const { state } = useLocation();
    const navigate = useNavigate()
    const communityId = state?.communityId;

    useEffect(function(){
        async function fetchGroup(){
            const community = await communityService.getOneGroup(communityId)
            setCommunity(community)
        }
        fetchGroup()
        
    }, [])

    function _handleClick(){
        navigate('/community/new')
    }

    if(!community.name){
        return(
            <p>Loading...</p>
        )
    }

    return (
        <div className='content-container'>
            <h1>{ community.name }</h1>
            <img src={community.coverPhoto} style={{width: '50vmin'}}/>
            <h2>{ community.description }</h2>
            <button onClick={_handleClick}>Edit Community</button>
            <CreatePost user={ user } community={ community }/>
        </div>
    );
}

export default CommunityDetailPage;