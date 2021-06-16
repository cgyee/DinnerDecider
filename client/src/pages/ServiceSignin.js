import React, { useState } from 'react'
import { useMsal } from '@azure/msal-react'

const ServiceSignin = () => {
    const { accounts } = useMsal()
    if (accounts[0]) {
        const { username, name, idTokenClaims } = accounts[0]
        console.log(
            '🚀 ~ file: ServiceSignin.js ~ line 8 ~ ServiceSignin ~ accounts[0]',
            accounts[0]
        )
        const { oid, iat, exp } = idTokenClaims

        try {
            fetch('/auth/azure/login', {
                mode: 'cors',
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'Application/json'
                },
                body: JSON.stringify({ username, name, oid, iat, exp })
            }).then((response) => {
                console.log(
                    '🚀 ~ file: ServiceSignin.js ~ line 19 ~ response',
                    response
                )
            })
        } catch (error) {
            console.log(
                '🚀 ~ file: ServiceSignin.js ~ line 30 ~ ServiceSignin ~ error',
                error
            )
        }
    }
    return <h1>Stuff</h1>
}

export default ServiceSignin
