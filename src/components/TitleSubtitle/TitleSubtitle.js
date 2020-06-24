import React from 'react';

const TitleSubtitle = (props) => {
     return (
         <>
        <h1 className='display-6'>{props.title}</h1>
        <h2>{props.subtitle}</h2>
        </>
     )
};

export default TitleSubtitle;