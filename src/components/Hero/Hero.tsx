import React, { FC, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './Hero.css'

export const Hero: FC = () => {
  return (
    <div className="Hero__container">
      <div className="Hero__container--margin">
        <div className="Hero__grid">
          <div className="Hero__grid-left">
            <div className="Hero__grid-left--py">
              <h1 className="Hero__heading Hero__heading--gradient">React TypeScript Ethers</h1>
              <p className="Hero__body">
                An unopinionated boilerplate to get your Ethereum project up and running fast using React and
                TypeScript.
              </p>
            </div>
          </div>
          <div className="Hero__grid-right">
            <div className="Hero__image-container">
              <img className="Hero__image" src="/public/eth-diamond-rainbow.png" alt="ethereum diamond logo rainbow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
