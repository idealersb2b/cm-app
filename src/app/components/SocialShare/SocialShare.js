import React from 'react'
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share'

function SocialShare() {

    const url = window.location.href;

    return (
        <>
            <FacebookShareButton url={url}>
                <FacebookIcon size={40} round />
            </FacebookShareButton>
            <WhatsappShareButton url={url}>
                <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={url}>
                <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            <TwitterShareButton url={url}>
                <TwitterIcon size={40} round />
            </TwitterShareButton>
        </>

    )
}

export default SocialShare