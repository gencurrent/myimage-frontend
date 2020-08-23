/**
 * Format structure description
 */

// import ICON_INSTAGRAM from 'resources/brands/icon-instagram.png';
// import ICON_FACEBOOK from 'resources/brands/icon-facebook.png';
import {
    ICON_INSTAGRAM,
    ICON_FACEBOOK,
    ICON_WHATSAPP,
    ICON_LINKEDIN,
    ICON_SNAPCHAT,
    ICON_TIKTOK,
    ICON_TWITTER,
    ICON_PINTEREST,
} from 'resources/brands';

const FACEBOOK_FORMATS = [
    {
        slug: 'facebook-profile-picture',
        name: 'Facebook profile photo',
        
        sizeTarget: {
            width: 180,
            height: 180,
        },
    },
    {
        slug: 'facebook-cover-picture',
        name: 'Facebook cover image',
        
        sizeTarget: {
            width: 820,
            height: 312,
        },
    },
    {
        slug: 'facebook-shared-image',
        name: 'Facebook shared image',
        sizeTarget: {
            width: 1200,
            height: 630,
        },
    },
    {
        slug: 'facebook-shared-link-image',
        name: 'Facebook shared link image',
        sizeTarget: {
            width: 1200,
            height: 628,
        },
    },
];

const INSTAGRAM_FORMATS = [
    {
        slug: 'instagram-profile-picture',
        name: 'Instagram profile picture',
        // aspect: 110 / 110,
        sizeTarget: {
            width: 110,
            height: 110,
        },
    },
    {
        slug: 'instagram-post-square',
        name: 'Instagram square post',
        // aspect: 1080 / 1080,
        sizeTarget: {
            width: 1080,
            height: 1080,
        },
    },
    {
        slug: 'instagram-post-landscape',
        name: 'Instagram landscape post',
        // aspect: 1080 / 1080,
        sizeTarget: {
            width: 1080,
            height: 566,
        },
    },
    {
        slug: 'instagram-post-portrait',
        name: 'Instagram portrait post',
        // aspect: 1080 / 1080,
        sizeTarget: {
            width: 1080,
            height: 1350,
        },
    },
    {
        slug: 'instagram-story',
        name: 'Instagram story photo',
        // aspect: 1920 / 1080,
        sizeTarget: {
            width: 1080,
            height: 1920,
        },
    },
];

const WHATSAPP_FORMATS = [
    {
        slug: 'whatsapp-profile-picture',
        name: 'Whatsapp profile picture',
        
        sizeTarget: {
            width: 500,
            height: 500,
        },
    },
];

const TIKTOK_FORMATS = [
    {
        slug: 'tiktok-profile-picture',
        name: 'TikTok profile picture',
        sizeTarget: {
            width: 180,
            height: 180,
        },
    },
    {
        slug: 'tiktok-video-post',
        name: 'TikTok video post',
        sizeTarget: {
            width: 1080,
            height: 1930,
        },
    },
];

const TWITTER_FORMATS = [
    {
        slug: 'twitter-profile-picture',
        name: 'Twitter profile picture',
        
        sizeTarget: {
            width: 400,
            height: 400,
        },
    },
    {
        slug: 'twitter-header-image',
        name: 'Twitter header picture',
        
        sizeTarget: {
            width: 1500,
            height: 500,
        },
    },
    {
        slug: 'twitter-in-stream-image',
        name: 'Twitter in-stream picture',
        
        sizeTarget: {
            width: 440,
            height: 220,
        },
    },
];

const LINKEDIN_FORMATS = [
    {
        slug: 'linkedin-profile-picture',
        name: 'LinkedIn profile picture',
        sizeTarget: {
            width: 400,
            height: 400,
        },
    },
    {
        slug: 'linkedin-cover-picture',
        name: 'LinkedIn cover picture',
        sizeTarget: {
            width: 1584,
            height: 396,
        },
    },
    {
        slug: 'linkedin-company-logo-picture',
        name: 'LinkedIn company logo picture',
        sizeTarget: {
            width: 300,
            height: 300,
        },
    },
    {
        slug: 'linkedin-company-cover-picture',
        name: 'LinkedIn company cover picture',
        sizeTarget: {
            width:  1192,
            height: 220,
        },
    },
    {
        slug: 'linkedin-shared-picture',
        name: 'LinkedIn shared picture',
        sizeTarget: {
            width: 1200,
            height: 627,
        },
    },
];
const SNAPCHAT_FORMATS = [
    {
        slug: 'snapchat-profile-picture',
        name: 'Snapchat profile picture',        
        sizeTarget: {
            width: 500,
            height: 500,
        },
    },
];


/**
 * A CONSTANT tree describing all the formats used in the myimage.io application
 */
const FORMAT_TREE = {
    instagram: {
        title: 'Instagram',
        formats: INSTAGRAM_FORMATS,
        icon: ICON_INSTAGRAM,
    },
    facebook: {
        title: 'Facebook',
        formats: FACEBOOK_FORMATS,
        icon: ICON_FACEBOOK,
    },
    twitter: {
        title: 'Twitter',
        formats: TWITTER_FORMATS,
        icon: ICON_TWITTER,
    },
    tiktok: {
        title: 'TikTok',
        formats: TIKTOK_FORMATS,
        icon: ICON_TIKTOK,
    },
    linkedin: {
        title: 'LinkedIn',
        formats: LINKEDIN_FORMATS,
        icon: ICON_LINKEDIN,
    },
    snapchat: {
        title: 'SnapChat',
        formats: SNAPCHAT_FORMATS,
        icon: ICON_SNAPCHAT,
    },
    whatsapp: {
        title: 'WhatsApp',
        formats: WHATSAPP_FORMATS,
        icon: ICON_WHATSAPP,
    },
    pinterest: {
        title: 'Pinterest',
        formats: WHATSAPP_FORMATS,
        icon: ICON_PINTEREST,
    },
};

export { FORMAT_TREE };
export default FORMAT_TREE;