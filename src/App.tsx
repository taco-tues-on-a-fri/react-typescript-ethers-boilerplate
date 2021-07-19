import React, { FC, useEffect, useState } from 'react'
import { ethers } from 'ethers'

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
    <div>
      <h1>React Typescript Ethers</h1>
      <p>{`Block number: ${blockNumber}`}</p>
    </div>
  )
}

export default App
