import React from 'react';

import Config from 'config';

const BottomLine = () => {
    return (
        <div className='bottom-line'><p>© {Config.APPLICATION_NAME} 2020</p></div>
    )
};
export default BottomLine;