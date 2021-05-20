import React from 'react';
import { useStyles } from './mintingCongrats.styles'
function MintingCongrats() {
    const classes =useStyles()
    return (
        <div className={classes.container}>
            <p className={classes.header}>Congratulations </p>
            <p className={classes.text}>Your NFT Product will be reviewd by <span>Startfi</span> NFT Publishing team and will be Published in 48 hours</p>

        </div>
    );
}

export default MintingCongrats;