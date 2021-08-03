import React, { FC, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './App.css'
import { Hero } from '@components/Hero'
// Use the mainnet
const network = 'homestead'


const App: FC = () => {
  const [blockNumber, setBlockNumber] = useState('')

  const provider = new ethers.providers.InfuraProvider(network)

  useEffect(() => {
    const getBlockNumber = async (): Promise<void> => {
      const blockNumber = await provider.getBlockNumber().then((result: number) => {
        console.log('getBlockNumber(): result === ', result)
        return result
      })

      setBlockNumber(`${blockNumber}`)
    }
    getBlockNumber()
  }, [])

  return (
    <div className="bg--white">
      <div className="relative overflow-hidden">
        <main>
          <Hero />

          <p>{`Block number: ${blockNumber}`}</p>
        </main>
      </div>
    </div>
  )
}

export default App
