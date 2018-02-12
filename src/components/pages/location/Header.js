import React from 'react';

export default function Header({imageUrl}) {

    return (
        <header style={{backgroundImage:`url(${imageUrl})`}}></header>
    )
}
